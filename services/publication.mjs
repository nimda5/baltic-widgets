import {createHash} from 'node:crypto';

export const contentHash=bytes=>createHash('sha256').update(bytes).digest('hex');

// A Git push, a completed build, and a live deployment are separate outcomes.
export async function waitForPublication({revision,files,getRun,getPublic,now=Date.now,
 wait=ms=>new Promise(resolve=>setTimeout(resolve,ms)),log=console.log,timeoutMs=20*60*1000,pollMs=15000}){
 const deadline=now()+timeoutMs;
 let pending='Waiting for the Pages workflow';
 while(now()<deadline){
  const run=await getRun(revision);
  if(run?.status==='completed'&&run.conclusion!=='success')throw Error(`Pages deployment ${run.conclusion}: ${run.url}`);
  if(run?.status==='completed'&&run.conclusion==='success'){
   const results=await Promise.all(files.map(async file=>{
    try{return contentHash(await getPublic(file.path))===file.hash?null:file.path;}
    catch{return file.path;}
   }));
   const mismatches=results.filter(Boolean);
   if(!mismatches.length)return{revision,run_url:run.url,verified_files:files.length,verified_at:new Date(now()).toISOString()};
   pending=`Pages completed; waiting for public files: ${mismatches.join(', ')}`;
  }else pending=`Waiting for Pages ${run?.status||'workflow to appear'}${run?.url?' ('+run.url+')':''}`;
  log(pending);await wait(Math.min(pollMs,Math.max(0,deadline-now())));
 }
 throw Error(`Publication was not verified before the timeout. ${pending}. A push alone does not mean the site is updated.`);
}
