import test from 'node:test';
import assert from 'node:assert/strict';
import {parseVirsiDirectory,parseViadaDirectory,parseStraujupiteDirectory,mergeDirectory} from './lv-directories.mjs';
import {normalize,run} from './fuel.mjs';
import {mkdtemp,rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

test('Virši directory excludes foreign and partner locations and exports only public location fields',()=>{
  const result=parseVirsiDirectory({stations:[{id:'lv1',title:'Virši Test',address:'Testa iela 1, Rīga',region:'riga_region',coordinates:{lat:56.95,lng:24.1},phone:'private-field'},
    {id:'lt1',title:'Virši LT',address:'LT',region:null}],partners:[{id:'partner',title:'Other'}]});
  assert.equal(result.length,1);assert.equal(result[0].directory_id,'lv1');assert.equal(result[0].lon,24.1);assert.ok(!('phone' in result[0]));
  assert.throws(()=>parseVirsiDirectory({stations:[]}),/empty/);
});

test('Viada Latvia list strips telephone numbers and retains a station without inventing prices',()=>{
  const html='<table class="dus-list"><tr><td><span class="dus-name">ADUS Test*</span>: Adrese: Testa iela 1, Rīga, LV1021, 37167301595</td></tr></table>';
  const result=parseViadaDirectory(html);assert.equal(result.length,1);
  assert.equal(result[0].address,'Testa iela 1, Rīga, LV1021');assert.equal(result[0].name,'ADUS Test');assert.equal(result[0].value,undefined);
  assert.throws(()=>parseViadaDirectory(html.replace('LV1021','LT1021')),/country/);
});

test('Straujupīte pairs each tab title with its address; Google viewport centres are not station coordinates',()=>{
  const panel=(id,name,src)=>`<div id="title-${id}">${name}</div><div class="elementor-tab-content" aria-labelledby="title-${id}"><div class="elementor-widget-text-editor">Testa ${id}, Rīga</div><iframe src="${src}"></iframe></div>`;
  const result=parseStraujupiteDirectory(panel(1,'Test','https://embed.waze.com/iframe?lat=56.95&lon=24.1')+panel(2,'Other*','https://www.google.com/maps/embed?pb=!2d24!3d57'));
  assert.equal(result.length,2);assert.equal(result[0].lat,'56.95');assert.equal(result[1].lat,undefined);assert.equal(result[1].name,'Straujupīte Other*');
});

test('Directory merging matches postal and highway variants but never spreads prices or resolves ambiguous addresses',()=>{
  const dir=[{country:'LV',brand:'Virši',name:'A',address:'Testa iela 1, Rīga, LV-1021',directory_id:'a'},
    {country:'LV',brand:'Virši',name:'B',address:'Testa iela 2, Rīga, LV-1021',directory_id:'b'}];
  const quote={country:'LV',brand:'Virši',address:'Testa iela 1, Rīga',fuel:'95',value:1.8,day:'2026-11-06'};
  const rows=normalize('virsi',mergeDirectory([quote],dir),'2026-11-06T12:00:00Z');
  assert.equal(rows.length,2);assert.equal(rows.find(s=>s.directory_id==='a').prices['95'].value,1.8);assert.deepEqual(rows.find(s=>s.directory_id==='b').prices,{});
  assert.equal(rows.find(s=>s.directory_id==='a').id,normalize('virsi',[quote],'2026-11-06T12:00:00Z')[0].id);
  const ambiguous=mergeDirectory([quote],[...dir,{...dir[0],directory_id:'c'}]);assert.equal(ambiguous.at(-1).directory_id,undefined);
  const highway=mergeDirectory([{...quote,address:'Rīgas-Ventspils šos., 56.km, Tukuma nov.'}],[{...dir[0],address:'Rīgas-Ventspils šosejas 56.km, Slampes pag., Tukuma nov.'}]);assert.equal(highway.at(-1).directory_id,'a');
});

test('price-only refresh makes no directory requests and keeps cached locations after a weekly directory failure',async()=>{
  const folder=await mkdtemp(path.join(os.tmpdir(),'lv-directory-')),original=globalThis.fetch;
  const date=new Date().toISOString().slice(0,10).split('-').reverse().join('.');
  const prices=`<p>Cenas mājaslapā ir atjaunotas ${date}</p><div class="fuel-block">${['95e','98e','dd'].map(type=>`<div class="price-card" data-type="${type}"><div class="address">Testa iela 1, Rīga</div><div class="price"><span>fuel</span><span>1.8</span></div></div>`).join('')}</div>`;
  const directory={stations:[{id:'one',title:'Virši One',address:'Testa iela 1, Rīga, LV-1001',region:'riga_region'},
    {id:'two',title:'Virši Two',address:'Testa iela 2, Rīga, LV-1001',region:'riga_region'}]};
  let unavailable=false;const requests=[];
  try{
    globalThis.fetch=async url=>{requests.push(String(url));return String(url).includes('degvielas-un')?new Response(prices):unavailable?new Response('',{status:403}):String(url).endsWith('/data')?Response.json(directory):new Response('<stations-app stations-data-url="https://www.virsi.lv/data"></stations-app>');};
    await run(folder,['virsi'],{mode:'directories',setExitCode:false});
    const first=await run(folder,['virsi'],{setExitCode:false});unavailable=true;
    const weekly=await run(folder,['virsi'],{mode:'directories',setExitCode:false});
    assert.equal(weekly.sources[0].directory_status,'error');
    assert.deepEqual(weekly.data.map(s=>s.prices),first.data.map(s=>s.prices));
    requests.length=0;
    const second=await run(folder,['virsi'],{setExitCode:false});
    assert.equal(requests.length,1);assert.match(requests[0],/degvielas-un/);
    assert.equal(first.data.length,2);assert.equal(second.data.length,2);assert.equal(second.sources[0].directory_status,'cached');
    assert.equal(second.data.filter(s=>s.prices['95']).length,1);assert.equal(second.data.find(s=>s.directory_id==='two').prices['95'],undefined);
    assert.equal(second.data[0].directory_updated_at,first.data[0].directory_updated_at);
    const priceTimestamp=second.data.find(s=>s.prices['95']).prices['95'].fetched_at;
    unavailable=false;
    const refreshedDirectory=await run(folder,['virsi'],{mode:'directories',setExitCode:false});
    assert.equal(refreshedDirectory.data.find(s=>s.prices['95']).prices['95'].fetched_at,priceTimestamp);
    assert.equal(refreshedDirectory.sources[0].last_success_at,second.sources[0].last_success_at);
  }finally{globalThis.fetch=original;await rm(folder,{recursive:true,force:true});}
});
