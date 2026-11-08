import {readFile,mkdir,writeFile,rename} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {populationFromCSV} from '../parsers/namedays-population.mjs';
import {validatePopulation} from '../public/namedays-population.js';
const root=fileURLToPath(new URL('../',import.meta.url)),source='https://data.gov.lv/dati/dataset/personu-vardi';
async function read(file){try{return JSON.parse(await readFile(file,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;return null;}}
async function save(file,doc){await mkdir(path.dirname(file),{recursive:true});const tmp=file+'.'+crypto.randomUUID()+'.tmp';await writeFile(tmp,JSON.stringify(doc));await rename(tmp,file);}
async function request(url){const r=await fetch(url,{signal:AbortSignal.timeout(45000),headers:{'User-Agent':'BalticWidgets/1.0 (monthly public name statistics)'}});if(!r.ok)throw Error('PMLP HTTP '+r.status);return r;}
export async function refreshNamedayStatistics({force=false,now=new Date(),projectRoot=root}={}){
 const dest=path.join(projectRoot,'data/namedays/population-lv.json'),previous=await read(dest),month=now.toISOString().slice(0,7);
 if(previous){validatePopulation(previous,'lv');if(!force&&previous.checked_at?.slice(0,7)===month){await save(path.join(projectRoot,'public/data/namedays/population-lv.json'),previous);return{status:'current',country:'lv',as_of:previous.as_of,names:Object.keys(previous.data).length};}}
 const packageDoc=await(await request('https://data.gov.lv/dati/api/3/action/package_show?id=personu-vardi')).json();
 if(!packageDoc.success)throw Error('PMLP dataset unavailable');
 const resource=packageDoc.result.resources.filter(r=>/^Vardi-\d{8}\.csv$/i.test(r.name)).sort((a,b)=>b.name.localeCompare(a.name))[0];
 if(!resource||new URL(resource.url).hostname!=='data.gov.lv')throw Error('Missing official PMLP resource');
 const stamp=resource.name.match(/(\d{4})(\d{2})(\d{2})/),as_of=stamp.slice(1).join('-');
 if(previous&&as_of<previous.as_of)throw Error('PMLP snapshot older than saved data');
 const calendar=await read(path.join(projectRoot,'public/data/namedays/calendar-lv.json'));
 if(calendar?.country!=='lv')throw Error('Missing Latvian calendar');
 const names=Object.values(calendar.data.days).flat().map(n=>n.name),csv=await(await request(resource.url)).text();
 const doc=populationFromCSV(csv,names,{as_of,checked_at:now.toISOString(),source:{provider:'PMLP',url:source,download_url:resource.url,license:'CC0-1.0'}});
 if(doc.source_rows<1000||Object.keys(doc.data).length<100)throw Error('Incomplete PMLP snapshot');
 if(previous&&doc.source_rows<previous.source_rows*0.8)throw Error('Unexpectedly incomplete PMLP snapshot');
 // Publish only after the complete replacement has passed validation.
 await save(dest,doc);await save(path.join(projectRoot,'public/data/namedays/population-lv.json'),doc);
 return{status:'updated',country:'lv',as_of,names:Object.keys(doc.data).length};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(JSON.stringify(await refreshNamedayStatistics({force:process.argv.includes('--force')}),null,2));
