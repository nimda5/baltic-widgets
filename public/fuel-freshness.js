export const FUEL_MAX_AGE_MS=48*60*60*1000;
export function fuelPublicationTime(quote){
 const value=quote?.observed_at||(quote?.observed_date?quote.observed_date+'T00:00:00Z':null);
 return value?Date.parse(value):NaN;
}
export function fuelQuoteFreshness(quote,now=Date.now()){
 const age=new Date(now).getTime()-fuelPublicationTime(quote);
 if(!Number.isFinite(age)||age < -3600000)return 'unknown';
 return age>FUEL_MAX_AGE_MS?'stale':'recent';
}
export function fuelPriceState(quote,now=Date.now()){
 if(!Number.isFinite(quote?.price))return 'missing';
 return fuelQuoteFreshness(quote,now);
}
