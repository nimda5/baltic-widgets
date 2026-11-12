import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtemp,mkdir,writeFile,readFile,rm,stat,realpath} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {runPublishedUpdate} from './published-update.mjs';

const source=new URL('../scripts/publish-data.mjs',import.meta.url);
function command(exe,args,options={}){const r=spawnSync(exe,args,{...options,stdio:'pipe',encoding:'utf8'});if(r.status!==0)throw Error(r.stderr||r.error?.message||`${exe} failed`);return r.stdout.trim();}
async function fixture(t){
 const parent=await realpath(tmpdir()),dir=await mkdtemp(path.join(parent,'widgets-publication-')),root=path.join(dir,'checkout'),remote=path.join(dir,'origin.git');
 t.after(async()=>{if(path.dirname(dir)!==parent||!path.basename(dir).startsWith('widgets-publication-'))throw Error('Unsafe fixture cleanup');await rm(dir,{recursive:true,force:true});});
 command('git',['init','--bare',remote]);await mkdir(root);const git=args=>command('git',args,{cwd:root});git(['init','-b','main']);git(['config','user.name','Publication test']);git(['config','user.email','publication@example.test']);
 await mkdir(path.join(root,'scripts'));await mkdir(path.join(root,'data'));await mkdir(path.join(root,'node_modules'));
 await writeFile(path.join(root,'.gitignore'),'var/\nartifacts/\nnode_modules/\n');await writeFile(path.join(root,'package.json'),'{"type":"module"}');await writeFile(path.join(root,'package-lock.json'),'{}');
 await writeFile(path.join(root,'scripts','publish-data.mjs'),await readFile(source));
 await writeFile(path.join(root,'scripts','update-widgets.ps1'),'# Main updater fixture');
 await writeFile(path.join(root,'scripts','verify-publication.mjs'),"import{mkdirSync,writeFileSync}from'node:fs';mkdirSync('artifacts',{recursive:true});writeFileSync('artifacts/publication-report.json',JSON.stringify({status:'verified',revision:process.argv[2]}));");
 await writeFile(path.join(root,'app.txt'),'main application');await writeFile(path.join(root,'data','prices.json'),'main prices');git(['add','.']);git(['commit','-m','Main baseline']);git(['remote','add','origin',remote]);git(['push','-u','origin','main']);
 git(['switch','-c','feature']);await writeFile(path.join(root,'app.txt'),'unfinished feature');await writeFile(path.join(root,'data','feature.json'),'unmerged feature data');git(['add','.']);git(['commit','-m','Feature changes']);
 await writeFile(path.join(root,'notes.txt'),'staged work');git(['add','notes.txt']);await writeFile(path.join(root,'data','prices.json'),'caller local prices');
 return{root,remote,git,status:git(['status','--porcelain']),head:git(['rev-parse','HEAD'])};
}
test('publishing updates main in isolation and preserves the active branch, index and local data',async t=>{
 const f=await fixture(t);let collected=false;
 const run=(exe,args,options)=>{
  if(exe==='powershell.exe'){
   assert(args.includes('-NoPublish'));assert(args.includes('-Force'));assert(args.includes('prices'));assert.notEqual(options.cwd,f.root);
   assert.equal(options.env.DATA_DIR,path.join(f.root,'private-db'));
   assert.equal(command('git',['branch','--show-current'],{cwd:options.cwd}),'');
   assert.equal(command('git',['show','HEAD:app.txt'],{cwd:options.cwd}),'main application');
   // A synchronous child simulates collection without touching live sources or databases.
   command(process.execPath,['-e',"require('fs').writeFileSync('data/prices.json','fresh main prices');require('fs').mkdirSync('artifacts',{recursive:true});require('fs').writeFileSync('artifacts/update-report.json',JSON.stringify({status:'ok'}))"],options);collected=true;return'';
  }
  return command(exe,args,options);
 };
 const r=await runPublishedUpdate({root:f.root,profile:'prices',force:true,dataDir:'private-db',run,log:()=>{}});
 assert(collected);assert(r.publication_verified);assert.equal(f.git(['status','--porcelain']),f.status);assert.equal(f.git(['rev-parse','HEAD']),f.head);assert.equal(f.git(['branch','--show-current']),'feature');assert.equal(await readFile(path.join(f.root,'data','prices.json'),'utf8'),'caller local prices');
 assert.equal(command('git',['--git-dir',f.remote,'show','main:app.txt']),'main application');assert.equal(command('git',['--git-dir',f.remote,'show','main:data/prices.json']),'fresh main prices');
 assert.throws(()=>command('git',['--git-dir',f.remote,'show','main:data/feature.json']));
 assert.equal(command('git',['--git-dir',f.remote,'rev-parse','main']),r.revision);await assert.rejects(stat(r.worktree),{code:'ENOENT'});
 assert.equal(JSON.parse(await readFile(path.join(f.root,'artifacts','publication-report.json'))).revision,r.revision);
});
test('a failed isolated update preserves its checkout and reports failure without publishing',async t=>{
 const f=await fixture(t),before=command('git',['--git-dir',f.remote,'rev-parse','main']);
 let kept;
 await assert.rejects(runPublishedUpdate({root:f.root,run:(exe,args,options)=>{if(exe==='powershell.exe'){kept=options.cwd;throw Error('Collection fixture failed');}return command(exe,args,options);},log:()=>{}}),/Collection fixture failed[\s\S]*preserved/);
 assert((await stat(kept)).isDirectory());assert.equal(f.git(['status','--porcelain']),f.status);assert.equal(command('git',['--git-dir',f.remote,'rev-parse','main']),before);assert.equal(JSON.parse(await readFile(path.join(f.root,'artifacts','publication-report.json'))).status,'unverified');
});
test('direct publication from a feature branch cannot publish its code or consume staged work',async t=>{
 const f=await fixture(t);assert.throws(()=>command(process.execPath,['scripts/publish-data.mjs'],{cwd:f.root}),/Direct data publication requires main/);assert.equal(f.git(['status','--porcelain']),f.status);
});
