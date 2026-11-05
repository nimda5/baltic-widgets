import path from 'node:path';
import {mkdir,writeFile,cp,open,unlink} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {database,saveStations} from '../services/database.mjs';
import {run as collectFuel} from '../parsers/fuel.mjs';
import {refreshArchive} from '../parsers/oil-history.mjs';
import {initializeElectricity,refreshElectricity} from '../parsers/electricity.mjs';
import {initializeGas,refreshGas} from '../parsers/gas.mjs';
import {initializeMarkets,refreshMarkets,refreshCommodityArchive} from '../parsers/markets.mjs';
import {initializeHoroscope,horoscopeData} from '../parsers/horoscope.mjs';
const dir=path.resolve(process.env.DATA_DIR||'var');await mkdir(dir,{recursive:true});
const lockPath=path.join(dir,'.update.lock');
let lock;try{lock=await open(lockPath,'wx');}catch(e){if(e.code==='EEXIST')throw Error('Another update owns '+lockPath+'. After a crash, verify that it is no longer running before removing this lock.');throw e;}
await lock.writeFile(JSON.stringify({pid:process.pid,started_at:new Date().toISOString()}));
const db=database(dir),report={started_at:new Date().toISOString(),offline:process.argv.includes('--offline'),errors:[]};
async function step(name,fn){try{const value=await fn();report[name]=value;for(const e of value?.errors||[])report.errors.push(name+': '+e);return value;}catch(e){report.errors.push(name+': '+e.message);console.error(name+': '+e.message);}}
try{
  initializeElectricity(db);initializeGas(db);initializeMarkets(db);initializeHoroscope(db);
  if(!report.offline){
    await step('fuel',async()=>{const doc=await collectFuel(path.join(dir,'collector'),undefined,{setExitCode:false});saveStations(db,doc);return{stations:doc.data.length,errors:doc.sources.filter(x=>x.status==='error').map(x=>x.id+': '+x.error)};});
    await step('fuel_archive',()=>refreshArchive(db,dir));
    await step('electricity',()=>refreshElectricity(db,Date.now(),{archiveDir:path.join(dir,'archives','electricity')}));
    await step('gas',()=>refreshGas(db,dir));
    await step('markets',()=>refreshMarkets(db,dir));
    await step('commodity_archive',()=>refreshCommodityArchive(db,dir));
  }
  horoscopeData(db); // Cache today's and tomorrow's readings before exporting.
  const exportRun=spawnSync(process.execPath,['scripts/export-static.mjs'],{stdio:'inherit',env:{...process.env,DATA_DIR:dir}});
  if(exportRun.status!==0)throw Error('Static export failed');
  await mkdir('data',{recursive:true});await cp('artifacts/static-site/data','data',{recursive:true});
  try{await cp(path.join(dir,'collector','fuel-stations.geojson'),'data/fuel-stations.geojson');}catch(e){if(e.code!=='ENOENT')throw e;}
  report.status=report.errors.length?'degraded':'ok';report.finished_at=new Date().toISOString();
  await mkdir('artifacts',{recursive:true});await writeFile('artifacts/update-report.json',JSON.stringify(report,null,2));
  console.log(JSON.stringify({status:report.status,finished_at:report.finished_at,errors:report.errors,data:'data/',database:path.join(dir,'widgets.sqlite')}));
}finally{db.close();await lock.close();await unlink(lockPath);}
