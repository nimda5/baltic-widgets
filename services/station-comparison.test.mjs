import test from 'node:test';
import assert from 'node:assert/strict';
import {stationRows,filterStations,comparableQuote,nextStationSort,networkNames} from '../public/station-comparison-core.js';
const now=Date.parse('2026-11-11T12:00:00Z');
const quote=(price,extra={})=>({price,scope:'station',source_status:'ok',observed_date:'2026-11-11',...extra});
const row=(id,provider,address,petrol95,diesel)=>({id,provider,address,name:provider,prices:{petrol95,diesel}});

test('city-first ranking compares station quotes across networks for the chosen fuel',()=>{
 const rows=[row('a','Viada','Vilnius, Gatvė 1',quote(1.8),quote(2.1)),row('b','Circle K','Vilnius, Gatvė 2',quote(1.7),quote(2.2)),row('c','Viada','Kaunas, Gatvė 3',quote(1.5),quote(1.9))];
 assert.deepEqual(filterStations(rows,{city:'vilnius',now}).fresh.map(s=>s.id),['b','a']);
 assert.deepEqual(filterStations(rows,{query:'vilnius viada',now}).fresh.map(s=>s.id),['a']);
 assert.deepEqual(filterStations(rows,{city:'Vilnius',fuel:'diesel',now}).fresh.map(s=>s.id),['a','b']);
 assert.deepEqual(filterStations(rows,{city:'vilnius',order:'desc',now}).fresh.map(s=>s.id),['a','b']);
 assert.deepEqual(filterStations(rows,{city:'vilnius',query:'gatve 2',now}).fresh.map(s=>s.id),['b']);
 assert.deepEqual(filterStations(rows,{provider:'Viada',city:'Vilnius',now}).fresh.map(s=>s.id),['a']);
});
test('missing, stale, failed and network-only quotes cannot enter the station ranking',()=>{
 const invalid=[null,quote(1.5,{observed_date:'2026-11-01'}),quote(1.4,{source_status:'error'}),quote(1.3,{scope:'network_published_minimum'}),quote(1.2,{scope:'network_community_report'}),quote(0),quote(-1)];
 for(const q of invalid)assert.equal(!!comparableQuote(q,now),false);
 const rows=invalid.map((q,i)=>row(String(i),'Brand','Rīga, Iela '+i,q,null));rows.push(row('valid','Brand','Rīga, Iela 9',quote(1.9),null));
 const result=filterStations(rows,{city:'Riga',now});assert.equal(result.fresh.length,1);assert.equal(result.missing.length,invalid.length);
 assert.equal(filterStations(rows,{city:'Riga',fuel:'diesel',now}).fresh.length,0);
});
test('all providers are included, duplicate station identifiers are removed, and source data remains unchanged',()=>{
 const station={id:'one',address:'Tallinn',prices:{petrol95:quote(1.7)}};
 const data={providers:[{name:'A',stations:[station]}],more_providers:[{name:'A',stations:[station]},{name:'B',stations:[{...station,id:'two'}]}]};
 const before=JSON.stringify(data),rows=stationRows(data);assert.equal(rows.length,2);filterStations(rows,{now});assert.equal(JSON.stringify(data),before);
});

test('price headers select a fuel ascending, then toggle its direction',()=>{
 const state={fuel:'petrol95',order:'asc'};
 assert.deepEqual(nextStationSort(state,'petrol95'),{fuel:'petrol95',order:'desc'});
 assert.deepEqual(nextStationSort({fuel:'petrol95',order:'desc'},'petrol95'),{fuel:'petrol95',order:'asc'});
 assert.deepEqual(nextStationSort(state,'diesel'),{fuel:'diesel',order:'asc'});
 assert.deepEqual(state,{fuel:'petrol95',order:'asc'});
});

test('the network dropdown is alphabetic, deduplicated and independent of input order',()=>{
 const names=['Virši','Viada','Straujupīte','KOOL','Circle K','Neste','Rietumu Nafta','KOOL'];
 const providers=names.map(name=>({name}));
 assert.deepEqual(networkNames(providers,'LV'),['Circle K','KOOL','Neste','Rietumu Nafta','Straujupīte','Viada','Virši']);
 assert.deepEqual(providers.map(p=>p.name),names);
 assert.deepEqual(networkNames([{name:'Tīkls 10'},{name:'Tīkls 2'}],'LV'),['Tīkls 2','Tīkls 10']);
});
