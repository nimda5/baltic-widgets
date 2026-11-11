import {populationKey,validatePopulation} from '../public/namedays-population.js';
export function populationFromCSV(csv,names,meta){
 const lines=csv.replace(/^\uFEFF/,'').trim().split(/\r?\n/);if(lines.shift()!=='Vardi,Skaits')throw Error('Unexpected PMLP CSV columns');
 const wanted=new Set(names.map(populationKey)),counts=new Map();let rows=0,total=0;
 for(const line of lines){const m=line.match(/^"((?:[^"]|"")*)",(\d+)$/);if(!m)throw Error('Invalid PMLP CSV row');const name=m[1].replace(/""/g,'"'),count=Number(m[2]);if(!Number.isSafeInteger(count)||count<1)throw Error('Invalid PMLP count');rows++;total+=count;
  // Each registry row describes people with this full given-name combination.
  // Count each matching component once per person, even if a name is repeated.
  const forms=new Set([populationKey(name),...name.split(/\s+/u).map(populationKey)]);
  for(const form of forms)if(wanted.has(form))counts.set(form,(counts.get(form)||0)+count);
 }
 if(!rows)throw Error('Empty PMLP CSV');
 return validatePopulation({schema_version:1,country:'lv',metric:'registered_name_component',...meta,source_rows:rows,registered_people:total,data:Object.fromEntries([...counts].sort(([a],[b])=>a.localeCompare(b,'lv')))},'lv');
}

const ESTONIAN_MONTHS={jaanuari:1,veebruari:2,märtsi:3,aprilli:4,mai:5,juuni:6,juuli:7,augusti:8,septembri:9,oktoobri:10,novembri:11,detsembri:12};
// Statistics Estonia name page (https://stat.ee/nimed/<NAME>): exact first-name counts by sex.
// Returns {as_of,count} for a published count, {as_of:null,count:0,suppressed:true} below the
// publication threshold of five people, and throws on an unrecognized page.
export function estonianNameCount(html){
 const text=html.replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ');
 if(/vähem kui 5 ja seetõttu ei saa selle nime kohta statistikat kuvada/.test(text))return{as_of:null,count:0,suppressed:true,below:5};
 const m=text.match(/(\d{4})\. aasta (\d{1,2})\. (\p{L}+) seisuga on eesnimi .+? ((?:\d[\d ]*\d|\d|alla viiel) (?:mehel|naisel)(?: ja (?:\d[\d ]*\d|\d|alla viiel) (?:mehel|naisel))?)\./u);
 if(!m||!ESTONIAN_MONTHS[m[3]])throw Error('Unrecognized Statistics Estonia name page');
 // A sex group below five ("alla viiel") is not published; only published groups are summed.
 const count=[...m[4].matchAll(/(\d[\d ]*\d|\d) (?:mehel|naisel)/g)].reduce((sum,x)=>sum+Number(x[1].replace(/ /g,'')),0);
 const as_of=m[1]+'-'+String(ESTONIAN_MONTHS[m[3]]).padStart(2,'0')+'-'+m[2].padStart(2,'0');
  // Both sex groups are below five while the name is shown (at least five bearers): 5–8 in total.
 if(count===0&&!/\d (?:mehel|naisel)/.test(m[4]))return{as_of,count:0,suppressed:true,range:[5,8]};
 if(!Number.isSafeInteger(count)||count<1)throw Error('Invalid Statistics Estonia count');
 return{as_of:m[1]+'-'+String(ESTONIAN_MONTHS[m[3]]).padStart(2,'0')+'-'+m[2].padStart(2,'0'),count,suppressed:false};
}
