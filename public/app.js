import {t,lang,locale,labels as uiLabels} from './i18n.js';
import {zodiacPaths} from './zodiac-icons.js';
import { priceButton } from './charts.js';
import { currentZodiac } from './zodiac.js';
import {fuelPriceState} from './fuel-freshness.js';
// Track input method because native selects can match :focus-visible after a mouse click.
document.documentElement.dataset.inputModality='keyboard';
document.addEventListener('pointerdown',()=>{document.documentElement.dataset.inputModality='pointer';},true);
document.addEventListener('pointerdown',event=>{
  for(const menu of document.querySelectorAll('.horoscope-tone[open]'))if(!menu.contains(event.target))menu.open=false;
});
document.addEventListener('keydown',event=>{if(!['Shift','Control','Alt','Meta'].includes(event.key))document.documentElement.dataset.inputModality='keyboard';},true);
let labels=uiLabels;
const $ = (selector) => document.querySelector(selector);
const number = (value, digits = 3) => new Intl.NumberFormat(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

async function readJSON(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(url, { signal: controller.signal, cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally { clearTimeout(timeout); }
}

function validateEnvelope(json) {
  if (json.schema_version !== 1 || !json.data || !Number.isFinite(Date.parse(json.updated_at)) || typeof json.source !== 'string') throw new Error('Invalid data');
}

async function loadWidget(name, render) {
  const container = $(`#${name}-content`);
  try {
    const market = document.documentElement.dataset.market || 'LV';
    const json = await readJSON(`data/${lang}/${name === 'fuel' ? `fuel-${market}` : name}.json?lang=${lang}`);
    validateEnvelope(json);
    labels=json.labels || json.translations?.[lang] || json.translations?.en || {};
    for(const option of document.querySelectorAll('.fuel-market option'))option.textContent=labels.countries?.[option.value] || option.textContent;
    document.documentElement.lang=lang;
    const tab=document.querySelector(`#tab-${name}-widget`);if(tab)tab.textContent=t(name==='exchange'?'exchange_tab':name,name);
    document.querySelector('.fuel-market').setAttribute('aria-label',t('country','Country'));
    document.querySelector(`#${name}-widget h3`).textContent=t(name,name);
    container.replaceChildren();
    render(container, json.data);
    container.dataset.updatedAt = json.updated_at;
    if (name !== 'horoscope' && !json.demo && Date.now() - Date.parse(json.updated_at) > 86400000) container.append(element('span', 'stale', t('stale_data','Data is older than 24 hours')));
  } catch {
    const message = element('div', 'error-message', t('unavailable','Data is currently unavailable.'));
    const retry = element('button', '', t('retry','Retry'));
    retry.type = 'button';
    retry.addEventListener('click', () => loadWidget(name, render));
    message.append(retry);
    container.replaceChildren(message);
  }
}

const paths = {
  ...zodiacPaths,
  fuel: 'M5 21V4h9v17M4 21h12M5 10h9M17 6l3 3v8a2 2 0 0 1-4 0v-3h-2M18 7v4h2',
  horoscope: 'M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z',
  clock: 'M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0',
  flame: 'M13 3c1 5-4 6-2 10 1-2 3-3 4-5 6 7 3 13-3 13-7 0-9-7-5-12 0 4 2 4 2 4-1-5 2-7 4-10Z',
  market: 'M4 19V5M4 19h17M7 14l4-4 4 2 5-6M16 6h4v4',
  bolt: 'M13 2L5 13h6l-1 9 9-13h-6Z',
  gold: 'M9 4h6l3 7H6l3-7ZM4 14h6l3 6H1l3-6ZM15 14h6l2 6H12l3-6Z',
  tone_serious:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M8 9h.01M16 9h.01M8 15h8',
  tone_humor:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M7 9l2-1 2 1M13 9l2-1 2 1M7 13h10q-1 6-5 6t-5-6Z',
  bitcoin: 'M9 5h6a3.5 3.5 0 0 1 0 7H9h7a3.5 3.5 0 0 1 0 7H9V5M12 2v3M16 2v3M12 19v3M16 19v3M6 5h3M6 19h3',
  left: 'M14 6l-6 6 6 6', right: 'M10 6l6 6-6 6',
};

function icon(name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.5');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  for(const d of (Array.isArray(paths[name])?paths[name]:[paths[name]||paths.horoscope])){
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',d);svg.append(path);
  }
  return svg;
}

function trend(current, previous, percent = false) {
  const known = Number.isFinite(previous) && Number.isFinite(current);
  const delta = known ? current - previous : 0;
  const hasPercentage = known && previous !== 0;
  const value = hasPercentage ? delta / Math.abs(previous) * 100 : 0;
  const direction = !known ? 'unknown' : delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat';
  const arrow = direction === 'up' ? '↑' : direction === 'down' ? '↓' : '–';
  const label = !known?t('no_comparison','No comparison available'):t('previous_value','Previous: {value}',{value:number(previous,4)})+(hasPercentage?' · '+t('change_value','Change: {value}%',{value:number(value,2)}):'');
  const node = element('span', `trend ${direction}`, percent && hasPercentage ? `${arrow} ${number(Math.abs(value), 2)}%` : arrow);
  if(!known || delta===0)node.hidden=true;
  node.title = label;
  node.setAttribute('aria-label', label);
  return node;
}

function applyPriceTrend(button, current, previous) {
  if (Number.isFinite(current) && Number.isFinite(previous)) button.dataset.trend = current > previous ? 'up' : current < previous ? 'down' : 'flat';
}

const fuelKeys = ['petrol95', 'diesel'];
const fuelPriceViews=[];
function unavailableFuel(quote,label){
  const state=fuelPriceState(quote),reason=t(state==='stale'?'fuel_price_expired':'fuel_price_unconfirmed',state==='stale'?'Published price is older than 48 hours':'No confirmed price from the last 48 hours');
  const marker=Number.isFinite(quote?.price)?priceButton(quote,{label,unit:'EUR/l',text:'?',className:'unavailable'}):element('span','unavailable','?');
  marker.title=[reason,quote?.observed_at||quote?.observed_date].filter(Boolean).join(' · ');marker.setAttribute('aria-label',label+': '+reason);return marker;
}
function paintFuelPrice(cell,quote,label){
  cell.replaceChildren();
  if (fuelPriceState(quote)!=='recent') cell.append(unavailableFuel(quote,label));
  else {
    const button = priceButton(quote,{label,unit:'EUR/l'}); button.append(trend(quote.price,quote.previous));
    applyPriceTrend(button,quote.price,quote.previous);
    button.title = [quote.scope==='network_published_minimum'?t('network_minimum','Published network minimum; individual station prices may differ'):'', !quote.observed_date&&!quote.observed_at?t('publication_date_unknown','Publication date not provided by the operator'):'',quote.station_address, quote.observed_date || quote.observed_at?.slice(0,10), quote.freshness === 'stale' ? t('old','Outdated price') : '', quote.source_status === 'error' ? t('source_unavailable','Source currently unavailable') : '', t('view_price_history','View price history')].filter(Boolean).join(' · ');
    if (quote.freshness === 'stale' || quote.source_status === 'error') {
      button.classList.add('stale-price');

    }
    cell.append(button);
  }
}
function fuelCell(quote,label){const cell=element('td','price-cell');paintFuelPrice(cell,quote,label);fuelPriceViews.push({node:cell,quote,label,state:fuelPriceState(quote)});return cell;}
function refreshFuelPriceViews(){for(const item of fuelPriceViews){const state=fuelPriceState(item.quote);if(item.node.isConnected&&state!==item.state){paintFuelPrice(item.node,item.quote,item.label);item.state=state;}}}
setInterval(refreshFuelPriceViews,60000);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')refreshFuelPriceViews();});

function fuel(container, data) {
  fuelPriceViews.length=0;
  if (!Array.isArray(data.providers) || data.providers.some(p => typeof p.name !== 'string' || !p.prices)) throw new Error('Invalid fuel data');
  const withReference = quote => quote ? {...quote, reference_history: data.country_history?.[quote.reference_key]?.history,
    reference_label: data.country_history?.[quote.reference_key]?.label, reference_source: data.country_history?.[quote.reference_key]?.source} : null;
  if (!data.providers.length) container.append(element('p','muted',t('fuel_loading','Loading fuel prices…')));
  const table = element('table', 'fuel-table');
  table.setAttribute('aria-label', t('fuel_table','Fuel prices by network, EUR per litre'));
  const head = element('thead'); const header = element('tr');
  [t('station','Station'), '95', t('diesel','Diesel')].forEach(label => { const th = element('th', '', label); th.scope = 'col';header.append(th); });
  head.append(header);
  const body = element('tbody');
  const providerRows=[];
  const providers=[...data.providers,...(data.more_providers || [])];
  providers.forEach((provider, index) => {
    const row = element('tr');
    const name = element('th'); name.scope = 'row';
    const button = element('button', 'provider-button', provider.name);
    button.type = 'button'; button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-controls', `provider-${index}`);
    button.append(icon('right'));
    if(data.country!=='LV'||provider.directory_location_count){const count=element('small','station-count',` ${provider.station_count}`);count.title=t(provider.directory_location_count?'directory_count':'priced_count','Known locations',{count:provider.station_count});button.append(count);}
    name.append(button); row.append(name, ...fuelKeys.map((key,i) => fuelCell(withReference(provider.prices[key]),`${provider.name} · ${['95',t('diesel','Diesel')][i]}`)));
    const detailsRow = element('tr', 'provider-details'); detailsRow.id = `provider-${index}`; detailsRow.hidden = true;
    const detailsCell = element('td'); detailsCell.colSpan = 3;
    if (provider.stations?.length) {
      const sharedPrices=data.country==='LV' && fuelKeys.every(key=>new Set(provider.stations.map(s=>s.prices?.[key]?.price).filter(Number.isFinite)).size<=1);
      const details = element('div', sharedPrices?'station-list addresses-only':'station-list');
      if(provider.directory_location_count){
        const search=element('input','station-search');search.type='search';search.placeholder=t('station_search','Find a location by name or address');search.setAttribute('aria-label',search.placeholder);
        search.addEventListener('input',()=>{const query=search.value.toLocaleLowerCase(locale).trim();for(const row of details.children)if(row.classList.contains('station-detail'))row.hidden=!row.textContent.toLocaleLowerCase(locale).includes(query);});detailsCell.append(search);details.classList.add('station-directory');
      }

      [...provider.stations].sort((a,b)=>Number(Object.values(b.prices).some(Boolean))-Number(Object.values(a.prices).some(Boolean))||(a.address||a.name||'').localeCompare(b.address||b.name||'',locale)).forEach(station => {
        const line = element('div', 'station-detail');
        if (station.name && station.name !== provider.name) line.append(element('strong', 'station-name', station.name));
        line.append(element('span', 'station-address', station.address || station.name || provider.name));
        const prices = element('div',sharedPrices?'station-fuel-tags':'station-price-list');
        fuelKeys.forEach((key,i)=>{
          const quote=withReference(station.prices?.[key]), label=['95',t('diesel','Diesel')][i];
          if(sharedPrices)return;
          const item=element('span','station-quote'); item.append(element('span','station-fuel-label',label));
          const value=element('span','station-quote-value');
          if(fuelPriceState(quote)==='recent') {
            const trigger = priceButton(quote,{label:`${station.name} · ${label}`,unit:'EUR/l'});
            applyPriceTrend(trigger,quote.price,quote.previous);
            if (quote.freshness === 'stale') trigger.classList.add('stale-price');
            trigger.title = [quote.observed_date || quote.observed_at?.slice(0,10), quote.freshness === 'stale' ? t('old','Outdated price') : '', quote.evidence === 'community_reported' ? t('community_reported','Community report') : '', quote.source_status === 'error' ? t('source_unavailable','Source currently unavailable') : ''].filter(Boolean).join(' · ');
            value.append(trigger);
          }
          else value.append(unavailableFuel(quote,`${station.name} · ${label}`));
          item.append(value);fuelPriceViews.push({node:value,quote,label:`${station.name} · ${label}`,state:fuelPriceState(quote)});
          prices.append(item);
        });
        const dates = Object.values(station.prices || {}).filter(Boolean).map(q => q.observed_date || q.observed_at?.slice(0,10)).filter(Boolean);
        const old = Object.values(station.prices || {}).some(q => q?.freshness === 'stale');
        if(!sharedPrices&&fuelKeys.some(key=>Number.isFinite(station.prices?.[key]?.price)))line.append(prices, element('small','station-date',`${dates.sort().at(-1) || ''}${old ? ' · '+t('stale_station_prices','Some prices are outdated') : ''}`)); details.append(line);
      });
      detailsCell.append(details);
    } else detailsCell.append(element('p', 'provider-empty', t('stations_unavailable','Individual station prices are not available yet.')));
    detailsRow.append(detailsCell);
    button.addEventListener('click', () => { detailsRow.hidden = !detailsRow.hidden; button.setAttribute('aria-expanded', String(!detailsRow.hidden)); });
    if(index>=data.providers.length)row.hidden=true;
    providerRows.push({row,detailsRow,button});
    body.append(row, detailsRow);
  });
  table.append(head, body); container.append(table);
  if(data.more_providers?.length){
    const more=element('button','providers-more');more.type='button';more.setAttribute('aria-expanded','false');
    const paint=show=>{const label=element('span','',show?t('less_networks','Show less'):t('more_networks','Other networks'));const count=element('span','providers-count',String(data.more_providers.length));more.replaceChildren(label,count,icon('right'));};paint(false);
    more.addEventListener('click',()=>{const show=more.getAttribute('aria-expanded')!=='true';more.setAttribute('aria-expanded',String(show));paint(show);providerRows.slice(data.providers.length).forEach(({row,detailsRow,button})=>{row.hidden=!show;if(!show){detailsRow.hidden=true;button.setAttribute('aria-expanded','false');}});});container.append(more);
  }

  const energyQuotes=element('div','energy-quotes');container.append(energyQuotes);
  const power = element('div', 'electricity'); power.textContent = t('electricity_loading','Loading electricity price…'); energyQuotes.append(power);
  loadElectricity(power);
  const gas=element('div','electricity gas');energyQuotes.append(gas);loadGas(gas);
}

async function loadElectricity(container) {
  try {
    const json = await readJSON(`data/${lang}/electricity.json?lang=${lang}`); validateEnvelope(json);
    const market = document.documentElement.dataset.market || 'LV';
    const quote = json.data.areas?.[market];
    if (!quote || !Number.isFinite(quote.price_eur_mwh) || !Number.isFinite(Date.parse(quote.valid_from)) || !Number.isFinite(Date.parse(quote.valid_to))) throw new Error('Invalid electricity');
    const info = element('div', 'electricity-info');
    const timeZone = {LV:'Europe/Riga', EE:'Europe/Tallinn', LT:'Europe/Vilnius'}[market];
    const time = date => new Intl.DateTimeFormat(locale, {timeZone, hour:'2-digit', minute:'2-digit', hourCycle:'h23'}).format(new Date(date));
    const previous = Number.isFinite(quote.previous_eur_mwh) ? quote.previous_eur_mwh / 1000 : null;
    const history = quote.history?.map(p=>({at:p.at,value:p.value/1000}));
    const daily_history=quote.history_daily?.map(p=>({at:p.at,value:p.value/1000}));
    const chartQuote={price:quote.price_eur_mwh/1000,history,daily_history,history_source:quote.source},chartOptions={label:`${t('electricity','Electricity')} · Nord Pool ${market}`,unit:'EUR/kWh',digits:4,intraday:true};
    const trigger=priceButton(chartQuote,chartOptions);
    const heading=priceButton(chartQuote,{...chartOptions,text:t('electricity','Electricity'),className:'energy-name'});heading.classList.add('electricity-title','energy-title-trigger');heading.prepend(icon('bolt'));
    const caption=`Nord Pool · ${market} · ${time(quote.valid_from)}–${time(quote.valid_to)}`;
    heading.title=trigger.title=caption;info.append(heading);
    applyPriceTrend(trigger,quote.price_eur_mwh/1000,previous);
    trigger.append(element('span','unit',' EUR/kWh'),trend(quote.price_eur_mwh/1000,previous));
    const price = element('div', 'electricity-price'); price.append(trigger);
    container.title = t('electricity_basis','Wholesale price excluding VAT and fees. Compared with the previous interval.');
    container.replaceChildren(info, price);
  } catch { container.replaceChildren(element('span', 'muted', t('electricity_unavailable','Electricity price unavailable'))); }
}

async function loadGas(container){
  try{
    const json=await readJSON(`data/${lang}/gas.json?lang=${lang}`);validateEnvelope(json);
    const market=document.documentElement.dataset.market || 'LV',quote=json.data.areas?.[market];
    if(!Number.isFinite(quote?.price_eur_mwh))throw Error('No gas price');
    const info=element('div','electricity-info');
    const caption=`EEX NGP · ${quote.zone} · ${quote.observed_date}${quote.provisional?' · '+t('provisional','Provisional'):''}`;
    const chartQuote={price:quote.price_eur_mwh,history:quote.history,history_source:quote.history_source,chart_series:quote.chart_series},chartOptions={label:`${t('gas','Natural gas')} · ${quote.zone}`,unit:'EUR/MWh',digits:2};
    const trigger=priceButton(chartQuote,chartOptions);
    const heading=priceButton(chartQuote,{...chartOptions,text:t('gas','Natural gas'),className:'energy-name'});heading.classList.add('electricity-title','energy-title-trigger');heading.prepend(icon('flame'));heading.title=trigger.title=caption;info.append(heading);
    applyPriceTrend(trigger,quote.price_eur_mwh,quote.previous_eur_mwh);trigger.append(element('span','unit',' EUR/MWh'),trend(quote.price_eur_mwh,quote.previous_eur_mwh));
    const price=element('div','electricity-price');price.append(trigger);container.title=t('gas_basis','Wholesale, excluding VAT and delivery fees');container.replaceChildren(info,price);
  }catch{container.replaceChildren(element('span','muted',t('gas','Natural gas')+' · '+t('unavailable','Data unavailable')));}
}

function horoscope(container, data) {
  if (!Array.isArray(data.signs) || !data.signs.length || data.signs.some(s => ['name', 'id', 'dates','today','tomorrow'].some(k => typeof s[k] !== 'string'))) throw new Error('Invalid horoscope data');
  const timeZone=data.timezone||'Europe/Riga';
  let selected=Math.max(0,data.signs.findIndex(sign=>sign.id===currentZodiac(new Date(),timeZone))),day='today';
  let mood=data.selected_mood||'serious';
  const variant=crypto.getRandomValues(new Uint32Array(1))[0]%(data.variants_per_mood||3);
  try{const saved=localStorage.getItem('horoscope-mood');if(saved==='playful')mood='humor';else if(data.moods?.includes(saved))mood=saved;}catch{}
  const tabs=element('div','horoscope-days segmented');
  for(const [key,label] of [['today',t('today','Today')],['tomorrow',t('tomorrow','Tomorrow')]]){
    const button=element('button','',label);button.type='button';button.dataset.day=key;
    button.addEventListener('click',()=>{day=key;show();});tabs.append(button);
  }
  const top=element('div','zodiac-top'),symbol=element('span','zodiac-symbol'),info=element('div','zodiac-info');
  const select=element('select');select.setAttribute('aria-label',t('zodiac_sign','Zodiac sign'));
  data.signs.forEach((sign,i)=>{const option=element('option','',sign.name);option.value=String(i);select.append(option);});
  select.addEventListener('change',()=>{selected=Number(select.value);show();});
  const dates=element('p','zodiac-date');info.append(select,dates);
  const tone=element('details','horoscope-tone'),toneToggle=element('summary');
  const toneMenu=element('div','horoscope-tone-menu');toneMenu.setAttribute('role','group');toneMenu.setAttribute('aria-label',t('horoscope_mood','Tone'));
  for(const key of ['serious','humor']){
    const button=element('button','',t('mood_'+key,key));button.type='button';button.dataset.mood=key;button.prepend(icon('tone_'+key));
    button.addEventListener('click',()=>{mood=key;try{localStorage.setItem('horoscope-mood',mood);}catch{}tone.open=false;show();toneToggle.focus();});toneMenu.append(button);
  }
  // Safari does not focus buttons on pointer activation. A null relatedTarget
  // must not hide the menu before its click can select a mood.
  tone.addEventListener('focusout',event=>{if(event.relatedTarget && !tone.contains(event.relatedTarget))tone.open=false;});
  tone.addEventListener('keydown',event=>{if(event.key==='Escape'){tone.open=false;toneToggle.focus();}});
  tone.append(toneToggle,toneMenu);top.append(symbol,info,tone);
  const text=element('div','horoscope-advice');text.id='horoscope-reading';
  let expanded=false,readingKey='';
  const readMore=element('button','horoscope-read-more');readMore.type='button';readMore.setAttribute('aria-controls',text.id);
  function toggleReading(){text.classList.toggle('is-expanded',expanded);readMore.setAttribute('aria-expanded',String(expanded));readMore.textContent=expanded?t('read_less','Show less'):t('read_more','Read more');}
  readMore.addEventListener('click',()=>{expanded=!expanded;toggleReading();});
  function show(){
    const key=[selected,day,mood].join(':');if(key!==readingKey){expanded=false;readingKey=key;}toggleReading();
    const sign=data.signs[selected];select.value=String(selected);symbol.replaceChildren(icon(sign.id));dates.textContent=sign.dates;
    const reading=sign.advice?.[day]?.[mood]?.[variant];text.replaceChildren();
    if(reading){
      for(const [field,label] of [['do',t('horoscope_do','Do')],['dont',t('horoscope_dont','Avoid')]]){
        const section=element('section','horoscope-advice-section '+field),heading=element('h4','',label),mark=element('span','advice-mark',field==='do'?'✓':'×');mark.setAttribute('aria-hidden','true');heading.prepend(mark);const list=element('ul');
        reading[field].forEach(item=>list.append(element('li','',item)));section.append(heading,list);text.append(section);
      }
    }else{text.append(element('p','horoscope-text',sign.readings?.[day]?.[mood]?.[variant]||sign[day]));}
    toneToggle.replaceChildren(icon('tone_'+mood));toneToggle.title=t('horoscope_mood','Tone')+': '+t('mood_'+mood,mood);toneToggle.setAttribute('aria-label',toneToggle.title);
    toneMenu.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.mood===mood)));
    tabs.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.day===day)));
  }
  const header=container.closest('.widget').querySelector('.widget-header');header.querySelector('.horoscope-days')?.remove();header.append(tabs);
  container.dataset.horoscopeDate=data.date;
  container.append(top,text,readMore);show();
}

function exchange(container, data) {
  if (!['eur_usd','gold_eur_oz','btc_eur'].every(key => Number.isFinite(data[key]?.price) && data[key].price > 0)) throw new Error('Invalid rates');
  const usd = data.eur_usd;
  const quotes = [
    {name:'EUR / USD', symbol:'€', sub:t('euro','1 eiro'), quote:usd, digits:4},
    {name:'USD / EUR', symbol:'$', sub:t('dollar','1 dollar'), quote:{observed_at:usd.observed_at,history_source:usd.history_source,price:1/usd.price, previous:Number.isFinite(usd.previous) && usd.previous > 0 ? 1/usd.previous : null,history:usd.history?.filter(p=>p.value>0).map(p=>({at:p.at,value:1/p.value}))}, digits:4},
    {name:t('gold','Zelts'), symbol:'gold', sub:'EUR / oz', quote:data.gold_eur_oz, digits:2},
    {name:'Bitcoin', symbol:'bitcoin', sub:'EUR / BTC', quote:data.btc_eur, digits:2}
  ];
  const list = element('div', 'market-list');
  quotes.forEach(item => {
    const options={label:item.name,unit:item.name==='EUR / USD'?'USD':item.name==='USD / EUR'?'EUR':item.sub,digits:item.digits};
    const row=element('div','market-row');
    const label=priceButton(item.quote,{...options,text:item.name,className:'market-name-text'});label.classList.add('market-label','market-label-trigger');
    const symbol = element('span', 'market-symbol'); symbol.setAttribute('aria-hidden','true');
    if (item.symbol === 'gold' || item.symbol === 'bitcoin') symbol.append(icon(item.symbol)); else symbol.textContent = item.symbol;
    label.prepend(symbol);label.append(element('small','market-unit',item.sub));
    const trigger=priceButton(item.quote,{...options,className:'market-price'});trigger.classList.add('market-value-trigger');
    trigger.title=[item.quote.history_source,item.quote.observed_at?.slice(0,10),t('previous_published','Compared with previous published value')].filter(Boolean).join(' · ');
    applyPriceTrend(trigger,item.quote.price,item.quote.previous);
    trigger.append(trend(item.quote.price,item.quote.previous,true)); row.append(label,trigger); list.append(row);
  });
  container.append(list);
  const caption=container.closest('.widget').querySelector('.widget-header>.muted,.widget-header>.period,.widget-header>span:last-child');if(caption)caption.textContent=t('published_daily','Daily');
}

const requestedMarket = new URLSearchParams(location.search).get('market');
if (['LV','LT','EE'].includes(requestedMarket)) document.documentElement.dataset.market = requestedMarket;
const marketSelect = element('select', 'fuel-market'); marketSelect.setAttribute('aria-label',t('country','Country'));
for (const [value, label] of [['LV','Latvia'],['LT','Lithuania'],['EE','Estonia']]) { const option = element('option','',uiLabels.countries?.[value]||label); option.value=value; marketSelect.append(option); }
marketSelect.value = document.documentElement.dataset.market || 'LV';
marketSelect.addEventListener('change',()=>{
  document.documentElement.dataset.market = marketSelect.value;
  const url = new URL(location.href); url.searchParams.set('market',marketSelect.value); history.replaceState(null,'',url);
  loadWidget('fuel',fuel);
});
document.querySelector('#fuel-widget .location').replaceChildren(marketSelect);
document.querySelectorAll('[data-icon]').forEach(node => node.append(icon(node.dataset.icon)));

async function news() {
  try {
    const items = await readJSON('assets/news.json');
    const row = (item) => {
      const link = element('a', 'news-item');
      link.href = item.url;
      const image = element('img'); image.src = item.image; image.alt = ''; image.width = 77; image.height = 48;
      const title = element('h3', '', item.title + '. ');
      title.append(element('span', '', item.description));
      const picture = element('picture');
      const source = element('source'); source.media='(min-width:1900px)'; source.srcset=item.largeImage;
      picture.append(source,image);
      const content = element('div','news-item-copy'); content.append(title,element('p','news-description',item.description));
      link.append(picture, content);
      return link;
    };
    $('#top-news-list').replaceChildren(...items.slice(0, 7).map(row));
    $('#news-cards').replaceChildren(...items.slice(0, 4).map(item => {
      const link = element('a', 'news-card'); link.href = item.url;
      const image = element('img'); image.src = item.largeImage; image.alt = ''; image.loading = 'lazy';
      link.append(image, element('h3', '', item.title), element('small', '', t('news_preview','News preview')+' · inbox.lv'));
      return link;
    }));
  } catch { $('#top-news-list').textContent = t('news_preview_unavailable','News preview is unavailable.'); }
}

if ($('#top-news-list')) news();
loadWidget('fuel', fuel);
loadWidget('horoscope', horoscope);
loadWidget('exchange', exchange);

// Catch up an open page when the Riga calendar day changes, including after sleep.
setInterval(()=>{const el=document.querySelector('#horoscope-content');if(!el?.dataset.horoscopeDate)return;const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Riga',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const today=['year','month','day'].map(k=>parts.find(p=>p.type===k).value).join('-');if(today!==el.dataset.horoscopeDate)loadWidget('horoscope',horoscope);},60000);
