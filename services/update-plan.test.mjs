import test from 'node:test';
import assert from 'node:assert/strict';
import {planUpdates,updateTasks,rigaDay} from './update-plan.mjs';
test('repeated auto runs do not refresh station directories along with prices',()=>{
 const now=new Date('2026-11-09T12:00:00Z');
 const state=Object.fromEntries(updateTasks.map(t=>[t.id,{last_success:'2026-11-09T05:00:00Z'}]));
 const due=planUpdates(state,{now}).filter(t=>t.due).map(t=>t.id);
 assert.deepEqual(due,['fuel']);
 assert.deepEqual(planUpdates(state,{now,profile:'weekly'}).filter(t=>t.due),[]);
 assert.ok(planUpdates(state,{now,profile:'prices',force:true}).every(t=>['fuel','electricity'].includes(t.id)));
 assert.ok(!planUpdates(state,{now,profile:'current',force:true}).some(t=>t.id==='directories'));
});
test('electricity fetch waits for afternoon publication and does not repeat after a complete schedule',()=>{
 const state={electricity:{last_success:'2026-11-08T14:00:00Z'}};
 const task=now=>planUpdates(state,{profile:'prices',now:new Date(now)}).find(t=>t.id==='electricity');
 assert.equal(task('2026-11-09T10:00:00Z').due,false);
 assert.equal(task('2026-11-09T13:00:00Z').due,true);
 state.electricity.last_success='2026-11-09T10:00:00Z'; // Bootstrap before publication.
 assert.equal(task('2026-11-09T13:00:00Z').due,true);
 state.electricity.last_success='2026-11-09T13:05:00Z';
 assert.equal(task('2026-11-09T14:00:00Z').due,false);
 state.electricity={last_success:'2026-11-08T14:00:00Z',last_attempt:'2026-11-09T13:00:00Z',error:'Delayed publication'};
 assert.equal(task('2026-11-09T13:30:00Z').reason,'retry_cooldown');
 assert.equal(task('2026-11-09T14:01:00Z').due,true);
});
test('daily and monthly boundaries use Riga time and weekly jobs use elapsed days',()=>{
 const state=Object.fromEntries(updateTasks.map(t=>[t.id,{last_success:'2026-11-30T20:00:00Z'}]));
 const plan=planUpdates(state,{now:new Date('2026-11-30T22:05:00Z')});
 assert.equal(rigaDay('2026-11-30T22:05:00Z'),'2026-12-01');
 for(const id of ['gas','markets','horoscope','commodity_archive','nameday_statistics'])assert.equal(plan.find(t=>t.id===id).due,true,id);
 assert.equal(plan.find(t=>t.id==='directories').due,false);
});
test('failures have cooldowns, do not become successful, and force is explicit',()=>{
 const state={directories:{last_attempt:'2026-11-09T12:00:00Z',error:'HTTP 403'}};
 assert.equal(planUpdates(state,{profile:'weekly',now:new Date('2026-11-09T12:01:00Z')})[0].due,false);
 assert.equal(planUpdates(state,{profile:'weekly',now:new Date('2026-11-17T12:01:00Z')})[0].due,true);
 assert.equal(planUpdates(state,{profile:'weekly',force:true,now:new Date('2026-11-09T12:01:00Z')})[0].due,true);
 assert.throws(()=>planUpdates({}, {profile:'typo'}),/Unknown/);
});

test('Euribor is independent daily work after 16:00 Riga with hourly failure retries',()=>{
 const state={euribor:{last_success:'2026-11-09T14:05:00Z'}};
 const task=(now,profile='auto')=>planUpdates(state,{profile,now:new Date(now)}).find(t=>t.id==='euribor');
 assert.equal(task('2026-11-10T13:00:00Z').due,false);
 assert.equal(task('2026-11-10T14:01:00Z').due,true);
 assert.equal(task('2026-11-10T14:01:00Z','current').due,true);
 assert.equal(task('2026-11-10T14:01:00Z','prices'),undefined);
 state.euribor.last_attempt='2026-11-10T14:01:00Z';
 assert.equal(task('2026-11-10T14:30:00Z').reason,'retry_cooldown');assert.equal(task('2026-11-10T15:02:00Z').due,true);
 state.euribor.last_success='2026-11-10T15:03:00Z';assert.equal(task('2026-11-10T18:00:00Z').due,false);
});
