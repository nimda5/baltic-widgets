import {readFile,writeFile} from 'node:fs/promises';
import {nameIdentity} from '../public/namedays-content.js';
import {reviewedRoot} from '../public/namedays-roots.js';
const directory=new URL('../var/namedays-research/',import.meta.url);
const profiles=Object.values(JSON.parse(await readFile(new URL('../public/data/namedays/profiles-lv.json',import.meta.url),'utf8')).data),names=new Map(profiles.map(p=>[nameIdentity(p.name),p.name])),matches={};
for(let page=75;page<=107;page++){
 let record;try{record=JSON.parse((await readFile(new URL('russian-page-'+page+'.json',directory),'utf8')).replace(/^\uFEFF/,''));}catch(e){if(e.code==='ENOENT')continue;throw e;}
 const words=record.lines.flatMap(line=>line.words);
 for(const word of words){
  // Restrict OCR to an exact calendar spelling and a separately reviewed foreign name.
  // Never guess corrections to a damaged OCR token or treat patronymics as names.
  if(word.x<600||!/^\p{Script=Latin}+$/u.test(word.text.normalize('NFD').replace(/\p{M}/gu,'')))continue;
  const name=names.get(nameIdentity(word.text));if(!name)continue;
  const native=words.filter(w=>w.x<550&&Math.abs(w.y-word.y)<10&&/^[\p{Script=Cyrillic}]+$/u.test(w.text)).sort((a,b)=>Math.abs(a.y-word.y)-Math.abs(b.y-word.y))[0];
  if(!native)continue;
  const root=reviewedRoot(native.text);
  if(!root||!root.aliases.some(alias=>alias.toLowerCase()===native.text.toLowerCase()))continue;
  const source={url:'https://www.personvarduatveide.lv/uploads/sources/30/pdf/krievu_ipasvardu_pareizrakstiba_un_pareizruna_latviesu_valoda_1993.pdf#page='+page,type:'official_name_equivalence',provider:'Latvian Language Agency',extraction:'OCR table row with an exact calendar spelling and reviewed foreign root'};
  const list=matches[name]||=[];if(!list.some(m=>m.form===native.text))list.push({form:native.text,language:'russian',source});
 }
}
await writeFile(new URL('book-equivalences.json',directory),JSON.stringify(matches));console.log('Reviewed-root matches in full Russian reference: '+Object.keys(matches).length);
