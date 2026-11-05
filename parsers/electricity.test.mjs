import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {parseElectricity,saveElectricity,electricityData} from './electricity.mjs';
test('electricity retains negative prices and actual delivery intervals, with no VAT conversion',()=>{
  const t=Date.parse('2026-11-05T10:00:00Z')/1000;
  const payload={success:true,data:Object.fromEntries(['lv','lt','ee'].map(m=>[m,[{timestamp:t,price:-10},{timestamp:t+900,price:25}]]))};
  const rows=parseElectricity(payload);assert.equal(rows.length,6);assert.equal(rows[0].value,-10);assert.equal(rows[0].resolution,900);
  const db=new DatabaseSync(':memory:');db.exec('CREATE TABLE metadata(key TEXT PRIMARY KEY,value TEXT)');saveElectricity(db,rows);
  const d=electricityData(db,(t+100)*1000);assert.equal(d.data.areas.LV.price_eur_mwh,-10);assert.equal(d.data.areas.LV.valid_to,'2026-11-05T10:15:00.000Z');
  assert.equal(electricityData(db,(t+4000)*1000).data.areas.LV,undefined);
  assert.throws(()=>parseElectricity({...payload,data:{...payload.data,lv:[payload.data.lv[0],payload.data.lv[0]]}}));db.close();
});

test('historical electricity keeps genuinely absent market areas empty instead of borrowing another market price',()=>{
  const payload={success:true,data:{lv:[],ee:[],lt:[{timestamp:1339970400,price:70.2},{timestamp:1339974000,price:68}]}};
  assert.throws(()=>parseElectricity(payload));
  const rows=parseElectricity(payload,undefined,{allowEmptyAreas:true});assert.equal(rows.length,2);assert.ok(rows.every(r=>r.market==='LT'));assert.equal(rows[0].resolution,3600);
  assert.throws(()=>parseElectricity({...payload,data:{lt:payload.data.lt}},undefined,{allowEmptyAreas:true}));
});
