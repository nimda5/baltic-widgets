import {openModal} from './modal.js';
import {resolveLanguage,locales} from './i18n-core.js';
import {calendarDate,calendarNames,validateCountryCalendar,fittingNameCount} from './namedays-core.js';
import {text,describeName,roleLabel} from './namedays-content.js';
import {populationCopy,validatePopulation,POPULATION_METRICS} from './namedays-population.js';

const params=new URLSearchParams(location.search),lang=resolveLanguage(params.get('lang')||document.documentElement.lang||'lv');
const tr=(key,values)=>text(lang,key,values),locale=locales[lang];
document.documentElement.lang=lang;
const roots=[...document.querySelectorAll('[data-namedays]')];
const dataBase=new URL('./data/namedays/',import.meta.url);
const profileRequests=new Map(),calendarRequests=new Map(),copyCache=new WeakMap(),panelCache=new WeakMap();
const populationRequests=new Map();
async function population(country){if(!POPULATION_METRICS[country])return null;if(!populationRequests.has(country))populationRequests.set(country,readJSON(new URL('population-'+country+'.json',dataBase)).then(doc=>validatePopulation(doc,country)).catch(()=>{populationRequests.delete(country);return null;}));return populationRequests.get(country);}
function element(tag,className,content){const e=document.createElement(tag);if(className)e.className=className;if(content!==undefined)e.textContent=content;return e;}
function button(className,label,handler){const b=element('button',className,label);b.type='button';b.addEventListener('click',handler);return b;}
async function readJSON(url){const response=await fetch(url,{signal:AbortSignal.timeout(12000),cache:'no-cache'});if(!response.ok)throw Error('HTTP '+response.status);return response.json();}
async function calendar(country='lv'){if(!calendarRequests.has(country))calendarRequests.set(country,readJSON(new URL('calendar-'+country+'.json',dataBase)).then(validateCountryCalendar).then(doc=>{if(doc.country!==country)throw Error('Calendar country mismatch');return doc;}).catch(e=>{calendarRequests.delete(country);throw e;}));return calendarRequests.get(country);}
async function profiles(country){if(!profileRequests.has(country))profileRequests.set(country,readJSON(new URL('profiles-'+country+'.json',dataBase)).then(doc=>{if(doc.schema_version!==1||doc.country!==country||!/^namedays-\d+\.\d+\.\d+$/.test(doc.writer_version)||!doc.data||Object.values(doc.data).some(p=>p.country!==country||p.writer_version!==doc.writer_version))throw Error('Invalid profiles');return doc.data;}).catch(e=>{profileRequests.delete(country);throw e;}));return profileRequests.get(country);}
// Calendar country is independent of the UI language and the finance market.
function countryOf(root){const country=root?.dataset.namedayCountry||params.get('country')||root?.dataset.country||'lv';return ['lv','lt','ee'].includes(country)?country:'lv';}
const formatDate=(date,full=false)=>new Intl.DateTimeFormat(locale,{day:'numeric',month:full?'long':'short',timeZone:'UTC'}).format(new Date(date+'T12:00:00Z'));
let dialog,state,renderTicket=0;
function createDialog(){
 dialog=element('dialog','nameday-dialog');dialog.setAttribute('aria-labelledby','nameday-dialog-title');
 const header=element('header','nameday-dialog-header'),title=element('h2','');title.id='nameday-dialog-title';
 const close=button('nameday-close','×',()=>dialog.close());close.setAttribute('aria-label',tr('close'));header.append(title,close);
 const days=element('div','nameday-days');days.setAttribute('aria-label',tr('calendarDate'));
 for(const [offset,label] of [[-1,'yesterday'],[0,'today'],[1,'tomorrow']]){const b=button('',tr(label),()=>{state.offset=offset;state.selected=null;state.variant=0;renderDialog();});b.dataset.offset=offset;days.append(b);}
 const names=element('div','nameday-names');names.setAttribute('aria-label',tr('all'));
 const tabs=element('div','nameday-tabs');tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label',tr('title'));
 for(const key of ['history','people','wish']){const b=button('',tr(key),()=>{state.tab=key;renderContent();});b.id='nameday-tab-'+key;b.dataset.tab=key;b.setAttribute('role','tab');b.setAttribute('aria-controls','nameday-detail-content');tabs.append(b);}
 tabs.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const list=[...tabs.children],i=list.indexOf(document.activeElement),next=event.key==='Home'?0:event.key==='End'?2:(i+(event.key==='ArrowRight'?1:2))%3;list[next].click();list[next].focus();});
 const content=element('div','nameday-content');content.id='nameday-detail-content';content.setAttribute('role','tabpanel');content.setAttribute('aria-live','off');
 dialog.append(header,days,names,tabs,content);document.body.append(dialog);
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();});
 dialog.addEventListener('close',()=>{renderTicket++;const trigger=state?.trigger;if(trigger?.isConnected)trigger.focus({preventScroll:true});});
}
async function open(root,name,trigger){
 if(!dialog)createDialog();state={root,country:countryOf(root),offset:0,selected:name,tab:'history',mood:'serious',variant:0,trigger,profiles:null};
 if(!dialog.open)openModal(dialog);await renderDialog();
}
async function renderDialog(){
 const ticket=++renderTicket,date=calendarDate(new Date(),state.offset),content=dialog.querySelector('.nameday-content');
 dialog.querySelector('h2').textContent=tr('title')+' · '+formatDate(date,true)+' · '+tr(state.country);
 dialog.querySelectorAll('[data-offset]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.offset)===state.offset)));
 content.replaceChildren(element('p','nameday-state',tr('loading')));dialog.querySelector('.nameday-names').replaceChildren();
 try{
  const [doc,entries,statistics]=await Promise.all([calendar(state.country),profiles(state.country),population(state.country)]);if(ticket!==renderTicket||!dialog.open)return;
  state.population=statistics;
  state.profiles=entries;const names=calendarNames(doc,state.country,date);state.selected=names.some(n=>n.key===state.selected)?state.selected:names[0]?.key;
  const cloud=dialog.querySelector('.nameday-names');cloud.setAttribute('role','group');cloud.setAttribute('aria-label',tr('all'));cloud.scrollTop=0;names.forEach(n=>{const b=button('nameday-name',n.name,()=>{state.selected=n.key;state.variant=0;renderSelection();renderContent();});b.dataset.key=n.key;cloud.append(b);});
  renderSelection();renderContent();
 }catch{if(ticket!==renderTicket)return;content.replaceChildren(element('p','',tr('error')),button('nameday-retry',tr('retry'),renderDialog));}
}
function renderSelection(){dialog.querySelectorAll('[data-key]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.key===state.selected)));}
function renderContent(){
 const content=dialog.querySelector('.nameday-content');content.scrollTop=0;content.replaceChildren();
 dialog.querySelectorAll('[data-tab]').forEach(b=>{const active=b.dataset.tab===state.tab;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});
 content.setAttribute('aria-labelledby','nameday-tab-'+state.tab);
 if(!state.selected){content.append(element('p','',tr('empty')));return;}
 const profile=state.profiles?.[state.selected];
 if(!profile||profile.key!==state.selected||profile.country!==state.country||typeof profile.name!=='string'){content.append(element('p','',tr('error')));return;}
 let copies=copyCache.get(state.profiles);if(!copies){copies=new Map();copyCache.set(state.profiles,copies);}const copyKey=profile.key+':'+lang+':'+state.variant;let copy=copies.get(copyKey);if(!copy){copy=describeName(profile,lang,state.variant,state.profiles);copies.set(copyKey,copy);}
 let panels=panelCache.get(state.profiles);if(!panels){panels=new Map();panelCache.set(state.profiles,panels);}const panelKey=profile.key+':'+lang+':'+state.tab;
 if(state.tab==='history'&&panels.has(panelKey)){content.replaceChildren(...panels.get(panelKey));return;}
 if(state.tab==='history'){
  if(copy.history.length&&!copy.calendar_only){content.append(element('h3','',copy.unverified_hypothesis?copy.hypothesis_label:tr('documented')));for(const p of copy.history)content.append(element('p','',p));}
  if(copy.attestation){
   const record=element('div','nameday-attestation');
   record.append(element('h3','',tr('recordedLabel')),element('strong','',copy.attestation.date),element('small','',tr('recordedNote',{form:copy.attestation.form})));
   content.append(record);
  }
  if(copy.notice)content.append(element('p','nameday-research-note',copy.notice));
  for(const related of copy.related_context||[]){
   content.append(element('h3','',related.title));for(const paragraph of related.history)content.append(element('p','',paragraph));
  }
  panels.set(panelKey,[...content.childNodes]);
 }else if(state.tab==='people'){
  const populationText=populationCopy(state.population,profile.name,state.country,lang);
  if(populationText){const box=element('div','nameday-population');box.append(element('strong','',populationText.title));content.append(box);}
  if(!profile.people?.length)return;
  profile.people.forEach(person=>{const row=element('div','nameday-person');const penName={lv:'literārais pseidonīms',ru:'литературный псевдоним',en:'literary pseudonym',lt:'literatūrinis slapyvardis',et:'kirjanikunimi'};const role=roleLabel(person.role,lang)+(person.match==='related_form'?' · '+tr('variant'):person.match==='pseudonym'?' · '+penName[lang]:'');row.append(element('strong','',person.labels?.[lang]||person.name),element('small','',role));content.append(row);});
 }else{
  const moods=element('div','nameday-moods');for(const key of ['serious','humor']){const b=button('',tr(key),()=>{state.mood=key;state.variant=0;renderContent();});b.setAttribute('aria-pressed',String(state.mood===key));moods.append(b);}
  const greeting=element('p','nameday-greeting',copy.wishes[state.mood][state.variant%3]);
  const actions=element('div','nameday-actions');const copyButton=button('',tr('copy'),async()=>{try{await navigator.clipboard.writeText(greeting.textContent);copyButton.textContent=tr('copied');}catch{const range=document.createRange();range.selectNodeContents(greeting);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);copyButton.textContent=tr('copyError');}});
  actions.append(copyButton,button('',tr('another'),()=>{state.variant=(state.variant+1)%3;renderContent();}));content.append(moods,greeting,actions);
 }
}
const observed=new WeakMap();
const cloudOwners=new WeakMap(),pendingFits=new Set();let resizeObserver,fitFrame;
function scheduleFit(root){pendingFits.add(root);if(fitFrame)return;fitFrame=requestAnimationFrame(()=>{fitFrame=null;for(const item of pendingFits)fit(item);pendingFits.clear();});}
function fit(root){
 const item=observed.get(root);if(!item||!root.isConnected||!item.cloud.clientWidth)return;
 const {names,cloud}=item,focused=cloud.contains(document.activeElement)?document.activeElement:null;
 if(!item.buttons){item.buttons=names.map(n=>{const b=button('nameday-pill',n.name,()=>open(root,n.key,b));b.title=n.name;return b;});item.more=button('nameday-pill nameday-more','',()=>open(root,null,item.more));item.more.setAttribute('aria-label',tr('all'));}
 const {buttons,more}=item,available=cloud.getBoundingClientRect().width,gap=parseFloat(getComputedStyle(cloud).columnGap)||0;
 cloud.classList.add('nameday-measuring');buttons.forEach(b=>b.style.removeProperty('max-width'));cloud.replaceChildren(...buttons,more);
 const widths=buttons.map(b=>b.getBoundingClientRect().width),counterWidths={};
 const moreLabel=remaining=>root.classList.contains('nameday-tab-panel')?tr('all')+' · +'+remaining:'+'+remaining;
 for(let remaining=1;remaining<names.length;remaining++){more.textContent=moreLabel(remaining);counterWidths[remaining]=more.getBoundingClientRect().width;}
 let shown=fittingNameCount(widths,available,gap,counterWidths);
 if(root.classList.contains('nameday-tab-panel'))shown=Math.min(shown,6);
 // Keep one unusually long name readable with ellipsis, reserving the exact counter width.
 if(!shown&&names.length){shown=1;const reserved=names.length>1?counterWidths[names.length-1]+gap:0;buttons[0].style.maxWidth=Math.max(0,available-reserved)+'px';}
 cloud.replaceChildren(...buttons.slice(0,shown));
 if(shown<names.length){more.textContent=moreLabel(names.length-shown);cloud.append(more);}
 cloud.classList.remove('nameday-measuring');
 if(focused)(focused.isConnected?focused:more.isConnected?more:buttons[0])?.focus({preventScroll:true});
 if(state?.root===root&&state.trigger&&!state.trigger.isConnected)state.trigger=more.isConnected?more:buttons[0];
}
async function loadRoot(root){
 const country=countryOf(root),date=calendarDate();root.setAttribute('aria-label',tr('title'));root.replaceChildren(element('p','nameday-state',tr('loading')));
 try{const doc=await calendar(country),names=calendarNames(doc,country,date);const heading=element('h3','nameday-heading');const time=element('time','',formatDate(date));time.dateTime=date;const select=element('select','nameday-country');select.setAttribute('aria-label',tr('country'));for(const c of ['lv','lt','ee']){const option=element('option','',tr(c));option.value=c;select.append(option);}select.value=country;select.addEventListener('change',()=>{for(const item of roots)item.dataset.namedayCountry=select.value;const url=new URL(location.href);url.searchParams.set('country',select.value);history.replaceState(null,'',url);params.set('country',select.value);roots.forEach(loadRoot);});heading.append(element('span','nameday-title',tr('title')),element('span','nameday-today',tr('today')),select,time);const cloud=element('div','nameday-clouds');const old=observed.get(root);if(old)resizeObserver?.unobserve(old.cloud);root.replaceChildren(heading,cloud);if(!names.length)cloud.append(element('p','nameday-state',tr('empty')));else{observed.set(root,{names,cloud});cloudOwners.set(cloud,root);resizeObserver?.observe(cloud);fit(root);}}
 catch{root.replaceChildren(element('p','nameday-state',tr('error')),button('nameday-retry',tr('retry'),()=>loadRoot(root)));}
}
if(roots.length){
 resizeObserver=new ResizeObserver(entries=>entries.forEach(e=>{const root=cloudOwners.get(e.target);if(root)scheduleFit(root);}));
 roots.forEach(root=>{root.classList.add('nameday-widget');loadRoot(root);});
 document.fonts?.ready.then(()=>roots.forEach(scheduleFit));
 document.fonts?.addEventListener('loadingdone',()=>roots.forEach(scheduleFit));
 window.addEventListener('resize',()=>roots.forEach(scheduleFit));
 let current=calendarDate();setInterval(()=>{const next=calendarDate();if(next===current)return;current=next;roots.forEach(loadRoot);if(dialog?.open)renderDialog();},30000);
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&current!==calendarDate()){current=calendarDate();roots.forEach(loadRoot);if(dialog?.open)renderDialog();}});
}
