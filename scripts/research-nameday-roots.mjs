import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {setTimeout as pause} from 'node:timers/promises';
import * as cheerio from 'cheerio';

// Exact-name dictionary research and official cross-language name spellings.
// Raw pages and lookup progress are private caches, never publication inputs.
const root=new URL('../',import.meta.url),directory=new URL('var/namedays-research/',root);
await mkdir(directory,{recursive:true});
async function json(name,fallback){try{return JSON.parse(await readFile(new URL(name,directory),'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;return fallback;}}
const countries=(process.argv.find(a=>a.startsWith('--countries='))?.slice(12)||'lv').split(',');if(countries.some(c=>!['lv','lt','ee'].includes(c)))throw Error('Invalid research country');
const profiles=(await Promise.all(countries.map(async country=>Object.values(JSON.parse(await readFile(new URL('public/data/namedays/profiles-'+country+'.json',root),'utf8')).data)))).flat();
const missing=profiles.filter(p=>!p.family&&!p.facts.origins.length&&!p.facts.first_recorded&&!p.facts.related.length&&!p.facts.registry_kind);
const cache=await json('roots-lookups.json',{dictionary:{},official:{}});
const index=await json('index.json',{});
async function save(){await writeFile(new URL('roots-lookups.json',directory),JSON.stringify(cache));await writeFile(new URL('index.json',directory),JSON.stringify(index));}
async function get(url){for(let attempt=0;attempt<3;attempt++){try{const r=await fetch(url,{headers:{'User-Agent':'BalticWidgets/1.4 (cached given-name reference research)'},signal:AbortSignal.timeout(25000)});if(r.status===429){await pause(30000);throw Error('HTTP 429: source requested a pause');}if(!r.ok)throw Error('HTTP '+r.status);return await r.text();}catch(e){if(attempt===2||String(e.message).includes('429'))throw e;await pause(1000*(attempt+1));}}}
const languages={fr:'French',de:'German',goh:'Old High German',gmh:'Middle High German',en:'English',la:'Latin',grc:'Ancient Greek',el:'Greek',he:'Hebrew',ru:'Russian',gem:'Germanic languages','gem-pro':'Proto-Germanic',sv:'Swedish',da:'Danish',fi:'Finnish',et:'Estonian',lv:'Latvian',lt:'Lithuanian',pl:'Polish',ar:'Arabic',it:'Italian',es:'Spanish',fa:'Persian',sa:'Sanskrit',non:'Old Norse'};
function extract(page,country){
 const raw=page.revisions?.[0]?.slots?.main?.['*']||'',sections=raw.split(/^==([^=\n]+)==\s*$/m),choices=[];
 for(let i=1;i<sections.length;i+=2){const language=sections[i],body=sections[i+1];
  // Never take an unrelated word's etymology, or merge multiple senses.
  if(!/\{\{(?:given name|female given name|male given name)\|/.test(body))continue;
  if((body.match(/^===Etymology(?: \d+)?===/gm)||[]).length>1)continue;
  const definition=body.match(/\{\{given name\|([^{}]+)\}\}/);if(!definition)continue;
  const code=definition[1].split('|')[0],origins=new Set(),related=[];
  const from=definition[1].match(/(?:^|\|)from=([^|}]+)/)?.[1];if(Object.values(languages).includes(from))origins.add(from);
  const etymology=body.match(/^===Etymology===\s*([\s\S]*?)(?=\n===|$)/m)?.[1]||'';
  for(const m of etymology.matchAll(/\{\{(?:bor\+?|lbor|borrowed|der|uder|inh)\|([^|{}]+)\|([^|{}]+)\|([^|{}]+)(?:\||\}\})/g))if(m[1]===code&&languages[m[2]]){origins.add(languages[m[2]]);if(/^[\p{Lu}][\p{L} -]{1,35}$/u.test(m[3]))related.push(m[3]);}
  for(const m of definition[1].matchAll(/(?:^|\|)(?:eq|varof|dimof)=([^|{}]+)/g))if(/^[\p{Lu}][\p{L} -]{1,35}$/u.test(m[1]))related.push(m[1]);
  if(origins.size||related.length)choices.push({origins:[...origins],related:[...new Set(related)],language,source:{url:'https://en.wiktionary.org/wiki/'+encodeURIComponent(page.title)+'#'+encodeURIComponent(language),revision:page.revisions[0].revid,license:'CC BY-SA 4.0',type:'dictionary'}});
 }
 return choices.find(choice=>choice.language===({lv:'Latvian',lt:'Lithuanian',ee:'Estonian'}[country]))||null;
}
function merge(name,record,country='lv'){
 const entry=index.entries[name]||={status:'checked',countries:{}};const previous=entry.countries[country];
 entry.countries[country]={...previous,origins:[...new Set([...(previous?.origins||[]),...(record.origins||[])])],related:[...new Set([...(previous?.related||[]),...(record.related||[])])],first_recorded:previous?.first_recorded||null,source:previous?.source||record.source,sources:[...new Map([...(previous?.sources||[]),record.source].filter(Boolean).map(s=>[s.url,s])).values()],source_forms:[...(previous?.source_forms||[]),...(record.source_forms||[])]};entry.status='checked';
}
const pending=process.argv.includes('--official-only')?[]:[...new Set(missing.filter(p=>!Object.hasOwn(cache.dictionary,p.country+':'+p.name)).map(p=>p.name))];
for(let offset=0;offset<pending.length;offset+=40){const names=pending.slice(offset,offset+40),url=new URL('https://en.wiktionary.org/w/api.php');Object.entries({action:'query',format:'json',prop:'revisions',rvprop:'ids|content',rvslots:'main',titles:names.join('|'),maxlag:'5'}).forEach(([k,v])=>url.searchParams.set(k,v));
 try{const response=JSON.parse(await get(url)),normal=new Map((response.query?.normalized||[]).map(n=>[n.from,n.to]));if(!response.query)throw Error('No dictionary response');for(const name of names){const page=Object.values(response.query.pages).find(p=>p.title===(normal.get(name)||name));if(!page)continue;for(const country of countries){if(!missing.some(p=>p.name===name&&p.country===country))continue;const key=country+':'+name;cache.dictionary[key]=extract(page,country);if(cache.dictionary[key])merge(name,cache.dictionary[key],country);}}}
 catch(e){console.log('Dictionary batch retained for retry: '+e.message);if(e.message.includes('429'))break;}
 if(offset%400===0)console.log('Dictionary '+offset+'/'+pending.length);await save();await pause(1200);
}
console.log('Dictionary complete: '+Object.values(cache.dictionary).filter(Boolean).length+' extra names');
const officialPending=process.argv.includes('--dictionary-only')?[]:missing.filter(p=>p.country==='lv').map(p=>p.name).filter(n=>!Object.hasOwn(cache.official,n));let cursor=0,finished=0;
async function worker(){while(cursor<officialPending.length){const name=officialPending[cursor++];const url='https://www.personvarduatveide.lv/search?locale=en&words=on&q='+encodeURIComponent(name);
 try{const html=await get(url),$=cheerio.load(html),matches=[];
  $('article.hover-icons-wrap').each((i,el)=>{const pairs={};$(el).find('.word-label').each((j,label)=>{const key=$(label).text().trim(),value=$(label).next('.word-value').text().trim();if(value)pairs[key]=value;});
   const local=pairs['Name in Latvian']?.replace(/\s*\[.*$/,'').trim();
   if(local!==name||pairs.Type!=='name'||!pairs.Name)return;
   const href=$(el).find('a[href^="/words/"]').first().attr('href');if(!href)return;
   matches.push({form:pairs.Name.normalize('NFD').replace(/\u0301/g,'').normalize('NFC'),language:pairs.Language,source:{url:new URL(href,'https://www.personvarduatveide.lv').href,type:'official_name_equivalence',provider:'Latvian Language Agency'}});
  });
  cache.official[name]=matches;
  if(matches.length)merge(name,{related:matches.map(m=>m.form),source:matches[0].source,source_forms:matches});
 }catch(e){console.log('Official lookup retained for retry: '+name+' '+e.message);}
 finished++;if(finished%100===0){await save();console.log('Official '+finished+'/'+officialPending.length+'; matched '+Object.values(cache.official).filter(x=>x.length).length);}await pause(150);
}}
const workers=Math.max(1,Math.min(6,Number(process.argv.find(a=>a.startsWith('--workers='))?.split('=')[1]||4)));
await Promise.all(Array.from({length:workers},worker));await save();
console.log(JSON.stringify({checked:missing.length,dictionary:Object.values(cache.dictionary).filter(Boolean).length,official:Object.values(cache.official).filter(x=>x.length).length}));
