import test from 'node:test';
import assert from 'node:assert/strict';
import {localized,languages} from './localization.mjs';
import {DatabaseSync} from 'node:sqlite';
import {initializeHoroscope,horoscopeData} from '../parsers/horoscope.mjs';
test('unsupported languages and missing horoscope text fall back to English',()=>{
  const db=new DatabaseSync(':memory:');initializeHoroscope(db);
  const doc=horoscopeData(db,{lang:'xx'});db.close();
  const original=doc.data.signs[0].today;
  const unknown=localized(doc,'xx','horoscope');assert.equal(unknown.lang,'en');assert.equal(unknown.content_language,'en');
  const ru=localized(doc,'ru','horoscope');assert.equal(ru.data.signs[0].name,'Овен');assert.equal(ru.data.signs[0].today,original);
  assert.equal(doc.data.signs[0].today,original);
  const keys=Object.keys(unknown.labels).sort();for(const lang of languages)assert.deepEqual(Object.keys(unknown.translations[lang]).sort(),keys);
});
