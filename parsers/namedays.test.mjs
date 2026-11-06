import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parseCalendar,buildProfile,namesakeIndex,validateProfile} from './namedays.mjs';
import {calendarDate,calendarNames,validateCalendar,validateCountryCalendar,fittingNameCount} from '../public/namedays-core.js';
import {describeName,LANGUAGES,WRITER_VERSION,text} from '../public/namedays-content.js';
import {resolveLanguage} from '../public/i18n-core.js';
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
test('dictionary evidence is country specific and missing records are not facts',()=>{
 const research={entries:{Mari:{status:'checked',countries:{ee:{origins:['Hebrew'],related:['Maria'],first_recorded:null,source:{url:'https://en.wiktionary.org/wiki/Mari#Estonian'}}}}}};
 assert.deepEqual(buildProfile('Mari','ee',research).facts.origins,['Hebrew']);assert.deepEqual(buildProfile('Mari','lv',research).facts.origins,[]);
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
test('published calendars and every profile have complete multilingual content',async()=>{
 const calendar=validateCountryCalendar(JSON.parse(await readFile(new URL('../public/data/namedays/calendar-lv.json',import.meta.url),'utf8')));
 assert.equal(calendar.country,'lv');assert.equal(calendar.data.calendars,undefined);
 assert.throws(()=>calendarNames(calendar,'lt','2026-11-06'),/country mismatch/);
 for(const country of ['lv']){
  const doc=JSON.parse(await readFile(new URL('../public/data/namedays/profiles-'+country+'.json',import.meta.url),'utf8'));assert.equal(doc.writer_version,WRITER_VERSION);
  const required=new Set(Object.values(calendar.data.days).flat().map(n=>n.key));assert.equal(Object.keys(doc.data).length,required.size);
  for(const key of required){const p=validateProfile(doc.data[key]);assert.equal(p.country,country);assert.equal(p.key,key);}
 }
});
test('all five interface languages and the ee alias are supported independently of calendar country',()=>{
 assert.equal(resolveLanguage('ee'),'et');assert.equal(resolveLanguage('EE'),'et');
 const labels={lv:'Vārda diena',ru:'Именины',en:'Name day',lt:'Vardadienis',et:'Nimepäev'};
 for(const lang of LANGUAGES)assert.equal(text(lang,'title'),labels[lang]);
});
