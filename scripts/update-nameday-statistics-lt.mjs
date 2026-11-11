// Lithuanian name bearer counts from the Registrų centras open datasets on data.gov.lt:
// "Populiariausi vyrų / moterų vardai Lietuvoje nuo 1900 metų, TOP 50". Only the 50 most common
// men's and 50 most common women's names are published, as people born since 1900 in the population
// register. Other LT calendar names have no official public count and are omitted (never shown as zero).
import {readFile,mkdir,writeFile,rename} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {populationKey,validatePopulation} from '../public/namedays-population.js';
const root=fileURLToPath(new URL('../',import.meta.url));
const API='https://get.data.gov.lt/datasets/gov/rc/gr/';
const MODELS=[{model:'vyru_vardai/VyroVardas',sex:'male'},{model:'moteru_vardai/MotersVardas',sex:'female'}];
async function read(file){try{return JSON.parse(await readFile(file,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;return null;}}
async function save(file,doc){await mkdir(path.dirname(file),{recursive:true});const tmp=file+'.'+crypto.randomUUID()+'.tmp';await writeFile(tmp,JSON.stringify(doc));await rename(tmp,file);}
async function getJSON(url,fetchImpl){const r=await fetchImpl(url,{signal:AbortSignal.timeout(60000),headers:{'User-Agent':'BalticWidgets/1.0 (monthly public name statistics)'}});if(!r.ok)throw Error('data.gov.lt HTTP '+r.status);return r.json();}
// Parses one TOP 50 table; rejects anything that is not a complete, ranked list of positive counts.
export function lithuanianTopNames(rows){
 if(!Array.isArray(rows)||rows.length!==50)throw Error('Incomplete Registrų centras TOP 50 list');
 const ranks=new Set(),out=[];
 for(const row of rows){
  if(!Number.isSafeInteger(row.nr)||row.nr<1||row.nr>50||ranks.has(row.nr)||typeof row.vardas!=='string'||!row.vardas.trim()||!Number.isSafeInteger(row.viso_vardas)||row.viso_vardas<1)throw Error('Invalid Registrų centras TOP 50 row');
  ranks.add(row.nr);out.push({rank:row.nr,key:populationKey(row.vardas),count:row.viso_vardas});
 }
 return out.sort((a,b)=>a.rank-b.rank);
}
export async function refreshLithuanianNameStatistics({force=false,now=new Date(),projectRoot=root,fetchImpl=fetch}={}){
 const dest=path.join(projectRoot,'data/namedays/population-lt.json'),publicDest=path.join(projectRoot,'public/data/namedays/population-lt.json');
 const previous=await read(dest),month=now.toISOString().slice(0,7);
 if(previous){validatePopulation(previous,'lt');if(!force&&previous.checked_at?.slice(0,7)===month){await save(publicDest,previous);return{status:'current',country:'lt',as_of:previous.as_of,names:Object.keys(previous.data).length};}}
 const calendar=await read(path.join(projectRoot,'public/data/namedays/calendar-lt.json'));
 if(calendar?.country!=='lt')throw Error('Missing Lithuanian calendar');
 const wanted=new Set(Object.values(calendar.data.days).flat().map(n=>populationKey(n.name)));
 const counts=new Map();let as_of='';
 for(const {model} of MODELS){
  const rows=lithuanianTopNames((await getJSON(API+model+'?select(nr,vardas,viso_vardas)&limit(100)',fetchImpl))._data);
  // The publication date is the latest change recorded by the open-data portal for this table.
  const changes=(await getJSON(API+model+'/:changes?limit(100000)',fetchImpl))._data||[];
  const updated=changes.map(c=>String(c._created||'').slice(0,10)).filter(d=>/^\d{4}-\d{2}-\d{2}$/.test(d)).sort().pop();
  if(!updated)throw Error('Missing Registrų centras publication date');
  if(updated>as_of)as_of=updated;
  for(const row of rows)if(wanted.has(row.key))counts.set(row.key,(counts.get(row.key)||0)+row.count);
 }
 if(previous&&as_of<previous.as_of)throw Error('Registrų centras data older than saved data');
 if(counts.size<20)throw Error('Unexpectedly few LT calendar names in the TOP 50 lists');
 const doc=validatePopulation({schema_version:1,country:'lt',metric:'top50_born_since_1900',as_of,checked_at:now.toISOString(),source:{provider:'Registrų centras',url:'https://data.gov.lt/',datasets:MODELS.map(m=>API+m.model),basis:'Population register, people born since 1900; 50 most common men\'s and 50 most common women\'s names only'},data:Object.fromEntries([...counts].sort(([a],[b])=>a.localeCompare(b,'lt')))},'lt');
 await save(dest,doc);await save(publicDest,doc);
 return{status:'updated',country:'lt',as_of,names:counts.size};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(JSON.stringify(await refreshLithuanianNameStatistics({force:process.argv.includes('--force')}),null,2));
