import {t,lang} from './i18n.js';
// Behaviour for the saved public portal markup. No original third-party JS runs.
// URLs stored in CSS custom properties resolve against the consuming stylesheet.
// Make card images absolute against the document base (also valid under HA Ingress).
document.querySelectorAll('.card__media').forEach(card=>{
  const image=card.style.getPropertyValue('--bg');
  card.style.setProperty('--bg',image.replace(/url\(["']?([^"')]+)["']?\)/g,(_,url)=>`url("${new URL(url,document.baseURI).href}")`));
});
const widgets = document.querySelector('#widgets');
const home = document.createComment('widgets desktop location');
widgets.before(home);
const compact = matchMedia('(max-width: 1199px)');
const mobilePlacement = matchMedia('(max-width: 767px)');
const switcher = document.createElement('div');
switcher.className = 'widget-switcher';
switcher.setAttribute('role','tablist');
switcher.setAttribute('aria-label',t('daily_information','Daily information'));
let selectedWidget = 'fuel-widget';
const panels = [...widgets.querySelectorAll('.widget')];
for(const [id,title] of [['fuel-widget','Degviela'],['horoscope-widget','Horoskops'],['exchange-widget','Valūtas']]){
  const button = document.createElement('button');
  button.type='button';button.id=`tab-${id}`;button.textContent=t(id.replace('-widget',''),title);
  button.setAttribute('role','tab');button.setAttribute('aria-controls',id);
  button.addEventListener('click',()=>{selectedWidget=id;updateWidgets();});
  switcher.append(button);
}
switcher.addEventListener('keydown',event=>{
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  event.preventDefault();
  const list=[...switcher.children],current=list.indexOf(document.activeElement);
  const next=event.key==='Home'?0:event.key==='End'?2:(current+(event.key==='ArrowRight'?1:2))%3;
  list[next].focus();list[next].click();
});
widgets.prepend(switcher);
function updateWidgets(){
  const mobile=compact.matches;
  if(mobilePlacement.matches){
    document.querySelector('.col-carousel').after(widgets);
  }else{home.after(widgets);}
  if(mobile)widgets.dataset.compactMode='tabs';else delete widgets.dataset.compactMode;
  panels.forEach(panel=>{
    panel.hidden=mobile&&panel.id!==selectedWidget;
    if(mobile){panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',`tab-${panel.id}`);}
    else{panel.removeAttribute('role');panel.removeAttribute('aria-labelledby');}
  });
  [...switcher.children].forEach(button=>{
    const active=button.getAttribute('aria-controls')===selectedWidget;
    button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;
  });
}
compact.addEventListener('change',updateWidgets);mobilePlacement.addEventListener('change',updateWidgets);updateWidgets();

// The original three news pages, with accessible pagination and touch swiping.
const slides=[...document.querySelectorAll('.col-carousel .carousel-slide')];
const pagination=document.querySelector('.col-carousel .blaze-pagination');
let activeSlide=0;
function showSlide(index){
  activeSlide=(index+slides.length)%slides.length;
  slides.forEach((slide,i)=>{slide.classList.toggle('local-slide-active',i===activeSlide);slide.setAttribute('aria-hidden',String(i!==activeSlide));});
  [...pagination.children].forEach((button,i)=>{button.setAttribute('aria-label',t('news_page','News page {count}',{count:i+1}));button.setAttribute('aria-current',String(i===activeSlide));});
}
slides.forEach((_,i)=>{const b=document.createElement('button');b.type='button';b.addEventListener('click',()=>showSlide(i));pagination.append(b);});
showSlide(0);
let touchX;
document.querySelector('.col-carousel').addEventListener('touchstart',event=>{touchX=event.changedTouches[0].clientX;},{passive:true});
document.querySelector('.col-carousel').addEventListener('touchend',event=>{const dx=event.changedTouches[0].clientX-touchX;if(Math.abs(dx)>55)showSlide(activeSlide+(dx<0?1:-1));},{passive:true});
document.querySelectorAll('[data-filtercategory]').forEach(link=>{link.href=`https://news.inbox.lv/?language=lv#/news/filter/0/${link.dataset.filtercategory}`;});

// Public weather snapshot, with the same compact carousel structure.
document.querySelectorAll('.panel-weather2').forEach(panel=>{
  const track=panel.querySelector('.blaze-track');if(!track)return;
  const items=[...track.children];let index=Math.max(0,items.findIndex(item=>item.textContent.includes('vējš')));
  const show=()=>items.forEach((item,i)=>item.classList.toggle('local-weather-active',i===index));
  const next=panel.querySelector('.blaze-next');
  if(next){next.setAttribute('role','button');next.tabIndex=0;next.setAttribute('aria-label',t('next_weather','Next weather metric'));const advance=()=>{index=(index+1)%items.length;show();};next.addEventListener('click',advance);next.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();advance();}});}
  show();
});

const menu=document.querySelector('.local-menu'),trigger=document.querySelector('#side-trigger');
trigger.addEventListener('click',()=>{menu.hidden=!menu.hidden;trigger.setAttribute('aria-expanded',String(!menu.hidden));});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){menu.hidden=true;trigger.setAttribute('aria-expanded','false');}});
const more=document.querySelector('.header-products-more-toggle');
if(more){more.addEventListener('click',event=>{event.preventDefault();const list=more.parentElement.querySelector('.dropdown-menu');if(list)list.classList.toggle('show');});}
const language=document.querySelector('#inx-lang-switch-button'),languageMenu=document.querySelector('#top-lang-switch-ddown');
const languageNames={lv:'Latviešu',ru:'Русский',en:'English',lt:'Lietuvių',et:'Eesti'};
const requestedLanguage=lang;
const activeLanguage=Object.hasOwn(languageNames,requestedLanguage)?requestedLanguage:'en';
if(language&&languageMenu){
  languageMenu.replaceChildren();
  for(const [code,name] of Object.entries(languageNames)){
    const item=document.createElement('li'),link=document.createElement('a');item.className='px-3 py-1 dropdown-item';link.textContent=name;
    const target=new URL(location.href);target.searchParams.set('lang',code);link.href=target.href;link.hreflang=code;link.dataset.lang=code;
    if(code===activeLanguage)link.setAttribute('aria-current','true');item.append(link);languageMenu.append(item);
  }
  language.querySelectorAll('span:not(.ico)').forEach((span,i)=>{span.textContent=i===0?activeLanguage.toUpperCase():languageNames[activeLanguage];});
  language.setAttribute('aria-expanded','false');language.setAttribute('aria-haspopup','true');language.setAttribute('role','button');language.tabIndex=0;
  language.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();language.click();}});
  language.addEventListener('click',()=>{const open=languageMenu.classList.toggle('show');language.setAttribute('aria-expanded',String(open));});
  document.addEventListener('click',event=>{if(!language.contains(event.target)&&!languageMenu.contains(event.target)){languageMenu.classList.remove('show');language.setAttribute('aria-expanded','false');}});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){languageMenu.classList.remove('show');language.setAttribute('aria-expanded','false');}});
}

document.querySelectorAll('.branding__logo,.header-product-portal>a').forEach(link=>{link.href=new URL('.',document.baseURI).href;});
// Feed columns are selected by the original app at these widths.
function updateFeed(){
  const width=window.innerWidth;
  const cols=width<768?1:width<1200?2:4;
  document.querySelectorAll('#news-container .cards').forEach(list=>list.style.setProperty('--cols',cols));
  const feed=document.querySelector('#news-container>div[class^="news__col_"]');
  if(feed)feed.className=`news__col_${cols}`;
}
window.addEventListener('resize',updateFeed);updateFeed();

// Translate interface text in the saved markup; leave article bodies and ad images as source content.
const interfaceText={
  'Sākums':'home','E-mail':'email','Business':'business','Files':'files','Foto':'photos','Advertising':'advertising','More':'more','Dating':'dating','Calendar':'calendar','Games':'games','Contacts':'contacts','Shortlink':'shortlink','News':'news','Get Premium':'premium',
  'Visas ziņas':'all_news','Skatīt visus':'view_all','Ziņas':'news','Ikdienai':'daily_information','Palīdzība':'help','Vārda diena':'name_day','Ieiet':'sign_in','Izveidot jauno e-pastu':'create_email',
  'Latvija':'latvia','Pasaulē':'world','Sports':'sports','Izklaide':'entertainment','Viņa':'lifestyle','Techno':'technology','Kultūra':'culture','Nauda':'money','Ceļot':'travel','Сeļot':'travel',
  'laika apstākļi tagad':'weather_now','jūtas kā':'feels_like','vējš':'wind','mitrums':'humidity','Piektd.':'friday','Sestd.':'saturday','Svētd.':'sunday'
};
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let textNode;
while((textNode=walker.nextNode())){
  if(textNode.parentElement.closest('script,style,#widgets,dialog'))continue;
  const original=textNode.textContent.trim(),key=interfaceText[original];
  if(key)textNode.textContent=textNode.textContent.replace(original,t(key,original));
}
trigger.setAttribute('aria-label',t('menu','Menu'));
for(const panel of panels)panel.querySelector('h3').textContent=t(panel.id.replace('-widget',''),panel.querySelector('h3').textContent);
