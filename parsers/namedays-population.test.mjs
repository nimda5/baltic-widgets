import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {populationFromCSV} from './namedays-population.mjs';
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
