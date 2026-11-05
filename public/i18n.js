import {locales,resolveLanguage,createTranslator} from './i18n-core.js';
export const lang=resolveLanguage(new URLSearchParams(location.search).get('lang')||'lv');
export const locale=locales[lang];
let catalog={};
try{
  const response=await fetch(new URL('./data/translations.json',import.meta.url),{cache:'no-store',signal:AbortSignal.timeout(8000)});
  if(response.ok)catalog=await response.json();
}catch{}
export const t=createTranslator(catalog,lang);
export const labels={...catalog.en,...catalog[lang]};
document.documentElement.lang=lang;
document.querySelector('.chart-eyebrow').textContent=t('price_history','Price history');
document.querySelector('.chart-close').setAttribute('aria-label',t('close_chart','Close chart'));
document.querySelector('.chart-periods').setAttribute('aria-label',t('chart_period','Chart period'));
document.querySelector('.chart-cursor').setAttribute('aria-label',t('choose_history_point','Choose a historical price'));
document.dispatchEvent(new CustomEvent('locale-ready',{detail:labels}));
