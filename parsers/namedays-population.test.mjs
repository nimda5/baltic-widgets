import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {populationFromCSV,estonianNameCount} from './namedays-population.mjs';
import {refreshEstonianNameStatistics,estonianNameUrl} from '../scripts/update-nameday-statistics-ee.mjs';
import {refreshLithuanianNameStatistics,lithuanianTopNames} from '../scripts/update-nameday-statistics-lt.mjs';
import {populationCopy,validatePopulation} from '../public/namedays-population.js';
import {refreshNamedayStatistics} from '../scripts/update-nameday-statistics.mjs';
const meta={as_of:'2026-07-01',checked_at:'2026-11-08T00:00:00Z'};
test('population counts exact diacritics and components, without double-counting repeated names',()=>{
 const doc=populationFromCSV('Vardi,Skaits\r\n"JĀNIS",10\r\n"JANIS",3\r\n"JĀNIS JURIS",2\r\n"JĀNIS JĀNIS",1\r\n"JĀNIS-JURIS",4\r\n',['Jānis','Janis','Juris','Jānis-Juris'],meta);
 assert.deepEqual(doc.data,{'JANIS':3,'JĀNIS':13,'JĀNIS-JURIS':4,'JURIS':2});
 assert.equal(populationCopy(doc,'Jānis','lv','ru').count,13);
 assert.equal(populationCopy(doc,'Janis','lv','ru').count,3);
 assert.equal(populationCopy(doc,'Jānis','ee','ru'),null);
 assert.equal(populationCopy(doc,'Unknown','lv','ru'),null);
 for(const lang of ['lv','ru','en','lt','et'])assert.match(populationCopy(doc,'Jānis','lv',lang).title,/13/);
});
test('malformed snapshots are rejected rather than published as zeros',()=>{
 for(const csv of ['Other,Skaits\n"ANNA",3','Vardi,Skaits\n"ANNA",-1','Vardi,Skaits\n"ANNA",0','Vardi,Skaits'])assert.throws(()=>populationFromCSV(csv,['Anna'],meta));
 assert.throws(()=>validatePopulation({schema_version:1,country:'ee',metric:'registered_name_component',as_of:meta.as_of,data:{ANNA:1}},'lv'));
});
test('common updates skip already checked months and keep the last snapshot on source failure',async()=>{
 const root=await mkdtemp(path.join(tmpdir(),'nameday-population-')),file=path.join(root,'data/namedays/population-lv.json');
 const doc=populationFromCSV('Vardi,Skaits\n"ANNA",10',['Anna'],meta),originalFetch=globalThis.fetch;let requests=0;
 try{await mkdir(path.dirname(file),{recursive:true});await writeFile(file,JSON.stringify(doc));globalThis.fetch=async()=>{requests++;throw Error('Unavailable');};
  assert.equal((await refreshNamedayStatistics({projectRoot:root,now:new Date('2026-11-25')})).status,'current');assert.equal(requests,0);
  await assert.rejects(refreshNamedayStatistics({projectRoot:root,now:new Date('2026-12-01')}),/Unavailable/);assert.equal(requests,1);
  assert.deepEqual(JSON.parse(await readFile(file,'utf8')),doc);
 }finally{globalThis.fetch=originalFetch;await rm(root,{recursive:true,force:true});}
});

const eePage=(sentence)=>'<html><body><h2>Eesnime statistika</h2><p>'+sentence+'</p></body></html>';
test('Statistics Estonia pages yield exact counts for both sexes and omit suppressed names',()=>{
 assert.deepEqual(estonianNameCount(eePage('2026. aasta 1. jaanuari seisuga on eesnimi Tiina 5213 naisel. Tiina on populaarsuselt 13. naisenimi.')),{as_of:'2026-01-01',count:5213,suppressed:false});
 assert.equal(estonianNameCount(eePage('2026. aasta 1. jaanuari seisuga on eesnimi Kris 255 mehel ja 35 naisel.')).count,290);
 assert.equal(estonianNameCount(eePage('2026. aasta 1. jaanuari seisuga on eesnimi Aarne 659 mehel ja alla viiel naisel. Aarne on populaarsuselt 239.')).count,659);
 assert.equal(estonianNameCount(eePage('Selle nimega inimesi on vähem kui 5 ja seetõttu ei saa selle nime kohta statistikat kuvada.')).suppressed,true);
 assert.throws(()=>estonianNameCount(eePage('Hooldustööd')));
 assert.deepEqual(estonianNameCount(eePage('2026. aasta 1. jaanuari seisuga on eesnimi Aldi alla viiel mehel ja alla viiel naisel. Aldi on populaarsuselt 5454.')),{as_of:'2026-01-01',count:0,suppressed:true,range:[5,8]});
 assert.equal(estonianNameUrl('Ülle'),'https://stat.ee/nimed/%C3%9CLLE');
 const doc=validatePopulation({schema_version:1,country:'ee',metric:'exact_first_name',as_of:'2026-01-01',data:{'TIINA':5213}},'ee');
 for(const lang of ['lv','ru','en','lt','et'])assert.match(populationCopy(doc,'Tiina','ee',lang).title,/5[\s  .,]?213/);
 assert.equal(populationCopy(doc,'Tiina','lv','en'),null);
});
test('Estonian collector reads every calendar name once, then only probes an unchanged snapshot',async()=>{
 const root=await mkdtemp(path.join(tmpdir(),'nameday-ee-'));
 const pages={TIINA:'2026. aasta 1. jaanuari seisuga on eesnimi Tiina 5213 naisel.',MAI:'2026. aasta 1. jaanuari seisuga on eesnimi Mai 900 naisel.',HUKO:'vähem kui 5 ja seetõttu ei saa selle nime kohta statistikat kuvada.'};
 for(let i=0;i<120;i++)pages['N'+i]='2026. aasta 1. jaanuari seisuga on eesnimi N'+i+' '+(10+i)+' mehel.';
 const names=Object.keys(pages).map(n=>({key:'ee:'+n,name:n[0]+n.slice(1).toLowerCase()}));
 let requests=0;const fetchImpl=async url=>{requests++;const name=decodeURIComponent(url.split('/').pop());return new Response(eePage(pages[name]||'vähem kui 5 ja seetõttu ei saa selle nime kohta statistikat kuvada.'));};
 try{
  await mkdir(path.join(root,'public/data/namedays'),{recursive:true});
  await writeFile(path.join(root,'public/data/namedays/calendar-ee.json'),JSON.stringify({country:'ee',data:{days:{'01-01':names}}}));
  const first=await refreshEstonianNameStatistics({projectRoot:root,now:new Date('2026-11-12'),fetchImpl,delayMs:0});
  assert.equal(first.status,'updated');assert.equal(requests,1+names.length);
  const doc=JSON.parse(await readFile(path.join(root,'public/data/namedays/population-ee.json'),'utf8'));
  assert.equal(doc.data.TIINA,5213);assert.equal(doc.data.HUKO,undefined);assert.equal(doc.metric,'exact_first_name');
  assert.deepEqual(doc.below_threshold,['HUKO']);assert.equal(populationCopy(doc,'Huko','ee','ru').title,'Эстония · меньше 5 носителей');assert.equal(populationCopy(doc,'Huko','ee','en').below,5);
  requests=0;assert.equal((await refreshEstonianNameStatistics({projectRoot:root,now:new Date('2026-11-20'),fetchImpl,delayMs:0})).status,'current');assert.equal(requests,0);
  assert.equal((await refreshEstonianNameStatistics({projectRoot:root,now:new Date('2026-12-02'),fetchImpl,delayMs:0})).status,'unchanged');assert.equal(requests,1);
 }finally{await rm(root,{recursive:true,force:true});}
});

test('suppressed Estonian names show the published bound or range, never a zero',()=>{
 const doc=validatePopulation({schema_version:1,country:'ee',metric:'exact_first_name',as_of:'2026-01-01',suppressed_below:5,below_threshold:['HUKO'],ranges:{ALDI:[5,8]},data:{TIINA:5213}},'ee');
 assert.match(populationCopy(doc,'Aldi','ee','en').title,/5–8 name bearers/);
 for(const lang of ['lv','ru','en','lt','et']){const c=populationCopy(doc,'Huko','ee',lang);assert.match(c.title,/5/);assert.doesNotMatch(c.title,/0/);assert.equal(c.count,null);}
 assert.equal(populationCopy(doc,'Unknown','ee','en'),null);
 assert.throws(()=>validatePopulation({...doc,below_threshold:['TIINA']},'ee'));
 assert.throws(()=>validatePopulation({...doc,ranges:{ALDI:[8,5]}},'ee'));
});

test('Lithuanian TOP 50 lists map to calendar names and say they count people born since 1900',async()=>{
 const row=(nr,vardas,viso_vardas)=>({nr,vardas,viso_vardas});
 const men=[row(1,'JONAS',127263),row(2,'IVAN',35054),...Array.from({length:48},(_,i)=>row(i+3,'VYRAS'+i,1000-i))];
 const women=[row(1,'ONA',102245),...Array.from({length:49},(_,i)=>row(i+2,'MOTERIS'+i,900-i))];
 assert.throws(()=>lithuanianTopNames(men.slice(1)));assert.throws(()=>lithuanianTopNames([...men.slice(1),row(2,'X',5)]));
 const root=await mkdtemp(path.join(tmpdir(),'nameday-lt-'));
 const names=['Jonas','Ona',...Array.from({length:30},(_,i)=>'Vyras'+i)].map(name=>({key:'lt:'+name,name}));
 let requests=0;const fetchImpl=async url=>{requests++;const body=url.includes(':changes')?{_data:[{_created:'2023-06-16T03:58:30'},{_created:url.includes('vyru')?'2025-09-05T10:00:00':'2025-04-24T10:00:00'}]}:{_data:url.includes('vyru')?men:women};return new Response(JSON.stringify(body));};
 try{
  await mkdir(path.join(root,'public/data/namedays'),{recursive:true});
  await writeFile(path.join(root,'public/data/namedays/calendar-lt.json'),JSON.stringify({country:'lt',data:{days:{'06-24':names}}}));
  assert.equal((await refreshLithuanianNameStatistics({projectRoot:root,now:new Date('2026-11-12'),fetchImpl})).status,'updated');assert.equal(requests,4);
  const doc=JSON.parse(await readFile(path.join(root,'public/data/namedays/population-lt.json'),'utf8'));
  assert.equal(doc.as_of,'2025-09-05');assert.equal(doc.data.JONAS,127263);assert.equal(doc.data.ONA,102245);assert.equal(doc.data.IVAN,undefined);
  assert.equal(populationCopy(doc,'Jonas','lt','ru').title,'Литва · ≈ 127 263 носителей, родившихся с 1900 года');
  for(const lang of ['lv','ru','en','lt','et'])assert.match(populationCopy(doc,'Ona','lt',lang).title,/1900/);
  assert.equal(populationCopy(doc,'Traidenis','lt','en'),null);assert.equal(populationCopy(doc,'Jonas','lv','en'),null);
  requests=0;assert.equal((await refreshLithuanianNameStatistics({projectRoot:root,now:new Date('2026-11-20'),fetchImpl})).status,'current');assert.equal(requests,0);
 }finally{await rm(root,{recursive:true,force:true});}
});
