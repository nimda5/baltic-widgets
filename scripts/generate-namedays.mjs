import {readFile,mkdir,writeFile,rename,unlink,stat,cp} from 'node:fs/promises';
import {parseCalendar,buildProfile,namesakeIndex,evidenceIndex,correctCalendarName} from '../parsers/namedays.mjs';
import {validateCountryCalendar} from '../public/namedays-core.js';
import {WRITER_VERSION,describeName,LANGUAGES} from '../public/namedays-content.js';
const project=new URL('../',import.meta.url),target=new URL('public/data/namedays/',project);
const allCountries=['lv','lt','ee'];
const countryArg=process.argv.find(arg=>arg.startsWith('--country='))?.slice(10);
if(countryArg&&!allCountries.includes(countryArg))throw Error('Invalid --country; expected lv, lt or ee');
const selectedCountries=countryArg?[countryArg]:allCountries;
await mkdir(target,{recursive:true});
let calendar;
try{calendar=parseCalendar(await readFile(new URL('namedays.txt',project),'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;const c=validateCountryCalendar(JSON.parse(await readFile(new URL('calendar-lv.json',target),'utf8')));calendar={...c,data:{...c.data,source_rows_by_country:{lv:c.data.source_rows},calendars:{lv:c.data.days}}};}
async function json(file,fallback){try{return JSON.parse(await readFile(file,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;return fallback;}}
const researchDir=new URL('var/namedays-research/',project);
const research=await json(new URL('index.json',researchDir),{});
research.book=await json(new URL('book-equivalences.json',researchDir),{});
research.catalog=await json(new URL('catalog-origins.json',researchDir),{});
// Match the full official registry, including shared spellings outside the LT calendar.
for(const record of await json(new URL('vlkk.json',researchDir),[]))if(record.kilmes_pogrupis_1){research.vlkk||={};research.vlkk[record.pilnas_vardas]={subgroup:record.kilmes_pogrupis_1,source:{url:'https://data.gov.lt/datasets/2664/',type:'official_registry',provider:'VLKK'}};}
const entities=await json(new URL('people-entities.json',researchDir),{});
const localRows=(await json(new URL('people-wikidata.json',researchDir),{})).results?.bindings||[];
for(const row of localRows){const id=row.person.value.split('/').pop();entities[id]||={id,labels:{en:{value:row.personLabel.value}},descriptions:{en:{value:row.personDescription?.value||''}}};}
for(const country of ['lt','ee']){
 const raw=await json(new URL('calendar-'+country+'.json',target),null);
 // Older published LT/EE calendars contained stray spaces and a few reviewed misspellings; normalize before validating.
 if(raw?.data?.days)for(const [day,names] of Object.entries(raw.data.days)){const seen=new Set();raw.data.days[day]=names.map(n=>{const name=correctCalendarName(country,n.name);return{key:country+':'+name,name};}).filter(n=>!seen.has(n.key)&&seen.add(n.key));}
 const doc=validateCountryCalendar(raw);
 calendar.data.calendars[country]=doc.data.days;calendar.data.source_rows_by_country[country]=doc.data.source_rows;
}
const people=namesakeIndex(entities,localRows);
const documents=[],priorReport=await json(new URL('coverage.json',target),{}),report={writer_version:WRITER_VERSION,enabled_countries:allCountries,source_rows:Object.values(calendar.data.source_rows_by_country).reduce((a,b)=>a+b,0),countries:countryArg?{...priorReport.countries}:{}};
const baselines=Object.fromEntries(await Promise.all(allCountries.map(async country=>[country,(await json(new URL('profiles-'+country+'.json',target),{})).data||{}])));
for(const country of selectedCountries){
 const baseline=process.argv.find(arg=>arg.startsWith('--baseline='))?.slice(11);
 const previous=(baseline?JSON.parse(await readFile(baseline,'utf8')):await json(new URL('profiles-'+country+'.json',target),{})).data||{};
 const evidence=evidenceIndex(research,Object.values(baselines).flatMap(Object.values));
 const entries=[...new Map(Object.values(calendar.data.calendars[country]).flat().map(n=>[n.key,n])).values()];
 const profiles=Object.fromEntries(entries.map(({key,name})=>[key,buildProfile(name,country,research,people,previous[key],evidence)]));
 for(const profile of Object.values(profiles))profile.facts.calendar_dates=Object.entries(calendar.data.calendars[country]).filter(([,names])=>names.some(n=>n.key===profile.key)).map(([date])=>date);
 const countryCalendar={schema_version:1,country,writer_version:WRITER_VERSION,updated_at:new Date().toISOString(),source:calendar.source,data:{timezone:'Europe/Riga',source_rows:calendar.data.source_rows_by_country[country],days:calendar.data.calendars[country]}};
 validateCountryCalendar(countryCalendar);documents.push([new URL('calendar-'+country+'.json',target),countryCalendar]);
 documents.push([new URL('profiles-'+country+'.json',target),{schema_version:1,country,writer_version:WRITER_VERSION,updated_at:new Date().toISOString(),source:'Reviewed references; exact national-language Wiktionary entries; Wikidata and Wikipedia biographies',data:profiles}]);
 report.countries[country]={profiles:entries.length,documented:Object.values(profiles).filter(p=>p.family||p.facts.origins.length||p.facts.first_recorded||p.facts.registry_kind||p.facts.related.length||p.facts.possible_related.length||p.facts.etymons.length||p.facts.archival_variants?.length).length,with_namesakes:Object.values(profiles).filter(p=>p.people.length).length,with_attestation:Object.values(profiles).filter(p=>p.facts.first_recorded).length,with_word_meanings:Object.values(profiles).filter(p=>p.facts.root_key||p.facts.etymons.length).length,research_pending:Object.values(profiles).filter(p=>p.research_status==='pending').length};
 const copies=Object.values(profiles).map(p=>describeName(p,'en',0,profiles));
 report.countries[country].editorial={reviewed_narratives:copies.filter(c=>c.reviewed_narrative).length,factual_summaries:copies.filter(c=>!c.reviewed_narrative&&!c.calendar_only&&c.history.length).length,attestation_only:copies.filter(c=>c.calendar_only&&c.attestation).length,needs_research:copies.filter(c=>c.kind==='unresearched').length,fictional_stories:copies.filter(c=>c.story).length,translated_languages:LANGUAGES};
 report.countries[country].editorial.with_related_context=copies.filter(c=>c.related_context.length).length;
 report.countries[country].editorial.with_calendar_entry=Object.values(profiles).filter(p=>p.facts.calendar_entry).length;
}
// Validate every document before publishing any of them; atomic replacement per file.
for(const [file,value] of documents){
 const temp=new URL(file.href+'.'+crypto.randomUUID()+'.tmp');
 try{await writeFile(temp,JSON.stringify(value));await rename(temp,file);}finally{await unlink(temp).catch(e=>{if(e.code!=='ENOENT')throw e;});}
}
await writeFile(new URL('coverage.json',target),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
try{if((await stat(new URL('data/',project))).isDirectory()){
 await mkdir(new URL('data/namedays/',project),{recursive:true});
 for(const file of [...documents.map(([file])=>file),new URL('coverage.json',target)])await cp(file,new URL('data/namedays/'+file.pathname.split('/').pop(),project));
}}catch(e){if(e.code!=='ENOENT')throw e;}
