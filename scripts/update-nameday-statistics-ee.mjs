// Estonian name bearer counts from Statistics Estonia's name application (https://stat.ee/nimed/).
// The application publishes one page per first name, refreshed once a year from the population
// register. Counts are exact complete first names; names held by fewer than five people are
// suppressed by the source and omitted here. A monthly check reads one page to see whether a new
// annual snapshot exists, and only then re-reads every EE calendar name, politely paced and resumable.
import {readFile,mkdir,writeFile,rename} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {estonianNameCount} from '../parsers/namedays-population.mjs';
import {populationKey,validatePopulation} from '../public/namedays-population.js';
const root=fileURLToPath(new URL('../',import.meta.url));
const SOURCE='https://stat.ee/nimed/',PROBE='TIINA';
async function read(file){try{return JSON.parse(await readFile(file,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;return null;}}
async function save(file,doc){await mkdir(path.dirname(file),{recursive:true});const tmp=file+'.'+crypto.randomUUID()+'.tmp';await writeFile(tmp,JSON.stringify(doc));await rename(tmp,file);}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
export function estonianNameUrl(name){return SOURCE+encodeURIComponent(name.normalize('NFC').trim().toLocaleUpperCase('et'));}
async function fetchCount(name,{fetchImpl=fetch,attempts=4}={}){
 for(let attempt=1;;attempt++){
  try{
   const r=await fetchImpl(estonianNameUrl(name),{signal:AbortSignal.timeout(30000),headers:{'User-Agent':'BalticWidgets/1.0 (annual public name statistics)'}});
   if(r.status===429||r.status>=500)throw Object.assign(Error('Statistics Estonia HTTP '+r.status),{retry:true});
   if(!r.ok)throw Error('Statistics Estonia HTTP '+r.status);
   return estonianNameCount(await r.text());
  }catch(e){if(attempt>=attempts||e.retry===false)throw e;await sleep(2000*attempt*attempt);}
 }
}
export async function refreshEstonianNameStatistics({force=false,now=new Date(),projectRoot=root,fetchImpl=fetch,delayMs=700,log=()=>{}}={}){
 const dest=path.join(projectRoot,'data/namedays/population-ee.json'),publicDest=path.join(projectRoot,'public/data/namedays/population-ee.json');
 const progressFile=path.join(projectRoot,'var/namedays-statistics/ee-progress.json');
 const previous=await read(dest),month=now.toISOString().slice(0,7);
 if(previous){validatePopulation(previous,'ee');if(!force&&previous.checked_at?.slice(0,7)===month){await save(publicDest,previous);return{status:'current',country:'ee',as_of:previous.as_of,names:Object.keys(previous.data).length};}}
 const probe=await fetchCount(PROBE,{fetchImpl});
 if(!probe.as_of)throw Error('Statistics Estonia probe name unexpectedly suppressed');
 if(previous&&probe.as_of<previous.as_of)throw Error('Statistics Estonia snapshot older than saved data');
 if(previous&&!force&&probe.as_of===previous.as_of){const doc={...previous,checked_at:now.toISOString()};await save(dest,doc);await save(publicDest,doc);return{status:'unchanged',country:'ee',as_of:doc.as_of,names:Object.keys(doc.data).length};}
 const calendar=await read(path.join(projectRoot,'public/data/namedays/calendar-ee.json'));
 if(calendar?.country!=='ee')throw Error('Missing Estonian calendar');
 const names=[...new Set(Object.values(calendar.data.days).flat().map(n=>populationKey(n.name)))].sort((a,b)=>a.localeCompare(b,'et'));
 // Resume an interrupted crawl of the same snapshot instead of repeating finished requests.
 let progress=await read(progressFile);
 if(progress?.as_of!==probe.as_of)progress={as_of:probe.as_of,results:{}};
 let fetched=0;
 for(const name of names){
  // Older progress files stored every suppressed page as 0; re-read those to tell “< 5” from “5–8”.
  if(name in progress.results&&progress.results[name]!==0)continue;
  const result=await fetchCount(name,{fetchImpl});
  if(result.as_of&&result.as_of!==probe.as_of)throw Error('Statistics Estonia snapshot changed during the crawl');
  progress.results[name]=result.range?{range:result.range}:result.below?'below':result.count;fetched++;
  if(fetched%25===0){await save(progressFile,progress);log(fetched+' / '+names.length);}
  if(delayMs)await sleep(delayMs);
 }
 await save(progressFile,progress);
 const entries=Object.entries(progress.results).sort(([a],[b])=>a.localeCompare(b,'et'));
 const data=Object.fromEntries(entries.filter(([,n])=>Number.isSafeInteger(n)&&n>0));
 const ranges=Object.fromEntries(entries.filter(([,n])=>n?.range).map(([k,n])=>[k,n.range]));
 const below_threshold=entries.filter(([,n])=>n==='below').map(([k])=>k);
 const doc=validatePopulation({schema_version:1,country:'ee',metric:'exact_first_name',as_of:probe.as_of,checked_at:now.toISOString(),source:{provider:'Statistics Estonia',url:SOURCE,basis:'Population register',license:'Statistics Estonia terms of use; attribution required'},calendar_names:names.length,suppressed_below:5,below_threshold,ranges,data},'ee');
 if(Object.keys(data).length<100)throw Error('Incomplete Statistics Estonia snapshot');
 if(previous&&Object.keys(data).length<Object.keys(previous.data).length*0.8)throw Error('Unexpectedly incomplete Statistics Estonia snapshot');
 await save(dest,doc);await save(publicDest,doc);
 return{status:'updated',country:'ee',as_of:doc.as_of,names:Object.keys(data).length,suppressed:names.length-Object.keys(data).length};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(JSON.stringify(await refreshEstonianNameStatistics({force:process.argv.includes('--force'),log:m=>console.error(m)}),null,2));
