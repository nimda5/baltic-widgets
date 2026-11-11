import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parseCalendar,buildProfile,namesakeIndex,validateProfile,evidenceIndex} from './namedays.mjs';
import {calendarDate,calendarNames,validateCalendar,validateCountryCalendar,fittingNameCount} from '../public/namedays-core.js';
import {describeName,LANGUAGES,WRITER_VERSION,text} from '../public/namedays-content.js';
import {calendarEntry} from './nameday-reference.mjs';
import {nameIdentity} from '../public/namedays-content.js';
import {formatAttestation,attestationPeriod} from '../public/namedays-attestation.js';
import {catalogFacts,referenceOrigins} from './nameday-reference.mjs';
import {resolveLanguage} from '../public/i18n-core.js';
import {reviewedRoot} from '../public/namedays-roots.js';
import {reviewedHistory} from '../public/namedays-history.js';
import {historiesLatvianR9} from '../public/namedays-history-r9-lv.js';
import {historiesLatvianR10} from '../public/namedays-history-r10-lv.js';
test('next 50 LV histories retain five languages and stay outside EE/LT lookups',()=>{
 assert.equal(Object.keys(historiesLatvianR10).length,50);
 for(const [name,history] of Object.entries(historiesLatvianR10)){
  assert.equal(reviewedHistory(name,'lv'),history);
  for(const country of ['lt','ee',undefined])assert.notEqual(reviewedHistory(name,country),history);
  assert(history.sources.length);
  for(const lang of LANGUAGES){assert.equal(history.text[lang].length,2);assert(history.text[lang].join(' ').length>300,name+' '+lang);assert.doesNotMatch(history.text[lang].join(' '),/https?:|undefined|\{name\}/);}
 }
});
test('LV-only reviewed histories do not override other country calendars',()=>{
 assert.equal(Object.keys(historiesLatvianR9).length,20);
 for(const [name,history] of Object.entries(historiesLatvianR9)){
  assert.equal(reviewedHistory(name,'lv'),history);
  for(const country of ['lt','ee',undefined])assert.notEqual(reviewedHistory(name,country),history);
  for(const lang of LANGUAGES){assert.equal(history.text[lang].length,2);assert.ok(history.text[lang].join(' ').length>300,name+' '+lang);assert.doesNotMatch(history.text[lang].join(' '),/https?:/);}
 }
});
test('profile validation uses the country document writer and rejects mismatches',()=>{
 const profile=buildProfile('RareName','ee');profile.writer_version='namedays-1.8.6';
 assert.equal(validateProfile(profile,'namedays-1.8.6'),profile);
 assert.throws(()=>validateProfile(profile),/Invalid name profile/);
 assert.throws(()=>validateProfile(profile,'namedays-1.8.5'),/Invalid name profile/);
 profile.writer_version='invalid';assert.throws(()=>validateProfile(profile,'invalid'),/Invalid name profile/);
});
test('reviewed calendar dates are not appended twice and additional evidence is retained',()=>{
 for(const name of ['Madara','Ņina','Paula','Normunds','Marks']){
  const p=buildProfile(name,'lv');p.facts.calendar_entry={year:historiesLatvianR9[name].calendar_entry_year,scope:'exact_form',country:'lv',form:name};
  for(const lang of LANGUAGES)assert.equal(describeName(p,lang).history.length,2,name+' '+lang);
  p.facts.calendar_entry.year=1700;
  for(const lang of LANGUAGES){const c=describeName(p,lang);assert.equal(c.history.length,3);assert.match(c.history[2],/1700/);}
 }
});
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
test('unverified names show a translated research notice instead of invented content',()=>{
 const p=buildProfile('RareName','lv');assert.equal(p.research_status,'pending');
 for(const lang of LANGUAGES){const c=describeName(p,lang);assert.equal(c.kind,'unresearched');assert.deepEqual(c.history,[]);assert.equal(c.story,'');assert.ok(c.notice.length>20);assert.equal(new Set(c.wishes.humor).size,3);}
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
test('calendar-entry years are sourced, exact-form only and survive offline rebuilds',()=>{
 const record={first_recorded_form:'Nellija',raw_origin:'Nellija is recorded in 1904; it entered the calendar in 1915.',source:{url:'https://www.izpetnieks.lv/en/name/nellija'}};
 assert.equal(calendarEntry(record,'Nellija').year,1915);assert.equal(calendarEntry(record,'Nelija'),null);
 assert.equal(calendarEntry({...record,raw_origin:'The exact form was not found in the dictionary; the base entered the calendar in 1915.'},'Nellija'),null);
 const p=buildProfile('Nellija','lv',{catalog:{Nellija:record}}),offline=buildProfile('Nellija','lv',{},new Map(),p);
 assert.equal(offline.facts.calendar_entry.year,1915);
 for(const lang of LANGUAGES)assert.match(describeName(offline,lang).history.join(' '),/1915/);
});
test('related-name context supplies real history without borrowing the other name’s record date',async()=>{
 const all=JSON.parse(await readFile(new URL('../public/data/namedays/profiles-lv.json',import.meta.url),'utf8')).data;
 for(const lang of LANGUAGES){
  const nel=describeName(all['lv:Nelija'],lang,0,all),rain=describeName(all['lv:Rainars'],lang,0,all);
  assert.ok(nel.related_context.some(c=>c.name==='Nellija'&&c.history.length>=2));assert.equal(nel.attestation,null);
  assert.ok(rain.related_context.some(c=>c.name==='Rainers'&&c.history.join(' ').includes('heri')));assert.equal(rain.attestation,null);
  const uncertain=describeName(all['lv:Nelita'],lang,0,all);assert.ok(uncertain.related_context.length);assert.ok(uncertain.related_context.every(c=>c.possible));
 }
 const a=buildProfile('RelatedA','lv'),b=buildProfile('RelatedB','lv');a.facts.related=['RelatedB'];b.facts.related=['RelatedA'];
 assert.deepEqual(describeName(a,'en',0,{[a.key]:a,[b.key]:b}).related_context,[]);
});
test('literary histories have five complete translations, sources and no invented sound portraits',()=>{
 for(const name of ['Lāčplēsis','Spīdola','Laimdota','Rainis']){
  const p=buildProfile(name,'lv');assert.ok(p.provenance.some(s=>s.type==='reviewed_name_history'));
  for(const lang of LANGUAGES){const c=describeName(p,lang);assert.equal(c.kind,'documented');assert.equal(c.reviewed_narrative,true);assert.equal(c.story,'');assert.equal(c.notice,'');assert.ok(c.history.length>=2);assert.ok(c.history.join(' ').length>250);}
 }
 const p=buildProfile('Lāčplēsis','lv');p.facts.first_recorded='1922. gads, Jelgava';
 for(const lang of LANGUAGES){const c=describeName(p,lang);assert.match(c.history.join(' '),/1888/);assert.match(c.history.join(' '),/1919/);assert.match(c.attestation.date,/1922/);assert.doesNotMatch(c.history.join(' '),/1922/);}
 const p2=buildProfile('Rainis','lv',{},new Map([['Rainis',[{id:'Q348001',name:'Rainis',role:'poet',countries:['lv'],source:{url:'https://www.wikidata.org/wiki/Q348001'}}]]]));assert.equal(p2.people[0].match,'pseudonym');
});
test('Fedots and Teodors have independently sourced roots without fictional additions',()=>{
 const fedots=buildProfile('Fedots','lv',{},namesakeIndex()),teodors=buildProfile('Teodors','lv');
 assert.equal(fedots.facts.root_key,'theodotus');assert.equal(teodors.facts.root_key,'theodore');
 assert.ok(fedots.provenance.some(s=>s.provider==='Latvian Language Agency'));
 assert.equal(fedots.people[0].labels.ru,'Федот Сычков');assert.equal(fedots.people[0].match,'related_form');
 for(const lang of LANGUAGES){assert.notEqual(describeName(fedots,lang).history[0],describeName(teodors,lang).history[0]);assert.equal(describeName(fedots,lang).story,'');assert.match(describeName(fedots,lang).history[0],/Theodotos/);}
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
 for(const country of ['lv','lt','ee']){
  const doc=JSON.parse(await readFile(new URL('../public/data/namedays/profiles-'+country+'.json',import.meta.url),'utf8'));assert.match(doc.writer_version,/^namedays-\d+\.\d+\.\d+$/);
  const countryCalendar=country==='lv'?calendar:validateCountryCalendar(JSON.parse(await readFile(new URL('../public/data/namedays/calendar-'+country+'.json',import.meta.url),'utf8')));
  const required=new Set(Object.values(countryCalendar.data.days).flat().map(n=>n.key));assert.equal(Object.keys(doc.data).length,required.size);
  assert.equal(countryCalendar.writer_version,doc.writer_version);
  for(const key of required){const p=validateProfile(doc.data[key],doc.writer_version);assert.equal(p.country,country);assert.equal(p.key,key);if(country!=='lv')assert.ok(!p.facts.calendar_entry||p.facts.calendar_entry.country===country);for(const lang of LANGUAGES)assert.ok(describeName(p,lang,0,doc.data).history.length,'Empty text: '+key+' '+lang);
   if(p.facts.root_key)assert.equal(p.facts.root_key,reviewedRoot(p.name)?.key,'Unreviewed root assignment: '+p.name);
   for(const lang of LANGUAGES){const c=describeName(p,lang);assert.doesNotMatch(c.history.join(' '),/Словарные данные|языковой реестр|Dictionary evidence|language registry|Vārdnīcas dati|valodas reģistrā|Žodyno duomenys|kalbos registre|Sõnaraamatu andmed|keele registris/);
    assert.equal(c.story,'',`Fiction remains for ${p.name} in ${lang}`);
    assert.equal(!!c.notice,c.kind==='unresearched');
   }
  }
 }
});
test('all five interface languages and the ee alias are supported independently of calendar country',()=>{
 assert.equal(resolveLanguage('ee'),'et');assert.equal(resolveLanguage('EE'),'et');
 const labels={lv:'Vārda diena',ru:'Именины',en:'Name day',lt:'Vardadienis',et:'Nimepäev'};
 for(const lang of LANGUAGES)assert.equal(text(lang,'title'),labels[lang]);
});


test('cross-referenced dictionary dates retain their scope and do not leak into other calendars',()=>{
 const record={raw_origin:'The scan lists Kajs as Gajs without a question mark. Attested in 1942; entered the calendar in 1767.',related:['Gajs'],first_recorded:'1942',first_recorded_form:'Kajs',source:{url:'https://www.izpetnieks.lv/en/name/kajs'}};
 const research={catalog:{Kajs:record}},lv=buildProfile('Kajs','lv',research);
 assert.equal(lv.facts.calendar_entry.scope,'reference_entry');assert.equal(lv.facts.calendar_entry.form,'Kajs / Gajs');
 const ee=buildProfile('Kajs','ee',research,new Map(),lv);assert.equal(ee.facts.calendar_entry,undefined);
 for(const lang of LANGUAGES){const c=describeName(lv,lang);assert.match(c.history.join(' '),/1767/);assert.match(c.history.join(' '),/Gajs/);}
});

test('reviewed related histories and calendar-only records remain distinct in all countries',()=>{
 for(const country of ['lv','lt','ee']){
  for(const name of ['Veta','Kajsa','Vytautas','Kalev']){const p=buildProfile(name,country);for(const lang of LANGUAGES)assert.ok(describeName(p,lang).history.join(' ').length>200);}
  const p=buildProfile('RareNameForTest',country);p.facts.calendar_dates=['11-12'];
  for(const lang of LANGUAGES){const c=describeName(p,lang);assert.ok(c.history.length);assert.equal(c.calendar_only,true);assert.equal(c.kind,'unresearched');assert.ok(c.notice);}
 }
});

test('ordinary source prose is not mistaken for a cross-referenced spelling',()=>{
 const p=buildProfile('Kaija','lv',{catalog:{Kaija:{raw_origin:'The source separately lists it as a Finnish form. Kaija entered the calendar in 1910.',first_recorded_form:'Kaija',source:{url:'https://example.org/kaija'}}}});
 assert.equal(p.facts.calendar_entry.scope,'exact_form');assert.equal(p.facts.calendar_entry.form,'Kaija');
});

test('research round 2 histories are complete, sourced and country-neutral',()=>{
 for(const [name,country,marker] of [['Jānis','lv',/Yohanan/],['Smaida','lv',/1879/],['Vendija','lv',/Barrie|Барри|Barij/],['Traidenis','lt',/1270/],['Lembit','ee',/1217/],['Sergejs','lv',/Sergi/]]){
  const p=buildProfile(name,country);assert.ok(p.provenance.some(s=>s.type==='reviewed_name_history'),name);
  for(const lang of LANGUAGES){const c=describeName(p,lang);assert.equal(c.reviewed_narrative,true,name+' '+lang);assert.ok(c.history.length>=2);assert.ok(c.history.join(' ').length>300,name+' '+lang);assert.doesNotMatch(c.history.join(' '),/undefined|\{\w+\}/);}
  assert.match(describeName(p,'en').history.join(' '),marker,name);
 }
});

test('calendar names are trimmed and source labels never become etymological words',()=>{
 const doc=parseCalendar('domain\td\tm\tv\tid\nlt\t20\t4\tTraidenis \t1\nlt\t20\t4\t Traidenis\t2');
 assert.deepEqual(doc.data.calendars.lt['04-20'],[{key:'lt:Traidenis',name:'Traidenis'}]);
 assert.throws(()=>validateCountryCalendar({schema_version:1,country:'lt',writer_version:'x',data:{days:{'04-20':[{key:'lt:Traidenis ',name:'Traidenis '}]}}}));
 const p=buildProfile('Vitālis','lv',{},namesakeIndex({},[]),null,evidenceIndex({},[{name:'Vitālis',country:'lv',facts:{origins:[],related:[],etymons:[{term:'gloss',gloss:{en:'vital',lv:'dzīvīgs',ru:'жизненный',lt:'gyvybingas',et:'elujõuline'}}]},provenance:[]}]));
 assert.ok(!p.facts.etymons.some(w=>w.term==='gloss'));
});

test('published LT and EE calendars contain no padded names',async()=>{
 for(const country of ['lt','ee']){const doc=validateCountryCalendar(JSON.parse(await readFile(new URL('../public/data/namedays/calendar-'+country+'.json',import.meta.url),'utf8')));for(const names of Object.values(doc.data.days))for(const n of names)assert.equal(n.name,n.name.trim());}
});

test('reviewed LT calendar misspellings are corrected without adding duplicates',()=>{
 const doc=parseCalendar('domain\td\tm\tv\tid\nlt\t13\t8\tArnasd\t1\nlt\t14\t5\tBonifacas\t2\nlt\t14\t5\tBinifacas\t3\nlt\t6\t3\tFelidta\t4');
 assert.deepEqual(doc.data.calendars.lt['08-13'].map(n=>n.name),['Arnas']);
 assert.deepEqual(doc.data.calendars.lt['05-14'].map(n=>n.name),['Bonifacas']);
 assert.deepEqual(doc.data.calendars.lt['03-06'].map(n=>n.name),['Felicita']);
});

test('popular EE and LT histories stay in their own country calendar',()=>{
 for(const [name,country] of [['Margus','ee'],['Anton','ee'],['Antanas','lt'],['Irena','lt'],['Sirje','ee']]){
  const p=buildProfile(name,country);for(const lang of LANGUAGES){const c=describeName(p,lang);assert.equal(c.reviewed_narrative,true,name+' '+lang);assert.ok(c.history.join(' ').length>300);}
 }
 assert.equal(reviewedHistory('Anton','lt'),null);
 for(const name of ['Irena','Sirje','Regina'])assert.notEqual(reviewedHistory(name,'lv'),reviewedHistory(name,name==='Sirje'?'ee':'lt'));
});
