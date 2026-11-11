import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {parseEuribor,refreshEuribor} from './euribor.mjs';
import {saveMarketRows,exchangeData} from './markets.mjs';
const xml=(a='-0.125',b='0.000')=>`<Report creator="Bank of Finland" frequency="D"><data>${[['2026-11-09',a],['2026-11-10',b]].map(([day,value])=>`<period value="${day}"><rate name="3 month (act/360)"><intr value="99"/></rate><rate name="6 month (act/360)"><intr value="${value}"/></rate></period>`).join('')}</data></Report>`;

test('daily Euribor selects exactly 6M act/360, preserving zero and negative rates',()=>{
 const rows=parseEuribor(xml());assert.equal(rows.length,2);assert.equal(rows[0].value,-0.125);assert.equal(rows[1].value,0);assert.equal(rows[1].unit,'%');
 for(const invalid of [xml(''),xml('NaN'),xml('101'),xml().replaceAll('6 month (act/360)','6 month (act/365)'),xml().replace('2026-11-10','2026-11-09'),xml().replace('2026-11-10','2026-02-30'),xml().replace('frequency="D"','frequency="M"')])assert.throws(()=>parseEuribor(invalid));
 assert.throws(()=>parseEuribor(xml(),{now:new Date('2026-11-08')}));
});

test('Euribor export keeps fix dates and history, corrections replace rows, and failed responses retain valid data',async()=>{
 const db=new DatabaseSync(':memory:');db.exec('CREATE TABLE metadata(key TEXT PRIMARY KEY,value TEXT)');
 const dir=await mkdtemp(path.join(tmpdir(),'euribor-')),original=globalThis.fetch;
 try{
  globalThis.fetch=async()=>new Response(xml());await refreshEuribor(db,dir);
  const first=exchangeData(db).data.euribor_6m;assert.equal(first.price,0);assert.equal(first.previous,-0.125);assert.equal(first.comparison,'percentage_points');assert.equal(first.delay_hours,24);
  globalThis.fetch=async()=>new Response('<html>Bad gateway</html>');await assert.rejects(refreshEuribor(db,dir));assert.deepEqual(exchangeData(db).data.euribor_6m,first);
  globalThis.fetch=async()=>new Response('',{status:403});await assert.rejects(refreshEuribor(db,dir),/HTTP 403/);assert.deepEqual(exchangeData(db).data.euribor_6m,first);
  saveMarketRows(db,parseEuribor(xml('-0.100','0.005')));assert.equal(exchangeData(db).data.euribor_6m.history.length,2);assert.equal(exchangeData(db).data.euribor_6m.price,0.005);
  assert.throws(()=>saveMarketRows(db,[{series:'eur_usd',value:-1,at:'2026-11-10',unit:'USD/EUR'}]));
 }finally{globalThis.fetch=original;db.close();await rm(dir,{recursive:true,force:true});}
});
