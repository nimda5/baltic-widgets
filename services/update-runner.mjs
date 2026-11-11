import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {planUpdates,rigaDay,rigaHour} from './update-plan.mjs';
import {ensureCollectorState} from './collector-state.mjs';
import {saveStations} from './database.mjs';
import {run as collectFuel} from '../parsers/fuel.mjs';
import {refreshArchive} from '../parsers/oil-history.mjs';
import {refreshElectricity} from '../parsers/electricity.mjs';
import {refreshGas} from '../parsers/gas.mjs';
import {refreshMarkets,refreshCommodityArchive} from '../parsers/markets.mjs';
import {refreshEuribor} from '../parsers/euribor.mjs';
import {horoscopeData} from '../parsers/horoscope.mjs';
import {refreshNamedayStatistics} from '../scripts/update-nameday-statistics.mjs';
import {refreshEstonianNameStatistics} from '../scripts/update-nameday-statistics-ee.mjs';
import {refreshLithuanianNameStatistics} from '../scripts/update-nameday-statistics-lt.mjs';
const meta=(db,key)=>JSON.parse(db.prepare('SELECT value FROM metadata WHERE key=?').get(key)?.value||'null');
export async function scheduleState(db,dir){
 const state=meta(db,'update_schedule_v1')||{};
 const seed=(id,at)=>{if(!state[id]&&at&&Number.isFinite(Date.parse(at)))state[id]={last_success:at};};
 // Adopt successful work already done before this scheduler was introduced.
 let collector;try{collector=JSON.parse(await readFile(path.join(dir,'collector/fuel-stations.json'),'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
 const latest=values=>values.filter(Boolean).sort().at(-1);
 seed('fuel',latest((collector?.sources||[]).filter(s=>s.id!=='neste').map(s=>s.last_success_at)));
 seed('directories',latest((collector?.data||[]).map(s=>s.directory_updated_at)));
 seed('electricity',meta(db,'electricity_backfill')?.updated_at);
 seed('gas',meta(db,'gas')?.updated_at);seed('markets',meta(db,'markets_last_run')?.updated_at);
 seed('euribor',meta(db,'euribor_last_run')?.updated_at);
 seed('fuel_archive',meta(db,'archive')?.imported_at);seed('commodity_archive',meta(db,'worldbank_archive')?.checked_at);
 try{const names=JSON.parse(await readFile(new URL('../public/data/namedays/population-lv.json',import.meta.url),'utf8'));seed('nameday_statistics',names.checked_at);}catch(e){if(e.code!=='ENOENT')throw e;}
 return state;
}
export async function runPlannedUpdates(db,dir,{profile='auto',force=false,now=new Date(),dryRun=false,fuelIntervalHours=6,executors={}}={}){
 const state=await scheduleState(db,dir),plan=planUpdates(state,{profile,force,now});
 // The server may opt for a slower fuel cadence, never faster than six hours.
 for(const task of plan)if(task.id==='fuel'&&!force&&profile!=='full'&&task.last_success&&+now-Date.parse(task.last_success)<fuelIntervalHours*3600000){task.due=false;task.reason='not_due';}
 const report={started_at:now.toISOString(),profile,force,tasks:[],errors:[]};
 if(dryRun)return{...report,tasks:plan.map(t=>({...t,status:t.due?'due':'skipped'}))};
 const fuel=async mode=>{await ensureCollectorState(db,path.join(dir,'collector'));const doc=await collectFuel(path.join(dir,'collector'),undefined,{mode,setExitCode:false});saveStations(db,doc);return{stations:doc.data.length,errors:doc.errors||[]};};
 const electricity=async()=>{
  const result=await refreshElectricity(db,Date.now(),{backfill:profile==='full'});
  if(rigaHour(new Date())>=15){
   const tomorrow=new Date(rigaDay(new Date())+'T12:00:00Z');tomorrow.setUTCDate(tomorrow.getUTCDate()+1);
   const expected=rigaDay(tomorrow);
   const complete=db.prepare("SELECT market,max(valid_to) AS until FROM electricity_prices WHERE source='elering' GROUP BY market").all();
   if(complete.length!==3||complete.some(r=>rigaDay(r.until)<=expected))throw Error('Next-day electricity schedule is not complete yet; cached data retained, retry in one hour');
  }
  return result;
 };
 const handlers={euribor:()=>refreshEuribor(db,dir),directories:()=>fuel('directories'),fuel:()=>fuel('prices'),electricity,gas:()=>refreshGas(db,dir),markets:()=>refreshMarkets(db,dir,new Date(),{backfill:profile==='full'}),horoscope:()=>{horoscopeData(db);return{date:rigaDay(new Date())};},fuel_archive:()=>refreshArchive(db,dir,true),commodity_archive:()=>refreshCommodityArchive(db,dir,new Date(),{force:true}),nameday_statistics:async()=>({lv:await refreshNamedayStatistics({force:true}),lt:await refreshLithuanianNameStatistics({force:true}),ee:await refreshEstonianNameStatistics()})};
 Object.assign(handlers,executors);
 for(const task of plan){
  if(!task.due){console.log(`[skip] ${task.id}: not due`);report.tasks.push({...task,status:'skipped'});continue;}
  console.log(`[run] ${task.id}: ${task.label}`);const attempt=new Date().toISOString();
  state[task.id]={...state[task.id],last_attempt:attempt};
  try{const result=await handlers[task.id]();if(result?.errors?.length)throw Error(result.errors.join('; '));state[task.id].last_success=new Date().toISOString();delete state[task.id].error;report.tasks.push({...task,status:'updated',result});}
  catch(e){state[task.id].error=e.message;report.errors.push(`${task.id}: ${e.message}`);report.tasks.push({...task,status:'error',error:e.message});console.error(`[error] ${task.id}: ${e.message}; previous valid data retained where available`);}
  db.prepare('INSERT OR REPLACE INTO metadata VALUES(?,?)').run('update_schedule_v1',JSON.stringify(state));
 }
 report.finished_at=new Date().toISOString();report.status=report.errors.length?'degraded':'ok';return report;
}
