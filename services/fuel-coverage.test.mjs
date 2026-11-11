import test from 'node:test';
import assert from 'node:assert/strict';
import {fuelCoverage} from './fuel-coverage.mjs';

test('successful collection reports expired community prices and directory-only gaps separately',()=>{
 const now=Date.parse('2026-11-10T20:00:00Z');
 const fresh={price:1.7,observed_at:'2026-11-10T10:00:00Z',source_status:'ok'};
 const old={...fresh,observed_at:'2026-11-05T10:00:00Z',fetched_at:new Date(now).toISOString(),freshness:'recent'};
 const provider=(name,prices)=>({name,prices,stations:[]});
 const result=fuelCoverage([{data:{country:'EE',providers:[provider('Hepa',{petrol95:old,diesel:fresh})]}},
  {data:{country:'LV',providers:[provider('Rietumu Nafta',{diesel:fresh})],more_providers:[provider('Neste',{})]}}],now);
 assert.equal(result.status,'partial');assert.equal(result.available,2);
 assert.deepEqual(result.gaps.map(g=>g.reason),['stale','connected_source_publishes_diesel_only','directory_only_no_fresh_community_report','directory_only_no_fresh_community_report']);
 assert.equal(result.gaps[0].last_published,old.observed_at);
});
test('a failed source is a coverage gap even with a recent publication date',()=>{
 const q={price:1.7,fetched_at:new Date().toISOString(),source_status:'error'};
 const result=fuelCoverage([{data:{country:'EE',providers:[{name:'Test',prices:{petrol95:q,diesel:q},stations:[]}]}}]);
 assert.equal(result.available,0);assert.ok(result.gaps.every(g=>g.reason==='source_unavailable'));
});
