// Private, content-addressed cache of research sources (PDFs and opened web pages) with searchable text.
// Originals and extracted text never enter the repository. Commands:
//   fetch  --url URL [--id ID --title T]   download once, extract text, register; reuses an already cached URL
//   index  --id ID --file F --url URL --title T [--ocr-json J]   register a PDF already on disk
//   search --query Q [--id ID|all] [--word true] [--limit N]
//   list
import {readFile,writeFile,mkdir,copyFile,access,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';

const project=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const cache=resolve(project,'../var/namedays-sources');
const args=process.argv.slice(2),command=args.shift(),options={};
for(let i=0;i<args.length;i+=2){if(!args[i].startsWith('--')||args[i+1]===undefined)throw Error('Expected --key value');options[args[i].slice(2)]=args[i+1];}
const id=options.id;
// `search` and `list` accept --id all (or no --id) to cover every registered source in one pass.
const everySource=(command==='search'||command==='list')&&(!id||id==='all');
const autoId=command==='fetch'&&!id;
if(!everySource&&!autoId&&(!id||!/^[-A-Z0-9]+$/.test(id)))throw Error('Supply a stable --id containing uppercase letters, digits or hyphens');
const parserVersion=1;
const manifestFor=sourceId=>join(cache,sourceId,'source.json');
const manifest=everySource||autoId?null:manifestFor(id);
const LIMITS='Text search is a discovery aid. Visually inspect original pages for spelling, diacritics, columns and dates. Extraction does not grant republication rights.';
const urlKey=u=>u.split('#')[0].replace(/\/$/,'');
async function manifests(){
 const out=[];
 try{for(const e of (await readdir(cache,{withFileTypes:true})).filter(e=>e.isDirectory()&&/^[-A-Z0-9]+$/.test(e.name)))try{out.push(JSON.parse(await readFile(join(cache,e.name,'source.json'),'utf8')));}catch{}}catch{}
 return out;
}
// Plain text from an HTML page: scripts, styles and markup removed, common entities decoded.
function htmlText(html){
 const named={amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' ',ndash:'–',mdash:'—',laquo:'«',raquo:'»',bdquo:'„',ldquo:'“',rdquo:'”',rsquo:'’',lsquo:'‘',hellip:'…'};
 return html.replace(/<(script|style|noscript|svg|template)[\s\S]*?<\/\1>/gi,' ').replace(/<!--[\s\S]*?-->/g,' ')
  .replace(/<(br|\/p|\/div|\/li|\/tr|\/h\d|\/td|\/th)[^>]*>/gi,'\n').replace(/<[^>]+>/g,' ')
  .replace(/&#x([0-9a-f]+);/gi,(_,h)=>String.fromCodePoint(parseInt(h,16))).replace(/&#(\d+);/g,(_,d)=>String.fromCodePoint(Number(d))).replace(/&([a-z]+);/gi,(m,n)=>named[n.toLowerCase()]??m)
  .replace(/[ \t\r\f\v]+/g,' ').replace(/ *\n[ \n]*/g,'\n').trim().normalize('NFC');
}
const slugId=u=>{const x=new URL(u);return ('WEB-'+(x.hostname.replace(/^www\./,'')+x.pathname+(x.search||'')).normalize('NFD').replace(/[̀-ͯ]/g,'').toUpperCase().replace(/[^A-Z0-9]+/g,'-').replace(/^-|-$/g,'')).slice(0,80).replace(/-$/,'');};
async function indexPdf(id,file,url,title,ocrJson){
 const bytes=await readFile(file);
 if(!bytes.subarray(0,1024).includes(Buffer.from('%PDF-')))throw Error('Input is not a PDF');
 const sha256=createHash('sha256').update(bytes).digest('hex'),folder=join(cache,'objects',sha256),pagesPath=join(folder,'pages-v'+parserVersion+'.json');
 await mkdir(folder,{recursive:true});let reused=false;
 try{await access(pagesPath);reused=true;}catch{
  await copyFile(file,join(folder,'source.pdf'));
  let chunks,extraction='pdftotext -layout UTF-8';
  if(ocrJson){
   const ocr=JSON.parse((await readFile(resolve(ocrJson),'utf8')).replace(/^\uFEFF/,''));
   if(ocr.sha256!==sha256)throw Error('OCR input hash does not match this PDF');
   if(!Array.isArray(ocr.pages)||!ocr.pages.length||ocr.pages.some((p,i)=>p.pdf_page!==i+1||typeof p.text!=='string'))throw Error('OCR input requires consecutive one-based pages and text');
   chunks=ocr.pages.map(p=>p.text);extraction=ocr.extraction||'external OCR: spelling requires visual verification';
   await writeFile(join(folder,'text-v'+parserVersion+'.txt'),chunks.join('\f'));
  }else{
   const result=spawnSync(options.pdftotext||'pdftotext',['-layout','-enc','UTF-8',join(folder,'source.pdf'),join(folder,'text-v'+parserVersion+'.txt')],{encoding:'utf8',windowsHide:true});
   if(result.error||result.status!==0)throw Error(result.error?.message||result.stderr||'pdftotext failed');
   const text=await readFile(join(folder,'text-v'+parserVersion+'.txt'),'utf8');chunks=text.split('\f');
   if(!chunks.at(-1).trim())chunks.pop();
  }
  const pages=chunks.map((text,i)=>({pdf_page:i+1,text:text.normalize('NFC')}));
  if(!pages.some(p=>p.text.trim()))throw Error('No text extracted: retain original for visual review/OCR; do not treat as evidence');
  await writeFile(pagesPath,JSON.stringify({parserVersion,sha256,extraction,pages},null,2)+'\n');
 }
 const parsed=JSON.parse(await readFile(pagesPath,'utf8'));
 const info={id,kind:'pdf',title,url,sha256,parserVersion,extraction:parsed.extraction||'pdftotext -layout UTF-8',pdf_pages:parsed.pages.length,object:sha256,limitations:LIMITS};
 await mkdir(join(cache,id),{recursive:true});await writeFile(manifestFor(id),JSON.stringify(info,null,2)+'\n');
 return {id,reused,pdf_pages:info.pdf_pages,sha256};
}
async function indexHtml(id,bytes,url,title){
 const sha256=createHash('sha256').update(bytes).digest('hex'),folder=join(cache,'objects',sha256),pagesPath=join(folder,'pages-v'+parserVersion+'.json');
 const html=bytes.toString('utf8'),text=htmlText(html);
 if(text.length<40)throw Error('Page has no readable text (challenge page, script-only site or error); nothing cached');
 await mkdir(folder,{recursive:true});
 await writeFile(join(folder,'source.html'),bytes);
 await writeFile(pagesPath,JSON.stringify({parserVersion,sha256,extraction:'html-to-text',pages:[{pdf_page:1,text}]},null,2)+'\n');
 const pageTitle=title||htmlText((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)||[])[1]||'')||url;
 const info={id,kind:'html',title:pageTitle,url,sha256,parserVersion,extraction:'html-to-text',pdf_pages:1,object:sha256,fetched_at:new Date().toISOString(),limitations:LIMITS+' Web pages change: cite the fetch date and recheck the live page before relying on it.'};
 await mkdir(join(cache,id),{recursive:true});await writeFile(manifestFor(id),JSON.stringify(info,null,2)+'\n');
 return {id,kind:'html',reused:false,chars:text.length,sha256};
}
if(command==='index'){
 if(!options.file||!options.url||!options.title)throw Error('index requires --file, --url and --title');
 console.log(JSON.stringify(await indexPdf(id,resolve(options.file),options.url,options.title,options['ocr-json'])));
}else if(command==='fetch'){
 // Errors are reported as JSON with a non-zero exit code; a thrown error during an open fetch crashes libuv on Windows.
 await (async()=>{try{
 if(!/^https?:\/\//.test(options.url||''))throw Error('fetch requires --url http(s)://…');
 const known=(await manifests()).find(m=>urlKey(m.url)===urlKey(options.url));
 if(known){console.log(JSON.stringify({id:known.id,kind:known.kind||'pdf',reused:true,pdf_pages:known.pdf_pages,title:known.title}));return;}
 const sourceId=id||slugId(options.url);
 const response=await fetch(options.url,{redirect:'follow',headers:{'user-agent':'Mozilla/5.0 (compatible; research-source-cache)','accept':'application/pdf,text/html;q=0.9,*/*;q=0.5'},signal:AbortSignal.timeout(Number(options.timeout||120000))});
 if(!response.ok)throw Error('HTTP '+response.status+' for '+options.url+'; nothing cached');
 const bytes=Buffer.from(await response.arrayBuffer());
 if(bytes.subarray(0,1024).includes(Buffer.from('%PDF-'))){
  const folder=join(project,'../var/namedays-research/fetched');await mkdir(folder,{recursive:true});
  const file=join(folder,createHash('sha256').update(bytes).digest('hex').slice(0,16)+'.pdf');await writeFile(file,bytes);
  const title=options.title||decodeURIComponent(new URL(options.url).pathname.split('/').pop()||options.url);
  console.log(JSON.stringify({...await indexPdf(sourceId,file,options.url,title),kind:'pdf'}));
 }else if(/html|xml|text\/plain/i.test(response.headers.get('content-type')||'')||/<html|<body|<!doctype/i.test(bytes.subarray(0,2048).toString('utf8'))){
  console.log(JSON.stringify(await indexHtml(sourceId,bytes,options.url,options.title)));
 }else throw Error('Unsupported content type '+(response.headers.get('content-type')||'unknown')+'; nothing cached');
 }catch(e){console.log(JSON.stringify({error:e.message,url:options.url}));process.exitCode=1;}})();
}else if(command==='list'){
 const rows=[];
 for(const entry of (await readdir(cache,{withFileTypes:true})).filter(e=>e.isDirectory()&&/^[-A-Z0-9]+$/.test(e.name)).sort((a,b)=>a.name.localeCompare(b.name))){
  try{const info=JSON.parse(await readFile(join(cache,entry.name,'source.json'),'utf8'));rows.push({id:info.id,kind:info.kind||'pdf',pdf_pages:info.pdf_pages,title:info.title,url:info.url});}catch{}
 }
 console.log(JSON.stringify(rows,null,2));
}else if(command==='search'&&everySource){
 if(!options.query)throw Error('search requires --query');
 const query=options.query.normalize('NFC').toLocaleLowerCase(),limit=Number(options.limit||5),results=[];
 for(const entry of (await readdir(cache,{withFileTypes:true})).filter(e=>e.isDirectory()&&/^[-A-Z0-9]+$/.test(e.name)).sort((a,b)=>a.name.localeCompare(b.name))){
  let info;try{info=JSON.parse(await readFile(join(cache,entry.name,'source.json'),'utf8'));}catch{continue;}
  const parsed=JSON.parse(await readFile(join(cache,'objects',info.object,'pages-v'+info.parserVersion+'.json'),'utf8')),hits=[];
  for(const page of parsed.pages){const lower=page.text.toLocaleLowerCase();let offset=0,index;while((index=lower.indexOf(query,offset))!==-1){const end=index+query.length;offset=end;if(options.word==='true'&&(/[\p{L}\p{M}]/u.test(lower[index-1]||'')||/[\p{L}\p{M}]/u.test(lower[end]||'')))continue;hits.push({pdf_page:page.pdf_page,context:page.text.slice(Math.max(0,index-120),end+160).replace(/\s+/g,' ')});}}
  if(hits.length)results.push({id:info.id,title:info.title,url:info.url,total_hits:hits.length,hits:hits.slice(0,limit)});
 }
 console.log(JSON.stringify({query:options.query,sources_with_hits:results.length,results},null,2));
}else if(command==='search'){
 if(!options.query)throw Error('search requires --query');
 const info=JSON.parse(await readFile(manifest,'utf8')),parsed=JSON.parse(await readFile(join(cache,'objects',info.object,'pages-v'+info.parserVersion+'.json'),'utf8'));
 const query=options.query.normalize('NFC').toLocaleLowerCase(),hits=[];
 for(const page of parsed.pages){const lower=page.text.toLocaleLowerCase();let offset=0,index;while((index=lower.indexOf(query,offset))!==-1){const end=index+query.length;offset=end;if(options.word==='true'&&(/[\p{L}\p{M}]/u.test(lower[index-1]||'')||/[\p{L}\p{M}]/u.test(lower[end]||'')))continue;hits.push({pdf_page:page.pdf_page,context:page.text.slice(Math.max(0,index-180),end+240)});}}
 console.log(JSON.stringify({id,title:info.title,url:info.url,sha256:info.sha256,hits},null,2));
}else throw Error('Use fetch, index, search or list');
