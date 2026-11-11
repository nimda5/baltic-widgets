import test from 'node:test';
import assert from 'node:assert/strict';
import {contentHash,waitForPublication} from './publication.mjs';

const files=[{path:'data/ru/fuel-EE.json',hash:contentHash('new prices')}];
function fixture(overrides={}){
 let clock=0;
 return{revision:'abc',files,getRun:async()=>({status:'completed',conclusion:'success',url:'https://example.test/run'}),
  getPublic:async()=>Buffer.from('new prices'),now:()=>clock,wait:async ms=>{clock+=ms;},log:()=>{},timeoutMs:40,pollMs:10,...overrides};
}
test('push and build completion alone cannot report publication success',async()=>{
 let calls=0,publicCalls=0;
 const result=await waitForPublication(fixture({getRun:async()=>({status:++calls<3?'in_progress':'completed',conclusion:'success'}),getPublic:async()=>{publicCalls++;return Buffer.from('new prices');}}));
 assert.equal(calls,3);assert.equal(publicCalls,1);assert.equal(result.verified_files,1);
});
test('successful Pages workflow still waits for stale public JSON to change',async()=>{
 let calls=0;
 await waitForPublication(fixture({getPublic:async()=>Buffer.from(++calls<3?'old prices':'new prices')}));
 assert.equal(calls,3);
});
test('failed workflow and permanently stale public content produce failures',async()=>{
 await assert.rejects(waitForPublication(fixture({getRun:async()=>({status:'completed',conclusion:'failure',url:'run-url'})})),/failure: run-url/);
 await assert.rejects(waitForPublication(fixture({getPublic:async()=>Buffer.from('old prices')})),/not verified before the timeout/);
});
test('missing workflow and unavailable public endpoint cannot silently pass',async()=>{
 await assert.rejects(waitForPublication(fixture({getRun:async()=>undefined})),/not verified/);
 await assert.rejects(waitForPublication(fixture({getPublic:async()=>{throw Error('HTTP 503');}})),/not verified/);
});
