import path from 'node:path';
import {mkdir,writeFile,cp,open,unlink} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {database} from '../services/database.mjs';
import {initializeElectricity} from '../parsers/electricity.mjs';
import {initializeGas} from '../parsers/gas.mjs';
import {initializeMarkets} from '../parsers/markets.mjs';
import {initializeHoroscope,horoscopeData} from '../parsers/horoscope.mjs';
import {runPlannedUpdates} from '../services/update-runner.mjs';
import {rigaDay} from '../services/update-plan.mjs';
const profile=process.argv.find(a=>a.startsWith('--profile='))?.slice(10)||'auto';
const force=process.argv.includes('--force'),dryRun=process.argv.includes('--plan'),offline=process.argv.includes('--offline');
const dir=path.resolve(process.env.DATA_DIR||'var');await mkdir(dir,{recursive:true});
const lockPath=path.join(dir,'.update.lock');
let lock;try{lock=await open(lockPath,'wx');}catch(e){if(e.code==='EEXIST')throw Error('Another update owns '+lockPath+'. Verify that it has stopped before removing a leftover lock.');throw e;}
await lock.writeFile(JSON.stringify({pid:process.pid,started_at:new Date().toISOString(),profile}));
let db;
try{
 db=database(dir);initializeElectricity(db);initializeGas(db);initializeMarkets(db);initializeHoroscope(db);
 const report=offline?{profile,offline:true,tasks:[],errors:[],status:'ok'}:await runPlannedUpdates(db,dir,{profile,force,dryRun});
 if(dryRun){
  if(process.argv.includes('--json'))console.log(JSON.stringify(report,null,2));
  else{
   const display=value=>value?new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Riga',dateStyle:'short',timeStyle:'short'}).format(new Date(value)):'never';
   const cadence=task=>task.period==='day'?'daily':task.period==='month'?'monthly':task.interval>=86400000?(task.interval/86400000)+' days':task.interval>=3600000?(task.interval/3600000)+' hours':(task.interval/60000)+' min';
   const next=task=>{if(task.due)return'now';if(task.next_check_at)return display(task.next_check_at);if(!task.last_success)return'after cooldown';if(task.notBeforeHour){const today=new Date(rigaDay(report.started_at)+'T00:00:00Z');if(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Riga',hour:'2-digit',hourCycle:'h23'}).format(new Date(report.started_at))>=String(task.notBeforeHour)){today.setUTCDate(today.getUTCDate()+1);}return today.toISOString().slice(0,10)+' '+task.notBeforeHour+':00';}const date=new Date(rigaDay(task.last_success)+'T00:00:00Z');if(task.period==='month'){date.setUTCDate(1);date.setUTCMonth(date.getUTCMonth()+1);}else date.setUTCDate(date.getUTCDate()+1);return date.toISOString().slice(0,10)+' 00:00';};
   console.log('Update plan (Europe/Riga). No source requests or publication.');
   console.table(report.tasks.map(t=>({Task:t.id,Cadence:cadence(t),Status:t.status,Reason:t.reason,'Last success':display(t.last_success),'Next check':next(t)})));
  }
 }
 else{
  horoscopeData(db); // Local date-keyed cache; no remote horoscope provider is called.
  const exported=spawnSync(process.execPath,['scripts/export-static.mjs'],{stdio:'inherit',env:{...process.env,DATA_DIR:dir}});
  if(exported.status!==0)throw Error('Static export failed');
  await mkdir('data',{recursive:true});
  if(profile==='current'||profile==='prices'){
   // A price-only command never publishes horoscope/calendar/history-reference files.
   const files=['electricity.json','exchange.json','gas.json','fuel.json','fuel-LV.json','fuel-LT.json','fuel-EE.json'];
   for(const folder of ['', 'lv','lt','et','ru','en']){await mkdir(path.join('data',folder),{recursive:true});for(const file of files)await cp(path.join('artifacts/static-site/data',folder,file),path.join('data',folder,file));}
  }else await cp('artifacts/static-site/data','data',{recursive:true});
  try{await cp(path.join(dir,'collector/fuel-stations.geojson'),'data/fuel-stations.geojson');}catch(e){if(e.code!=='ENOENT')throw e;}
  await mkdir('artifacts',{recursive:true});await writeFile('artifacts/update-report.json',JSON.stringify(report,null,2));
  console.log(JSON.stringify({status:report.status,profile,errors:report.errors,report:'artifacts/update-report.json'}));
 }
}finally{try{db?.close();}finally{await lock.close();await unlink(lockPath);}}
