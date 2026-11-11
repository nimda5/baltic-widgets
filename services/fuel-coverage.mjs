import {fuelPriceState} from '../public/fuel-freshness.js';

export function fuelCoverage(documents,now=Date.now()){
 const gaps=[];let total=0,available=0;
 for(const document of documents){
  const {country,providers=[],more_providers=[]}=document.data;
  for(const provider of [...providers,...more_providers])for(const fuel of ['petrol95','diesel']){
   total++;
   const quote=provider.prices[fuel],state=fuelPriceState(quote,now);
   if(state==='recent'&&quote.source_status==='ok'){available++;continue;}
   const observations=[quote,...provider.stations.map(s=>s.prices[fuel])].filter(Boolean);
   const newest=observations.flatMap(q=>q.observed_at||q.observed_date?[q.observed_at||q.observed_date]:[]).sort((a,b)=>Date.parse(b)-Date.parse(a))[0]||null;
   let reason=state==='recent'?'source_unavailable':state;
   if(country==='LV'&&provider.name==='Neste'&&!observations.length)reason='directory_only_no_fresh_community_report';
   if(country==='LV'&&provider.name==='Rietumu Nafta'&&fuel==='petrol95'&&!observations.length)reason='connected_source_publishes_diesel_only';
   gaps.push({country,network:provider.name,fuel:fuel==='petrol95'?'95':'diesel',reason,last_published:newest});
  }
 }
 return{status:gaps.length?'partial':'complete',network_fuel_pairs:total,available,gaps};
}
