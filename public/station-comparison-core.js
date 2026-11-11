import {fuelPriceState} from './fuel-freshness.js';

export const searchText=value=>String(value||'').normalize('NFD').replace(/\p{M}/gu,'').toLocaleLowerCase().replace(/\s+/g,' ').trim();
const searchIndex=new WeakMap();
const addressCollator=new Intl.Collator(undefined,{numeric:true,sensitivity:'base'});
function indexed(row){
 let entry=searchIndex.get(row);
 if(!entry){entry={place:searchText(row.address+' '+row.name),all:searchText(row.address+' '+row.name+' '+row.provider)};searchIndex.set(row,entry);}
 return entry;
}
export function networkNames(providers,country='LV'){
 const collator=new Intl.Collator({LV:'lv',LT:'lt',EE:'et'}[country]||'en',{usage:'sort',sensitivity:'base',numeric:true});
 return [...new Set(providers.map(p=>p.name))].sort(collator.compare);
}
export function stationRows(data){
 const seen=new Set(),rows=[];
 for(const provider of [...data.providers,...(data.more_providers||[])])for(const station of provider.stations||[]){
  const key=station.id||provider.name+'|'+station.address+'|'+station.name;
  if(seen.has(key))continue;seen.add(key);rows.push({...station,provider:provider.name});
 }
 return rows;
}
export function comparableQuote(quote,now=Date.now()){
 return quote?.scope==='station'&&quote.price>0&&fuelPriceState(quote,now)==='recent'&&quote.source_status!=='error';
}
export function filterStations(rows,{city='',query='',provider='',fuel='petrol95',order='asc',now=Date.now()}={}){
 const place=searchText(city),words=searchText(query).split(' ').filter(Boolean),fresh=[],missing=[];
 for(const row of rows){
  if(provider&&row.provider!==provider)continue;
  const entry=indexed(row);
  if(place&&!entry.place.includes(place))continue;
  const haystack=entry.all;
  if(!words.every(word=>haystack.includes(word)))continue;
  (comparableQuote(row.prices?.[fuel],now)?fresh:missing).push(row);
 }
 const address=(a,b)=>addressCollator.compare(String(a.address||a.name||''),String(b.address||b.name||''))||addressCollator.compare(a.provider,b.provider);
 fresh.sort((a,b)=>(a.prices[fuel].price-b.prices[fuel].price)*(order==='desc'?-1:1)||address(a,b));
 missing.sort(address);return{fresh,missing};
}

export function nextStationSort(state,fuel){return{fuel,order:state.fuel===fuel&&state.order==='asc'?'desc':'asc'};}
