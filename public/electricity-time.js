// Select the current delivery interval locally from the published day-ahead
// schedule. Passing time does not require another request to the price source.
export function electricityQuoteAt(quote,now=Date.now()){
 if(!quote)return null;
 const points=(quote.history||[]).filter(p=>Number.isFinite(p.value)&&Number.isFinite(Date.parse(p.at))).sort((a,b)=>Date.parse(a.at)-Date.parse(b.at));
 const i=points.findLastIndex(p=>Date.parse(p.at)<=now);
 if(i<0)return Date.parse(quote.valid_from)<=now&&Date.parse(quote.valid_to)>now?quote:null;
 const point=points[i],start=Date.parse(point.at),next=points[i+1];
 const resolution=Number.isFinite(quote.resolution_seconds)?quote.resolution_seconds*1000:900000;
 const end=Math.min(next?Date.parse(next.at):Infinity,start+resolution);
 if(now>=end)return null;
 return{...quote,price_eur_mwh:point.value,previous_eur_mwh:points[i-1]?.value??null,valid_from:point.at,valid_to:new Date(end).toISOString()};
}
