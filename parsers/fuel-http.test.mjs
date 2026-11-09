import test from 'node:test';
import assert from 'node:assert/strict';
import {createFuelHTTP,fuelHTTPHeaders} from './fuel-http.mjs';
test('requests use a truthful client identity and pace starts per origin',async()=>{
 let time=0;const calls=[],pauses=[];
 const request=createFuelHTTP({now:()=>time,wait:async ms=>{pauses.push(ms);time+=ms;},fetchImpl:async(url,options)=>{calls.push({url:String(url),at:time,headers:options.headers});return new Response('ok');}});
 await request('https://example.org/one');await request('https://example.org/two');await request('https://other.example/one');
 assert.deepEqual(calls.map(c=>c.at),[0,1000,1000]);assert.deepEqual(pauses,[1000]);
 assert.match(calls[0].headers['User-Agent'],/BalticWidgets/);assert.doesNotMatch(calls[0].headers['User-Agent'],/Mozilla|Chrome/);
 assert.equal(calls[0].headers.Accept,fuelHTTPHeaders.Accept);
});
test('a 403 is not retried and diagnostics never expose cookies, auth or query secrets',async()=>{
 let calls=0;const responseHeaders={'server':'cloudflare','cf-ray':'public-request-id','set-cookie':'private-cookie','content-type':'text/html'};
 const request=createFuelHTTP({fetchImpl:async()=>{calls++;return new Response('private response',{status:403,headers:responseHeaders});}});
 await assert.rejects(request('https://example.org/page?token=secret',{Authorization:'Bearer private-token'}),e=>{
  assert.match(e.message,/403.*https:\/\/example.org\/page.*server=cloudflare.*public-request-id/);
  assert.equal(e.diagnostic.status,403);assert.equal(e.diagnostic.url,'https://example.org/page');
  assert.doesNotMatch(JSON.stringify(e.diagnostic)+e.message,/secret|private|set-cookie|Authorization/);return true;
 });assert.equal(calls,1);
});
test('Retry-After is respected and long cooldowns are deferred instead of retried early',async()=>{
 let time=0,calls=0;const waits=[];
 const request=createFuelHTTP({now:()=>time,wait:async ms=>{waits.push(ms);time+=ms;},fetchImpl:async()=>++calls===1?new Response('',{status:429,headers:{'Retry-After':'2'}}):new Response('ok')});
 assert.equal(await request('https://example.org/a'),'ok');assert.equal(calls,2);assert.deepEqual(waits,[2000]);
 calls=0;const long=createFuelHTTP({fetchImpl:async()=>{calls++;return new Response('',{status:429,headers:{'Retry-After':'120'}});}});
 await assert.rejects(long('https://example.org/a'),/retry_after=120/);assert.equal(calls,1);
});
