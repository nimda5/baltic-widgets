import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parseCalendar,buildProfile,namesakeIndex,validateProfile,evidenceIndex} from './namedays.mjs';
import {calendarDate,calendarNames,validateCalendar,validateCountryCalendar,fittingNameCount} from '../public/namedays-core.js';
import {describeName,LANGUAGES,WRITER_VERSION,text} from '../public/namedays-content.js';
import {nameIdentity} from '../public/namedays-content.js';
import {formatAttestation,attestationPeriod} from '../public/namedays-attestation.js';
import {catalogFacts,referenceOrigins} from './nameday-reference.mjs';
import {resolveLanguage} from '../public/i18n-core.js';
import {reviewedRoot} from '../public/namedays-roots.js';
const sample='domain\td\tm\tv\tid\nlv\t5\t11\tŠarlote\t1\nlv\t5\t11\tŠarlote\t2\nlt\t6\t11\tLeonardas\t3\nee\t29\t2\tMari\t4';
test('name fitting uses every available slot and reserves the actual hidden-name counter',()=>{
 const widths=[60,50,40,70,50,60],counters={1:24,2:24,3:24,4:24,5:24};
 assert.equal(fittingNameCount(widths,320,4,counters),5);
 assert.equal(fittingNameCount(widths,204,4,counters),3);
 assert.equal(fittingNameCount([250,40],204,4,{1:24}),0);
 assert.equal(fittingNameCount([80],100,4,{}),1);
 assert.equal(fittingNameCount([40,40],84,4,{1:80}),2);
 assert.equal(fittingNameCount(Array(12).fill(30),96,4,Object.fromEntries(Array.from({length:11},(_,i)=>[i+1,i+1>=10?30:24]))),1);
});
test('TSV preserves country, spelling and source order, removing same-day duplicates',()=>{
 const c=parseCalendar(sample);assert.equal(c.data.source_rows,4);assert.deepEqual(calendarNames(c,'lv','2026-11-05'),[{key:'lv:Šarlote',name:'Šarlote'}]);assert.deepEqual(calendarNames(c,'lt','2026-11-05'),[]);assert.equal(calendarNames(c,'ee','2028-02-29')[0].name,'Mari');
});
test('invalid countries, calendar dates, column layouts and HTML names are rejected',()=>{
 for(const row of ['xx\t1\t1\tName\t1','lv\t30\t2\tName\t1','lv\t0\t1\tName\t1','lv\t1\t13\tName\t1','lv\t1\t1\t<b>Name</b>\t1','lv\t1\t1\tName'])assert.throws(()=>parseCalendar('domain\td\tm\tv\tid\n'+row));
 assert.throws(()=>validateCalendar({schema_version:1,data:{}}));
});
test('yesterday/tomorrow use Riga civil dates across years, leap days and DST',()=>{
 assert.equal(calendarDate(new Date('2026-12-31T22:30:00Z')),'2027-01-01');
 assert.equal(calendarDate(new Date('2026-12-31T22:30:00Z'),-1),'2026-12-31');
 assert.equal(calendarDate(new Date('2028-02-28T12:00:00Z'),1),'2028-02-29');
 assert.equal(calendarDate(new Date('2026-03-28T23:30:00Z'),1),'2026-03-30');
 assert.equal(calendarDate(new Date('2026-10-24T22:30:00Z'),-1),'2026-10-24');
});
test('unverified names get labeled creative content, not invented etymologies',()=>{
 const p=buildProfile('RareName','lv');assert.equal(p.research_status,'pending');
 for(const lang of LANGUAGES){const c=describeName(p,lang);assert.equal(c.kind,'creative');assert.deepEqual(c.history,[]);assert.match(c.story,/RareName/);assert.equal(new Set(c.wishes.humor).size,3);}
});
test('dictionary evidence is reused across calendars while profile identities stay local',()=>{
 const research={entries:{Mari:{status:'checked',countries:{ee:{origins:['Hebrew'],related:['Maria'],first_recorded:null,source:{url:'https://en.wiktionary.org/wiki/Mari#Estonian'}}}}}};
 assert.deepEqual(buildProfile('Mari','ee',research).facts.origins,['Hebrew']);
 const lv=buildProfile('Mari','lv',research);assert.deepEqual(lv.facts.origins,['Hebrew']);assert.equal(lv.country,'lv');assert.equal(lv.key,'lv:Mari');assert.match(lv.provenance[0].url,/#Estonian$/);
});
test('diacritic variants share evidence and stories, preserving the attested form and earliest found date',()=>{
 const source={url:'https://en.wiktionary.org/wiki/Aleksandr%C4%ABna#Latvian'};
 const research={entries:{Aleksandrīna:{countries:{lv:{origins:['Ancient Greek'],related:['Aleksandrīna','Alexandra'],first_recorded:'in 1872',source}}},Aleksandrina:{status:'not_found',countries:{}}}};
 const a=buildProfile('Aleksandrina','lv',research),b=buildProfile('Aleksandrīna','lv',research);
 assert.equal(a.facts.first_recorded,'in 1872');assert.equal(a.facts.first_recorded_form,'Aleksandrīna');assert.equal(a.facts.first_recorded_country,'lv');assert.deepEqual(a.facts.origins,b.facts.origins);assert.deepEqual(a.facts.related,['Alexandra']);assert.deepEqual(a.provenance,b.provenance);
 for(const lang of LANGUAGES){const c=describeName(a,lang);assert.match(c.attestation.date,/1872/);assert.equal(c.attestation.form,'Aleksandrīna');assert.equal(c.story.replaceAll(a.name,'NAME'),describeName(b,lang).story.replaceAll(b.name,'NAME'));assert.ok(!c.history.join(' ').includes('1872'));}
 assert.equal(buildProfile('Aleksandrija','lv',research).facts.first_recorded,null);
 const older=buildProfile('Aleksandrīna','lv',research);older.facts.first_recorded='in 1850';
 const index=evidenceIndex(research,[older]);assert.equal(buildProfile('Aleksandrina','lt',research,new Map(),undefined,index).facts.first_recorded,'in 1850');
});
test('shared evidence survives an offline rebuild without losing original date attribution',()=>{
 const previous=buildProfile('Jānis','lv');previous.facts={origins:['Hebrew'],related:['John'],first_recorded:'in the 16th century',first_recorded_form:'Jānis',first_recorded_country:'lv'};previous.provenance=[{url:'https://en.wiktionary.org/wiki/J%C4%81nis#Latvian'}];
 const p=buildProfile('Janis','ee',{},new Map(),undefined,evidenceIndex({},[previous]));
 assert.equal(p.facts.first_recorded_form,'Jānis');assert.equal(p.facts.first_recorded_country,'lv');assert.deepEqual(p.facts.origins,['Hebrew']);assert.equal(describeName(p).attestation.date,'16th century');
 assert.equal(describeName(buildProfile('RareName','lv')).attestation,null);
});
test('official Lithuanian classifications do not become invented creation dates',()=>{
 const research={vlkk:{Armantas:{group:'Lietuviška kilmė',subgroup:'dvikamienis asmenvardis',source:{url:'https://data.gov.lt/datasets/2664/'}}}};
 const p=buildProfile('Armantas','lt',research);assert.equal(p.facts.registry_kind,'compound');assert.equal(p.facts.first_recorded,null);assert.equal(describeName(p,'lt').kind,'documented');
});
test('namesakes prefer local people, require exact spelling and identify related forms',()=>{
 const people=new Map([['Leo',[{id:'Q1',name:'Leo World',role:'writer',countries:[],source:{url:'https://www.wikidata.org/wiki/Q1'}},{id:'Q2',name:'Leo Local',role:'writer',countries:['ee'],source:{url:'https://www.wikidata.org/wiki/Q2'}}]]]);
 assert.equal(buildProfile('Leo','ee',{},people).people[0].name,'Leo Local');assert.equal(buildProfile('Leona','ee',{},people).people.length,0);
 const related=new Map([['Charlotte',[{id:'Q3',name:'Charlotte Brontë',role:'writer',countries:[],source:{url:'https://www.wikidata.org/wiki/Q3'}}]]]);
 assert.equal(buildProfile('Šarlote','lv',{},related).people[0].match,'related_form');assert.equal(buildProfile('Lote','lv',{},related).people.length,0);
});
test('biography indexing does not invent famous people or assign unrelated first names',()=>{
 const entities={Q1:{labels:{en:{value:'Arvo Pärt'}},descriptions:{en:{value:'Estonian composer'}}}};
 const index=namesakeIndex(entities,[]);assert.equal(index.get('Arvo')[0].role,'composer');assert.equal(index.has('Arvis'),false);
});
test('historical claims require provenance before publication',()=>{
 const p=buildProfile('Name','lv');p.facts.origins=['Latin'];assert.throws(()=>validateProfile(p),/provenance/);
});
test('Fedots and Teodors have independently sourced roots and different original images',()=>{
 const fedots=buildProfile('Fedots','lv',{},namesakeIndex()),teodors=buildProfile('Teodors','lv');
 assert.equal(fedots.facts.root_key,'theodotus');assert.equal(teodors.facts.root_key,'theodore');
 assert.ok(fedots.provenance.some(s=>s.provider==='Latvian Language Agency'));
 assert.equal(fedots.people[0].labels.ru,'Федот Сычков');assert.equal(fedots.people[0].match,'related_form');
 for(const lang of LANGUAGES){assert.notEqual(describeName(fedots,lang).story.replaceAll('Fedots','NAME'),describeName(teodors,lang).story.replaceAll('Teodors','NAME'));assert.match(describeName(fedots,lang).history[0],/Theodotos/);}
 const previous=buildProfile('Fedots','lv',{},namesakeIndex());
 const offline=buildProfile('Fedots','lv',{},new Map(),previous,evidenceIndex({},[previous]));assert.deepEqual(offline.people,previous.people);assert.equal(offline.facts.root_key,previous.facts.root_key);
});
test('full Lithuanian registry evidence enriches the same spelling without inventing a creation date',()=>{
 const research={vlkk:{Afroditė:{subgroup:'graikiškas asmenvardis',source:{url:'https://data.gov.lt/datasets/2664/'}}}};
 const p=buildProfile('Afrodīte','lv',research);assert.deepEqual(p.facts.origins,['Ancient Greek']);assert.equal(p.facts.first_recorded,null);assert.equal(p.country,'lv');
});

test('name comparisons never assign an unrelated root or a curated biography',()=>{
 const source={url:'https://example.org/reviewed'};
 for(const [name,related] of [['Ivo',['Ivan']],['Lina',['Paulīna','Karolīna']],['Sample',['Charlotte']]]){
  const p=buildProfile(name,'lv',{entries:{[name]:{status:'checked',countries:{lv:{origins:[],related,source}}}}});
  assert.equal(p.facts.root_key,undefined);assert.equal(p.family,null);
 }
 for(const lang of LANGUAGES){
  const f=describeName(buildProfile('Fedors','lv'),lang).history.join(' '),t=describeName(buildProfile('Teodors','lv'),lang).history.join(' ');
  assert.match(f,/Fyodor|Фёдор/);assert.match(f,/Theodoros/);assert.match(t,/Theodoros/);assert.notEqual(f.replaceAll('Fedors','NAME'),t.replaceAll('Teodors','NAME'));
 }
 assert.deepEqual(referenceOrigins('Ivo is based on Old High German iwa, meaning yew.'),['Old High German']);
});
test('source periods keep their actual precision in every language',()=>{
 assert.equal(formatAttestation('Fourth quarter of the 19th century','ru'),'XIX век, IV четверть');
 assert.equal(formatAttestation('19. gs. IV c., Pēterburga','ru'),'XIX век, IV четверть');
 assert.equal(formatAttestation('20. gs. I ceturksnis','en'),'first quarter of the 20th century');
 assert.equal(formatAttestation('in the 1st century','en'),'1st century');
 assert.equal(formatAttestation('1870s','ru'),'1870-е годы');
 assert.equal(formatAttestation('Not specified','ru'),null);
 for(const lang of LANGUAGES){assert.ok(formatAttestation('Fourth quarter of the 19th century',lang));assert.ok(!/1876|1900/.test(formatAttestation('Fourth quarter of the 19th century',lang)));}
 assert.equal(attestationPeriod('18. gs.').century,18);
});
test('a place of attestation is not an origin and an individual archival alias is not a universal name family',()=>{
 assert.deepEqual(referenceOrigins('The name comes from the Greek word petros. It was first recorded in Latvian sources.'),['Ancient Greek']);
 const facts=catalogFacts({raw_origin:'An archive uses Teovils and Teofils for one person. This case does not prove a general variant relationship.',related:['Teofils'],first_recorded:'Not specified',first_recorded_form:'Teovils'});
 assert.deepEqual(facts.related,[]);assert.deepEqual(facts.archival_variants,['Teofils']);assert.equal(facts.first_recorded,null);assert.equal(facts.origin_uncertain,true);
 const words=catalogFacts({raw_origin:'The name is based on the Latvian words laime (happiness, good fortune) and nest (to carry).',related:[]});assert.equal(words.etymons.length,2);assert.equal(words.etymons[0].gloss.ru,'счастье, удача');
 assert.equal(nameIdentity('Aleksandrīna'),nameIdentity('Aleksandrina'));assert.notEqual(nameIdentity('й'),nameIdentity('и'));
});
test('history uses conversational roots, readable lists and sourced real people in all five languages',()=>{
 const profile=buildProfile('Sample','lv');profile.facts.origins=['Ancient Greek','Latin'];profile.facts.related=['Alpha','Beta'];
 profile.people=[{name:'Example Writer',labels:{ru:'Автор Пример'},role:'writer',match:'exact'}];
 for(const lang of LANGUAGES){const c=describeName(profile,lang);assert.match(c.history.join(' '),/Example Writer|Автор Пример/);assert.match(c.history.join(' '),/Alpha/);assert.doesNotMatch(c.history.join(' '),/undefined|\{\w+\}/);}
 assert.match(describeName(profile,'ru').history[0],/древнегреческие и латинские корни/);
 const alexandra=buildProfile('Aleksandra','lv');assert.equal(alexandra.family,'alexandra');assert.ok(alexandra.provenance.some(s=>s.url==='https://www.rct.uk/collection/stories/queen-alexandra'));
 for(const lang of LANGUAGES){const h=describeName(alexandra,lang).history.join(' ');assert.match(h,/1908/);assert.match(h,/Alexandra/);}
 const enriched=buildProfile('Aleksandra','lv',{catalog:{Aleksandra:{raw_origin:'The feminine form of the Greek name Alexandros.',related:['Aleksandrs'],first_recorded_form:'Aleksandra',source:{url:'https://www.izpetnieks.lv/en/name/aleksandra'}}}});
 for(const lang of LANGUAGES)assert.match(describeName(enriched,lang).history.join(' '),/1908/);
 const unrelated=new Map([['Leonardo',[{id:'Q1',name:'Leonardo Artist',role:'artist',countries:[],source:{url:'https://example.org/'}}]]]);
 assert.deepEqual(buildProfile('Aleksandra','lv',{},unrelated).people,[]);
});
test('published calendars and every profile have complete multilingual content',async()=>{
 const calendar=validateCountryCalendar(JSON.parse(await readFile(new URL('../public/data/namedays/calendar-lv.json',import.meta.url),'utf8')));
 assert.equal(calendar.country,'lv');assert.equal(calendar.data.calendars,undefined);
 assert.throws(()=>calendarNames(calendar,'lt','2026-11-06'),/country mismatch/);
 for(const country of ['lv']){
  const doc=JSON.parse(await readFile(new URL('../public/data/namedays/profiles-'+country+'.json',import.meta.url),'utf8'));assert.equal(doc.writer_version,WRITER_VERSION);
  const required=new Set(Object.values(calendar.data.days).flat().map(n=>n.key));assert.equal(Object.keys(doc.data).length,required.size);
  const originalImages=new Map(LANGUAGES.map(lang=>[lang,new Map()]));
  for(const key of required){const p=validateProfile(doc.data[key]);assert.equal(p.country,country);assert.equal(p.key,key);
   if(p.facts.root_key)assert.equal(p.facts.root_key,reviewedRoot(p.name)?.key,'Unreviewed root assignment: '+p.name);
   for(const lang of LANGUAGES){const c=describeName(p,lang);assert.doesNotMatch(c.history.join(' '),/Словарные данные|языковой реестр|Dictionary evidence|language registry|Vārdnīcas dati|valodas reģistrā|Žodyno duomenys|kalbos registre|Sõnaraamatu andmed|keele registris/);
    const image=c.story.replaceAll(p.name,'NAME'),seen=originalImages.get(lang),identity=nameIdentity(p.name);
    assert.ok(!seen.has(image)||seen.get(image)===identity,`Reused imagination for ${p.name} in ${lang}`);seen.set(image,identity);
   }
  }
 }
});
test('all five interface languages and the ee alias are supported independently of calendar country',()=>{
 assert.equal(resolveLanguage('ee'),'et');assert.equal(resolveLanguage('EE'),'et');
 const labels={lv:'Vārda diena',ru:'Именины',en:'Name day',lt:'Vardadienis',et:'Nimepäev'};
 for(const lang of LANGUAGES)assert.equal(text(lang,'title'),labels[lang]);
});
