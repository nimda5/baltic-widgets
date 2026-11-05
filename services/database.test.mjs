import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { database, saveStations, widgetData } from './database.mjs';

test('durable observations are idempotent; stale stations cannot set a network minimum', () => {
  const folder = mkdtempSync(path.join(os.tmpdir(), 'widgets-db-'));
  const db = database(folder), now = new Date().toISOString();
  const make = (id, value, freshness) => ({ id, country:'EE', source:'fuelest', brand:'Test', name:'Station '+id, address:id,
    prices:{'95':{value,unit:'L',fetched_at:now,observed_at:now,freshness,evidence:'community_reported',history:[{at:now,value}]}} });
  const doc = {updated_at:now,sources:[{id:'fuelest',status:'ok'}],data:[make('old',1,'stale'),make('fresh',2,'recent')]};
  try {
    saveStations(db,doc);saveStations(db,doc);
    assert.equal(db.prepare('SELECT count(*) AS n FROM station_prices').get().n,2);
    const provider=widgetData(db,'EE').data.providers[0];
    assert.equal(provider.prices.petrol95.price,2);
    assert.equal(provider.stations.length,2);
    assert.deepEqual(provider.prices.petrol95.history,[]);
    const official = make('operator',1.7,'stale'); official.source='straujupite'; official.country='LV'; official.prices['95'].evidence='operator_published';
    saveStations(db,{...doc,sources:[...doc.sources,{id:'straujupite',status:'ok'}],data:[...doc.data,official]});
    assert.equal(widgetData(db,'LV').data.providers[0].prices.petrol95.price,1.7);
    assert.equal(widgetData(db,'LV').data.providers[0].prices.petrol95.freshness,'stale');
    doc.sources[0].status='error';saveStations(db,doc);
    assert.equal(widgetData(db,'EE').data.more_providers[0].prices.petrol95,undefined);
    assert.equal(db.prepare('SELECT count(*) AS n FROM station_prices').get().n,3);
    db.close();
    const reopened=database(folder);assert.equal(reopened.prepare('SELECT count(*) AS n FROM stations').get().n,2);reopened.close();
  } finally { try{db.close();}catch{} if(!path.resolve(folder).startsWith(path.resolve(os.tmpdir())+path.sep))throw Error('Unsafe cleanup');rmSync(folder,{recursive:true,force:true}); }
});

test('LT and EE show five fresh networks ordered by known station count; others remain available',()=>{
  const folder=mkdtempSync(path.join(os.tmpdir(),'widgets-rank-')),db=database(folder),now=new Date().toISOString();
  try{
    const data=[];
    for(const country of ['LT','EE'])for(let network=0;network<8;network++)for(let station=0;station<network+1;station++)data.push({id:`${country}-${network}-${station}`,country,source:'test',brand:`Brand${network}`,name:'Station',address:'Address',prices:{'95':{value:2,unit:'L',fetched_at:now,observed_at:now,freshness:network===7?'stale':'recent',evidence:'community_reported'}}});
    saveStations(db,{updated_at:now,sources:[{id:'test',status:'ok'}],data});
    for(const market of ['LT','EE']){
      const result=widgetData(db,market).data;
      assert.deepEqual(result.providers.map(p=>p.station_count),[7,6,5,4,3]);
      assert.equal(result.more_providers.length,3);assert.ok(result.more_providers.some(p=>p.name==='Brand7'));
      assert.ok(result.providers.every(p=>p.fresh_station_count>0&&Object.values(p.prices).every(q=>q.freshness==='recent')));
    }
  }finally{db.close();if(!path.resolve(folder).startsWith(path.resolve(os.tmpdir())+path.sep))throw Error('Unsafe cleanup');rmSync(folder,{recursive:true,force:true});}
});
