import test from 'node:test';
import assert from 'node:assert/strict';
import {colorTrend,energyUnit} from '../public/chart-math.js';
import {electricityQuoteAt} from '../public/electricity-time.js';
test('energy price reductions are favourable while market colour direction is unchanged',()=>{
 for(const unit of ['EUR/l','EUR/kWh','EUR/MWh']){assert.equal(energyUnit(unit),true);assert.equal(colorTrend(-1,energyUnit(unit)),'up');assert.equal(colorTrend(1,energyUnit(unit)),'down');}
 for(const unit of ['USD','EUR','EUR / oz','EUR / BTC']){assert.equal(energyUnit(unit),false);assert.equal(colorTrend(1,energyUnit(unit)),'up');assert.equal(colorTrend(-1,energyUnit(unit)),'down');}
 assert.equal(colorTrend(0,true),'flat');
});
test('current electricity interval advances using cached future slots and expires at the end of coverage',()=>{
 const quote={price_eur_mwh:100,valid_from:'2026-11-09T12:00:00Z',valid_to:'2026-11-09T12:15:00Z',resolution_seconds:900,history:[{at:'2026-11-09T12:00:00Z',value:100},{at:'2026-11-09T12:15:00Z',value:50},{at:'2026-11-09T12:30:00Z',value:-5}]};
 const second=electricityQuoteAt(quote,Date.parse('2026-11-09T12:20:00Z'));
 assert.equal(second.price_eur_mwh,50);assert.equal(second.previous_eur_mwh,100);assert.equal(second.valid_to,'2026-11-09T12:30:00.000Z');
 assert.equal(electricityQuoteAt(quote,Date.parse('2026-11-09T12:35:00Z')).price_eur_mwh,-5);
 assert.equal(electricityQuoteAt(quote,Date.parse('2026-11-09T12:45:00Z')),null);
 assert.equal(electricityQuoteAt(quote,Date.parse('2026-11-09T11:59:00Z')),null);
});
