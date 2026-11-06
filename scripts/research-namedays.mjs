import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import path from 'node:path';
import {setTimeout as pause} from 'node:timers/promises';

// Raw responses stay in ignored local storage. Only structured facts are published.
const directory=path.resolve(process.env.DATA_DIR||'var','namedays-research');
await mkdir(directory,{recursive:true});
let rows;
try{const input=await readFile(new URL('../namedays.txt',import.meta.url),'utf8');rows=input.trim().split(/\r?\n/).slice(1).map(line=>{const[country,day,month,name,id]=line.split('\t');return{country,day:+day,month:+month,name,id};});}
catch(e){if(e.code!=='ENOENT')throw e;const c=JSON.parse(await readFile(new URL('../public/data/namedays/calendar-lv.json',import.meta.url),'utf8'));rows=Object.entries(c.data.days).flatMap(([date,names])=>names.map(n=>({country:c.country,day:Number(date.slice(3)),month:Number(date.slice(0,2)),name:n.name})));}
const names=[...new Set(rows.map(r=>r.name))];
const indexPath=path.join(directory,'index.json');
let index={schema_version:1,entries:{},errors:[]};
try{index=JSON.parse(await readFile(indexPath,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
async function persist(){await writeFile(indexPath+'.tmp',JSON.stringify(index));await rename(indexPath+'.tmp',indexPath);}
async function get(url){for(let attempt=0;attempt<3;attempt++){try{const r=await fetch(url,{headers:{'User-Agent':'BalticWidgets/1.0 (name-day reference research; cached offline)'},signal:AbortSignal.timeout(30000)});if(r.status===429){await pause(Math.min(59000,Math.max(10000,Number(r.headers.get('retry-after')||30)*1000)));throw Error('HTTP 429');}if(!r.ok)throw Error('HTTP '+r.status);const j=await r.json();if(j.error)throw Error(j.error.info);return j;}catch(e){if(attempt===2)throw e;await pause(3000*(attempt+1));}}}
const languageNames={lv:'Latvian',lt:'Lithuanian',ee:'Estonian'};
const codes={fr:'French',de:'German',goh:'Old High German',gmh:'Middle High German',en:'English',la:'Latin',grc:'Ancient Greek',el:'Greek',he:'Hebrew',ru:'Russian',gem:'Germanic languages','gem-pro':'Proto-Germanic',sv:'Swedish',da:'Danish',fi:'Finnish',et:'Estonian',lv:'Latvian',lt:'Lithuanian',pl:'Polish',ar:'Arabic',it:'Italian',es:'Spanish',fa:'Persian',sa:'Sanskrit','non':'Old Norse'};
function facts(text,country,title,revid){
 const parts=text.split(/^==([^=\n]+)==\s*$/m);let section='';
 for(let i=1;i<parts.length;i+=2)if(parts[i]===languageNames[country])section=parts[i+1];
 if(!section)return null;
 const code=country==='ee'?'et':country;
 const definition=[...section.matchAll(/\{\{given name\|([^{}]+)\}\}/g)].find(m=>m[1].split('|')[0]===code);
 if(!definition)return null;
 const etymologies=[...section.matchAll(/^===Etymology(?: \d+)?===\s*([\s\S]*?)(?=\n===|$)/gm)];
 // Do not combine different etymologies under one spelling.
 const etymology=etymologies.length===1?etymologies[0][1]:'';
 const origins=new Set();
 const from=definition[1].match(/(?:^|\|)from=([^|}]+)/)?.[1];
 if(from&&Object.values(codes).includes(from))origins.add(from);
 for(const m of etymology.matchAll(/\{\{(?:bor\+?|borrowed|der|uder|inh)\|([^|{}]+)\|([^|{}]+)\|/g))if(m[1]===code&&codes[m[2]])origins.add(codes[m[2]]);
 const recorded=etymology.match(/First recorded(?:[^.\n]{0,90}?)\b(in (?:the )?\d{1,2}(?:st|nd|rd|th) century|in \d{3,4})\b/i)?.[1]||null;
 const related=[...etymology.matchAll(/\{\{(?:m|cog)\|(?:en|de|lv|lt|et|fr)\|([A-ZÀ-Ž][^|{}\n]{1,30})(?:\||\}\})/g)].map(m=>m[1]);
 const equivalent=definition[1].match(/(?:^|\|)(?:eq|varof|dimof)=([^|{}]+)/)?.[1];
 if(equivalent&&/^[A-ZÀ-Ž][\p{L} -]{1,29}$/u.test(equivalent))related.push(equivalent);
 return{origins:[...origins],first_recorded:recorded,related:[...new Set(related)],source:{url:'https://en.wiktionary.org/wiki/'+encodeURIComponent(title)+'#'+languageNames[country],revision:revid,license:'CC BY-SA 4.0',type:'dictionary'},checked_at:new Date().toISOString()};
}
try{
 const file=path.join(directory,'vlkk.json');let records;
 try{records=JSON.parse(await readFile(file,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;const url='https://get.data.gov.lt/datasets/gov/vlkk/vardai/Vardas?limit(100000)&select(pilnas_vardas,kilmes_grupe_1,kilmes_pogrupis_1,kilmes_poskyris_1)';const j=await get(url);records=j._data;if(!Array.isArray(records))throw Error('Invalid VLKK response');await writeFile(file,JSON.stringify(records));}
 index.vlkk=Object.fromEntries(records.filter(r=>rows.some(n=>n.country==='lt'&&n.name===r.pilnas_vardas)).map(r=>[r.pilnas_vardas,{group:r.kilmes_grupe_1,subgroup:r.kilmes_pogrupis_1,section:r.kilmes_poskyris_1,source:{url:'https://data.gov.lt/datasets/2664/',type:'official_registry',provider:'VLKK'}}]));
 console.log('VLKK matches:',Object.keys(index.vlkk).length);await persist();
}catch(e){index.errors.push({source:'VLKK',message:e.message});console.error('VLKK:',e.message);}
const pending=names.filter(name=>!index.entries[name]);
for(let offset=0;offset<pending.length;offset+=40){
 const batch=pending.slice(offset,offset+40);
 try{
  const url=new URL('https://en.wiktionary.org/w/api.php');
  Object.entries({action:'query',format:'json',prop:'revisions',rvprop:'ids|content',rvslots:'main',titles:batch.join('|'),maxlag:'5'}).forEach(([k,v])=>url.searchParams.set(k,v));
  const j=await get(url),pages=Object.values(j.query?.pages||{});
  if(!pages.length)throw Error('No dictionary response pages');
  const normalized=new Map((j.query.normalized||[]).map(n=>[n.from,n.to]));
  for(const name of batch){const page=pages.find(p=>p.title===(normalized.get(name)||name));if(!page)throw Error('Missing query result for '+name);const w=page.revisions?.[0]?.slots.main['*']||'';
   index.entries[name]={status:page.missing!==undefined?'not_found':'checked',countries:Object.fromEntries(['lv','lt','ee'].map(country=>[country,facts(w,country,page.title,page.revisions?.[0]?.revid)]).filter(([,v])=>v)),checked_at:new Date().toISOString()};
  }
  await persist();
 }catch(e){index.errors.push({names:batch,message:e.message});console.error('Batch:',offset,e.message);await persist();}
 if(offset%400===0||offset+40>=pending.length)console.log('Dictionary checked:',Object.keys(index.entries).length,'/',names.length);
 await pause(3500);
}
index.finished_at=new Date().toISOString();await persist();console.log('Research complete',JSON.stringify({names:names.length,checked:Object.keys(index.entries).length,with_facts:Object.values(index.entries).filter(e=>Object.keys(e.countries).length).length,errors:index.errors.length}));
