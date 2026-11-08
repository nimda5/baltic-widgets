import {readFile,writeFile} from 'node:fs/promises';
import {setTimeout as pause} from 'node:timers/promises';
import * as cheerio from 'cheerio';
import {nameIdentity} from '../public/namedays-content.js';
const directory=new URL('../var/namedays-research/',import.meta.url),base='https://www.izpetnieks.lv';
async function json(file,fallback){try{return JSON.parse(await readFile(new URL(file,directory),'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;return fallback;}}
async function get(url){for(let n=0;n<3;n++){try{const r=await fetch(url,{headers:{'User-Agent':'BalticWidgets/1.4 (cached name-origin reference lookup)'},signal:AbortSignal.timeout(20000)});if(r.status===429){await pause(30000);throw Error('HTTP 429');}if(!r.ok)throw Error('HTTP '+r.status);return await r.text();}catch(e){if(n===2||e.message.includes('429'))throw e;await pause(1000);}}}
const profiles=Object.values(JSON.parse(await readFile(new URL('../public/data/namedays/profiles-lv.json',import.meta.url),'utf8')).data),wanted=new Set(profiles.map(p=>nameIdentity(p.name)));
let catalog=await json('catalog-index.json',null);
if(!catalog){const first=JSON.parse(await get(base+'/en/api/names?page=1&perPage=24'));catalog=[...first.items];
 for(let page=2;page<=first.totalPages;page+=4){const results=await Promise.all(Array.from({length:Math.min(4,first.totalPages-page+1)},(_,i)=>get(base+'/en/api/names?page='+(page+i)+'&perPage=24').then(JSON.parse)));for(const result of results)catalog.push(...result.items);if(page%40===2)console.log('Catalog index '+page+'/'+first.totalPages);await pause(200);}
 await writeFile(new URL('catalog-index.json',directory),JSON.stringify(catalog));
}
const cache=await json('catalog-origins.json',{}),pending=catalog.filter(p=>wanted.has(nameIdentity(p.name))&&!Object.hasOwn(cache,p.name));let cursor=0,done=0;
const languageTerms={Greek:'Ancient Greek',Latin:'Latin',Hebrew:'Hebrew',Arabic:'Arabic',Germanic:'Germanic languages','Old High German':'Old High German','Old Norse':'Old Norse','Old English':'English',Sanskrit:'Sanskrit',Persian:'Persian',Finnish:'Finnish',Lithuanian:'Lithuanian',Latvian:'Latvian'};
async function save(){await writeFile(new URL('catalog-origins.json',directory),JSON.stringify(cache));}
async function worker(){while(cursor<pending.length){const record=pending[cursor++],url=base+'/en/name/'+encodeURIComponent(record.slug);
 try{const html=await get(url),$=cheerio.load(html);if(nameIdentity($('h1').first().text().trim())!==nameIdentity(record.name))throw Error('Name page mismatch');
  const section=$('#nameOrigin'),prose=section.find('.origin-text').text().trim(),citation=section.find('.origin-sources').text().replace(/^\s*Sources\s*/,'').trim();
  const attestation=$('dt').filter((i,e)=>$(e).text().includes('Earliest known written attestation')).next('dd').text().trim();
  const related=section.find('.origin-related a').map((i,e)=>$(e).text().trim()).get();
  const uncertain=/\b(?:uncertain|unknown|unresolved|unclear|speculative|cannot be established|not established|several theories)\b/i.test(prose);
  const origins=uncertain?[]:Object.entries(languageTerms).filter(([term])=>new RegExp('\\b'+term+'\\b').test(prose)).map(([,origin])=>origin);
  cache[record.name]={origins:[...new Set(origins)],related,first_recorded:attestation||null,first_recorded_form:record.name,first_recorded_country:'lv',source:{url,type:'name_origin_reference',citation:citation||null},has_origin:!!prose,uncertain,raw_origin:prose};
 }catch(e){console.log('Catalog name retained for retry: '+record.name+' '+e.message);}
 done++;if(done%100===0){await save();console.log('Catalog detail '+done+'/'+pending.length);}await pause(100);
}}
await Promise.all(Array.from({length:6},worker));await save();console.log(JSON.stringify({catalog_names:catalog.length,checked:Object.keys(cache).length,with_origin:Object.values(cache).filter(r=>r.has_origin).length,with_attestation:Object.values(cache).filter(r=>r.first_recorded).length}));
