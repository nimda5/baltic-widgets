export const locales={lv:'lv-LV',ru:'ru-RU',en:'en-GB',lt:'lt-LT',et:'et-EE'};
export function resolveLanguage(requested='lv'){return Object.hasOwn(locales,requested)?requested:'en';}
export function createTranslator(catalog,requested){
  const lang=resolveLanguage(requested);
  return (key,fallback=key,values={})=>{
    const text=catalog[lang]?.[key]??catalog.en?.[key]??fallback;
    return String(text).replace(/\{(\w+)\}/g,(match,name)=>Object.hasOwn(values,name)?String(values[name]):match);
  };
}
