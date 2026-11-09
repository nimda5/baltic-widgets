import {mkdir,writeFile} from 'node:fs/promises';
import {load} from 'cheerio';
import {createFuelHTTP,fuelHTTPHeaders} from '../parsers/fuel-http.mjs';
import {parseCircle} from '../parsers/fuel.mjs';
import {parseCircleDirectory} from '../parsers/circle-directory.mjs';
import {parseVirsiDirectory} from '../parsers/lv-directories.mjs';
const legacy=process.argv.includes('--legacy'),report={at:new Date().toISOString(),mode:legacy?'legacy_headers':'standard_headers',user_agent:legacy?'BalticFuelWidgets/0.1':fuelHTTPHeaders['User-Agent'],responses:[],results:[]};
// Diagnostics use the same transport as collection. They do not change prices,
// scheduler state, browser sessions, Git history or published files.
const request=createFuelHTTP({onResponse:entry=>report.responses.push(entry)});
const headers=legacy?{'User-Agent':'BalticFuelWidgets/0.1','Accept':'*/*','Accept-Language':'*'}:{};
let virsiHTML;
for(const [name,url,parse] of [
 ['Circle K prices','https://www.circlek.lv/degviela-miles/degvielas-cenas',parseCircle],
 ['Circle K directory','https://www.circlek.lv/station-search',parseCircleDirectory],
 ['Virsi directory page','https://www.virsi.lv/lv/privatpersonam/uzpildes-stacijas',html=>{virsiHTML=html;return[];}]
]){
 try{const html=await request(url,headers),rows=parse(html);report.results.push({name,url,status:'ok',records:rows.length});}
 catch(e){report.results.push({name,url,status:'error',error:e.message});}
}
if(virsiHTML){
 const endpoint=load(virsiHTML)('stations-app').attr('stations-data-url');
 if(endpoint&&new URL(endpoint).origin==='https://www.virsi.lv'){
  try{const rows=parseVirsiDirectory(JSON.parse(await request(endpoint,headers)));report.results.push({name:'Virsi directory JSON',status:'ok',records:rows.length});}
  catch(e){report.results.push({name:'Virsi directory JSON',status:'error',error:e.message});}
 }else report.results.push({name:'Virsi directory JSON',status:'error',error:'Official endpoint missing or changed'});
}
await mkdir('artifacts',{recursive:true});await writeFile('artifacts/fuel-http-diagnostics.json',JSON.stringify(report,null,2));
console.table(report.responses.map(r=>({URL:r.url,HTTP:r.status,Server:r.server,'Time (ms)':r.elapsed_ms,'Request ID':r.request_id})));
console.table(report.results);console.log('Diagnostic report: artifacts/fuel-http-diagnostics.json');
if(report.results.some(r=>r.status==='error'))process.exitCode=1;
