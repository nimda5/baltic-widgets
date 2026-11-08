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
