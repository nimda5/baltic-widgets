import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {runPlannedUpdates} from './update-runner.mjs';
import {saveElectricity} from '../parsers/electricity.mjs';

test('morning electricity recovery checks each market current interval, not its last success date',async()=>{
 const db=new DatabaseSync(':memory:');db.exec('CREATE TABLE metadata(key TEXT PRIMARY KEY,value TEXT)');
 const dir=await mkdtemp(path.join(tmpdir(),'widget-recovery-'));
 const now=new Date('2026-11-23T11:36:00Z');
 db.prepare('INSERT INTO metadata VALUES(?,?)').run('update_schedule_v1',JSON.stringify({electricity:{last_success:'2026-11-21T21:18:58Z'}}));
 const row={at:'2026-11-23T11:30:00.000Z',valid_to:'2026-11-23T11:45:00.000Z',value:50,resolution:900};
 try{
  saveElectricity(db,['LV','LT','EE'].map(market=>({...row,market})));
  const plan=()=>runPlannedUpdates(db,dir,{now,profile:'prices',dryRun:true});
  assert.equal((await plan()).tasks.find(t=>t.id==='electricity').due,false);
  db.prepare("DELETE FROM electricity_prices WHERE market='EE'").run();
  assert.equal((await plan()).tasks.find(t=>t.id==='electricity').due,true);
  // A later record cannot hide a gap in the current delivery interval.
  saveElectricity(db,[{...row,market:'EE',at:'2026-11-23T12:00:00.000Z',valid_to:'2026-11-23T12:15:00.000Z'}]);
  assert.equal((await plan()).tasks.find(t=>t.id==='electricity').due,true);
  db.prepare('DELETE FROM electricity_prices').run();
  assert.equal((await plan()).tasks.find(t=>t.id==='electricity').due,true);
 }finally{db.close();await rm(dir,{recursive:true,force:true});}
});
test('dry plans make no requests; failed work is not marked successful and repeat calls respect cooldowns',async()=>{
 const db=new DatabaseSync(':memory:');db.exec('CREATE TABLE metadata(key TEXT PRIMARY KEY,value TEXT)');
 const dir=await mkdtemp(path.join(tmpdir(),'widget-plan-'));let fuelCalls=0,electricityCalls=0;
 const executors={fuel:async()=>{fuelCalls++;return{errors:['HTTP 403']};},electricity:async()=>{electricityCalls++;return{rows_received:1};}};
 try{
  await runPlannedUpdates(db,dir,{profile:'prices',dryRun:true,executors});
  assert.equal(fuelCalls+electricityCalls,0);assert.equal(db.prepare('SELECT count(*) AS n FROM metadata').get().n,0);
  const first=await runPlannedUpdates(db,dir,{profile:'prices',executors});
  assert.equal(first.status,'degraded');assert.equal(first.tasks[0].status,'error');assert.equal(first.tasks[1].status,'updated');
  const state=JSON.parse(db.prepare("SELECT value FROM metadata WHERE key='update_schedule_v1'").get().value);
  assert.equal(state.fuel.last_success,undefined);assert.ok(state.fuel.last_attempt);assert.ok(state.electricity.last_success);
  const second=await runPlannedUpdates(db,dir,{profile:'prices',executors});
  assert.equal(second.tasks[0].reason,'retry_cooldown');assert.ok(second.tasks.every(t=>t.status==='skipped'));
  assert.equal(fuelCalls,1);assert.equal(electricityCalls,1);
 }finally{db.close();await rm(dir,{recursive:true,force:true});}
});
