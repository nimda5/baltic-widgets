// Population uses exact spelling, independently of shared etymological evidence.
export function populationKey(name){return name.normalize('NFC').trim().toLocaleUpperCase('lv');}
export function validatePopulation(doc,country){
 if(doc?.schema_version!==1||doc.country!==country||doc.metric!=='registered_name_component'||!/^\d{4}-\d{2}-\d{2}$/.test(doc.as_of)||!doc.data||!Object.values(doc.data).every(n=>Number.isSafeInteger(n)&&n>0))throw Error('Invalid name population');
 return doc;
}
const labels={
 ru:['Латвия · ≈ {n} носителей','В реестре PMLP, включая составные имена · {date}'],
 lv:['Latvija · ≈ {n} vārda nesēju','PMLP reģistrā, arī vairāku vārdu kombinācijās · {date}'],
 en:['Latvia · ≈ {n} name bearers','In the PMLP register, including multiple given names · {date}'],
 lt:['Latvija · ≈ {n} vardo turėtojų','PMLP registre, įskaitant kelių vardų derinius · {date}'],
 et:['Läti · ≈ {n} nimekandjat','PMLP registris, ka mitmest eesnimest koosnevates nimedes · {date}']
};
export function populationCopy(doc,name,country,lang='en'){
 if(!doc||doc.country!==country||country!=='lv')return null;
 const count=doc.data[populationKey(name)];if(!Number.isSafeInteger(count)||count<=0)return null;
 const locale={ru:'ru-RU',lv:'lv-LV',en:'en-GB',lt:'lt-LT',et:'et-EE'}[lang]||'en-GB';
 const values={n:new Intl.NumberFormat(locale).format(count),date:new Intl.DateTimeFormat(locale,{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(doc.as_of+'T12:00:00Z'))};
 const [title,note]=(labels[lang]||labels.en).map(s=>s.replace(/\{(\w+)\}/g,(_,k)=>values[k]));return{count,title,note};
}
