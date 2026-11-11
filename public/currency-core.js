export const currencyCodes=['SEK','NOK','PLN','DKK','GBP','CHF'];
export const currencyStorageKey='baltic-widgets.market-currency';
export function selectedCurrency(storage){
 try{const code=storage?.getItem(currencyStorageKey);if(currencyCodes.includes(code))return code;}catch{}
 return 'SEK';
}
export function saveCurrency(storage,code){
 if(!currencyCodes.includes(code))return false;
 try{storage?.setItem(currencyStorageKey,code);return !!storage;}catch{return false;}
}
