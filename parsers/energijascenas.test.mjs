import test from 'node:test';
import assert from 'node:assert/strict';
import {parseCommunityFallback,collectCommunityFallback} from './energijascenas.mjs';
const now='2026-11-07T12:00:00Z';
const report=(overrides={})=>({station_id:'neste',fuel_type:'e95',price:1.7,source_type:'community',source_url:'https://gas.didnt.work (Waze community)',source_observed_at:'2026-11-07T08:00:00Z',...overrides});
test('fallback accepts only identifiable, recent LV Waze reports for supported fuels',()=>{
 const result=parseCommunityFallback([report(),report({station_id:'neste_lt'}),report({fuel_type:'e98'}),report({source_type:'official'}),report({source_url:null}),report({price:true}),report({source_observed_at:null}),report({source_observed_at:'2026-10-08T16:28:59Z',scraped_at:now}),report({source_observed_at:'2026-11-08T08:00:00Z'})],now);
 assert.equal(result.quotes.length,1);const q=result.quotes[0];assert.equal(q.observed_at,'2026-11-07T08:00:00.000Z');assert.equal(q.scope,'network_community_report');assert.equal(q.country,'LV');assert.equal(q.provider_source,'neste');assert.equal(q.evidence,'community_reported');assert.equal(result.report.expired_reports,2);
});
test('fallback selects the latest report, rejects contradictory equal-time values and respects 48 hours',()=>{
 assert.equal(parseCommunityFallback([report({price:1.9}),report({price:1.8,source_observed_at:'2026-11-07T09:00:00Z'})],now).quotes[0].value,1.8);
 assert.equal(parseCommunityFallback([report(),report({price:1.8})],now).quotes.length,0);
 assert.equal(parseCommunityFallback([report({source_observed_at:'2026-11-05T12:00:00Z'})],now).quotes.length,1);
 assert.equal(parseCommunityFallback([report({source_observed_at:'2026-11-05T11:59:59Z'})],now).quotes.length,0);
});
test('public client access stays in memory and requests only the public price fields',async()=>{
 const token=['eyJhbGciOiJIUzI1NiJ9',Buffer.from(JSON.stringify({role:'anon',ref:'xaptycdgcrvkgqkgiiur'})).toString('base64url'),'test'].join('.');let calls=0;
 const result=await collectCommunityFallback(now,async(url,options)=>{
  calls++;const path=new URL(url).pathname;
  if(calls===1)return new Response('<script src="/assets/index-public.js"></script>');
  if(calls===2)return new Response(`const url="https://xaptycdgcrvkgqkgiiur.supabase.co",key="${token}";`);
  assert.equal(path,'/rest/v1/fuel_prices');assert.equal(options.headers.apikey,token);assert.match(new URL(url).searchParams.get('select'),/source_observed_at/);return Response.json([report()]);
 });
 assert.equal(calls,3);assert.equal(result.quotes.length,1);assert.equal(JSON.stringify(result).includes(token),false);
});
