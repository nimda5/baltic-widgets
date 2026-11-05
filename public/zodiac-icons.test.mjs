import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {load} from 'cheerio';
import {zodiacPaths} from './zodiac-icons.js';
test('all zodiac icons preserve each original path independently, including relative moves',()=>{
  assert.equal(Object.keys(zodiacPaths).length,12);
  for(const [name,paths] of Object.entries(zodiacPaths)){
    const $=load(readFileSync(new URL(`./assets/zodiac/${name}.svg`,import.meta.url),'utf8'),{xmlMode:true});
    const original=$('svg').children().toArray();assert.equal(paths.length,original.length,name);
    original.forEach((el,i)=>{if(el.name==='path')assert.equal(paths[i],$(el).attr('d'),name);});
  }
  assert.equal(zodiacPaths.aquarius.length,2);
  assert.equal(zodiacPaths.sagittarius.length,3);
});
