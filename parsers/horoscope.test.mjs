import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {calendarDate,localNoon,nextDate,sky,initializeHoroscope,horoscopeData,moods} from './horoscope.mjs';
import {localized} from '../services/localization.mjs';
test('local day and noon respect Riga DST and year rollover',()=>{
  assert.equal(calendarDate(new Date('2026-11-05T22:30:00Z')),'2026-11-06');
  assert.equal(localNoon('2026-03-28','Europe/Riga').toISOString(),'2026-03-28T10:00:00.000Z');
  assert.equal(localNoon('2026-03-29','Europe/Riga').toISOString(),'2026-03-29T09:00:00.000Z');
  assert.equal(nextDate('2026-12-31'),'2027-01-01');
});
test('astronomy uses geocentric tropical longitudes rather than fixed calendar guesses',()=>{
  const facts=sky('2026-11-05','Europe/Riga');
  assert.equal(facts.positions.Sun.sign,'scorpio');assert.equal(facts.positions.Sun.retrograde,false);
  assert.ok(facts.positions.Moon.longitude>=0&&facts.positions.Moon.longitude<360);
  assert.notEqual(facts.positions.Moon.longitude,sky('2026-11-06','Europe/Riga').positions.Moon.longitude);
});
test('two cached days cover all signs, moods, variants; selection and fallback preserve content',()=>{
  const db=new DatabaseSync(':memory:');initializeHoroscope(db);
  try{
    const options={lang:'ru',now:new Date('2026-11-05T12:00:00Z')};
    const a=horoscopeData(db,options),b=horoscopeData(db,{...options,now:new Date('2026-11-05T13:00:00Z')});
    assert.equal(a.updated_at,b.updated_at);assert.equal(db.prepare('SELECT count(*) n FROM horoscope_days').get().n,2);
    assert.equal(a.data.signs.length,12);
    assert.equal(a.data.format,'do_dont');assert.deepEqual(a.data.moods,['serious','humor']);
    for(const sign of a.data.signs)for(const day of ['today','tomorrow'])for(const mood of moods)for(const reading of sign.advice[day][mood]){
      assert.equal(reading.do.length,3);assert.equal(reading.dont.length,3);
      assert.equal(new Set([...reading.do,...reading.dont]).size,6);
      assert.ok([...reading.do,...reading.dont].every(item=>typeof item==='string'&&item.length>15));
    }
    assert.throws(()=>horoscopeData(db,{...options,mood:'playful'}));
    for(const sign of a.data.signs)for(const day of ['today','tomorrow']){
      const all=[];for(const mood of moods){assert.equal(sign.readings[day][mood].length,3);for(const text of sign.readings[day][mood]){assert.ok(text.length>120);all.push(text);}}
      assert.equal(new Set(all).size,6);
    }
    for(const lang of ['ru','lv','en']){
      const doc=horoscopeData(db,{...options,lang});
      for(const sign of doc.data.signs)for(let i=0;i<3;i++){
        const serious=sign.readings.today.serious[i].split(/(?<=[.!?])\s+/);
        const playful=sign.readings.today.humor[i].split(/(?<=[.!?])\s+/);
        assert.notEqual(serious[0],playful[0]);
        assert.ok(playful.filter(sentence=>serious.includes(sentence)).length<=1,'humor has its own advice');
      }
    }
    const chosen=horoscopeData(db,{...options,mood:'humor',variant:'2'});assert.equal(chosen.data.signs[0].today,a.data.signs[0].readings.today.humor[2]);
    const random=horoscopeData(db,{...options,mood:'random',variant:'random'});assert.ok(moods.includes(random.data.selected_mood));assert.ok(random.data.selected_variant<3);
    const lt=localized(horoscopeData(db,{...options,lang:'lt'}),'lt','horoscope');assert.equal(lt.content_language,'en');assert.ok(lt.fallback_fields.length);assert.equal(lt.data.signs[0].name,'Avinas');
    assert.throws(()=>horoscopeData(db,{...options,mood:'unknown'}));assert.throws(()=>horoscopeData(db,{...options,variant:'-1'}));assert.throws(()=>horoscopeData(db,{...options,timeZone:'invalid'}));
    const rolled=horoscopeData(db,{...options,now:new Date('2026-11-05T22:05:00Z')});assert.equal(rolled.data.date,'2026-11-06');assert.equal(rolled.data.signs[0].today,a.data.signs[0].tomorrow);
  }finally{db.close();}
});

test('neighbouring dates change life topics and every sentence for all signs, moods and languages',()=>{
  const db=new DatabaseSync(':memory:');initializeHoroscope(db);
  try{
    for(const start of ['2026-11-05','2026-12-29'])for(const lang of ['ru','lv','en']){
      const coverage=new Map();
      for(let d=0;d<7;d++){
        const now=new Date(Date.parse(start+'T12:00:00Z')+d*86400000),doc=horoscopeData(db,{lang,now});
        for(const mood of moods)for(let v=0;v<3;v++)assert.equal(new Set(doc.data.signs.map(sign=>sign.readings.today[mood][v])).size,12);
        for(const [i,sign] of doc.data.signs.entries()){
          assert.notEqual(sign.topics.today,sign.topics.tomorrow);
          const areas=coverage.get(i)||new Set();areas.add(sign.topics.today);coverage.set(i,areas);
          for(const mood of moods)for(let v=0;v<3;v++){
            const a=sign.readings.today[mood][v].split(/(?<=[.!?])\s+/),b=sign.readings.tomorrow[mood][v].split(/(?<=[.!?])\s+/);
            assert.equal(b.filter(sentence=>a.includes(sentence)).length,0,lang+' '+sign.id+' '+mood+' '+v+' '+doc.data.date);
          }
        }
      }
      for(const areas of coverage.values())assert.equal(areas.size,6);
    }
  }finally{db.close();}
});
