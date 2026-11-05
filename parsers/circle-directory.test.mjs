import test from 'node:test';
import assert from 'node:assert/strict';
import {mergeCircleDirectory,parseCircleDirectory} from './circle-directory.mjs';
import {normalize} from './fuel.mjs';
import {database,saveStations,widgetData} from '../services/database.mjs';
import {mkdtempSync,rmSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const station=(id,street)=>({'/sites/{siteId}':{id,name:'CIRCLE K '+id,status:'Active'},'/sites/{siteId}/addresses':{PHYSICAL:{street,city:'Rīga',country:'LV'}},'/sites/{siteId}/location':{lat:'56.95',lng:'24.1'},'/sites/{siteId}/fuels':[{name:'EU_MILES_95'},{name:'EU_MILESPLUS_98'},{name:'EU_MILES_DIESEL'}]});
const html='<script data-drupal-selector="drupal-settings-json">'+JSON.stringify({ck_sim_search:{country_code:'lv',station_results:{a:station(1,'Mūkusalas iela 75'),b:station(2,'Ziepniekkalna iela 9'),c:station(3,'Cita iela 1')}}})+'</script>';
test('Circle K directory matches prices by exact normalized address, never by brand',()=>{
  assert.equal(parseCircleDirectory(html).length,3);
  const records=mergeCircleDirectory([{country:'LV',brand:'Circle K',address:'Mūkusalas iela 75, Rīga',fuel:'95',value:1.8,day:'2026-11-05'}],html);
  const rows=normalize('circle',records,'2026-11-05T12:00:00Z');
  assert.equal(rows.length,3);assert.equal(rows.filter(r=>r.prices['95']).length,1);
  assert.ok(rows.every(r=>!r.available_fuels.includes('98')));
  assert.equal(rows.find(r=>r.directory_id==='3').coordinates.latitude,56.95);
  assert.equal(Object.keys(rows.find(r=>r.directory_id==='3').prices).length,0);
  const folder=mkdtempSync(path.join(os.tmpdir(),'circle-directory-')),db=database(folder);
  try{
    saveStations(db,{updated_at:'2026-11-05T12:00:00Z',sources:[{id:'circle',status:'ok'}],data:rows});
    const provider=widgetData(db,'LV').data.providers[0];
    assert.equal(provider.station_count,3);assert.equal(provider.priced_station_count,1);
    assert.equal(provider.directory_location_count,3);
    assert.ok(provider.stations.every(s=>!Object.hasOwn(s.prices,'petrol98')));
    assert.ok(!Object.hasOwn(widgetData(db,'LV').data.country_history,'petrol98'));
  }finally{db.close();rmSync(folder,{recursive:true,force:true});}
});
test('normalization excludes 98 while retaining supported observations',()=>{
  const row={country:'LV',brand:'Circle K',address:'A 1',day:'2026-11-05'};
  const result=normalize('circle',[{...row,fuel:'95',value:1.8},{...row,fuel:'98',value:1.9}],'2026-11-05T12:00:00Z');
  assert.deepEqual(Object.keys(result[0].prices),['95']);
});
