import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {database,saveStations,widgetData} from './database.mjs';
test('a fresh fallback fills a missing network price without assigning it to individual stations or replacing fresh official prices',()=>{
 const folder=mkdtempSync(path.join(os.tmpdir(),'fuel-fallback-')),db=database(folder),now=new Date().toISOString();
 const station={id:'neste:directory',country:'LV',source:'neste',brand:'Neste',name:'Neste station',address:'Address',directory_id:'one',prices:{}};
 const fallback={id:'energijascenas:LV:neste:95',country:'LV',provider_source:'neste',fuel:'95',value:1.7,unit:'L',observed_at:now,fetched_at:now,scope:'network_community_report',source:'energijascenas',source_url:'https://energijascenas.lv',upstream_source_url:'Waze community'};
 const doc={updated_at:now,sources:[{id:'neste',status:'ok'},{id:'energijascenas',status:'ok'}],data:[station],fallback_quotes:[fallback]};
 try{
  saveStations(db,doc);let p=widgetData(db,'LV').data.providers[0];assert.equal(p.prices.petrol95.price,1.7);assert.equal(p.prices.petrol95.scope,'network_community_report');assert.equal(p.stations[0].prices.petrol95,null);assert.equal(p.station_count,1);
  const stored=db.prepare('SELECT at FROM station_prices WHERE station_id=?').get(fallback.id);assert.equal(stored.at,now);
  station.prices['95']={value:1.9,unit:'L',observed_at:now,fetched_at:now,evidence:'operator_published'};saveStations(db,doc);p=widgetData(db,'LV').data.providers[0];assert.equal(p.prices.petrol95.price,1.9);
  station.prices={};fallback.observed_at=new Date(Date.now()-49*3600000).toISOString();saveStations(db,doc);p=[...widgetData(db,'LV').data.providers,...widgetData(db,'LV').data.more_providers][0];assert.equal(p.prices.petrol95,undefined);
 }finally{db.close();if(path.dirname(path.resolve(folder))!==path.resolve(os.tmpdir()))throw Error('Unsafe cleanup');rmSync(folder,{recursive:true,force:true});}
});
