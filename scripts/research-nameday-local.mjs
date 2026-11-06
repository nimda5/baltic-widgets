import {readFile,writeFile,mkdir} from 'node:fs/promises';
const country=process.argv[2]||'lv';
const settings={lv:{entity:'Q211',language:'lv'},lt:{entity:'Q37',language:'lt'},ee:{entity:'Q191',language:'et'}};
if(!settings[country])throw Error('Expected lv, lt or ee');
const {entity,language}=settings[country],folder=new URL('../var/namedays-research/',import.meta.url);
await mkdir(folder,{recursive:true});
async function cached(file,fallback){try{return JSON.parse(await readFile(new URL(file,folder),'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;return fallback;}}
const query=`SELECT ?person ?links ?name ?description WHERE { ?person wdt:P27 wd:${entity}; wdt:P31 wd:Q5; wikibase:sitelinks ?links; rdfs:label ?name. FILTER(LANG(?name)="${language}") FILTER(?links >= 2) OPTIONAL { ?person schema:description ?description. FILTER(LANG(?description)="en") } } ORDER BY DESC(?links) LIMIT 10000`;
const url=new URL('https://query.wikidata.org/sparql');url.searchParams.set('query',query);url.searchParams.set('format','json');
const response=await fetch(url,{headers:{Accept:'application/sparql-results+json','User-Agent':'BalticWidgets/1.1'},signal:AbortSignal.timeout(55000)});
if(!response.ok)throw Error('Wikidata HTTP '+response.status);const result=await response.json();
await writeFile(new URL(`people-${country}-expanded.json`,folder),JSON.stringify(result));
const entities=await cached('people-entities.json',{}),local=await cached('people-wikidata.json',{results:{bindings:[]}});
for(const row of result.results.bindings){
 const id=row.person.value.split('/').pop();entities[id]||={id,labels:{},descriptions:{}};entities[id].labels[language]={value:row.name.value};
 if(row.description)entities[id].descriptions.en={value:row.description.value};
 if(!local.results.bindings.some(p=>p.person.value===row.person.value&&p.country.value.endsWith('/'+entity)))local.results.bindings.push({person:row.person,country:{value:'http://www.wikidata.org/entity/'+entity},links:row.links,personLabel:row.name,personDescription:row.description||{value:''}});
}
await writeFile(new URL('people-entities.json',folder),JSON.stringify(entities));await writeFile(new URL('people-wikidata.json',folder),JSON.stringify(local));
console.log(JSON.stringify({country,candidates:result.results.bindings.length,truncated:result.results.bindings.length===10000}));
