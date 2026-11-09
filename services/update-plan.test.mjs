import test from 'node:test';
import assert from 'node:assert/strict';
import {planUpdates,updateTasks,rigaDay} from './update-plan.mjs';
test('repeated auto runs do not refresh station directories along with prices',()=>{
 const now=new Date('2026-11-09T12:00:00Z');
 const state=Object.fromEntries(updateTasks.map(t=>[t.id,{last_success:'2026-11-09T05:00:00Z'}]));
 const due=planUpdates(state,{now}).filter(t=>t.due).map(t=>t.id);
 assert.deepEqual(due,['fuel','electricity']);
 assert.deepEqual(planUpdates(state,{now,profile:'weekly'}).filter(t=>t.due),[]);
 assert.ok(planUpdates(state,{now,profile:'prices',force:true}).every(t=>['fuel','electricity'].includes(t.id)));
 assert.ok(!planUpdates(state,{now,profile:'current',force:true}).some(t=>t.id==='directories'));
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
