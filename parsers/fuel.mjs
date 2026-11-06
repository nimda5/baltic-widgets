import {extraURLs,koolMapURL,addKoolCoordinates,koolSnippetURLs,parseKoolPrices,parseKoolDirectory,parseNesteDirectory,parseRietumu} from './lv-extra.mjs';
import {fuelPublicationTime,fuelQuoteFreshness} from '../public/fuel-freshness.js';
import {directoryURLs,parseVirsiDirectory,parseViadaDirectory,parseStraujupiteDirectory,mergeDirectory} from './lv-directories.mjs';
import {mergeCircleDirectory,circleDirectoryURL} from './circle-directory.mjs';
import { load } from 'cheerio';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, rename, open, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const urls = {
  ...extraURLs,
  circle: 'https://www.circlek.lv/degviela-miles/degvielas-cenas',
  virsi: 'https://www.virsi.lv/lv/privatpersonam/degviela/degvielas-un-elektrouzlades-cenas',
  viada: 'https://www.viada.lv/zemakas-degvielas-cenas/',
  straujupite: 'https://straujupite.lv/degvielas-cenas/',
  lea: 'https://degalukainos.ena.lt/',
  fuelest: 'https://fuelest.ee/',
  liitrihind: 'https://liitrihind.ee/api/kartta.json',
};
const clean = s => String(s ?? '').replace(/\s+/g, ' ').trim();
const hash = s => createHash('sha256').update(s).digest('hex').slice(0, 20);
const dateLV = s => {
  const m = s.match(/(\d{2})\.(\d{2})\s*\.?(\d{4})/);
  if (!m) throw new Error('Source date missing');
  return `${m[3]}-${m[2]}-${m[1]}`;
};
function price(value) {
  const n = Number(String(value).replace(',', '.').replace(/\s*(?:EUR|€).*$/, ''));
  if (!Number.isFinite(n) || n < 0.3 || n > 5) throw new Error('Invalid fuel price');
  return n;
}
function coords(lat, lon) {
  if (lat == null || lon == null || lat === '' || lon === '') return null;
  lat = Number(lat); lon = Number(lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < 53 || lat > 60 || lon < 20 || lon > 29) return null;
  return { latitude: lat, longitude: lon };
}
function freshness(at, day, now) {
  // Date-only quotes use the start of their date in UTC, conservatively.
  const quote={observed_at:at,observed_date:day},age=Date.parse(now)-fuelPublicationTime(quote);
  if (age < -3600000) throw new Error('Future price timestamp');
  return fuelQuoteFreshness(quote,now);
}

export function normalize(source, records, now) {
  if (!records.length) throw new Error(`${source}: no records parsed`);
  const stations = new Map();
  for (const r of records) {
    if(r.fuel==='98')continue;
    if (!r.address && !r.id) throw new Error('Station identity missing');
    const id = `${source}:${r.id ?? hash(`${r.country}|${r.brand}|${r.address}`)}`;
    if (!stations.has(id)) stations.set(id, {
      id, country: r.country, brand: r.brand, name: r.name || r.brand,
      address: r.address || null, coordinates: coords(r.lat, r.lon),
      source, source_url: urls[source], prices: {},
      ...(r.directory_id?{directory_id:r.directory_id,directory_url:r.directory_url,directory_updated_at:now,available_fuels:r.available_fuels||[]}:{}),
    });
    if (!r.fuel || r.value == null) continue;
    const p = {
      value: price(r.value), currency: 'EUR', unit: r.unit || 'L',
      source_label: r.label, observed_at: r.at || null, observed_date: r.day || null,
      source_timestamp: r.rawTime || r.at || r.day || null,
      time_precision: r.at ? 'instant' : r.day ? 'date' : 'unknown',
      fetched_at: now, freshness: freshness(r.at, r.day, now),
      evidence: r.evidence || 'operator_published', scope: r.scope || 'station',
      source_verified: r.verified ?? null,
    };
    const station = stations.get(id);
    if (station.prices[r.fuel]) throw new Error(`Duplicate station/fuel: ${id}/${r.fuel}`);
    station.prices[r.fuel] = p;
  }
  return [...stations.values()];
}

export function parseCircle(html) {
  const $ = load(html), out = [];
  const day = dateLV($.text().match(/Cenas spēkā no[\s\S]{0,60}/)?.[0] || '');
  const fuels = { '95miles': '95', '98miles+': '98', Dmiles: 'diesel', 'Dmiles+': 'diesel_premium', 'miles+ XTL': 'HVO', Autogāze: 'LPG' };
  $('table tr').each((_, row) => {
    const cells = $(row).find('td'); const label = clean(cells.eq(0).text());
    if (!fuels[label]) return;
    const address = clean(load((cells.eq(2).html() || '').replace(/<br\s*\/?\s*>/gi, ', ')).text());
    // XTL lists several cities without a city per address. Keep that group out of station data.
    if (label === 'miles+ XTL') return;
    if (!address) throw new Error('Circle K address missing');
    const addresses = address.split(/[,;]+/).map(clean).filter(a => a && !/^Rīga\.?$/i.test(a));
    if (!addresses.length || addresses.some(a => !/\d/.test(a))) throw new Error('Circle K address list changed');
    for (const stationAddress of addresses) out.push({ country: 'LV', brand: 'Circle K', address: `${stationAddress}, Rīga`, fuel: fuels[label], label, value: cells.eq(1).text(), day });
  });
  if (!out.some(r => r.fuel === '95') || !out.some(r => r.fuel === 'diesel')) throw new Error('Circle K table changed');
  return out;
}

export function parseVirsi(html) {
  const $ = load(html), out = [];
  const day = dateLV($.text().match(/Cenas mājaslapā ir atjaunotas[\s\S]{0,70}/)?.[0] || '');
  const fuels = { dd: 'diesel', '95e': '95', '98e': '98' };
  $('.fuel-block .price-card').each((_, card) => {
    const fuel = fuels[$(card).attr('data-type')]; if (!fuel) return;
    const address = clean($(card).find('.address').text());
    if (!address || /Visā/.test(address)) throw new Error('Virsi station address missing');
    const spans = $(card).find('.price span');
    out.push({ country: 'LV', brand: 'Virši', address, fuel, label: clean(spans.eq(0).text()), value: spans.eq(1).text(), day });
  });
  if (out.length !== 3) throw new Error('Virsi price cards changed');
  return out;
}

export function parseViada(html) {
  const $ = load(html), out = [];
  const day = dateLV($.text().match(/Cenas spēkā no[\s\S]{0,65}/)?.[0] || '');
  const fuels = { petrol_95ecto_new: '95', petrol_95ectoplus_new: '95_premium', petrol_98_new: '98', petrol_d_new: 'diesel', petrol_d_ecto_new: 'diesel_premium', petrol_gas_new: 'LPG' };
  $('table tr').each((_, row) => {
    const cells = $(row).find('td');
    const image = cells.eq(0).find('img').attr('src') || '';
    const key = image.split('/').pop()?.replace(/\.png$/, '');
    const fuel = fuels[key]; if (!fuel) return;
    const value = cells.eq(1).text(); let found = 0;
    const cell = cells.eq(2).html() || '';
    const stationRx = /<span\b[^>]*class="dus-name"[^>]*>([\s\S]*?)<\/span>\s*:([\s\S]*?)(?=<span\b[^>]*class="dus-name"|$)/g;
    for (const m of cell.matchAll(stationRx)) {
      const address = clean(load(m[2]).text()).replace(/[,\s.]+$/, '');
      out.push({ country: 'LV', brand: 'Viada', name: clean(load(m[1]).text()), address, fuel, label: key, value, day }); found++;
    }
    if (!found) throw new Error('Viada station list missing');
  });
  if (!out.some(r => r.fuel === '95') || !out.some(r => r.fuel === 'diesel')) throw new Error('Viada table changed');
  return out;
}

export function addViadaCoordinates(records, html) {
  const key = s => clean(s).replace(/\bLV\s*-?\s*\d{4}\b/gi,'').normalize('NFKD').replace(/\p{M}/gu,'').toLocaleLowerCase('lv').replace(/[^\p{L}\p{N}]/gu, '');
  const catalogue = new Map();
  for (const chunk of html.split('var latLng = new google.maps.LatLng').slice(1)) {
    const position = chunk.match(/^\('([\d.]+)',\s*'([\d.]+)'\)/);
    const content = chunk.match(/content:\s*'([\s\S]*?)'\s*\n/);
    if (!position || !content) continue;
    const $ = load(content[1]); const strong = clean($('strong').text());
    const address = strong.replace(/^DUS [^:]+:\s*/, '');
    const city = clean(content[1].split('</strong>')[1]?.split('<br>')[0]).replace(/^,\s*/, '');
    for (const candidate of [address, city ? `${address}, ${city}` : address]) {
      const k = key(candidate), value = { lat: Number(position[1]), lon: Number(position[2]) };
      const old = catalogue.get(k);
      if (old && (old.lat !== value.lat || old.lon !== value.lon)) catalogue.set(k, null);
      else if (!catalogue.has(k)) catalogue.set(k, value);
    }
  }
  return records.map(r => ({ ...r, ...(catalogue.get(key(r.address)) || {}) }));
}

export function parseStraujupite(html) {
  const $ = load(html), out = [];
  const day = dateLV($.text().match(/Atjaunots:[\s\S]{0,70}/)?.[0] || '');
  $('.sj-fcard').each((_, card) => {
    const label = clean($(card).find('.sj-fname').text());
    const fuel = { 'Benzīns 95': '95', 'Dīzeļdegviela': 'diesel' }[label]; if (!fuel) return;
    $(card).find('.sj-faddr').each((_, a) => {
      const address = clean($(a).text());
      out.push({ country: 'LV', brand: 'Straujupīte', address, fuel, label, value: $(card).find('.sj-fprice').text(), day });
    });
  });
  return out;
}

export function parseLea(data) {
  if (!Array.isArray(data.data)) throw new Error('LEA schema changed');
  const fuels = { benzinas_95: '95', dyzelinas: 'diesel', snd: 'LPG' };
  return data.data.map(r => {
    if (!fuels[r.fuel_type] || !r.company_name || !r.address) throw new Error('Unknown LEA record');
    // uuid identifies a fuel record, not a physical station. Address + operator stays stable.
    return { country: 'LT', brand: r.company_name, name: r.gas_station_name,
      address: r.address, lat: r.latitude, lon: r.longitude,
      fuel: fuels[r.fuel_type], label: r.fuel_type, value: r.price,
      day: r.submitted_at?.slice(0, 10), rawTime: r.submitted_at,
      evidence: 'operator_reported_to_LEA' };
  });
}

export function parseFuelest(data, home) {
  if (data.isFaulted || !Array.isArray(data.data?.allStations)) throw new Error('FuelEst schema changed');
  const companyJson = home.match(/var COMPANIES\s*=\s*(\[[^\r\n]*\]);/)?.[1];
  if (!companyJson) throw new Error('FuelEst company catalogue missing');
  const companies = new Map(JSON.parse(companyJson).map(c => [c.id, c.name]));
  const fuels = { 6: '95', 7: '98', 8: 'diesel', 9: 'CNG', 10: 'LPG' };
  return data.data.allStations.flatMap(s => {
    const base = { id: s.id, country: 'EE', brand: companies.get(s.companyId) || s.name,
      name: s.displayName, address: s.address, lat: s.location?.latitude, lon: s.location?.longitude };
    const prices = s.fuelTypes.filter(f => fuels[f.id] && f.price > 0).map(f => ({
      ...base, fuel: fuels[f.id], label: f.name, value: f.price, unit: f.unit === 2 ? 'kg' : 'L',
      // FuelEst's client explicitly shifts the unqualified API timestamps from UTC to browser time.
      at: /(?:Z|[+-]\d\d:\d\d)$/.test(f.dateTime) ? f.dateTime : f.dateTime + 'Z',
      evidence: 'community_reported', verified: f.isVerified,
    }));
    return prices.length ? prices : [base];
  });
}

async function request(url, headers = {}, attempt = 0) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'BalticFuelWidgets/0.1', ...headers }, signal: AbortSignal.timeout(25000) });
    if (!res.ok) {
      if ((res.status === 429 || res.status >= 500) && attempt === 0) {
        await new Promise(r => setTimeout(r, 1500)); return request(url, headers, 1);
      }
      throw new Error(`Upstream HTTP ${res.status}`);
    }
    const text = await res.text(); if (text.length > 8_000_000) throw new Error('Response too large');
    return text;
  } catch (e) {
    // Never log request headers, public website access tokens, or response bodies.
    if (e.name === 'TimeoutError' && attempt === 0) return request(url, headers, 1);
    throw e;
  }
}

async function collect(source) {
  if(source==='neste')return parseNesteDirectory(JSON.parse(await request(urls.neste)));
  if(source==='rietumu')return parseRietumu(await request(urls.rietumu));
  if(source==='kool'){
    const snippets=koolSnippetURLs(await request(urls.kool));
    const [prices,directory]=await Promise.all([request(snippets.prices),request(snippets.directory)]);
    let records=parseKoolDirectory(directory);
    try{records=addKoolCoordinates(records,await request(koolMapURL(directory)));}catch{console.error('kool: optional map unavailable; directory addresses retained');}
    return {records,network_records:parseKoolPrices(prices)};
  }
  if (source === 'lea') {
    const home = await request(urls.lea);
    const script = home.match(/src="(\.\/assets\/index-[\w-]+\.js)"/)?.[1];
    if (!script) throw new Error('LEA entry bundle changed');
    const entry = await request(new URL(script, urls.lea));
    const app = entry.match(/import\("(\.\/FuelPriceSiteApp-[\w-]+\.js)"\)/)?.[1];
    if (!app) throw new Error('LEA application bundle changed');
    const bundle = await request(new URL(app, new URL(script, urls.lea)));
    const config = bundle.match(/apiBase:"([^"]+)",token:"([^"]+)"/);
    if (!config || config[1] !== 'https://api-degalukainos.ena.lt/api/v1') throw new Error('LEA public client configuration changed');
    // Read-only credential distributed by the official public web client; never persisted.
    return parseLea(JSON.parse(await request(`${config[1]}/read/prices/latest`, { Authorization: `Bearer ${config[2]}` })));
  }
  if (source === 'fuelest') {
    const home = await request(urls.fuelest), $ = load(home);
    const script = $('script[src]').map((_, s) => $(s).attr('src')).get().find(s => s.startsWith('/js/app.min.js'));
    if (!script) throw new Error('FuelEst script changed');
    const bundle = await request(new URL(script, urls.fuelest));
    const version = bundle.match(/version:"([^"]+)"/)?.[1];
    const country = home.match(/COUNTRY_ID\s*=\s*(\d+)/)?.[1];
    if (!version || country !== '1') throw new Error('FuelEst public client changed');
    return parseFuelest(JSON.parse(await request(new URL(`/Home/GetPageData?countryId=${country}`, urls.fuelest), { 'X-version': version })), home);
  }
  if(source==='circle'){
    const records=parseCircle(await request(urls.circle));
    try{return mergeCircleDirectory(records,await request(circleDirectoryURL));}
    catch{console.error('circle: directory unavailable; keeping published prices and cached locations');return records;}
  }
  if(directoryURLs[source]){
    const records={virsi:parseVirsi,viada:parseViada,straujupite:parseStraujupite}[source](await request(urls[source]));
    try{
      const html=await request(directoryURLs[source]);let directory;
      if(source==='virsi'){
        const endpoint=load(html)('stations-app').attr('stations-data-url');
        if(!endpoint||new URL(endpoint).origin!=='https://www.virsi.lv')throw Error('Virši directory endpoint changed');
        directory=parseVirsiDirectory(JSON.parse(await request(endpoint)));
      }else if(source==='viada'){
        directory=parseViadaDirectory(html);
        try{directory=addViadaCoordinates(directory,await request('https://www.viada.lv/degvielasuzpildesstacijas/degvielas-uzpildes-staciju-karte/'));}
        catch{console.error('viada: optional map unavailable; directory addresses retained');}
      }else directory=parseStraujupiteDirectory(html);
      return mergeDirectory(records,directory);
    }catch{console.error(`${source}: directory unavailable; keeping published prices and cached locations`);return records;}
  }
  return { circle: parseCircle, virsi: parseVirsi, viada: parseViada, straujupite: parseStraujupite }[source](await request(urls[source]));
}

export function geojson(stations) {
  return { type: 'FeatureCollection', features: stations.filter(s => s.coordinates).map(s => ({
    type: 'Feature', id: s.id, geometry: { type: 'Point', coordinates: [s.coordinates.longitude, s.coordinates.latitude] },
    properties: { ...s, coordinates: undefined },
  })) };
}
async function readJson(file, fallback) {
  try { return JSON.parse(await readFile(file, 'utf8')); } catch (e) { if (e.code === 'ENOENT') return fallback; throw e; }
}
async function atomicJson(file, value) {
  const tmp = `${file}.${process.pid}.tmp`; await writeFile(tmp, JSON.stringify(value, null, 2) + '\n'); await rename(tmp, file);
}

export async function run(output = 'artifacts/fuel-live', sourceList = Object.keys(urls).filter(s => s !== 'liitrihind'), options = {}) {
  await mkdir(output, { recursive: true });
  // Exclusive lock prevents two scheduled/manual collectors from overwriting each other.
  const lockPath = path.join(output, '.collector.lock'); const lock = await open(lockPath, 'wx');
  try {
    const now = new Date().toISOString();
    const old = await readJson(path.join(output, 'fuel-stations.json'), { data: [], sources: [] });
    let stations = old.data; const networkQuotes={...(old.network_quotes||{})}; const statuses = new Map(old.sources.map(s => [s.id, s]));
    for (const source of sourceList) {
      if (!urls[source] || source === 'liitrihind') throw new Error('Unsupported source');
      try {
        const collected=await collect(source);
        let records=Array.isArray(collected)?collected:collected.records;
        const previous = new Map(stations.filter(s => s.source === source).map(s => [s.id, s]));
        const hasDirectory=source==='circle'||!!directoryURLs[source]||!!extraURLs[source];
        const directoryLive=hasDirectory&&records.some(s=>s.directory_id);
        const cached=new Map([...previous.values()].filter(s=>s.directory_id).map(s=>[s.directory_id,s]));
        if(hasDirectory&&!directoryLive&&cached.size){
          const directory=[...cached.values()].map(s=>({country:s.country,brand:s.brand,name:s.name,address:s.address,
            lat:s.coordinates?.latitude,lon:s.coordinates?.longitude,directory_id:s.directory_id,directory_url:s.directory_url,available_fuels:s.available_fuels||[]}));
          records=mergeDirectory(records,directory);
        }
        const fresh=normalize(source,records,now);
        if(!directoryLive)for(const station of fresh)if(cached.has(station.directory_id))station.directory_updated_at=cached.get(station.directory_id).directory_updated_at;

        let network;
        if(collected.network_records){
          network=normalize(source,collected.network_records.map(r=>({...r,id:'network-minimum'})),now)[0];
          previous.set(network.id,networkQuotes[source]);networkQuotes[source]=network;
        }
        for (const s of [...fresh,...(network?[network]:[])]) for (const [fuel, p] of Object.entries(s.prices)) {
          const before = previous.get(s.id)?.prices[fuel];
          const history = (before?.history || []).filter(h => Date.parse(h.at) >= Date.parse(now) - 90 * 86400000);
          if (!history.length || history.at(-1).value !== p.value) history.push({ at: now, value: p.value });
          p.history = history;
          p.change = before ? Number((p.value - before.value).toFixed(3)) : null;
        }
        stations = [...stations.filter(s => s.source !== source), ...fresh];
        statuses.set(source, { id: source, status: 'ok', last_success_at: now, station_count: fresh.length,
          ...(hasDirectory?{directory_status:directoryLive?'ok':fresh.some(s=>s.directory_id)?'cached':'unavailable',directory_location_count:fresh.filter(s=>s.directory_id).length}:{}),
          attribution: source === 'fuelest' ? 'FuelEst.ee — community reports' : source === 'lea' ? 'LEA, degalais prekiaujančios įmonės' : source });
      } catch (e) {
        const prior = statuses.get(source);
        statuses.set(source, { ...prior, id: source, status: 'error', last_attempt_at: now,
          last_success_at: prior?.last_success_at || null, error: e.message.replace(/Bearer\s+\S+/g, '[redacted]') });
        console.error(`${source}: ${e.message}`);
      }
    }
    for(const station of stations){delete station.prices['98'];if(station.available_fuels)station.available_fuels=station.available_fuels.filter(f=>f!=='98');}
    // Recompute old values too: a failed source must not retain a 'recent' flag forever.
    for (const s of [...stations,...Object.values(networkQuotes)]) for (const p of Object.values(s.prices)) p.freshness = freshness(p.observed_at, p.observed_date, now);
    const doc = { schema_version: 1, updated_at: now, demo: false, source: 'Baltic station collectors',
      coverage: { LV: 'selected operator-published stations', LT: 'LEA reporting stations', EE: 'FuelEst community reports' },
      sources: [...statuses.values()], network_quotes:networkQuotes, data: stations.sort((a, b) => a.id.localeCompare(b.id)) };
    await atomicJson(path.join(output, 'fuel-stations.json'), doc);
    await atomicJson(path.join(output, 'fuel-stations.geojson'), { ...geojson(doc.data), generated_at: now });
    const summary = { stations: stations.length, with_coordinates: stations.filter(s => s.coordinates).length,
      sources: doc.sources, countries: Object.fromEntries(['LV', 'LT', 'EE'].map(c => {
        const rows = stations.filter(s => s.country === c);
        return [c, { stations: rows.length, priced: rows.filter(s => Object.keys(s.prices).length).length,
          with_coordinates: rows.filter(s => s.coordinates).length,
          recent_prices: rows.reduce((n, s) => n + Object.values(s.prices).filter(p => p.freshness === 'recent').length, 0) }];
      })) };
    await atomicJson(path.join(output, 'summary.json'), summary);
    console.log(JSON.stringify(summary, null, 2));
    if (options.setExitCode !== false && doc.sources.some(s => s.status === 'error')) process.exitCode = 1;
    return doc;
  } finally { await lock.close(); await unlink(lockPath); }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const output = process.argv[2] || 'artifacts/fuel-live';
  await run(output, process.argv[3]?.split(','));
}
