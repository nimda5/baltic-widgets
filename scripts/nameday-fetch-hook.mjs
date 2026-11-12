// Claude Code PostToolUse hook for WebFetch: every page or PDF opened during research is also saved
// once in the private source cache (../var/namedays-sources), so later rounds can search it offline
// instead of finding, downloading and parsing it again. Each attempt is appended to fetch-log.jsonl.
// Never blocks or fails the tool call: all errors are logged and the hook exits 0.
import {spawnSync} from 'node:child_process';
import {appendFile,mkdir} from 'node:fs/promises';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';

const project=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const cache=resolve(project,'../var/namedays-sources');
const SKIP=/(^|\.)(localhost|127\.0\.0\.1|claude\.ai|anthropic\.com|github\.com|githubusercontent\.com|google\.[a-z.]+|bing\.com|duckduckgo\.com)$/i;
let input='';
for await(const chunk of process.stdin)input+=chunk;
try{
 const event=JSON.parse(input||'{}'),url=event.tool_input?.url;
 if(event.tool_name==='WebFetch'&&/^https?:\/\//.test(url||'')&&!SKIP.test(new URL(url).hostname)){
  const run=spawnSync(process.execPath,[join(project,'scripts/nameday-source-cache.mjs'),'fetch','--url',url,'--timeout','90000'],{encoding:'utf8',windowsHide:true,timeout:120000});
  let result;try{result=JSON.parse(run.stdout.trim().split('\n').pop());}catch{result={error:(run.stderr||run.error?.message||'no output').slice(0,300)};}
  await mkdir(cache,{recursive:true});
  await appendFile(join(cache,'fetch-log.jsonl'),JSON.stringify({at:new Date().toISOString(),via:'WebFetch hook',url,...result})+'\n');
 }
}catch(e){
 try{await mkdir(cache,{recursive:true});await appendFile(join(cache,'fetch-log.jsonl'),JSON.stringify({at:new Date().toISOString(),via:'WebFetch hook',error:e.message})+'\n');}catch{}
}
process.exitCode=0;
