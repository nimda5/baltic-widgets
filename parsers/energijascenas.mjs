import {fuelQuoteFreshness} from '../public/fuel-freshness.js';

export const fallbackPage='https://energijascenas.lv/lv/degvielas-cenas/riga';
const apiOrigin='https://xaptycdgcrvkgqkgiiur.supabase.co';
const providers={circlek:'circle',neste:'neste',viada:'viada',virsi:'virsi',kool:'kool',straujupite:'straujupite'};
const fuels={e95:'95',diesel:'diesel'};

export function parseCommunityFallback(rows,now=new Date().toISOString()){
 if(!Array.isArray(rows)||rows.length>10000)throw Error('Fallback price schema changed');
 const groups=new Map();let eligible=0,expired=0;
 for(const row of rows){
  if(!row||typeof row!=='object')continue;
  const provider=providers[row.station_id],fuel=fuels[row.fuel_type];
  if(!provider||!fuel||row.source_type!=='community')continue;
  // Only explicitly identified Waze reports; never relabel unknown or copied official data.
  if(typeof row.source_url!=='string'||!(/waze/i.test(row.source_url)))continue;
  const value=Number(row.price),at=row.source_observed_at;
  if(typeof row.price!=='number'||!Number.isFinite(value)||value<.2||value>5||typeof at!=='string'||!/^\d{4}-\d\d-\d\dT.*(?:Z|[+-]\d\d:\d\d)$/.test(at)||!Number.isFinite(Date.parse(at)))continue;
  eligible++;
  if(fuelQuoteFreshness({observed_at:at},now)!=='recent'){expired++;continue;}
  const candidate={id:`energijascenas:LV:${provider}:${fuel}`,country:'LV',provider_source:provider,fuel,value,unit:'L',currency:'EUR',
   observed_at:new Date(at).toISOString(),observed_date:null,fetched_at:now,freshness:'recent',evidence:'community_reported',scope:'network_community_report',
   source:'energijascenas',source_url:fallbackPage,upstream_source_url:row.source_url,
   source_station:typeof row.source_station==='string'?row.source_station.slice(0,250):null};
  const key=provider+':'+fuel,list=groups.get(key)||[];list.push(candidate);groups.set(key,list);
 }
 const quotes=[];
 for(const list of groups.values()){
  list.sort((a,b)=>Date.parse(b.observed_at)-Date.parse(a.observed_at));
  const latest=list.filter(q=>q.observed_at===list[0].observed_at);
  if(new Set(latest.map(q=>q.value)).size===1)quotes.push(latest[0]);
 }
 return{quotes,report:{rows:rows.length,eligible_waze_reports:eligible,expired_reports:expired,accepted_quotes:quotes.length}};
}

export async function collectCommunityFallback(now=new Date().toISOString(),fetcher=fetch){
 async function request(url,headers={}){
  const r=await fetcher(url,{headers,signal:AbortSignal.timeout(20000)});
  if(!r.ok)throw Error(`Fallback request failed (HTTP ${r.status})`);
  return r;
 }
 const home=await(await request(fallbackPage)).text();
 const script=[...home.matchAll(/<script[^>]*src="([^"]+)"/g)].map(m=>m[1]).find(s=>/^\/assets\/index-[\w-]+\.js$/.test(s));
 if(!script)throw Error('Fallback public client entry changed');
 const bundle=await(await request(new URL(script,fallbackPage))).text();
 if(!bundle.includes(apiOrigin))throw Error('Fallback public API host changed');
 // Read-only anonymous key distributed by the public browser client. Keep it in memory only.
 const key=[...bundle.matchAll(/["'](eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)["']/g)].map(m=>m[1]).find(value=>{
  try{const claims=JSON.parse(Buffer.from(value.split('.')[1],'base64url'));return claims.role==='anon'&&claims.ref==='xaptycdgcrvkgqkgiiur';}catch{return false;}
 });
 if(!key)throw Error('Fallback anonymous public client configuration changed');
 const url=new URL('/rest/v1/fuel_prices',apiOrigin);
 url.searchParams.set('select','station_id,fuel_type,price,source_url,source_station,source_observed_at,source_type');
 url.searchParams.set('station_id','in.('+Object.keys(providers).join(',')+')');
 url.searchParams.set('fuel_type','in.(e95,diesel)');url.searchParams.set('source_type','eq.community');
 const response=await request(url,{apikey:key,Authorization:'Bearer '+key});
 return parseCommunityFallback(await response.json(),now);
}
