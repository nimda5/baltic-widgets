import test from 'node:test';
import assert from 'node:assert/strict';
import {seriesForPeriod} from '../public/chart-periods.js';
const points=(from,to)=>[{at:from,value:1},{at:to,value:2}];
test('long gas periods select the independent long archive, short periods return to the regional series',()=>{
  const series=[{history:points('2026-09-07','2026-11-05')},{history:points('1960-01-01','2026-10-01'),frequency:'monthly'}];
  assert.equal(seriesForPeriod(series,1825),1);assert.equal(seriesForPeriod(series,365),1);assert.equal(seriesForPeriod(series,0),1);
  assert.equal(seriesForPeriod(series,30),0);assert.equal(seriesForPeriod(series,7),0);
});
test('electricity long periods use daily history, while the short interval series stays available',()=>{
  const series=[{intraday:true,history:points('2026-10-30','2026-11-05'),daily_history:points('2013-06-03','2026-11-05')}];
  assert.equal(seriesForPeriod(series,1825),0);assert.equal(seriesForPeriod(series,1),0);
});
