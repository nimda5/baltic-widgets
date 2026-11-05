import {spawnSync} from 'node:child_process';
const run=(args,options={})=>{const r=spawnSync('git',args,{encoding:'utf8',...options});if(r.status!==0)throw Error(r.stderr||'git '+args[0]+' failed');return r.stdout.trim();};
if(run(['branch','--show-current'])!=='main')throw Error('Publish data from main. Merge code changes separately first.');
if(run(['diff','--cached','--name-only']))throw Error('The index already contains staged changes. Commit or unstage those first.');
run(['add','--','data/']);
if(!run(['diff','--cached','--name-only','--','data/'])){console.log('No data changes to publish.');process.exit(0);}
run(['commit','-m','Update public widget data '+new Date().toISOString().slice(0,10),'--','data/']);
run(['push','origin','main']);console.log('Public JSON pushed; GitHub Pages workflow will deploy it.');
