import {readFile,mkdir,writeFile,rename,unlink,stat,cp} from 'node:fs/promises';
import {parseCalendar,buildProfile,namesakeIndex,evidenceIndex} from '../parsers/namedays.mjs';
import {validateCountryCalendar} from '../public/namedays-core.js';
import {WRITER_VERSION} from '../public/namedays-content.js';
const project=new URL('../',import.meta.url),target=new URL('public/data/namedays/',project);
await mkdir(target,{recursive:true});
let calendar;
try{calendar=parseCalendar(await readFile(new URL('namedays.txt',project),'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;const c=validateCountryCalendar(JSON.parse(await readFile(new URL('calendar-lv.json',target),'utf8')));calendar={...c,data:{...c.data,source_rows_by_country:{lv:c.data.source_rows},calendars:{lv:c.data.days}}};}
async function json(file,fallback){try{return JSON.parse(await readFile(file,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;return fallback;}}
const researchDir=new URL('var/namedays-research/',project);
const research=await json(new URL('index.json',researchDir),{});
const entities=await json(new URL('people-entities.json',researchDir),{});
const localRows=(await json(new URL('people-wikidata.json',researchDir),{})).results?.bindings||[];
for(const row of localRows){const id=row.person.value.split('/').pop();entities[id]||={id,labels:{en:{value:row.personLabel.value}},descriptions:{en:{value:row.personDescription?.value||''}}};}
const people=namesakeIndex(entities,localRows);
const documents=[],report={writer_version:WRITER_VERSION,enabled_countries:['lv'],source_rows:calendar.data.source_rows_by_country.lv,countries:{}};
for(const country of ['lv']){
 const previous=(await json(new URL('profiles-'+country+'.json',target),{})).data||{};
 const evidence=evidenceIndex(research,Object.values(previous));
 const entries=[...new Map(Object.values(calendar.data.calendars[country]).flat().map(n=>[n.key,n])).values()];
 const profiles=Object.fromEntries(entries.map(({key,name})=>[key,buildProfile(name,country,research,people,previous[key],evidence)]));
 const countryCalendar={schema_version:1,country,writer_version:WRITER_VERSION,updated_at:new Date().toISOString(),source:calendar.source,data:{timezone:'Europe/Riga',source_rows:calendar.data.source_rows_by_country[country],days:calendar.data.calendars[country]}};
 validateCountryCalendar(countryCalendar);documents.push([new URL('calendar-'+country+'.json',target),countryCalendar]);
 documents.push([new URL('profiles-'+country+'.json',target),{schema_version:1,country,writer_version:WRITER_VERSION,updated_at:new Date().toISOString(),source:'Reviewed references; exact national-language Wiktionary entries; Wikidata and Wikipedia biographies',data:profiles}]);
 report.countries[country]={profiles:entries.length,documented:Object.values(profiles).filter(p=>p.family||p.facts.origins.length||p.facts.first_recorded||p.facts.registry_kind||p.facts.related.length).length,with_namesakes:Object.values(profiles).filter(p=>p.people.length).length,research_pending:Object.values(profiles).filter(p=>p.research_status==='pending').length};
}
// Validate every document before publishing any of them; atomic replacement per file.
for(const [file,value] of documents){
 const temp=new URL(file.href+'.'+crypto.randomUUID()+'.tmp');
 try{await writeFile(temp,JSON.stringify(value));await rename(temp,file);}finally{await unlink(temp).catch(e=>{if(e.code!=='ENOENT')throw e;});}
}
await writeFile(new URL('coverage.json',target),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
try{if((await stat(new URL('data/',project))).isDirectory())await cp(target,new URL('data/namedays/',project),{recursive:true});}catch(e){if(e.code!=='ENOENT')throw e;}
