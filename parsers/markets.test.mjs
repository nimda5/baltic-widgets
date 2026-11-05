import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {parseECB,parseGold,parseBitcoin,saveMarketRows,convertMarketsToEUR,convertMonthlyMarketsToEUR,MMBTU_PER_MWH,exchangeData} from './markets.mjs';
test('ECB quotes have one euro as base, dates and duplicate checks are enforced',()=>{
  const xml='<Envelope><Cube><Cube time="2020-01-03"><Cube currency="USD" rate="1.2"/><Cube currency="PLN" rate="4"/></Cube></Cube></Envelope>';
  const rows=parseECB(xml);assert.equal(rows[0].value,1.2);assert.equal(rows[0].unit,'USD/EUR');assert.equal(rows.length,2);
  assert.throws(()=>parseECB(xml.replace('rate="1.2"','rate="0"')));
  assert.throws(()=>parseECB('<Envelope/>'));
});
test('daily EUR conversions use the last known past ECB rate and exact troy ounce mass, never future FX',()=>{
  const db=new DatabaseSync(':memory:');db.exec('CREATE TABLE metadata(key TEXT PRIMARY KEY,value TEXT)');
  saveMarketRows(db,[...parseECB('<E><Cube time="2020-01-03"><Cube currency="USD" rate="2"/><Cube currency="PLN" rate="4"/></Cube><Cube time="2020-01-06"><Cube currency="USD" rate="8"/><Cube currency="PLN" rate="8"/></Cube></E>'),...parseGold([{data:'2020-01-04',cena:100}], 'test'),...parseBitcoin({data:[{asset:'btc',time:'2020-01-04T00:00:00Z',PriceUSD:'200'}]},'test')]);
  convertMarketsToEUR(db);convertMarketsToEUR(db);const data=exchangeData(db).data;
  assert.equal(data.btc_eur.price,100);assert.equal(data.gold_eur_oz.price,100*31.1034768/4);assert.equal(data.btc_eur.fx_at,'2020-01-03T00:00:00.000Z');
  assert.equal(db.prepare("SELECT count(*) AS n FROM market_prices WHERE series='btc_eur'").get().n,1);db.close();
});
test('Bitcoin backfill rejects truncated pagination and missing/invalid prices',()=>{
  assert.throws(()=>parseBitcoin({data:[],next_page_url:'next'},'test'));
  assert.throws(()=>parseBitcoin({data:[{asset:'btc',time:'2020-01-01',PriceUSD:'bad'}]},'test'));
  assert.throws(()=>parseGold([{data:'2020-01-01',cena:-3}],'test'));
});

test('monthly European gas and gold use same-month historical FX and preserve raw units; missing EUR months are not invented',()=>{
  const db=new DatabaseSync(':memory:');db.exec('CREATE TABLE metadata(key TEXT PRIMARY KEY,value TEXT)');
  const row=(series,at,value,unit)=>({series,at:at+'T00:00:00.000Z',value,unit,source:'test',source_url:'test'});
  saveMarketRows(db,[row('eur_usd','2020-01-02',1,'USD/EUR'),row('eur_usd','2020-01-31',3,'USD/EUR'),row('eur_usd','2020-02-03',10,'USD/EUR'),row('gas_europe_monthly_usd','2020-01-01',10,'USD/MMBtu'),row('gold_monthly_usd','2020-01-01',1000,'USD/oz'),row('gas_europe_monthly_usd','1960-01-01',0.4,'USD/MMBtu')]);
  assert.equal(convertMonthlyMarketsToEUR(db),2);convertMonthlyMarketsToEUR(db);
  const gas=db.prepare("SELECT * FROM market_prices WHERE series='gas_europe_monthly_eur'").get();
  assert.ok(Math.abs(MMBTU_PER_MWH-3.412141633)<1e-9);assert.equal(gas.value,10*MMBTU_PER_MWH/2);assert.equal(gas.unit,'EUR/MWh');assert.equal(gas.raw_value,10);assert.equal(gas.raw_unit,'USD/MMBtu');
  assert.equal(db.prepare("SELECT value FROM market_prices WHERE series='gold_monthly_eur'").get().value,500);
  assert.equal(db.prepare("SELECT count(*) AS n FROM market_prices WHERE series='gas_europe_monthly_eur'").get().n,1);db.close();
});
