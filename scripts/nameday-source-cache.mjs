// Private, content-addressed PDF text cache. Originals and extracted text never enter the repository.
import {readFile,writeFile,mkdir,copyFile,access} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';

const project=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const cache=resolve(project,'../var/namedays-sources');
const args=process.argv.slice(2),command=args.shift(),options={};
for(let i=0;i<args.length;i+=2){if(!args[i].startsWith('--')||args[i+1]===undefined)throw Error('Expected --key value');options[args[i].slice(2)]=args[i+1];}
const id=options.id;
if(!id||!/^[-A-Z0-9]+$/.test(id))throw Error('Supply a stable --id containing uppercase letters, digits or hyphens');
const manifest=join(cache,id,'source.json'),parserVersion=1;
if(command==='index'){
 if(!options.file||!options.url||!options.title)throw Error('index requires --file, --url and --title');
 const file=resolve(options.file),bytes=await readFile(file);
 if(!bytes.subarray(0,1024).includes(Buffer.from('%PDF-')))throw Error('Input is not a PDF');
 const sha256=createHash('sha256').update(bytes).digest('hex'),folder=join(cache,'objects',sha256),pagesPath=join(folder,'pages-v'+parserVersion+'.json');
 await mkdir(folder,{recursive:true});let reused=false;
 try{await access(pagesPath);reused=true;}catch{
  await copyFile(file,join(folder,'source.pdf'));
  let chunks,extraction='pdftotext -layout UTF-8';
  if(options['ocr-json']){
   const ocr=JSON.parse((await readFile(resolve(options['ocr-json']),'utf8')).replace(/^\uFEFF/,''));
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
 const info={id,title:options.title,url:options.url,sha256,parserVersion,extraction:parsed.extraction||'pdftotext -layout UTF-8',pdf_pages:parsed.pages.length,object:sha256,limitations:'Text search is a discovery aid. Visually inspect original pages for spelling, diacritics, columns and dates. Extraction does not grant republication rights.'};
 await mkdir(dirname(manifest),{recursive:true});await writeFile(manifest,JSON.stringify(info,null,2)+'\n');
 console.log(JSON.stringify({id,reused,pdf_pages:info.pdf_pages,sha256}));
}else if(command==='search'){
 if(!options.query)throw Error('search requires --query');
 const info=JSON.parse(await readFile(manifest,'utf8')),parsed=JSON.parse(await readFile(join(cache,'objects',info.object,'pages-v'+info.parserVersion+'.json'),'utf8'));
 const query=options.query.normalize('NFC').toLocaleLowerCase(),hits=[];
 for(const page of parsed.pages){const lower=page.text.toLocaleLowerCase();let offset=0,index;while((index=lower.indexOf(query,offset))!==-1){const end=index+query.length;offset=end;if(options.word==='true'&&(/[\p{L}\p{M}]/u.test(lower[index-1]||'')||/[\p{L}\p{M}]/u.test(lower[end]||'')))continue;hits.push({pdf_page:page.pdf_page,context:page.text.slice(Math.max(0,index-180),end+240)});}}
 console.log(JSON.stringify({id,title:info.title,url:info.url,sha256:info.sha256,hits},null,2));
}else throw Error('Use index or search');
