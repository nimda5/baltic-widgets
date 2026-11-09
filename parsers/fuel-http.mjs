// A truthful public-client identity, standard content negotiation, and bounded
// retries. No browser impersonation, cookie import, or challenge solving.
export const fuelHTTPHeaders={
 'User-Agent':'BalticWidgets/1.0 (+https://github.com/nimda5/baltic-widgets)',
 'Accept':'text/html,application/json;q=0.9,*/*;q=0.8',
 'Accept-Language':'lv-LV,lv;q=0.9,en;q=0.7'
};
export function safeHTTPURL(value){const url=new URL(value);return url.origin+url.pathname;}
export function createFuelHTTP({fetchImpl=(...args)=>fetch(...args),wait=ms=>new Promise(r=>setTimeout(r,ms)),now=Date.now,minGap=1000,onResponse=()=>{}}={}){
 const queues=new Map(),lastStart=new Map();
 async function pace(url){
  const host=new URL(url).origin,previous=queues.get(host)||Promise.resolve();
  const reserved=previous.catch(()=>{}).then(async()=>{const last=lastStart.get(host);if(last!==undefined){const delay=minGap-(now()-last);if(delay>0)await wait(delay);}lastStart.set(host,now());});
  queues.set(host,reserved);await reserved;
 }
 async function request(url,headers={},attempt=0){
  await pace(url);const started=now();
  try{
   const res=await fetchImpl(url,{headers:{...fuelHTTPHeaders,...headers},signal:AbortSignal.timeout(25000)});
   const diagnostic={at:new Date(now()).toISOString(),url:safeHTTPURL(url),final_url:safeHTTPURL(res.url||url),status:res.status,elapsed_ms:now()-started,server:res.headers.get('server'),content_type:res.headers.get('content-type'),retry_after:res.headers.get('retry-after'),request_id:res.headers.get('cf-ray')||res.headers.get('x-request-id')||res.headers.get('x-amzn-requestid')};
   onResponse(diagnostic);
   if(!res.ok){
    const retry=res.headers.get('retry-after'),seconds=retry===null?NaN:Number(retry);
    const delay=retry===null?1500:Number.isFinite(seconds)?Math.max(0,seconds*1000):Math.max(0,Date.parse(retry)-now());
    // Do not retry a 403. Long Retry-After values defer to the task scheduler,
    // rather than sleeping or retrying earlier than the server requested.
    if(attempt===0&&(res.status===429||res.status>=500)&&Number.isFinite(delay)&&delay<=5000){await res.body?.cancel();await wait(delay);return request(url,headers,1);}
    await res.body?.cancel();
    const context=[diagnostic.server&&'server='+diagnostic.server,diagnostic.request_id&&'request_id='+diagnostic.request_id,retry&&'retry_after='+retry].filter(Boolean).join('; ');
    const error=new Error(`Upstream HTTP ${res.status} (${diagnostic.url}${context?'; '+context:''})`);error.diagnostic=diagnostic;throw error;
   }
   const text=await res.text();if(text.length>8_000_000)throw Error('Response too large ('+safeHTTPURL(url)+')');return text;
  }catch(e){
   if(e.name==='TimeoutError'&&attempt===0)return request(url,headers,1);
   // Never log response bodies, request headers, cookies or authorization.
   throw e;
  }
 }
 return request;
}
export const requestFuel=createFuelHTTP();
