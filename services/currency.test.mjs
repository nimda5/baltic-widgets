import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {selectedCurrency,saveCurrency,currencyStorageKey} from '../public/currency-core.js';
import {parseECB,saveMarketRows,exchangeData} from '../parsers/markets.mjs';

test('currency preference survives reload and safely handles corrupt or blocked storage',()=>{
 const values=new Map(),storage={getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v)};
 assert.equal(selectedCurrency(storage),'SEK');assert.equal(saveCurrency(storage,'PLN'),true);assert.equal(selectedCurrency(storage),'PLN');
 assert.equal(saveCurrency(storage,'XYZ'),false);assert.equal(selectedCurrency(storage),'PLN');values.set(currencyStorageKey,'XYZ');assert.equal(selectedCurrency(storage),'SEK');
 const blocked={getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}};
 assert.equal(selectedCurrency(blocked),'SEK');assert.equal(saveCurrency(blocked,'NOK'),false);
});
test('selectable ECB currencies preserve their own dates, previous observation and history',()=>{
 const xml='<E><Cube time="2026-11-09"><Cube currency="USD" rate="1.1"/><Cube currency="PLN" rate="4.3"/><Cube currency="SEK" rate="10.9"/></Cube><Cube time="2026-11-10"><Cube currency="USD" rate="1.2"/><Cube currency="PLN" rate="4.4"/><Cube currency="SEK" rate="11"/></Cube></E>';
 const db=new DatabaseSync(':memory:');db.exec('CREATE TABLE metadata(key TEXT PRIMARY KEY,value TEXT)');saveMarketRows(db,parseECB(xml));const d=exchangeData(db).data;
 assert.equal(d.eur_sek.price,11);assert.equal(d.eur_sek.previous,10.9);assert.equal(d.eur_sek.history.length,2);assert.equal(d.eur_pln.price,4.4);assert.equal(d.eur_nok,undefined);
 assert.throws(()=>parseECB(xml.replace('rate="11"','rate="oops"')));db.close();
});
