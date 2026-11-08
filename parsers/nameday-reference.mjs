// Only extract linguistic origins from an explicit etymological context.
// A country mentioned in a popularity or attestation note is not an origin.
import {attestationPeriod} from '../public/namedays-attestation.js';
import {referenceEtymons} from './nameday-glosses.mjs';
const originTerms={Greek:'Ancient Greek',Latin:'Latin',Hebrew:'Hebrew',Arabic:'Arabic',Germanic:'Germanic languages','Old High German':'Old High German','Old Norse':'Old Norse','Old English':'English',Sanskrit:'Sanskrit',Persian:'Persian',Finnish:'Finnish',Lithuanian:'Lithuanian',Latvian:'Latvian',German:'German',Slavic:'Slavic'};
export function uncertainReference(text){return /\b(?:uncertain|unknown|unresolved|unclear|speculative|cannot be established|not established|not been reliably established|several theories|may be|possibly|possible|does not prove|does not establish|does not specify|folk etymology|not a proven)\b/i.test(text);}
export function referenceOrigins(text){
 if(uncertainReference(text))return[];
 const result=[];
 for(const [term,label] of Object.entries(originTerms)){
  const pattern=new RegExp('(?:\\b(?:from|of|via|through) (?:the )?'+term+'\\b|\\b'+term+' (?:word|words|root|roots|compound|verb|adjective|noun|origin)\\b'+(['Greek','Latin','Hebrew','Arabic','Germanic','Old Norse','Old English','Sanskrit','Persian'].includes(term)?'|\\b'+term+' (?:name|form)\\b':'')+')','i');
  if(pattern.test(text)&&!new RegExp('\\b(?:not|neither) (?:from )?(?:the )?'+term+'\\b','i').test(text))result.push(label);
 }
 return[...new Set(result)];
}
export function catalogFacts(record){
 const text=record.raw_origin||'',individual=/does not prove a general variant relationship/i.test(text),uncertain=uncertainReference(text),related=(record.related||[]).map(n=>n.replace(/\s*\([^)]*\)\s*$/,'').trim());
 return{origins:referenceOrigins(text),related:uncertain?[]:related,possible_related:uncertain&&!individual?related:[],archival_variants:individual?related:[],archival_form:individual?record.first_recorded_form:null,etymons:uncertain?[]:referenceEtymons(text),first_recorded:attestationPeriod(record.first_recorded)?record.first_recorded:null,first_recorded_form:record.first_recorded_form,first_recorded_country:'lv',origin_uncertain:uncertain};
}
