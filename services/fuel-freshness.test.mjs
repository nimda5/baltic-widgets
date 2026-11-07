import test from 'node:test';
import assert from 'node:assert/strict';
import {FUEL_MAX_AGE_MS,fuelPriceState,fuelQuoteFreshness} from '../public/fuel-freshness.js';
test('the fuel-price limit is exactly 48 hours for every source and evidence type',()=>{
 const now=Date.parse('2026-11-07T12:00:00Z');
 for(const source of ['straujupite','circle','virsi','kool','neste','lea','fuelest'])for(const evidence of ['operator_published','operator_reported_to_LEA','community_reported']){
  const quote={source,evidence,price:1.7,observed_at:new Date(now-FUEL_MAX_AGE_MS).toISOString(),freshness:'recent'};
  assert.equal(fuelPriceState(quote,now),'recent');assert.equal(fuelPriceState(quote,now+1),'stale');
 }
});
test('explicit dates override collection time; undated prices expire from their last successful fetch',()=>{
 const now=Date.parse('2026-11-07T12:00:00Z');
 assert.equal(fuelPriceState({price:1.7,observed_date:'2026-11-02',fetched_at:new Date(now).toISOString(),freshness:'recent'},now),'stale');
 const undated={price:1.7,fetched_at:new Date(now).toISOString()};
 assert.equal(fuelPriceState(undated,now),'recent');
 assert.equal(fuelPriceState(undated,now+FUEL_MAX_AGE_MS),'recent');
 assert.equal(fuelPriceState(undated,now+FUEL_MAX_AGE_MS+1),'stale');
 assert.equal(fuelPriceState({price:1.7},now),'unknown');
 assert.equal(fuelPriceState({...undated,observed_at:'invalid'},now),'unknown');
 assert.equal(fuelPriceState(null,now),'missing');
 assert.equal(fuelQuoteFreshness({observed_at:'invalid'},now),'unknown');
 assert.equal(fuelQuoteFreshness({observed_at:'2026-11-09T12:00:00Z'},now),'unknown');
});
