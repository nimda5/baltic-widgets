import {COUNTRIES,validateCalendar} from '../public/namedays-core.js';
import {LANGUAGES,WRITER_VERSION,describeName} from '../public/namedays-content.js';
export function parseCalendar(input){
 const lines=input.replace(/^\uFEFF/,'').trim().split(/\r?\n/);
 if(lines.shift()!=='domain\td\tm\tv\tid')throw Error('Unexpected name-day columns');
 const calendars=Object.fromEntries(COUNTRIES.map(c=>[c,{}])),counts=Object.fromEntries(COUNTRIES.map(c=>[c,0]));let rowCount=0;
 for(const [index,line] of lines.entries()){
  const fields=line.split('\t');if(fields.length!==5)throw Error('Invalid TSV row '+(index+2));
  const [country,d,m,rawName,id]=fields,name=rawName.normalize('NFC');const day=Number(d),month=Number(m);
  if(!COUNTRIES.includes(country)||!name.trim()||name.length>100||/[<>\x00-\x1f]/.test(name)||!/^\d+$/.test(id)||!Number.isInteger(day)||!Number.isInteger(month)||month<1||month>12||day<1||day>new Date(Date.UTC(2000,month,0)).getUTCDate())throw Error('Invalid TSV row '+(index+2));
  const key=String(month).padStart(2,'0')+'-'+String(day).padStart(2,'0');
  const list=calendars[country][key]||=[];if(!list.some(n=>n.name===name))list.push({key:country+':'+name,name});rowCount++;counts[country]++;
 }
 return validateCalendar({schema_version:1,writer_version:WRITER_VERSION,updated_at:new Date().toISOString(),source:'User-provided namedays.txt; source order preserved',data:{timezone:'Europe/Riga',source_rows:rowCount,source_rows_by_country:counts,calendars}});
}
const subgroupOrigins={hebrajiškas:'Hebrew',lotyniškas:'Latin',graikiškas:'Ancient Greek',germaniškas:'Germanic languages',vokiškas:'German',slaviškas:'Slavic',angliškas:'English',asiriškas:'Assyrian',aramėjiškas:'Aramaic',iranietiškas:'Iranian',persiškas:'Persian',čekiškas:'Czech',prancūziškas:'French',arabiškas:'Arabic',keltiškas:'Celtic',itališkas:'Italian',skandinaviškas:'Scandinavian',ispaniškas:'Spanish',vengriškas:'Hungarian',anglosaksiškas:'Anglo-Saxon',rusiškas:'Russian',provansietiškas:'Occitan'};
const registryKinds={dvikamienis:'compound',apeliatyvinis:'word',trumpinys:'short',vietovardinis:'place',sukurtas:'created'};
const familyNames={charlotte:['Šarlote','Šarlota','Charlotte','Charlotta','Šarlotė'],leonard:['Leonards','Leonardas','Leonardo','Leonard','Leonhard','Lennart'],leo:['Leo','Leon','Leons']};
const familySources={charlotte:'https://www.behindthename.com/name/charlotte',leonard:'https://www.behindthename.com/name/leonard',leo:'https://www.behindthename.com/name/leo'};
export function roleFromDescription(description){
 for(const [regex,role] of [[/composer/i,'composer'],[/astronaut|cosmonaut/i,'astronaut'],[/film director|filmmaker/i,'director'],[/actor|actress/i,'actor'],[/writer|novelist|author/i,'writer'],[/poet/i,'poet'],[/physicist|chemist|scientist|mathematician|astronomer|inventor|engineer/i,'scientist'],[/painter|sculptor|artist|architect|polymath/i,'artist'],[/singer|musician|pianist|violinist|guitarist/i,'musician'],[/player|athlete|swimmer|skater|racing driver|gymnast|sprinter|tennis|cyclist|footballer/i,'athlete']])if(regex.test(description))return role;
 if(/politician|president|minister|diplomat|journalist|businessperson|entrepreneur|military|historian|sociologist|philosopher/i.test(description))return 'public_figure';
 return null;
}
export function namesakeIndex(entities={},localRows=[]){
 const index=new Map(),citizenships=new Map(),prominence=new Map();
 const countryCodes={Q211:'lv',Q37:'lt',Q191:'ee'};
 for(const row of localRows){const id=row.person.value.split('/').pop(),c=countryCodes[row.country.value.split('/').pop()];const set=citizenships.get(id)||new Set();set.add(c);citizenships.set(id,set);prominence.set(id,Number(row.links?.value)||0);}
 for(const [id,entity] of Object.entries(entities)){
  if(!/^Q\d+$/.test(id)||entity.missing!==undefined)continue;
  const description=entity.descriptions?.en?.value||'',role=roleFromDescription(description);if(!role)continue;
  const labels=Object.fromEntries(Object.entries(entity.labels||{}).map(([lang,v])=>[lang,v.value]));const canonical=labels.en||Object.values(labels)[0];if(!canonical)continue;
  const aliases=new Set(Object.values(labels).map(n=>n.split(' ')[0]).filter(n=>n.length>1));
  for(const first of aliases){const list=index.get(first)||[];if(!list.some(p=>p.id===id))list.push({id,name:canonical,labels,role,prominence:prominence.get(id)??180,countries:[...(citizenships.get(id)||[])],source:{url:'https://www.wikidata.org/wiki/'+id,type:'structured_biography',license:'CC0'}});index.set(first,list);}
 }
 const reviewed=[
  {id:'reviewed:linards-laicens',name:'Linards Laicens',labels:{lv:'Linards Laicens',ru:'Линард Лайцен'},role:'writer',countries:['lv'],aliases:['Linards'],source:{url:'https://www.literatura.lv/personas/linards-laicens',type:'reviewed_biography'}},
  {id:'reviewed:leons-briedis',name:'Leons Briedis',labels:{lv:'Leons Briedis',ru:'Леонс Бриедис'},role:'poet',countries:['lv'],aliases:['Leons'],source:{url:'https://www.latvianliterature.lv/en/writers/leons-briedis',type:'reviewed_biography'}},
  {id:'reviewed:rainis',name:'Rainis (Jānis Pliekšāns)',labels:{lv:'Rainis (Jānis Pliekšāns)',ru:'Райнис (Янис Плиекшанс)'},role:'writer',countries:['lv'],aliases:['Jānis'],source:{url:'https://www.literatura.lv/personas/rainis',type:'reviewed_biography'}},
  {id:'reviewed:aadu-hint',name:'Aadu Hint',labels:{et:'Aadu Hint',ru:'Ааду Хинт'},role:'writer',countries:['ee'],aliases:['Aadu'],source:{url:'https://www.nommemuuseum.ee/helifail/aadu-hint/',type:'reviewed_biography'}}
 ];
 for(const {aliases,...person} of reviewed)for(const first of aliases){const list=index.get(first)||[];if(!list.some(p=>p.name===person.name))list.unshift({...person,prominence:100});index.set(first,list);}
 for(const list of index.values())list.sort((a,b)=>(b.prominence||0)-(a.prominence||0));
 return index;
}
export function buildProfile(name,country,research={},people=new Map(),previous){
 const key=country+':'+name,entry=research.entries?.[name],dictionary=entry?.countries?.[country],registry=country==='lt'?research.vlkk?.[name]:null;
 const origins=new Set(dictionary?.origins||[]),facts={origins:[],first_recorded:dictionary?.first_recorded||null,related:(dictionary?.related||[]).filter(n=>n!==name)};const sources=[];
 if(dictionary)sources.push(dictionary.source);
 if(registry){sources.push(registry.source);const word=registry.subgroup?.split(' ')[0];if(subgroupOrigins[word])origins.add(subgroupOrigins[word]);if(registryKinds[word])facts.registry_kind=registryKinds[word];}
 facts.origins=[...origins];
 let family=Object.entries(familyNames).find(([,aliases])=>aliases.includes(name)||facts.related.some(related=>aliases.includes(related)))?.[0]||null;
 if(family)sources.push({url:familySources[family],type:'reviewed_name_family'});
 const exact=(people.get(name)||[]).map(p=>({...p,match:'exact'}));
 const candidates=exact.sort((a,b)=>Number(b.countries.includes(country))-Number(a.countries.includes(country))||(b.prominence||0)-(a.prominence||0));
 let chosen=candidates.slice(0,3);
 if(!chosen.length&&family){const reference=family==='charlotte'?'Charlotte':family==='leo'?'Leo':'Leonardo';chosen=(people.get(reference)||[]).slice(0,2).map(p=>({...p,match:'related_form'}));}
 if(!entry&&!registry&&previous){facts.origins=previous.facts.origins;facts.first_recorded=previous.facts.first_recorded;facts.related=previous.facts.related;if(previous.facts.registry_kind)facts.registry_kind=previous.facts.registry_kind;sources.push(...previous.provenance);family||=previous.family;}
 if(!chosen.length&&previous?.people)chosen=previous.people;
 const provenance=[...new Map(sources.map(s=>[s.url,s])).values()];
 const profile={key,name,country,writer_version:WRITER_VERSION,family,facts,people:chosen,provenance,research_status:entry?.status||previous?.research_status||'pending',content_type:'historical_facts_and_labeled_original_fiction'};
 return validateProfile(profile);
}
export function validateProfile(profile){
 if(!profile||!COUNTRIES.includes(profile.country)||profile.key!==profile.country+':'+profile.name||profile.writer_version!==WRITER_VERSION||!Array.isArray(profile.provenance)||!Array.isArray(profile.people)||!Array.isArray(profile.facts?.origins))throw Error('Invalid name profile');
 if((profile.family||profile.facts.origins.length||profile.facts.first_recorded||profile.facts.registry_kind)&&!profile.provenance.length)throw Error('Historical claims need provenance');
 for(const p of profile.people){if(!p.id||!p.name||!p.role||!p.source?.url||!['exact','related_form'].includes(p.match))throw Error('Invalid namesake');}
 for(const lang of LANGUAGES){const copy=describeName(profile,lang);if(copy.story.length<100||/undefined|\{name\}/.test(JSON.stringify(copy))||copy.wishes.serious.length!==3||copy.wishes.humor.length!==3)throw Error('Incomplete name copy');for(const mood of ['serious','humor'])if(new Set(copy.wishes[mood]).size!==3||copy.wishes[mood].some(s=>!s.includes(profile.name)))throw Error('Invalid greetings');}
 return profile;
}
