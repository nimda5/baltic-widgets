import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { normalize, parseCircle, parseVirsi, parseViada, parseLea, parseFuelest, geojson, run, addViadaCoordinates } from './fuel.mjs';

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
