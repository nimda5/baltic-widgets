import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {koolSnippetURLs,parseKoolPrices,parseKoolDirectory,parseNesteDirectory,parseRietumu,addKoolCoordinates} from './lv-extra.mjs';
import {normalize} from './fuel.mjs';
import {database,saveStations,widgetData} from '../services/database.mjs';

const widget=(text,x,y)=>`<div data-id="${x}-${y}" style="left:${x}px;top:${y}px"><p>${text}</p></div>`;
const prices='Zemākās cenas DUS tīklā'+widget('95E',100,100)+widget('DD',300,100)+widget('98',200,100)+widget('1,817',100,140)+widget('2,047</p><p>7',300,140)+widget('1,887',200,140);
test('KOOL uses the matching visual fuel columns, keeps network scope and does not invent a publication date',()=>{
  const records=parseKoolPrices(prices);assert.deepEqual(records.map(r=>r.value),['1,817','2,047']);
  assert.ok(records.every(r=>r.scope==='network_published_minimum'&&!r.day&&!r.at));
  assert.throws(()=>parseKoolPrices(prices+widget('1,999',100,150)),/column/);
  const pages=[{title:'Degviela',htmlUrl:'https://c-p.rmcdn.net/prices.html'},{title:'Degvielas uzpildes stacijas',htmlUrl:'https://c-p.rmcdn.net/directory.html'}];
  const html='<script>window.ServerData = '+JSON.stringify({mags:{mag:{pages}},other:'} brace inside string'})+';</script>';
  assert.equal(koolSnippetURLs(html).prices,pages[0].htmlUrl);
  assert.throws(()=>koolSnippetURLs(html.replace('https://c-p.rmcdn.net/prices','https://example.com/prices')),/host/);
});

test('KOOL deduplicates regional address listings and attaches only unambiguous map points',()=>{
  const rows=parseKoolDirectory('<div data-id="a">*Zvidzāni, Krustpils pag.*Rīga, Street 1</div><div data-id="b">*Zvidzāni, Krustpils pag., Jēkabpils nov.</div>');
  assert.equal(rows.length,2);assert.ok(rows[0].address.includes('Jēkabpils'));
  const kml='<kml><Placemark><name>KOOL Zvidzāni</name><Point><coordinates>25,56,0</coordinates></Point></Placemark></kml>';
  const enriched=addKoolCoordinates(rows,kml);assert.equal(enriched[0].lat,56);assert.equal(enriched[1].lat,undefined);
});

test('Neste includes only Latvian fuel stations, excluding standalone charging and foreign locations',()=>{
  const row={stationNumber:1,stationName:'Neste Test',address:'A 1',municipality:'Rīga',countryCode:'LAT',hasFuels:true,location:{coordinates:[24.1,56.9]}};
  const rows=parseNesteDirectory([row,{...row,stationNumber:2,hasFuels:false},{...row,stationNumber:3,countryCode:'LIT'}]);
  assert.equal(rows.length,1);assert.equal(rows[0].lon,24.1);assert.equal(rows[0].value,undefined);
  assert.throws(()=>parseNesteDirectory([row,row]),/identity/);
});

test('Rietumu regular diesel is distinct from reduced-excise agricultural diesel',()=>{
  const rows=parseRietumu('<p>Uzņēmuma degvielas uzpildes stacijas atrodas Kuldīgā, Ganību ielā 31.</p><span>Dīzeļdegviela</span><span class="price">1.978€/l</span><span>Dīzeļdegviela lauksaimn.prod.ražotājiem</span><span class="price">1.606€/l</span>');
  assert.equal(rows.length,1);assert.equal(rows[0].value,'1.978');assert.equal(rows[0].day,undefined);
});

test('network minima persist separately from real station counts and never populate station quotes',()=>{
  const folder=mkdtempSync(path.join(os.tmpdir(),'network-quotes-')),db=database(folder),now=new Date().toISOString();
  try{
    const data=normalize('kool',parseKoolDirectory('<div data-id="a">*Test 1, Rīga*Test 2, Rīga</div>'),now);
    const network=normalize('kool',parseKoolPrices(prices).map(r=>({...r,id:'network-minimum'})),now)[0];
    const doc={updated_at:now,sources:[{id:'kool',status:'ok'}],data,network_quotes:{kool:network}};
    saveStations(db,doc);saveStations(db,doc);
    const p=widgetData(db,'LV').data.providers[0];assert.equal(p.station_count,2);assert.equal(p.priced_station_count,0);
    assert.equal(p.prices.petrol95.price,1.817);assert.equal(p.prices.petrol95.scope,'network_published_minimum');
    assert.equal(p.prices.petrol95.observed_date,null);assert.equal(p.prices.petrol95.freshness,'recent');assert.equal(p.prices.petrol95.fetched_at,now);
    assert.ok(p.stations.every(s=>Object.values(s.prices).every(q=>q===null)));
    assert.equal(db.prepare('SELECT count(*) n FROM stations').get().n,2);
    assert.equal(db.prepare('SELECT count(*) n FROM station_prices').get().n,2);
  }finally{db.close();rmSync(folder,{recursive:true,force:true});}
});

test('Latvia keeps five largest priced networks visible and retains address-only and smaller networks under More',()=>{
  const folder=mkdtempSync(path.join(os.tmpdir(),'lv-ranking-')),db=database(folder),now=new Date().toISOString();
  try{
    const sources=['circle','virsi','viada','kool','straujupite','neste','rietumu'];
    const data=sources.flatMap((source,index)=>normalize(source,Array.from({length:source==='rietumu'?1:index+2},(_,i)=>({
      country:'LV',brand:source,address:`Street ${i}, City`,directory_id:`${source}-${i}`,
      ...(source==='neste'?{}:{fuel:'diesel',value:1.8,at:now}),
    })),now));
    saveStations(db,{updated_at:now,sources:sources.map(id=>({id,status:'ok'})),data});
    const result=widgetData(db,'LV').data;
    assert.equal(result.providers.length,5);assert.equal(result.ranking,'station_count_desc_priced_top5');
    assert.deepEqual(new Set(result.more_providers.map(p=>p.name)),new Set(['Neste','Rietumu Nafta']));
    assert.ok(result.providers.every(p=>Object.values(p.prices).some(Boolean)));
  }finally{db.close();rmSync(folder,{recursive:true,force:true});}
});
