import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { normalize, parseCircle, expandCirclePrices, parseStraujupite, parseVirsi, parseViada, parseLea, parseFuelest, geojson, run, addViadaCoordinates } from './fuel.mjs';
import { directoryURLs } from './lv-directories.mjs';

const now = '2026-11-05T07:00:00Z';
const circle = `<p>Cenas spēkā no 04.11.2026.</p><table>
<tr><td>95miles</td><td>1.845 EUR</td><td>Vienības gatve 105</td></tr>
<tr><td>Dmiles</td><td>2.080 EUR</td><td>Mūkusalas iela 75</td></tr></table>`;
test('operator minimums retain the actual station per fuel', () => {
  const data = normalize('circle', parseCircle(circle), now);
  assert.equal(data.length, 2);
  assert.equal(data[0].prices['95'].value, 1.845);
  assert.equal(data[1].prices.diesel.value, 2.08);
  assert.equal(data[0].prices.diesel, undefined);
  assert.equal(data[0].coordinates, null);
  assert.equal(geojson(data).features.length, 0);
  assert.throws(() => parseCircle('<p>unavailable</p>'));
  assert.throws(() => parseVirsi('<p>Cenas mājaslapā ir atjaunotas 04.11.2026</p>'));
  const multi = parseCircle(circle.replace('Vienības gatve 105', 'Mūkusalas iela 75, Ziepniekkalna iela 9'));
  assert.equal(multi.filter(r => r.fuel === '95').length, 2);
  assert.equal(multi[0].address, 'Mūkusalas iela 75, Rīga');
  assert.equal(multi[1].address, 'Ziepniekkalna iela 9, Rīga');
});
test('Viada splits listed stations and matches exact locator addresses', () => {
  const html = `<p>Cenas spēkā no 05.11 .2026.</p><table>
  <tr><td><img src="/petrol_95ecto_new.png"></td><td>1.8 EUR</td><td><span class="dus-name">ADUS A</span>: A iela 1, Rīga, <span class="dus-name">ADUS B</span>: B iela 2, Rīga.</td></tr>
  <tr><td><img src="/petrol_d_new.png"></td><td>2.0 EUR</td><td><span class="dus-name">ADUS A</span>: A iela 1, Rīga.</td></tr></table>`;
  const rows = parseViada(html);
  assert.equal(rows.length, 3);
  const locator = `var latLng = new google.maps.LatLng('56.9', '24.1');
  content: '<strong>A iela 1, Rīga</strong>, Rīga<br>'
  `;
  const data = normalize('viada', addViadaCoordinates(rows, locator), now);
  assert.equal(data.length, 2);
  assert.equal(data[0].coordinates.latitude, 56.9);
  assert.equal(data[1].coordinates, null);
});
test('Viada Multi FX layout keeps product and station identity without depending on image names', () => {
  const row = (label, value, stations) => `<div class="fuel-table__row"><div class="fuel-table__fuel"><img src="/new-logo.webp"><span>${label}</span></div><p class="fuel-table__price">${value} <span>EUR / L</span></p><ul class="fuel-table__stations">${stations.map(([name,address])=>`<li><svg></svg><span><a class="fuel-table__station">${name}</a><span class="fuel-table__address">${address}</span></span></li>`).join('')}</ul></div>`;
  const a = ['ADUS A', 'A iela 1, Rīga'], b = ['DUS B', 'B iela 2, Rīga'];
  const html = '<p>Cenas spēkā no 05.11.2026.</p>' + [
    row('95 Multi FX','1,737',[a,b]), row('95 Multi FX plus','1.762',[a]),
    row('98 Multi FX','1.842',[a]), row('D','2.054',[b]),
    row('D Multi FX','1.957',[a]), row('Gāze','1.045',[a]), row('E85','1.995',[b]),
  ].join('');
  const rows = parseViada(html), data = normalize('viada',rows,now);
  assert.equal(rows.length,7);
  assert.equal(data.length,2);
  const first = data.find(s=>s.name===a[0]), second = data.find(s=>s.name===b[0]);
  assert.deepEqual(Object.keys(first.prices).sort(),['95','95_premium','LPG','diesel_premium'].sort());
  assert.equal(first.prices['95'].value,1.737);
  assert.equal(first.prices.diesel_premium.source_label,'D Multi FX');
  assert.equal(second.prices.diesel.value,2.054);
  assert.equal(first.prices.diesel,undefined);
  assert.equal(second.prices.diesel_premium,undefined);
  assert.equal(first.prices['95'].observed_date,'2026-11-05');
  assert.throws(()=>parseViada(html.replace('fuel-table__address','changed-address')),/identity missing/);
  assert.throws(()=>parseViada(html.replace('1,737','not a price')),/Invalid fuel price/);
  assert.throws(()=>parseViada(html.replace('95 Multi FX plus','Unknown blend')),/fuel label changed/);
  assert.throws(()=>parseViada(html.replaceAll('fuel-table__stations','changed-stations')),/station list missing/);
});
test('LEA fuel UUIDs do not create duplicate physical stations or infer 98', () => {
  const common = { company_name: 'Operator', address: 'City, Street 1', latitude: '55.1', longitude: '24.2', submitted_at: '2026-11-04 10:00:00' };
  const records = parseLea({ data: [
    { ...common, uuid: 'one', fuel_type: 'benzinas_95', price: '1.789' },
    { ...common, uuid: 'two', fuel_type: 'dyzelinas', price: '1.999' },
  ] });
  const data = normalize('lea', records, now);
  assert.equal(data.length, 1);
  assert.equal(Object.keys(data[0].prices).length, 2);
  assert.equal(data[0].prices['98'], undefined);
  assert.equal(data[0].prices['95'].observed_at, null);
  assert.equal(data[0].prices['95'].observed_date, '2026-11-04');
  assert.deepEqual(geojson(data).features[0].geometry.coordinates, [24.2, 55.1]);
});
test('community UTC timestamps, stale reports and kg units remain distinct', () => {
  const r = parseFuelest({ data: { allStations: [{ id: 1, countryId: 1, companyId: 4, address: 'A', location: { latitude: 58, longitude: 25 }, fuelTypes: [{ id: 9, name: 'CNG', unit: 2, price: 2, dateTime: '2026-10-01T10:00:00', isVerified: false }] }] } }, 'var COMPANIES = [{"id":4,"name":"Circle K"}];');
  const p = normalize('fuelest', r, now)[0].prices.CNG;
  assert.equal(p.observed_at, '2026-10-01T10:00:00Z');
  assert.equal(p.unit, 'kg'); assert.equal(p.freshness, 'stale'); assert.equal(p.source_verified, false);
  assert.throws(() => normalize('fuelest', [{ ...r[0], value: 0 }], now));
  assert.throws(() => normalize('fuelest', [r[0], r[0]], now));
});
test('failed refresh keeps last good prices, history and marks source failure', async () => {
  const folder = await mkdtemp(path.join(os.tmpdir(), 'fuel-test-'));
  const originalFetch = globalThis.fetch, originalExitCode = process.exitCode;
  try {
    const today = new Date().toISOString().slice(0, 10).split('-').reverse().join('.');
    globalThis.fetch = async () => new Response(circle.replace('04.11.2026', today));
    const first = await run(folder, ['circle']);
    globalThis.fetch = async () => new Response('unavailable', { status: 403 });
    const second = await run(folder, ['circle']);
    assert.deepEqual(second.data, first.data);
    assert.equal(second.sources[0].status, 'error');
    assert.equal(JSON.parse(await readFile(path.join(folder, 'fuel-stations.json'))).demo, false);
    assert.equal(second.data.find(s => s.prices['95']).prices['95'].history.length, 1);
  } finally {
    globalThis.fetch = originalFetch; process.exitCode = originalExitCode;
    await rm(folder, { recursive: true, force: true });
  }
});

test('interactive Virši collection preserves station IDs and rejects prices without a publication date', async () => {
  const folder = await mkdtemp(path.join(os.tmpdir(), 'fuel-virsi-browser-'));
  const address = 'Brīvības gatve 297, Rīga, LV-1006';
  const day = new Date().toISOString().slice(0, 10);
  const cards = ['95e', '98e', 'dd'].map(type =>
    `<div class="price-card" data-type="${type}"><div class="address">${address}</div><div class="price"><span>${type}</span><span>1.699</span></div></div>`
  ).join('');
  const priceHTML = `<div class="fuel-block">${cards}</div>`;
  const locations = normalize('virsi', [{
    directory_id: '7', directory_url: directoryURLs.virsi,
    country: 'LV', brand: 'Virši', address, lat: 56.98, lon: 24.17
  }], now);
  const readVirsiPrices = async () =>
    priceHTML + `<p>Cenas mājaslapā ir atjaunotas ${day.split('-').reverse().join('.')}.</p>`;
  try {
    await writeFile(path.join(folder, 'fuel-stations.json'), JSON.stringify({ data: locations, sources: [] }));
    const prices = await run(folder, ['virsi'], { readVirsiPrices, setExitCode: false });
    assert.equal(prices.data[0].id, locations[0].id);
    assert.equal(prices.data[0].prices['95'].value, 1.699);
    assert.equal(prices.data[0].prices['95'].observed_date, day);

    const failed = await run(folder, ['virsi'], { readVirsiPrices: async () => priceHTML, setExitCode: false });
    assert.deepEqual(failed.data, prices.data);
    assert.match(failed.errors[0], /Source date missing/);
  } finally {
    await rm(folder, { recursive: true, force: true });
  }
});

const uniformCircle = `<p>Cenas spēkā no 16.11.2026.</p><table>
<tr><td>95miles</td><td>1.764 EUR</td><td>Degvielas cena visos DUS ir vienāda</td></tr>
<tr><td>98miles+</td><td>1.834 EUR</td><td>Degvielas cena visos DUS ir vienāda</td></tr>
<tr><td>Dmiles</td><td>2.084 EUR</td><td>Degvielas cena visos DUS ir vienāda</td></tr>
<tr><td>Dmiles+</td><td>2.214 EUR</td><td>Degvielas cena visos DUS ir vienāda</td></tr>
<tr><td>miles+&nbsp;XTL</td><td>2.590 EUR</td><td>Eksporta iela 1C, Dubultu prospekts 42A</td></tr>
<tr><td>Autogāze</td><td>1.118 EUR</td><td>Kārļa Ulmaņa gatve 117</td></tr></table>`;

test('Circle K all-stations prices require directory fuel availability and retain address-specific LPG', () => {
  const records=parseCircle(uniformCircle);
  const directory=[
    {country:'LV',brand:'Circle K',address:'A iela 1, Rīga',directory_id:'a',available_fuels:['95','diesel','diesel_premium']},
    {country:'LV',brand:'Circle K',address:'B iela 2, Liepāja',directory_id:'b',available_fuels:['diesel']},
    {country:'LV',brand:'Circle K',address:'C iela 3, Rīga',directory_id:'c',available_fuels:[]},
  ];
  const rows=normalize('circle',expandCirclePrices(records,directory),'2026-11-16T12:00:00Z');
  assert.equal(rows.find(s=>s.directory_id==='a').prices['95'].value,1.764);
  const b=rows.find(s=>s.directory_id==='b');
  assert.equal(b.prices.diesel.value,2.084);assert.equal(b.prices['95'],undefined);
  assert.deepEqual(rows.find(s=>s.directory_id==='c').prices,{});
  assert.equal(rows.find(s=>s.address==='Kārļa Ulmaņa gatve 117, Rīga').prices.LPG.value,1.118);
  assert.ok(rows.every(s=>!s.prices['98']&&!s.prices.HVO));
  assert.throws(()=>expandCirclePrices(records,[]),/no stations/);
  assert.throws(()=>parseCircle(uniformCircle.replaceAll('Degvielas cena visos DUS ir vienāda','New unknown statement')),/address list changed.*95miles/);
});

test('Circle K uniform autogas keeps station addresses and only prices LPG locations', () => {
  const html=uniformCircle.replace('Kārļa Ulmaņa gatve 117','Autogāzes cena visos DUS ir vienāda');
  const records=parseCircle(html);
  const directory=[
    {country:'LV',brand:'Circle K',address:'A iela 1, Rīga',directory_id:'a',lat:56.95,lon:24.1,available_fuels:['95','diesel','diesel_premium','LPG']},
    {country:'LV',brand:'Circle K',address:'B iela 2, Liepāja',directory_id:'b',available_fuels:['95','diesel']},
    {country:'LV',brand:'Circle K',address:'C iela 3, Rīga',directory_id:'c',available_fuels:[]},
  ];
  const rows=normalize('circle',expandCirclePrices(records,directory),'2026-11-23T12:00:00Z');
  assert.deepEqual(rows.map(s=>s.address),directory.map(s=>s.address));
  assert.deepEqual(rows[0].coordinates,{latitude:56.95,longitude:24.1});
  assert.equal(rows[0].prices.LPG.value,1.118);
  assert.equal(rows[1].prices.LPG,undefined);
  assert.deepEqual(rows[2].prices,{});
  assert.throws(()=>parseCircle(html.replace('Autogāzes cena visos DUS ir vienāda','Unknown LPG statement')),/address list changed.*Autogāze/);
  assert.throws(()=>parseCircle(html.replace('Degvielas cena visos DUS ir vienāda','Autogāzes cena visos DUS ir vienāda')),/address list changed.*95miles/);
});

test('Circle K uniform collection loads a directory once, reuses cache, and preserves identities and history', async () => {
  const folder=await mkdtemp(path.join(os.tmpdir(),'circle-uniform-'));
  const originalFetch=globalThis.fetch;let directoryRequests=0;
  const station={'/sites/{siteId}':{id:1,name:'Circle K A',status:'Active'},
    '/sites/{siteId}/addresses':{PHYSICAL:{street:'A iela 1',city:'Rīga',country:'LV'}},
    '/sites/{siteId}/fuels':[{name:'EU_MILES_95'},{name:'EU_MILES_DIESEL'},{name:'EU_MILESPLUS_DIESEL'}]};
  const directory='<script data-drupal-selector="drupal-settings-json">'+JSON.stringify({ck_sim_search:{country_code:'lv',station_results:{a:station}}})+'</script>';
  try {
    globalThis.fetch=async url=>{
      if(String(url).includes('station-search')){directoryRequests++;return new Response(directory);}
      return new Response(uniformCircle.replace('16.11.2026',new Date().toISOString().slice(0,10).split('-').reverse().join('.')));
    };
    const first=await run(folder,['circle'],{setExitCode:false});
    const second=await run(folder,['circle'],{setExitCode:false});
    assert.deepEqual(first.errors,[]);assert.deepEqual(second.errors,[]);assert.equal(directoryRequests,1);
    const a=first.data.find(s=>s.directory_id==='1'),b=second.data.find(s=>s.directory_id==='1');
    assert.equal(a.id,b.id);assert.equal(a.directory_updated_at,b.directory_updated_at);
    assert.equal(b.prices['95'].history.length,1);assert.equal(b.prices['95'].value,1.764);
    globalThis.fetch=async()=>new Response(uniformCircle.replaceAll('Degvielas cena visos DUS ir vienāda','Unknown statement'));
    const failed=await run(folder,['circle'],{setExitCode:false});
    assert.equal(failed.errors.length,1);assert.deepEqual(failed.data,second.data);
  } finally {globalThis.fetch=originalFetch;await rm(folder,{recursive:true,force:true});}
});


test('failed community reserve is an update error and does not silently report full collection success',async()=>{
 const folder=await mkdtemp(path.join(os.tmpdir(),'fuel-reserve-error-')),originalFetch=globalThis.fetch;
 const html='<p>Atjaunots: '+new Date().toISOString().slice(0,10).split('-').reverse().join('.')+'</p>'+['Benzīns 95','Dīzeļdegviela'].map(label=>`<div class="sj-fcard"><span class="sj-fname">${label}</span><span class="sj-fprice">1.9</span><span class="sj-faddr">A iela 1, Rīga</span></div>`).join('');
 try{
  globalThis.fetch=async url=>String(url).includes('straujupite.lv')?new Response(html):new Response('unavailable',{status:503});
  const result=await run(folder,['straujupite'],{setExitCode:false});
  assert.equal(result.sources.find(s=>s.id==='straujupite').status,'ok');
  assert.equal(result.sources.find(s=>s.id==='energijascenas').status,'error');
  assert.deepEqual(result.errors,['energijascenas prices: Public community fallback temporarily unavailable']);
  assert.equal(result.data[0].prices['95'].value,1.9);
  assert.throws(()=>parseStraujupite('<p>Atjaunots: 16.11.2026</p><p>Changed layout</p>'),/price cards changed/);
 }finally{globalThis.fetch=originalFetch;await rm(folder,{recursive:true,force:true});}
});
