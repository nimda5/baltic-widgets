import {openModal} from './modal.js';
import {t,locale} from './i18n.js';
import {priceButton} from './charts.js';
import {stationRows,filterStations,searchText,comparableQuote,nextStationSort,networkNames} from './station-comparison-core.js';
import {fuelPriceState} from './fuel-freshness.js';
const saved=new Map();
const el=(tag,className,text)=>{const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;};
const button=(className,text,action)=>{const node=el('button',className,text);node.type='button';node.addEventListener('click',action);return node;};

export function createStationComparison(data){
 document.querySelector('#station-comparison')?.remove();
 const state=saved.get(data.country)||{city:'',query:'',fuel:'petrol95',provider:'',order:'asc'};saved.set(data.country,state);
 const rows=stationRows(data),providers=[...data.providers,...(data.more_providers||[])];let opener,limit=20,missingLimit=20;
 const dialog=el('dialog','station-comparison');dialog.id='station-comparison';dialog.setAttribute('aria-labelledby','station-comparison-title');
 const header=el('header','comparison-header'),title=el('h2','',t('compare_stations','Compare stations')+' · '+data.country_name);title.id='station-comparison-title';
 const close=button('comparison-close','×',()=>dialog.close());close.setAttribute('aria-label',t('close','Close'));header.append(title,close);
 const controls=el('div','comparison-controls');
 function field(label,node){node.setAttribute('aria-label',label);const wrapper=el('label','comparison-field');wrapper.append(el('span','',label),node);return wrapper;}
 const city=el('input');city.type='search';city.value=[state.city,state.query].filter(Boolean).join(' ');city.placeholder={LV:'Rīga, Liepāja…',LT:'Vilnius, Kaunas…',EE:'Tallinn, Tartu…'}[data.country];city.autocomplete='off';
 const cityField=field(t('station_search_all','City, address, station or network'),city);cityField.classList.add('comparison-city');controls.append(cityField);
 const network=el('select');const all=el('option','',t('all_networks','All networks'));all.value='';network.append(all);
 for(const name of networkNames(providers,data.country)){const option=el('option','',name);option.value=name;network.append(option);}network.value=state.provider;
 controls.append(field(t('network_filter','Network'),network));
 const scroller=el('div','comparison-results');
 const dateFormat=new Intl.DateTimeFormat(locale,{day:'numeric',month:'short',timeZone:'Europe/Riga'});
 const timeFormat=new Intl.DateTimeFormat(locale,{dateStyle:'short',timeStyle:'short',timeZone:'Europe/Riga'});
 let rowCache=new WeakMap(),cacheMinute=-1,searchTimer;
 const empty=el('p','comparison-empty',t('no_matching_stations','No stations with current prices match these filters.'));
 function updateChildren(parent,nodes){if(parent.children.length===nodes.length&&nodes.every((node,i)=>parent.children[i]===node))return;parent.replaceChildren(...nodes);}
 const columns=el('div','comparison-columns');columns.append(el('span','',t('station','Station')));
 const sortButtons=[];
 for(const [key,label] of [['petrol95','95'],['diesel',t('diesel','Diesel')]]){
  const control=button('comparison-sort','',()=>{Object.assign(state,nextStationSort(state,key));limit=missingLimit=20;missing.open=false;render();scroller.scrollTop=0;});control.dataset.fuel=key;control.dataset.label=label;columns.append(control);sortButtons.push(control);
 }
 const list=el('div','comparison-list');
 const more=button('comparison-more',t('show_more_stations','Show 20 more'),()=>{limit+=20;render();});
 const missing=el('details','comparison-missing'),missingTitle=el('summary'),missingList=el('div');missing.append(missingTitle,missingList);
 const networks=el('details','comparison-networks'),networksTitle=el('summary','',t('network_quotes','Network quotes')),networkList=el('div');networks.append(networksTitle,networkList);
 scroller.append(columns,list,more,missing,networks);dialog.append(header,controls,scroller);document.body.append(dialog);
 function row(station,current){
  let cache=rowCache.get(station);if(!cache){cache=new Map();rowCache.set(station,cache);}const cacheKey=state.fuel+':'+current;if(cache.has(cacheKey))return cache.get(cacheKey);
  const line=el('div','comparison-row'),identity=el('div','comparison-identity');
  identity.append(el('strong','',station.provider),el('span','',station.address||station.name||'—'));
  if(station.name&&searchText(station.name)!==searchText(station.provider))identity.append(el('small','',station.name));
  const selectedQuote=station.prices?.[state.fuel];
  if(!current)identity.append(el('small','',selectedQuote?.source_status==='error'?t('source_unavailable','Source currently unavailable'):fuelPriceState(selectedQuote)==='stale'?t('price_expired','Published price is older than 48 hours'):t('no_current_station_price','No current station price')));
  if(Object.values(station.prices||{}).some(q=>q?.evidence==='community_reported'))identity.append(el('small','',t('community_reported','Community report')));
  line.append(identity);
  for(const key of ['petrol95','diesel']){
   const quote=station.prices?.[key],value=el('div','comparison-value');value.dataset.fuel=key;
   const valid=comparableQuote(quote)||(quote?.scope?.startsWith('network_')&&fuelPriceState(quote)==='recent'&&quote.source_status!=='error');
   if(valid){
    value.append(priceButton(quote,{label:station.provider+' · '+(station.address||station.name)+' · '+(key==='petrol95'?'95':t('diesel','Diesel')),unit:'EUR/l',digits:3}));
    const stamp=quote.observed_at||quote.observed_date;
    if(stamp){const time=el('time','',dateFormat.format(new Date(stamp)));time.dateTime=stamp;time.title=quote.observed_at?timeFormat.format(new Date(stamp)):stamp;value.append(time);}
    else value.title=t('publication_date_unknown','Publication date not provided by the operator');
   }else{const absent=el('span','comparison-no-price','—');absent.title=t('no_current_station_price','No current station price');value.append(absent);}
   line.append(value);
  }
  cache.set(cacheKey,line);return line;
 }

 function render(){
  const minute=Math.floor(Date.now()/60000);if(minute!==cacheMinute){cacheMinute=minute;rowCache=new WeakMap();}
  Object.assign(state,{city:'',query:city.value,provider:network.value});
  for(const control of sortButtons){const active=control.dataset.fuel===state.fuel;const arrow=el('span','comparison-sort-arrow',active?(state.order==='asc'?'↑':'↓'):'↕');arrow.setAttribute('aria-hidden','true');control.replaceChildren(document.createTextNode(control.dataset.label+' (€/l) '),arrow);control.setAttribute('aria-pressed',String(active));control.title=active?(state.order==='asc'?t('cheapest_first','Cheapest first'):t('expensive_first','Most expensive first')):t('sort_price','Sort by price');}
  const results=filterStations(rows,state);
  updateChildren(list,results.fresh.length?results.fresh.slice(0,limit).map(station=>row(station,true)):[empty]);
  more.hidden=results.fresh.length<=limit;
  missing.hidden=!results.missing.length;missingTitle.textContent=t('without_current_price','Without a current price: {count}',{count:results.missing.length});
  const renderMissing=()=>{missingList.replaceChildren(...results.missing.slice(0,missingLimit).map(station=>row(station,false)));if(results.missing.length>missingLimit)missingList.append(button('comparison-more',t('show_more_stations','Show 20 more'),()=>{missingLimit+=20;renderMissing();}));};if(missing.open)renderMissing();else missingList.replaceChildren();
  if(networks.open)networkList.replaceChildren(el('p','comparison-note',t('network_quote_note','Network quotes are not prices at specific addresses and are excluded from station rankings.')));
  let count=0;
  if(!state.city.trim())for(const provider of providers){
   if(state.provider&&state.provider!==provider.name)continue;
   if(state.query.trim()&&!searchText(provider.name).includes(searchText(state.query)))continue;
   const quote=provider.prices?.[state.fuel];if(!quote?.scope?.startsWith('network_')||fuelPriceState(quote)!=='recent'||quote.source_status==='error')continue;
   if(networks.open)networkList.append(row({provider:provider.name,address:quote.scope==='network_published_minimum'?t('network_minimum','Published network minimum; individual station prices may differ'):t('community_reported','Community report'),prices:Object.fromEntries(Object.entries(provider.prices).filter(([,q])=>q?.scope?.startsWith('network_')&&fuelPriceState(q)==='recent'&&q.source_status!=='error'))},true));count++;
  }
  networks.hidden=!count;
 }
 const refresh=()=>{clearTimeout(searchTimer);limit=missingLimit=20;missing.open=false;render();scroller.scrollTop=0;};
 city.addEventListener('input',event=>{clearTimeout(searchTimer);if(event.isComposing)return;searchTimer=setTimeout(refresh,100);});
 city.addEventListener('compositionend',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(refresh,100);});
 network.addEventListener('change',refresh);
 missing.addEventListener('toggle',()=>{if(missing.open)render();});
 networks.addEventListener('toggle',()=>{if(networks.open)render();});
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
 dialog.addEventListener('close',()=>{clearTimeout(searchTimer);if(opener?.isConnected)opener.focus({preventScroll:true});});
 return{open(provider=''){
  clearTimeout(searchTimer);opener=document.activeElement;state.provider=provider;network.value=provider;limit=missingLimit=20;missing.open=false;render();openModal(dialog,city);
 }};
}
