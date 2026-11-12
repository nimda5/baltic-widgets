import {spawnSync} from 'node:child_process';
import {randomUUID} from 'node:crypto';
import {mkdir,readFile,realpath,stat,copyFile,writeFile} from 'node:fs/promises';
import path from 'node:path';

export function publicationCommand(command,args,{capture=false,...options}={}){
 const result=spawnSync(command,args,{encoding:'utf8',stdio:capture?'pipe':'inherit',...options});
 if(result.error||result.status!==0)throw Error(result.error?.message||result.stderr?.trim()||`${command} failed (${result.status})`);
 return result.stdout?.trim()||'';
}

// Collection and publication use main; the caller's checkout and index stay untouched.
export async function runPublishedUpdate({root,profile='auto',force=false,dataDir,run=publicationCommand,log=console.log}){
 if(!['auto','prices','current','daily','weekly','monthly','full'].includes(profile))throw Error('Invalid update profile');
 root=await realpath(root);
 const env={...process.env,DATA_DIR:path.resolve(root,dataDir||process.env.DATA_DIR||'var')};
 const git=(args,cwd=root)=>run('git',args,{cwd,env,capture:true});
 git(['fetch','origin','main']);
 const revision=git(['rev-parse','refs/remotes/origin/main']);
 if(!/^[a-f0-9]{40}$/.test(revision))throw Error('Cannot resolve origin/main');
 const parent=path.join(root,'var','publication-worktrees');await mkdir(parent,{recursive:true});
 const managedRoot=await realpath(parent),relative=path.relative(root,managedRoot);
 if(!relative||relative.startsWith('..')||path.isAbsolute(relative))throw Error('Publication worktrees must stay inside this checkout');
 const worktree=path.join(managedRoot,Date.now()+'-'+randomUUID());
 git(['worktree','add','--detach',worktree,revision]);
 let published=false,publishedRevision;
 try{
  log(`Updating and publishing origin/main in ${worktree}. The active checkout is unchanged.`);
  let sharedDependencies=false;
  try{sharedDependencies=(await stat(path.join(root,'node_modules'))).isDirectory()&&Buffer.compare(await readFile(path.join(root,'package-lock.json')),await readFile(path.join(worktree,'package-lock.json')))===0;}catch(error){if(error.code!=='ENOENT')throw error;}
  if(!sharedDependencies){
   if(process.platform==='win32')run('powershell.exe',['-NoProfile','-Command','& npm.cmd ci; exit $LASTEXITCODE'],{cwd:worktree,env});
   else run('npm',['ci'],{cwd:worktree,env});
  }
  const args=['-NoProfile','-ExecutionPolicy','Bypass','-File',path.join(worktree,'scripts','update-widgets.ps1'),'-Profile',profile,'-NoPublish'];
  if(force)args.push('-Force');
  run('powershell.exe',args,{cwd:worktree,env});
  run(process.execPath,['scripts/publish-data.mjs'],{cwd:worktree,env:{...env,WIDGETS_PUBLICATION_WORKTREE:worktree,WIDGETS_PUBLICATION_MAIN:revision}});
  publishedRevision=git(['rev-parse','HEAD'],worktree);
  published=true;
 }catch(error){
  await mkdir(path.join(worktree,'artifacts'),{recursive:true});
  try{await stat(path.join(worktree,'artifacts','publication-report.json'));}catch(missing){if(missing.code!=='ENOENT')throw missing;await writeFile(path.join(worktree,'artifacts','publication-report.json'),JSON.stringify({status:'unverified',base_revision:revision,error:error.message},null,2));}
  throw Error(`${error.message}\nThe publication checkout and generated data were preserved at ${worktree}. The active checkout was not changed.`,{cause:error});
 }finally{
  // Keep the reports at the usual location, including failures, for manual and scheduled runs.
  await mkdir(path.join(root,'artifacts'),{recursive:true});
  for(const name of ['update-report.json','publication-report.json']){
   try{await copyFile(path.join(worktree,'artifacts',name),path.join(root,'artifacts',name));}catch(error){if(error.code!=='ENOENT')log(`Could not copy ${name}: ${error.message}`);}
  }
  if(published){
   // Only remove our exact managed checkout, after publication has been verified.
   if(path.dirname(await realpath(worktree))!==managedRoot)throw Error('Unsafe publication cleanup path');
   git(['worktree','remove','--force',worktree]);
  }
 }
 return{revision:publishedRevision,worktree,publication_verified:published};
}
