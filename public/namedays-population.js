// Population uses exact spelling, independently of shared etymological evidence.
export function populationKey(name){return name.normalize('NFC').trim().toLocaleUpperCase('lv');}
// Each country keeps its official definition: LV counts a name anywhere among a person's given names,
// EE counts people whose complete first name is exactly this name.
// LT publishes only the 50 most common men's and women's names, counted among people born since 1900.
export const POPULATION_METRICS={lv:'registered_name_component',ee:'exact_first_name',lt:'top50_born_since_1900'};
export function validatePopulation(doc,country){
 if(doc?.schema_version!==1||doc.country!==country||doc.metric!==POPULATION_METRICS[country]||!/^\d{4}-\d{2}-\d{2}$/.test(doc.as_of)||!doc.data||!Object.values(doc.data).every(n=>Number.isSafeInteger(n)&&n>0)||(doc.below_threshold!==undefined&&(!Array.isArray(doc.below_threshold)||doc.below_threshold.some(k=>k in doc.data)))||(doc.ranges!==undefined&&!Object.entries(doc.ranges).every(([k,r])=>!(k in doc.data)&&Array.isArray(r)&&r.length===2&&r.every(Number.isSafeInteger)&&0<r[0]&&r[0]<r[1]))||(doc.below_threshold&&!Number.isSafeInteger(doc.suppressed_below)))throw Error('Invalid name population');
 return doc;
}
const countries={
 ru:{lv:'Латвия',ee:'Эстония',lt:'Литва'},lv:{lv:'Latvija',ee:'Igaunija',lt:'Lietuva'},en:{lv:'Latvia',ee:'Estonia',lt:'Lithuania'},lt:{lv:'Latvija',ee:'Estija',lt:'Lietuva'},et:{lv:'Läti',ee:'Eesti',lt:'Leedu'}
};
const labels={
 ru:['{country} · ≈ {n} носителей','Данные на {date}','{country} · меньше {n} носителей'],
 lv:['{country} · ≈ {n} vārda nesēju','Dati uz {date}','{country} · mazāk par {n} vārda nesējiem'],
 en:['{country} · ≈ {n} name bearers','As of {date}','{country} · fewer than {n} name bearers'],
 lt:['{country} · ≈ {n} vardo turėtojų','Duomenys {date}','{country} · mažiau nei {n} vardo turėtojai'],
 et:['{country} · ≈ {n} nimekandjat','Andmed seisuga {date}','{country} · alla {n} nimekandja']
};
// Same wording, plus the Lithuanian source's own scope: people born since 1900.
const sinceLabels={
 ru:'{country} · ≈ {n} носителей, родившихся с 1900 года',
 lv:'{country} · ≈ {n} vārda nesēju, dzimuši kopš 1900. gada',
 en:'{country} · ≈ {n} name bearers born since 1900',
 lt:'{country} · ≈ {n} vardo turėtojų, gimusių nuo 1900 m.',
 et:'{country} · ≈ {n} nimekandjat, sündinud alates 1900. aastast'
};
export function populationCopy(doc,name,country,lang='en'){
 if(!doc||doc.country!==country||!POPULATION_METRICS[country])return null;
 const key=populationKey(name),count=doc.data[key],range=doc.ranges?.[key],below=doc.below_threshold?.includes(key);
 if(!(Number.isSafeInteger(count)&&count>0)&&!range&&!below)return null;
 const locale={ru:'ru-RU',lv:'lv-LV',en:'en-GB',lt:'lt-LT',et:'et-EE'}[lang]||'en-GB';
 const fmt=new Intl.NumberFormat(locale),values={country:(countries[lang]||countries.en)[country],n:range?fmt.format(range[0])+'–'+fmt.format(range[1]):fmt.format(below?doc.suppressed_below:count),date:new Intl.DateTimeFormat(locale,{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(doc.as_of+'T12:00:00Z'))};
 const set=labels[lang]||labels.en,[title,note,fewer]=(doc.metric==='top50_born_since_1900'?[sinceLabels[lang]||sinceLabels.en,set[1],set[2]]:set).map(s=>s.replace(/\{(\w+)\}/g,(_,k)=>values[k]));
 // A suppressed source value is shown as the published bound, never as zero or an invented number.
 return{count:below||range?null:count,range:range||null,below:below?doc.suppressed_below:null,title:below?fewer:title,note};
}
