import {openModal} from './modal.js';
import {currencyCodes} from './currency-core.js';
import {t,locale} from './i18n.js';
export function chooseCurrency(selected,onSelect){
 document.querySelector('#currency-picker')?.remove();
 const dialog=document.createElement('dialog');dialog.id='currency-picker';dialog.className='currency-dialog';dialog.setAttribute('aria-labelledby','currency-picker-title');
 const header=document.createElement('header'),title=document.createElement('h2');title.id='currency-picker-title';title.textContent=t('choose_currency','Choose currency');
 const close=document.createElement('button');close.type='button';close.className='currency-close';close.textContent='×';close.setAttribute('aria-label',t('close','Close'));close.addEventListener('click',()=>dialog.close());header.append(title,close);
 const list=document.createElement('div');list.className='currency-options';
 const names=new Intl.DisplayNames([locale],{type:'currency'});
 for(const code of currencyCodes){
  const button=document.createElement('button');button.type='button';button.className='currency-option';button.setAttribute('aria-pressed',String(code===selected));
  const symbol=document.createElement('strong');symbol.textContent=code;
  const name=document.createElement('span');name.textContent=names.of(code);button.append(symbol,name);
  button.addEventListener('click',()=>{dialog.close();onSelect(code);});list.append(button);
 }
 dialog.append(header,list);document.body.append(dialog);
 dialog.addEventListener('close',()=>document.querySelector('.currency-choice-trigger')?.focus({preventScroll:true}));
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
 openModal(dialog,list.querySelector('[aria-pressed=true]')||close);
}
