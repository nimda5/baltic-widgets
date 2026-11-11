export const COUNTRIES=['lv','lt','ee'];
export const TIME_ZONE='Europe/Riga';
export function fittingNameCount(widths,available,gap,counterWidths){
 let total=0,best=0;
 for(let count=1;count<=widths.length;count++){
  total+=widths[count-1];
  const remaining=widths.length-count;
  const needed=total+gap*(count-1)+(remaining?gap+counterWidths[remaining]:0);
  if(needed<=available+.1)best=count;
 }
 return best;
}
export function calendarDate(now=new Date(),offset=0){
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:TIME_ZONE,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
 const get=type=>Number(parts.find(p=>p.type===type).value);
 return new Date(Date.UTC(get('year'),get('month')-1,get('day')+offset,12)).toISOString().slice(0,10);
}
export function dayKey(date){if(!/^\d{4}-\d\d-\d\d$/.test(date)||!Number.isFinite(Date.parse(date+'T12:00:00Z'))||new Date(date+'T12:00:00Z').toISOString().slice(0,10)!==date)throw Error('Invalid calendar date');return date.slice(5);}
export function calendarNames(calendar,country,date){
 if(!COUNTRIES.includes(country))throw Error('Invalid calendar country');
 if(calendar.country&&calendar.country!==country)throw Error('Calendar country mismatch');
 const names=calendar.country?calendar.data.days[dayKey(date)]:calendar.data.calendars[country]?.[dayKey(date)];
 const collator=new Intl.Collator({lv:'lv',lt:'lt',ee:'et'}[country],{usage:'sort',sensitivity:'variant'});
 return [...(names||[])].sort((a,b)=>collator.compare(a.name,b.name));
}
export function validateCountryCalendar(doc){
 if(!COUNTRIES.includes(doc?.country)||!doc.data?.days||doc.data.calendars)throw Error('Invalid country calendar');
 const calendars=Object.fromEntries(COUNTRIES.map(c=>[c,c===doc.country?doc.data.days:{}]));
 validateCalendar({...doc,data:{calendars}});return doc;
}
export function validateCalendar(doc){
 if(doc?.schema_version!==1||!doc.writer_version||!doc.data?.calendars)throw Error('Invalid name-day calendar');
 for(const country of COUNTRIES){if(!doc.data.calendars[country])throw Error('Missing calendar country');
  for(const [key,names] of Object.entries(doc.data.calendars[country])){if(!/^\d\d-\d\d$/.test(key)||new Date('2000-'+key+'T12:00:00Z').toISOString().slice(5,10)!==key||!Array.isArray(names))throw Error('Invalid calendar day');
   const seen=new Set();for(const n of names){if(!n||typeof n.name!=='string'||!n.name.trim()||n.name!==n.name.trim()||/\s\s/.test(n.name)||n.key!==country+':'+n.name||seen.has(n.key))throw Error('Invalid calendar name');seen.add(n.key);}
  }
 }
 return doc;
}
