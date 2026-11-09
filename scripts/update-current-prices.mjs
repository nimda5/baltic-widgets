import path from 'node:path';
import {mkdir,open,unlink,writeFile,cp} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {database,saveStations} from '../services/database.mjs';
import {ensureCollectorState} from '../services/collector-state.mjs';
import {run as collectFuel} from '../parsers/fuel.mjs';
import {refreshElectricity} from '../parsers/electricity.mjs';
import {refreshGas} from '../parsers/gas.mjs';
import {refreshMarkets} from '../parsers/markets.mjs';
const dir=path.resolve(process.env.DATA_DIR||'var'),lockFile=path.join(dir,'.update.lock');
const lock=await open(lockFile,'wx');await lock.writeFile(JSON.stringify({pid:process.pid,started_at:new Date().toISOString(),mode:'current_prices'}));
let db;const report={started_at:new Date().toISOString(),mode:'current_prices',skipped:['fuel_history_archive','commodity_history_archive','name_statistics','horoscope_publication'],errors:[]};
async function step(name,fn){console.log('Refreshing '+name);try{const result=await fn();report[name]=result;for(const e of result?.errors||[])report.errors.push(name+': '+e);console.log(name+' finished');}catch(e){report.errors.push(name+': '+e.message);console.error(name+': '+e.message);}}
try{
 db=database(dir);
 // Refuse to start a historical backfill from a missing/incomplete database.
 for(const key of ['ecb_backfill','gold_backfill','bitcoin_backfill'])if(!db.prepare('SELECT value FROM metadata WHERE key=?').get(key))throw Error('Missing existing archive: '+key);
 if(JSON.parse(db.prepare("SELECT value FROM metadata WHERE key='electricity_backfill'").get()?.value||'null')?.archive_version!==2)throw Error('Missing electricity archive');
 await step('fuel',async()=>{await ensureCollectorState(db,path.join(dir,'collector'));const doc=await collectFuel(path.join(dir,'collector'),undefined,{setExitCode:false});saveStations(db,doc);return{stations:doc.data.length,sources:doc.sources,errors:doc.sources.filter(s=>s.status==='error').map(s=>s.id+': '+s.error)};});
 await step('electricity',()=>refreshElectricity(db));
 await step('gas',()=>refreshGas(db,dir));
 await step('markets',()=>refreshMarkets(db,dir));
 const result=spawnSync(process.execPath,['scripts/export-static.mjs'],{stdio:'inherit',env:{...process.env,DATA_DIR:dir}});if(result.status!==0)throw Error('Static export failed');
 const files=['electricity.json','exchange.json','gas.json','fuel.json','fuel-LV.json','fuel-LT.json','fuel-EE.json'];
 for(const folder of ['', 'lv','lt','et','ru','en'])for(const file of files)await cp(path.join('artifacts/static-site/data',folder,file),path.join('data',folder,file));
 await cp(path.join(dir,'collector/fuel-stations.geojson'),'data/fuel-stations.geojson');
 report.finished_at=new Date().toISOString();report.status=report.errors.length?'degraded':'ok';await mkdir('artifacts',{recursive:true});await writeFile('artifacts/current-price-update-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{try{db?.close();}finally{await lock.close();await unlink(lockFile);}}
