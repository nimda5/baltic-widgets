import {lifeAreas} from './horoscope-life.mjs';

export const horoscopePolicy={id:'do-avoid-v1',itemsPerGroup:3,moods:['serious','humor'],maxItemLength:180};
const negativeOpening={
  ru:/^(?:не|нельзя|избегай|никогда)(?=\s|$|[,:;.!?])/iu,
  en:/^(?:do\s+not\b|don['’]t\b|never\b|avoid\b)/iu,
  lv:/^(?:ne\p{L}+|izvairies)(?=\s|$|[,:;.!?])/iu
};
const normalize=text=>text.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();

// The same gate must be applied to any future model/provider output before caching.
export function validateAdvice(reading,{lang='en',mood}={}){
  if(!reading||!lifeAreas.includes(reading.do_topic)||!lifeAreas.includes(reading.avoid_topic))throw Error('Advice needs valid topic IDs for both groups');
  if(reading.do_topic===reading.avoid_topic)throw Error('Do and Avoid must cover distinct subjects');
  if(mood&&!horoscopePolicy.moods.includes(mood))throw Error('Unsupported horoscope mood');
  const seen=new Set(),negation=negativeOpening[lang]||negativeOpening.en;
  for(const group of ['do','dont']){
    if(!Array.isArray(reading[group])||reading[group].length!==horoscopePolicy.itemsPerGroup)throw Error('Advice requires three items per group');
    for(const item of reading[group]){
      if(typeof item!=='string'||item.trim()!==item||item.length<15||item.length>horoscopePolicy.maxItemLength)throw Error('Advice item length or whitespace is invalid');
      if(negation.test(item))throw Error('Advice must not begin with a negative command or repeat the group heading');
      const key=normalize(item);if(seen.has(key))throw Error('Advice groups must not repeat the same item');seen.add(key);
    }
  }
  return reading;
}
