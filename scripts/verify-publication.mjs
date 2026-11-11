import {spawnSync} from 'node:child_process';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {contentHash,waitForPublication} from '../services/publication.mjs';

const gh=args=>{
 const result=spawnSync('gh',args,{encoding:'utf8',timeout:30000});
 if(result.status!==0)throw Error(result.stderr||result.error?.message||'GitHub CLI failed');
 return result.stdout.trim();
};
const remote=spawnSync('git',['remote','get-url','origin'],{encoding:'utf8'});
if(remote.status!==0)throw Error('Cannot read the origin Git remote');
const repo=remote.stdout.trim().match(/^(?:https:\/\/github\.com\/|git@github\.com:)([^/]+\/[^/]+?)(?:\.git)?$/)?.[1];
if(!repo)throw Error('Expected a github.com origin remote');
const revision=process.argv[2];
if(!/^[a-f0-9]{40}$/.test(revision||''))throw Error('Expected the pushed Git revision');
// Get the actual Pages URL from this repository's deployment environment.
const deployments=JSON.parse(gh(['api',`repos/${repo}/deployments?environment=github-pages&per_page=10`]));
let siteURL=process.env.PUBLIC_SITE_URL;
for(const deployment of deployments){
 if(siteURL)break;
 const statuses=JSON.parse(gh(['api',`repos/${repo}/deployments/${deployment.id}/statuses`]));
 siteURL=statuses.find(s=>s.environment_url)?.environment_url;
}
if(!siteURL)throw Error('Cannot discover the Pages URL. Set PUBLIC_SITE_URL to the public site URL.');
const base=new URL(siteURL.endsWith('/')?siteURL:siteURL+'/');
const files=[];
// Verify each language and market, plus the other current-price widgets.
for(const folder of ['', 'lv/','lt/','et/','ru/','en/'])for(const name of ['fuel-LV','fuel-LT','fuel-EE','electricity','gas','exchange']){
 const file=`data/${folder}${name}.json`;
 files.push({path:file,hash:contentHash(await readFile(file))});
}
await mkdir('artifacts',{recursive:true});
const reportPath='artifacts/publication-report.json';
await writeFile(reportPath,JSON.stringify({status:'pending',revision,site_url:base.href},null,2));
try{
 const report=await waitForPublication({revision,files,
  getRun:async sha=>{
   const runs=JSON.parse(gh(['run','list','--repo',repo,'--workflow','pages.yml','--commit',sha,'--limit','10','--json','status,conclusion,url,createdAt']));
   return runs.sort((a,b)=>b.createdAt.localeCompare(a.createdAt))[0];
  },
  getPublic:async file=>{
   const url=new URL(file,base);url.searchParams.set('verify',revision+'-'+Date.now());
   const response=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(15000)});
   if(!response.ok)throw Error(`Public HTTP ${response.status}`);
   return Buffer.from(await response.arrayBuffer());
  }
 });
 await writeFile(reportPath,JSON.stringify({status:'verified',site_url:base.href,...report},null,2));
 console.log(`Publication verified: ${base.href} (${report.verified_files} public JSON files match local data).`);
}catch(error){
 await writeFile(reportPath,JSON.stringify({status:'unverified',revision,site_url:base.href,error:error.message},null,2));throw error;
}
