import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createTranslator,resolveLanguage,locales} from '../public/i18n-core.js';
const catalog=JSON.parse(readFileSync(new URL('../public/data/translations.json',import.meta.url),'utf8'));
test('UI strings cover all five languages with matching interpolation fields',()=>{
  const keys=new Set();
  for(const file of ['app.js','charts.js','portal.js']){
    const source=readFileSync(new URL('../public/'+file,import.meta.url),'utf8');
    for(const match of source.matchAll(/\bt\('([^']+)'(?=\s*[,\)])/g))keys.add(match[1]);
  }
  for(const key of [...keys,'period_all','period_1y','period_5y','all_days','theme_dark','theme_light']){
    assert.equal(typeof catalog.en[key],'string',key);
    const fields=text=>[...text.matchAll(/\{(\w+)\}/g)].map(m=>m[1]).sort();
    for(const lang of Object.keys(locales)){
      assert.equal(typeof catalog[lang][key],'string',lang+': '+key);
      assert.deepEqual(fields(catalog[lang][key]),fields(catalog.en[key]),lang+': '+key);
    }
  }
});
test('chart periods, interpolation and missing strings use the selected language with English fallback',()=>{
  const ru=createTranslator(catalog,'ru'),en=createTranslator(catalog,'en');
  assert.equal(ru('price_history'),'История цен');assert.equal(ru('period_all'),'Всё');
  assert.equal(en('period_all'),'All');assert.equal(ru('days_count','',{count:7}),'7 дн.');
  assert.equal(resolveLanguage('unsupported'),'en');
  assert.equal(createTranslator({en:{example:'Value {count}'}},'ru')('example','',{count:3}),'Value 3');
  assert.equal(ru('missing','English fallback'),'English fallback');
});
