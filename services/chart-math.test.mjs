import test from 'node:test';
import assert from 'node:assert/strict';
import {chartWindow,priceChange,nearestPoint} from '../public/chart-math.js';

test('intraday windows retain the preceding day and all published future intervals',()=>{
  const now=Date.parse('2026-11-06T12:00:00Z'),hour=3600000;
  const points=[-25,-23,-1,0,1,30].map(h=>({at:now+h*hour,value:h}));
  assert.deepEqual(chartWindow(points,1,now,true),points.slice(1));
  assert.deepEqual(chartWindow(points,1,now,false),points.slice(-1));
  assert.deepEqual(chartWindow(points,0,now,true),points);
  assert.deepEqual(chartWindow([],1,now,true),[]);
});
test('price comparisons handle increases, decreases, negative and zero starting prices',()=>{
  assert.deepEqual(priceChange(100,125),{delta:25,percent:25});
  assert.deepEqual(priceChange(100,75),{delta:-25,percent:-25});
  assert.deepEqual(priceChange(-10,10),{delta:20,percent:200});
  assert.deepEqual(priceChange(0,10),{delta:10,percent:null});
});
test('nearest point uses time, including irregular spacing and edges',()=>{
  const points=[0,5,100].map(at=>({at}));
  for(const [at,index] of [[-1,0],[4,1],[6,1],[53,2],[500,2]])assert.equal(nearestPoint(points,at),index);
});
