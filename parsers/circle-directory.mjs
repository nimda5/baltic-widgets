import {load} from 'cheerio';
export const circleDirectoryURL='https://www.circlek.lv/station-search';
const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
const addressKey=s=>clean(s).normalize('NFKD').replace(/\p{M}/gu,'').toLocaleLowerCase('lv').replace(/[^\p{L}\p{N}]/gu,'');
export function parseCircleDirectory(html){
  const $=load(html),settings=JSON.parse($('script[data-drupal-selector="drupal-settings-json"]').text());
  const search=settings.ck_sim_search;if(search?.country_code!=='lv'||!search.station_results)throw Error('Circle K directory schema changed');
  const fuelMap={EU_MILES_95:'95',EU_MILES_DIESEL:'diesel',EU_MILESPLUS_DIESEL:'diesel_premium',EU_LPG:'LPG',EU_HVO:'HVO'};
  const result=[],seen=new Set();
  for(const station of Object.values(search.station_results)){
    const meta=station['/sites/{siteId}'],address=station['/sites/{siteId}/addresses']?.PHYSICAL,location=station['/sites/{siteId}/location'];
    if(meta?.status!=='Active'||address?.country!=='LV')continue;
    if(!meta.id||!address.street||!address.city||seen.has(String(meta.id)))throw Error('Invalid Circle K directory location');
    seen.add(String(meta.id));
    result.push({country:'LV',brand:'Circle K',name:clean(meta.name),address:clean(address.street)+', '+clean(address.city),lat:location?.lat,lon:location?.lng,
      directory_id:String(meta.id),directory_url:circleDirectoryURL,available_fuels:[...new Set((station['/sites/{siteId}/fuels']||[]).map(f=>fuelMap[f.name]).filter(Boolean))]});
  }
  if(!result.length)throw Error('Circle K directory is empty');return result;
}
export function mergeCircleDirectory(prices,html){
  const directory=parseCircleDirectory(html),byAddress=new Map(directory.map(s=>[addressKey(s.address),s]));
  const priced=prices.map(p=>{const station=byAddress.get(addressKey(p.address));return station?{...station,...p,address:station.address,name:station.name}:p;});
  // Directory entries without an exact price/address match remain price-less.
  return [...directory,...priced];
}
