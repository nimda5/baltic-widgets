import {readFileSync} from 'node:fs';
export const translations=JSON.parse(readFileSync(new URL('../public/data/translations.json',import.meta.url),'utf8'));
export const languages=Object.keys(translations);
export function localized(doc,lang='lv',widget='fuel'){
  const requested=lang;lang=languages.includes(lang)?lang:'en';
  const result=structuredClone(doc),labels=translations[lang];
  Object.assign(result,{lang,requested_lang:requested,fallback_lang:'en',available_languages:languages,labels,translations});
  if(widget==='fuel'){
    result.data.summary_label=labels.minimum;
    result.data.country_name=labels.countries[result.data.country];
    for(const [fuel,series] of Object.entries(result.data.country_history||{})){
      series.label=`${result.data.country_name} · ${fuel==='diesel'?labels.diesel:fuel==='petrol95'?'95':'98'} · ${labels.national_average}`;
      series.source=labels.archive_source;
    }
  }
  if(widget==='horoscope'){
    const boundaries=[[3,21,4,19],[4,20,5,20],[5,21,6,20],[6,21,7,22],[7,23,8,22],[8,23,9,22],[9,23,10,22],[10,23,11,21],[11,22,12,21],[12,22,1,19],[1,20,2,18],[2,19,3,20]];
    result.data.signs.forEach((sign,i)=>{sign.name=labels.signs[i];const d=boundaries[i],fmt=new Intl.DateTimeFormat(lang,{day:'numeric',month:'long',timeZone:'UTC'});sign.dates=fmt.format(new Date(Date.UTC(2024,d[0]-1,d[1])))+' – '+fmt.format(new Date(Date.UTC(2024,d[2]-1,d[3])));});
  }
  return result;
}
