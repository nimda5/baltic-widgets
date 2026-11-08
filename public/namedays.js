import {resolveLanguage,locales} from './i18n-core.js';
import {calendarDate,calendarNames,validateCountryCalendar,fittingNameCount} from './namedays-core.js';
import {text,describeName,roleLabel,WRITER_VERSION} from './namedays-content.js';
import {populationCopy,validatePopulation} from './namedays-population.js';

const params=new URLSearchParams(location.search),lang=resolveLanguage(params.get('lang')||document.documentElement.lang||'lv');
const tr=(key,values)=>text(lang,key,values),locale=locales[lang];
document.documentElement.lang=lang;
const roots=[...document.querySelectorAll('[data-namedays]')];
const dataBase=new URL('./data/namedays/',import.meta.url);
const profileRequests=new Map();let calendarRequest;
const populationRequests=new Map();
async function population(country){if(!populationRequests.has(country))populationRequests.set(country,readJSON(new URL('population-'+country+'.json',dataBase)).then(doc=>validatePopulation(doc,country)).catch(()=>{populationRequests.delete(country);return null;}));return populationRequests.get(country);}
function element(tag,className,content){const e=document.createElement(tag);if(className)e.className=className;if(content!==undefined)e.textContent=content;return e;}
function button(className,label,handler){const b=element('button',className,label);b.type='button';b.addEventListener('click',handler);return b;}
async function readJSON(url){const response=await fetch(url,{signal:AbortSignal.timeout(12000),cache:'no-cache'});if(!response.ok)throw Error('HTTP '+response.status);return response.json();}
async function calendar(){if(!calendarRequest)calendarRequest=readJSON(new URL('calendar-lv.json',dataBase)).then(validateCountryCalendar).then(doc=>{if(doc.country!=='lv')throw Error('Calendar country mismatch');return doc;}).catch(e=>{calendarRequest=null;throw e;});return calendarRequest;}
async function profiles(country){if(!profileRequests.has(country))profileRequests.set(country,readJSON(new URL('profiles-'+country+'.json',dataBase)).then(doc=>{if(doc.schema_version!==1||doc.country!==country||doc.writer_version!==WRITER_VERSION||!doc.data||Object.values(doc.data).some(p=>p.country!==country))throw Error('Invalid profiles');return doc.data;}).catch(e=>{profileRequests.delete(country);throw e;}));return profileRequests.get(country);}
// Only Latvia is enabled in this release; language and finance-market changes never mix calendars.
function countryOf(){return 'lv';}
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
 const content=element('div','nameday-content');content.id='nameday-detail-content';content.setAttribute('role','tabpanel');content.setAttribute('aria-live','polite');
 dialog.append(header,days,names,tabs,content);document.body.append(dialog);
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();});
 dialog.addEventListener('close',()=>{renderTicket++;const trigger=state?.trigger;if(trigger?.isConnected)trigger.focus();});
}
async function open(root,name,trigger){
 if(!dialog)createDialog();state={root,country:countryOf(root),offset:0,selected:name,tab:'history',mood:'serious',variant:0,trigger,profiles:null};
 if(!dialog.open)dialog.showModal();await renderDialog();
}
async function renderDialog(){
 const ticket=++renderTicket,date=calendarDate(new Date(),state.offset),content=dialog.querySelector('.nameday-content');
 dialog.querySelector('h2').textContent=tr('title')+' · '+formatDate(date,true)+' · '+tr(state.country);
 dialog.querySelectorAll('[data-offset]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.offset)===state.offset)));
 content.replaceChildren(element('p','nameday-state',tr('loading')));dialog.querySelector('.nameday-names').replaceChildren();
 try{
  const [doc,entries,statistics]=await Promise.all([calendar(),profiles(state.country),population(state.country)]);if(ticket!==renderTicket||!dialog.open)return;
  state.population=statistics;
  state.profiles=entries;const names=calendarNames(doc,state.country,date);state.selected=names.some(n=>n.key===state.selected)?state.selected:names[0]?.key;
  const cloud=dialog.querySelector('.nameday-names');names.forEach(n=>{const b=button('nameday-name',n.name,()=>{state.selected=n.key;state.variant=0;renderSelection();renderContent();});b.dataset.key=n.key;cloud.append(b);});
  renderSelection();renderContent();
 }catch{if(ticket!==renderTicket)return;content.replaceChildren(element('p','',tr('error')),button('nameday-retry',tr('retry'),renderDialog));}
}
function renderSelection(){dialog.querySelectorAll('[data-key]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.key===state.selected)));}
function renderContent(){
 const content=dialog.querySelector('.nameday-content');content.replaceChildren();
 dialog.querySelectorAll('[data-tab]').forEach(b=>{const active=b.dataset.tab===state.tab;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});
 content.setAttribute('aria-labelledby','nameday-tab-'+state.tab);
 if(!state.selected){content.append(element('p','',tr('empty')));return;}
 const profile=state.profiles?.[state.selected];
 if(!profile||profile.key!==state.selected||profile.writer_version!==WRITER_VERSION||profile.country!==state.country||typeof profile.name!=='string'){content.append(element('p','',tr('error')));return;}
 const copy=describeName(profile,lang);
 if(state.tab==='history'){
  const populationText=populationCopy(state.population,profile.name,state.country,lang);
  if(populationText){const box=element('div','nameday-population');box.append(element('strong','',populationText.title),element('small','',populationText.note));content.append(box);}
  if(copy.history.length){content.append(element('h3','',tr('documented')));for(const p of copy.history)content.append(element('p','',p));}
  if(copy.attestation){
   const record=element('div','nameday-attestation');
   record.append(element('h3','',tr('recordedLabel')),element('strong','',copy.attestation.date),element('small','',tr('recordedNote',{form:copy.attestation.form})));
   content.append(record);
  }
  content.append(element('h3','',tr('author')),element('p','',copy.story));
 }else if(state.tab==='people'){
  if(!profile.people?.length){content.append(element('p','',tr('noPeople')));return;}
  profile.people.forEach(person=>{const row=element('div','nameday-person');const role=roleLabel(person.role,lang)+(person.match==='related_form'?' · '+tr('variant'):'');row.append(element('strong','',person.labels?.[lang]||person.name),element('small','',role));content.append(row);});
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
 for(let remaining=1;remaining<names.length;remaining++){more.textContent='+'+remaining;counterWidths[remaining]=more.getBoundingClientRect().width;}
 let shown=fittingNameCount(widths,available,gap,counterWidths);
 // Keep one unusually long name readable with ellipsis, reserving the exact counter width.
 if(!shown&&names.length){shown=1;const reserved=names.length>1?counterWidths[names.length-1]+gap:0;buttons[0].style.maxWidth=Math.max(0,available-reserved)+'px';}
 cloud.replaceChildren(...buttons.slice(0,shown));
 if(shown<names.length){more.textContent='+'+(names.length-shown);cloud.append(more);}
 cloud.classList.remove('nameday-measuring');
 if(focused)(focused.isConnected?focused:more.isConnected?more:buttons[0])?.focus({preventScroll:true});
 if(state?.root===root&&state.trigger&&!state.trigger.isConnected)state.trigger=more.isConnected?more:buttons[0];
}
async function loadRoot(root){
 const country=countryOf(root),date=calendarDate();root.setAttribute('aria-label',tr('title'));root.replaceChildren(element('p','nameday-state',tr('loading')));
 try{const doc=await calendar(),names=calendarNames(doc,country,date);const heading=element('h3','nameday-heading');const time=element('time','',formatDate(date));time.dateTime=date;heading.append(element('span','',tr('title')),time);const cloud=element('div','nameday-clouds');const old=observed.get(root);if(old)resizeObserver?.unobserve(old.cloud);root.replaceChildren(heading,cloud);if(!names.length)cloud.append(element('p','nameday-state',tr('empty')));else{observed.set(root,{names,cloud});cloudOwners.set(cloud,root);resizeObserver?.observe(cloud);fit(root);}}
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
