// Builds one consolidated name-day source index from the research directory (NAMEDAYS_SOURCES.md),
// every round note in research/namedays/ and, when present, the private PDF cache manifests.
// Outputs:
//   NAMEDAYS_SOURCE_INDEX.md                  public, one row per source ID
//   research/namedays/source-index.csv        public, full URL and name lists per source ID
//   ../var/namedays-sources/CATALOG.md        private, every cached PDF (including LOCAL-* files)
// Run: node scripts/nameday-source-catalog.mjs   (also via `npm run sources:namedays`)
import {readFile,writeFile,readdir} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';

const project=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const cache=resolve(project,'../var/namedays-sources');
const ID=/^(?:[A-Z]{2,5})(?:-[A-Z0-9]+)+$/;
const strip=u=>u.split('#')[0].replace(/\/$/,'');
const host=u=>{try{return new URL(u).hostname.replace(/^www\./,'');}catch{return '';}};
const plain=s=>s.replace(/\[([^\]]*)\]\([^)]*\)/g,'$1').replace(/\*\*|`/g,'').replace(/\s+/g,' ').trim();
const csvCell=v=>{const s=String(v??'');return /[",\n]/.test(s)?'"'+s.replaceAll('"','""')+'"':s;};

// 1. Directory rows: ID → resource description, defining section and URLs named in the row.
const directory=await readFile(join(project,'NAMEDAYS_SOURCES.md'),'utf8');
const sources=new Map();
const get=id=>{if(!sources.has(id))sources.set(id,{id,resource:'',section:'',directoryUrls:new Set(),rounds:new Set(),written:new Set(),open:new Set(),urls:new Set(),cached:null});return sources.get(id);};
let section='';
for(const line of directory.split(/\r?\n/)){
 const h=line.match(/^#{2,3} (.+)/);if(h){section=h[1].trim();continue;}
 if(!line.startsWith('| '))continue;
 const cells=line.split('|').slice(1,-1).map(c=>c.trim());
 const id=cells[0]?.replace(/\*\*/g,'').replace(/\s*\(.*\)$/,'');
 if(!ID.test(id||''))continue;
 const s=get(id);
 if(!s.resource){s.resource=plain(cells[1]||'');s.section=section;}
 for(const m of line.matchAll(/\((https?:\/\/[^)\s]+)\)/g))s.directoryUrls.add(strip(m[1]));
}
// IDs mentioned only in prose keep their first defining paragraph as a lead.
const urlOwner=new Map();
for(const s of sources.values())for(const u of s.directoryUrls)if(!urlOwner.has(u))urlOwner.set(u,s.id);

// 2. Round notes: which rounds and names used each source; attribute each URL to a cited ID.
const DOMAIN={'izpetnieks.lv':'LV-SILINS','behindthename.com':'INT-BTN','en.wiktionary.org':'INT-WIKTIONARY','snl.no':'INT-SNL','vle.lt':'LT-VLE','tevu-darzelis.lt':'LT-GUIDE','stat.ee':'POP-EE','enciklopedija.lv':'LV-ENCYCLOPEDIA','ewod.ut.ee':'EE-EWOD','periodika.lv':'LV-PERIODIKA','literatura.lv':'LV-LITERATURE'};
const unattributed=new Map();
const files=(await readdir(join(project,'research/namedays'))).filter(f=>/^round(\d+|-[a-z0-9-]+)-notes\.json$/.test(f));
for(const file of files){
 const notes=JSON.parse(await readFile(join(project,'research/namedays',file),'utf8'));
 const round=String(notes.round??file.replace(/^round|-notes\.json$/g,''));
 for(const r of notes.records||[]){
  const ids=(r.source_ids||[]).filter(i=>ID.test(i));
  const who=(r.country?r.country.toUpperCase()+' ':'')+r.name;
  for(const id of ids){const s=get(id);s.rounds.add(round);(r.status==='written'?s.written:s.open).add(who);}
  for(const raw of r.sources||[]){
   const u=strip(raw),d=host(u);
   let owner=urlOwner.get(u);
   if(!owner||!ids.includes(owner)){
    const sameDomain=ids.filter(i=>[...get(i).directoryUrls].some(x=>host(x)===d));
    owner=sameDomain.length===1?sameDomain[0]:ids.includes(DOMAIN[d])?DOMAIN[d]:(ids.find(i=>i.startsWith('LV-LVA'))&&d==='personvarduatveide.lv'?ids.find(i=>i.startsWith('LV-LVA')):owner||null);
   }
   // Early rounds cite well-known hosts by URL only: attribute them by host and count the use.
   if(!owner&&DOMAIN[d]){owner=DOMAIN[d];const s=get(owner);s.rounds.add(round);(r.status==='written'?s.written:s.open).add(who);}
   if(owner)get(owner).urls.add(u);else{const k=d||'(no host)';unattributed.set(k,(unattributed.get(k)||0)+1);}
  }
 }
}

// 3. Private cache manifests, when this checkout has them; otherwise keep the last published values.
const manifests=[];
if(existsSync(cache)){
 for(const e of (await readdir(cache,{withFileTypes:true})).filter(e=>e.isDirectory()&&ID.test(e.name)))
  try{manifests.push(JSON.parse(await readFile(join(cache,e.name,'source.json'),'utf8')));}catch{}
 for(const m of manifests)if(!/^(LOCAL|WEB)-/.test(m.id)){const s=get(m.id);s.cached=m.pdf_pages;if(!s.resource){s.resource=m.title+' (cached PDF; no directory row yet)';s.directoryUrls.add(strip(m.url));}}
}else{
 try{
  const prior=(await readFile(join(project,'research/namedays/source-index.csv'),'utf8')).split(/\r?\n/).slice(1);
  for(const line of prior){const cols=line.match(/("([^"]|"")*"|[^,]*)(,|$)/g)?.map(c=>c.replace(/,$/,''));const id=cols?.[0],pages=cols?.at(-1);if(id&&sources.has(id)&&/^\d+$/.test(pages||''))sources.get(id).cached=Number(pages);}
 }catch{}
}

// 4. Public outputs.
const REGION={LV:'Latvia',LT:'Lithuania',EE:'Estonia',RU:'Russian-language sources',UA:'Ukrainian-language sources',INT:'International and cross-language',POP:'Population data'};
const region=id=>REGION[id.split('-')[0]]?id.split('-')[0]:'OTHER';
// Numbered rounds first, in numeric order; named topic rounds (e.g. eelt1) after them.
const roundSort=a=>[...a].sort((x,y)=>(isNaN(x)-isNaN(y))||(Number(x)||0)-(Number(y)||0)||x.localeCompare(y));
const list=[...sources.values()].filter(s=>s.resource||s.rounds.size).sort((a,b)=>region(a.id).localeCompare(region(b.id))||a.id.localeCompare(b.id));
const cut=(s,n)=>s.length>n?s.slice(0,n-1).replace(/\s+\S*$/,'')+'…':s;
const md=['# Name-day source index','',
 'Generated by `node scripts/nameday-source-catalog.mjs` (`npm run sources:namedays`). Do not edit by hand: add or correct sources in [NAMEDAYS_SOURCES.md](NAMEDAYS_SOURCES.md) and the round notes, then regenerate.','',
 'One row per source ID across all rounds. **Resource** comes from the defining row in the source directory, where the checked pages, supported claims and limits are recorded. **Names** counts the round-note records citing the ID: reviewed histories / still-open profiles. **Cached PDF** gives the page count in the private PDF cache ([NAMEDAYS_PDF_CACHE.md](NAMEDAYS_PDF_CACHE.md)). Every URL per ID, and the names that cite it, are in [`research/namedays/source-index.csv`](research/namedays/source-index.csv). Source URLs belong in research files only, never in the widget interface.','',
 '## Search before a new round','',
 '```powershell',
 '# Every cached PDF at once (scholarly articles, dictionaries, LVA exports, newspapers):',
 'node scripts/nameday-source-cache.mjs search --query Heinar --word true',
 '# One source, all hits:',
 'node scripts/nameday-source-cache.mjs search --id EE-RAJANDI66 --query Heinar --word true',
 '# Which round notes already cite a source or a name:',
 'Select-String -Path research/namedays/source-index.csv -Pattern "Heinar"',
 '```','',
 'A text hit is a discovery aid. Inspect the rendered original page before using it as evidence.','',
 `**${list.length} source IDs**; ${list.filter(s=>s.cached).length} with a cached PDF. ${manifests.filter(m=>/^(LOCAL|WEB)-/.test(m.id)).length||'Further'} privately cached working PDFs and web pages without a directory ID (LOCAL-*, WEB-*) are listed only in the private catalogue.`,''];
for(const r of [...new Set(list.map(s=>region(s.id)))]){
 md.push('## '+(REGION[r]||'Other'),'','| ID | Resource | Rounds | Names | Cached PDF |','| --- | --- | --- | ---: | ---: |');
 for(const s of list.filter(s=>region(s.id)===r)){
  const rounds=roundSort(s.rounds).filter(x=>!isNaN(x)),named=s.rounds.size-rounds.length,span=named?(rounds.length?(rounds.length>4?rounds[0]+'–'+rounds.at(-1):rounds.join(', '))+' + '+named+' topic':named+' topic')+(rounds.length>4?' ('+s.rounds.size+')':''):rounds.length?(rounds.length>4?rounds[0]+'–'+rounds.at(-1)+' ('+rounds.length+')':rounds.join(', ')):'directory only';
  md.push(`| ${s.id} | ${cut(s.resource||'(described in prose; see source directory)',170).replaceAll('|','/')} | ${span} | ${s.written.size} / ${s.open.size} | ${s.cached??''} |`);
 }
 md.push('');
}
md.push('## URLs without a source ID','','Round notes cite these hosts without an ID that the generator can attribute. Give recurring hosts a directory ID when they prove productive.','','| Host | Citations |','| --- | ---: |');
for(const [k,v] of [...unattributed].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).slice(0,40))md.push(`| ${k} | ${v} |`);
md.push('');
await writeFile(join(project,'NAMEDAYS_SOURCE_INDEX.md'),md.join('\n'));
const csv=['id,region,section,resource,rounds,reviewed_names,open_names,names,urls,cached_pdf_pages',...list.map(s=>[s.id,region(s.id),s.section,s.resource,roundSort(s.rounds).join(' '),s.written.size,s.open.size,[...s.written,...s.open].sort().join('; '),[...new Set([...s.directoryUrls,...s.urls])].sort().join(' '),s.cached??''].map(csvCell).join(','))].join('\n')+'\n';
await writeFile(join(project,'research/namedays/source-index.csv'),csv);

// 5. Private catalogue of every cached PDF, including working files without a directory ID.
if(existsSync(cache)){
 const cat=['# Private PDF catalogue','','Generated by `scripts/nameday-source-catalog.mjs`. Not part of the public repository. Search all entries with `node scripts/nameday-source-cache.mjs search --query NAME`.','','| ID | PDF pages | Title | URL |','| --- | ---: | --- | --- |'];
 for(const m of manifests.sort((a,b)=>a.id.localeCompare(b.id)))cat.push(`| ${m.id} | ${m.pdf_pages} | ${String(m.title).replaceAll('|','/')} | ${m.url} |`);
 await writeFile(join(cache,'CATALOG.md'),cat.join('\n')+'\n');
}
console.log(JSON.stringify({source_ids:list.length,cached_ids:list.filter(s=>s.cached).length,private_manifests:manifests.length,unattributed_hosts:unattributed.size}));
