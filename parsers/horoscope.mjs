import * as Astronomy from 'astronomy-engine';
import {createHash, randomInt} from 'node:crypto';
import {tones} from './horoscope-tones.mjs';
import {copy} from './horoscope-copy.mjs';
import {lifeAreas,situations} from './horoscope-life.mjs';

export const signs=['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];
export const moods=['serious','playful','humor'];
export const version='local-rules-1.2.0';
export function calendarDate(now=new Date(),timeZone='Europe/Riga'){
  const parts=new Intl.DateTimeFormat('en-CA',{timeZone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  return ['year','month','day'].map(k=>parts.find(p=>p.type===k).value).join('-');
}
export function nextDate(date){return new Date(Date.parse(date+'T12:00:00Z')+86400000).toISOString().slice(0,10);}
// Find the actual UTC instant for local noon, including DST and fractional UTC offsets.
export function localNoon(date,timeZone){
  let ms=Date.parse(date+'T12:00:00Z');
  for(let i=0;i<3;i++){
    const p=new Intl.DateTimeFormat('en-CA',{timeZone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(ms);
    const v=k=>Number(p.find(x=>x.type===k).value);
    ms+=Date.parse(date+'T12:00:00Z')-Date.UTC(v('year'),v('month')-1,v('day'),v('hour'),v('minute'),v('second'));
  }
  return new Date(ms);
}
const angle=x=>((x+540)%360)-180;
export function sky(date,timeZone){
  const at=localNoon(date,timeZone),positions={};
  for(const body of ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn']){
    const longitude=Astronomy.Ecliptic(Astronomy.GeoVector(body,at,true)).elon;
    const before=Astronomy.Ecliptic(Astronomy.GeoVector(body,new Date(+at-3600000),true)).elon;
    const after=Astronomy.Ecliptic(Astronomy.GeoVector(body,new Date(+at+3600000),true)).elon;
    positions[body]={longitude:Number(longitude.toFixed(4)),sign:signs[Math.floor(longitude/30)],retrograde:angle(after-before)<0};
  }
  const aspects=[];
  for(const a of Object.keys(positions))for(const b of Object.keys(positions).slice(Object.keys(positions).indexOf(a)+1)){
    const separation=Math.abs(angle(positions[a].longitude-positions[b].longitude));
    for(const target of [0,60,90,120,180])if(Math.abs(separation-target)<=3)aspects.push({bodies:[a,b],angle:target,orb:Number(Math.abs(separation-target).toFixed(2))});
  }
  return {sample_at:at.toISOString(),frame:'geocentric tropical ecliptic of date',moon_phase_degrees:Number(Astronomy.MoonPhase(at).toFixed(3)),positions,aspects};
}
function seed(value){return createHash('sha256').update(value).digest().readUInt32BE(0);}
export function initializeHoroscope(db){db.exec('CREATE TABLE IF NOT EXISTS horoscope_days (date TEXT NOT NULL, timezone TEXT NOT NULL, version TEXT NOT NULL, generated_at TEXT NOT NULL, payload TEXT NOT NULL, PRIMARY KEY(date,timezone,version))');}
// Editorial cadence balances themes while lunar position chooses a related perspective.
// It is a writing rule, not a claim that astronomy predicts an event.
export function editorialContext({date,index,facts,variant}){
  const day=Math.floor(Date.parse(date+'T12:00:00Z')/86400000);
  const area=(day+index*5+variant*2)%lifeAreas.length;
  const lunarHouse=(signs.indexOf(facts.positions.Moon.sign)-index+12)%12;
  const topics=[[9,0],[1,7],[6,10],[8,4],[3,2],[5,11]];
  const angle=(lunarHouse+Math.floor(day/6)+index+variant)%2;
  return {day,area,area_id:lifeAreas[area],topic:topics[area][angle],scene:(Math.floor(day/6)+lunarHouse+index*2+variant)%4};
}
// A future model writer receives the same facts and topic brief.
export function localWriter({date,sign,index,facts,lang,mood,variant}){
  const bank=copy[lang]||copy.en,context=editorialContext({date,index,facts,variant});
  // A field's selection advances each day; adjacent dates cannot reuse the same sentence.
  const pick=(items,field)=>items[(context.day+seed(`${sign}:${variant}:${field}:${version}`))%items.length];
  const scene=(situations[lang]||situations.en)[context.area][context.scene];
  if(mood!=='serious'){
    const tone=tones[lang]?.[mood]||tones.en[mood];
    return [pick(tone.open,'open'),scene,tone.topics[context.topic],pick(tone.actions,'action'),pick(bank[mood],'tone'),pick(tone.close,'close')].join(' ');
  }
  return [pick(bank.open,'open'),scene,bank.topics[context.topic],bank.actions[context.topic],pick(bank.relationship,'relationship'),pick(bank.close,'close')].join(' ');
}

export function generateDay(date,timeZone='Europe/Riga',now=new Date()){
  const facts=sky(date,timeZone),texts={};
  for(const lang of Object.keys(copy))texts[lang]=signs.map((sign,index)=>Object.fromEntries(moods.map(mood=>[mood,Array.from({length:3},(_,variant)=>localWriter({date,sign,index,facts,lang,mood,variant}))])));
  return {date,timezone:timeZone,generated_at:now.toISOString(),facts,texts};
}
export function cachedDay(db,date,timeZone,now=new Date()){
  const found=db.prepare('SELECT payload FROM horoscope_days WHERE date=? AND timezone=? AND version=?').get(date,timeZone,version);
  if(found)return JSON.parse(found.payload);
  const result=generateDay(date,timeZone,now);
  db.prepare('INSERT INTO horoscope_days VALUES(?,?,?,?,?)').run(date,timeZone,version,result.generated_at,JSON.stringify(result));return result;
}
export function horoscopeData(db,{lang='lv',timeZone='Europe/Riga',mood='serious',variant='0',now=new Date()}={}){
  if(!moods.includes(mood)&&mood!=='random')throw new Error('Invalid mood');
  if(!['0','1','2','random'].includes(String(variant)))throw new Error('Invalid variant');
  // Limit cache cardinality to supported markets and UTC; no geolocation or natal data required.
  if(!['Europe/Riga','Europe/Vilnius','Europe/Tallinn','UTC'].includes(timeZone))throw new Error('Invalid timezone');
  const selectedMood=mood==='random'?moods[randomInt(moods.length)]:mood, selectedVariant=variant==='random'?randomInt(3):Number(variant);
  const contentLanguage=copy[lang]?lang:'en',date=calendarDate(now,timeZone),today=cachedDay(db,date,timeZone,now),tomorrow=cachedDay(db,nextDate(date),timeZone,now);
  return {schema_version:1,updated_at:today.generated_at,source:'Local editorial generator / Astronomy Engine',editorial:{method:version,interpretation:'Entertainment; astronomical positions inform editorial themes, not validated predictions'},content_language:contentLanguage,
    fallback_fields:lang===contentLanguage?[]:['data.signs[].readings'],data:{timezone:timeZone,date,tomorrow_date:tomorrow.date,moods,variants_per_mood:3,selected_mood:selectedMood,selected_variant:selectedVariant,generation:{provider:'local_rules',version,generated_at:today.generated_at,next_date:tomorrow.date},facts:{today:today.facts,tomorrow:tomorrow.facts},
    signs:signs.map((id,i)=>({id,name:id,dates:'',topics:{today:editorialContext({date,index:i,facts:today.facts,variant:selectedVariant}).area_id,tomorrow:editorialContext({date:tomorrow.date,index:i,facts:tomorrow.facts,variant:selectedVariant}).area_id},today:today.texts[contentLanguage][i][selectedMood][selectedVariant],tomorrow:tomorrow.texts[contentLanguage][i][selectedMood][selectedVariant],readings:{today:today.texts[contentLanguage][i],tomorrow:tomorrow.texts[contentLanguage][i]}}))}};
}
