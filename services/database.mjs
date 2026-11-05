import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

export function database(folder) {
  mkdirSync(folder, { recursive: true });
  const db = new DatabaseSync(path.join(folder, 'widgets.sqlite'));
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS metadata(key TEXT PRIMARY KEY,value TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS stations(id TEXT PRIMARY KEY,country TEXT NOT NULL,source TEXT NOT NULL,json TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS station_prices(station_id TEXT,fuel TEXT,at TEXT,value REAL,unit TEXT,observed_at TEXT,PRIMARY KEY(station_id,fuel,at));
    CREATE TABLE IF NOT EXISTS national_prices(country TEXT,fuel TEXT,tax_basis TEXT,at TEXT,value REAL,unit TEXT,raw_value REAL,raw_unit TEXT,source_url TEXT,PRIMARY KEY(country,fuel,tax_basis,at));
    CREATE TABLE IF NOT EXISTS archive_rows(sheet TEXT,row_number INTEGER,country TEXT,period TEXT,json TEXT,PRIMARY KEY(sheet,row_number));
    CREATE INDEX IF NOT EXISTS station_history ON station_prices(station_id,fuel,at);
    PRAGMA user_version=1;`);
  return db;
}

export function saveStations(db, doc) {
  const station = db.prepare('INSERT OR REPLACE INTO stations VALUES(?,?,?,?)');
  const quote = db.prepare('INSERT OR REPLACE INTO station_prices VALUES(?,?,?,?,?,?)');
  db.exec('BEGIN IMMEDIATE');
  try {
    db.prepare('DELETE FROM stations').run();
    for (const s of doc.data) {
      station.run(s.id, s.country, s.source, JSON.stringify(s));
      for (const [fuel, p] of Object.entries(s.prices)) {
        // An unsuccessful upstream refresh must not create a new observation.
        for (const h of p.history || []) quote.run(s.id, fuel, h.at, h.value, p.unit, null);
        quote.run(s.id, fuel, p.fetched_at, p.value, p.unit, p.observed_at || p.observed_date);
      }
    }
    for(const s of Object.values(doc.network_quotes||{}))for(const [fuel,p] of Object.entries(s.prices)){
      for(const h of p.history||[])quote.run(s.id,fuel,h.at,h.value,p.unit,null);
      quote.run(s.id,fuel,p.fetched_at,p.value,p.unit,p.observed_at||p.observed_date);
    }
    db.prepare('INSERT OR REPLACE INTO metadata VALUES(?,?)').run('stations', JSON.stringify({ ...doc, data: undefined }));
    db.exec('COMMIT');
  } catch (e) { db.exec('ROLLBACK'); throw e; }
}

export function nationalHistory(db, country, fuel) {
  return db.prepare("SELECT at,value FROM national_prices WHERE country=? AND fuel=? AND tax_basis='with_taxes' ORDER BY at").all(country, fuel);
}

export function widgetData(db, market = 'LV') {
  const meta = JSON.parse(db.prepare("SELECT value FROM metadata WHERE key='stations'").get()?.value || '{}');
  const rows = db.prepare('SELECT json FROM stations WHERE country=? ORDER BY id').all(market).map(s => JSON.parse(s.json));
  const countryName = { LV: 'Latvija', LT: 'Lietuva', EE: 'Igaunija' }[market];
  const references = Object.fromEntries(['95', 'diesel'].map(f => [f, nationalHistory(db, market, f)]));
  const keyMap = { '95': 'petrol95', diesel: 'diesel' };
  const providers = new Map();
  const names = { circle: 'Circle K', virsi: 'Virši', viada: 'Viada', straujupite: 'Straujupīte', kool:'KOOL', neste:'Neste', rietumu:'Rietumu Nafta' };
  const quote = (s, f, p) => {
    if (!p || p.unit !== 'L') return null;
    const history = db.prepare('SELECT at,value FROM station_prices WHERE station_id=? AND fuel=? ORDER BY at').all(s.id, f);
    const previous = history.length > 1 ? history.at(-2).value : null;
    return { price: p.value, previous, history, scope: p.scope || 'station', source: s.source, source_url: s.source_url,
      observed_at: p.observed_at, observed_date: p.observed_date, freshness: p.freshness,
      source_status: meta.sources?.find(x => x.id === s.source)?.status || 'unknown', evidence: p.evidence,
      reference_key: keyMap[f] };
  };
  for (const s of rows) {
    const name = names[s.source] || s.brand.replace(/^(?:UAB|AB|SIA)\s+/i, '').replace(/\s*(?:UAB|AB|SIA)$/i, '');
    if (!providers.has(name)) providers.set(name, { name, prices: {}, stations: [] });
    const provider = providers.get(name), prices = {};
    for (const [f, key] of Object.entries(keyMap)) prices[key] = quote(s, f, s.prices[f]);
    if (!Object.values(prices).some(Boolean)&&!s.directory_id) continue;
    provider.stations.push({ id: s.id, name: s.name, address: s.address, coordinates: s.coordinates, prices, ...(s.directory_id?{directory_id:s.directory_id,directory_url:s.directory_url,directory_updated_at:s.directory_updated_at,available_fuels:(s.available_fuels||[]).filter(f=>f!=='98')}:{} ) });
    for (const key of Object.values(keyMap)) {
      const p = prices[key];
      // Keep the operator's last published price visible with its date. Old community
      // reports still cannot set the minimum; recent operator quotes take priority.
      const eligible = p && (p.freshness === 'recent' || ['operator_published','operator_reported_to_LEA'].includes(p.evidence)) && p.source_status === 'ok';
      const prior = provider.prices[key];
      const rank = q => q.freshness === 'recent' ? 0 : q.freshness === 'stale' ? 1 : 2;
      if (eligible && (!prior || rank(p) < rank(prior) || (rank(p) === rank(prior) && p.price < prior.price))) {
        provider.prices[key] = { ...p, previous: null, history: [], scope: 'minimum_of_available_stations', station_name: s.name, station_address: s.address };
      }
    }
  }
  for(const network of Object.values(meta.network_quotes||{})){
    if(network.country!==market)continue;
    const provider=providers.get(names[network.source]||network.brand);if(!provider)continue;
    for(const [f,key] of Object.entries(keyMap)){
      const p=quote(network,f,network.prices[f]);
      if(p&&p.source_status==='ok')provider.prices[key]={...p,scope:'network_published_minimum'};
    }
    provider.has_network_prices=true;
  }
  let list = [...providers.values()].filter(p => p.stations.length);
  const fresh = p => p?.freshness === 'recent' && p.source_status === 'ok';
  for (const provider of list) {
    provider.station_count=provider.stations.length;
    provider.priced_station_count=provider.stations.filter(s=>Object.values(s.prices).some(Boolean)).length;
    provider.directory_location_count=provider.stations.filter(s=>s.directory_id).length;
    provider.station_count_scope=provider.directory_location_count?'known_directory_locations':'locations_with_published_prices';

    provider.fresh_station_count=provider.stations.filter(s=>Object.values(s.prices).some(fresh)).length;
  }
  let moreProviders=[];
  if (market !== 'LV'||list.length>5) {
    list.sort((a,b)=>b.station_count-a.station_count || a.name.localeCompare(b.name));
    const primary=list.filter(p=>market==='LV'?Object.values(p.prices).some(Boolean):p.fresh_station_count>0).slice(0,5);
    moreProviders=list.filter(p=>!primary.includes(p));
    list=primary;
    if(market!=='LV')for(const p of list)p.prices=Object.fromEntries(Object.entries(p.prices).filter(([,q])=>fresh(q)));
  } else list.sort((a,b)=>a.name.localeCompare(b.name));
  const countryHistory = Object.fromEntries(Object.entries(keyMap).map(([f, k]) => [k, { history: references[f], label: `${countryName} · ${f === 'diesel' ? 'Dīzelis' : f} · vidējā cena valstī`, source: 'Eiropas Komisija · nedēļas dati, ar nodokļiem' }]));
  return { schema_version: 1, updated_at: meta.updated_at || new Date().toISOString(), source: 'Operatoru publicētās cenas, LEA, FuelEst; vēsture: Eiropas Komisija', demo: false,
    data: { country: market, country_name: countryName, unit: 'EUR/l', summary_label: 'Zemākās pieejamās cenas atlasītajās DUS', providers: list, more_providers:moreProviders, ranking:market==='LV'?(moreProviders.length?'station_count_desc_priced_top5':'name'):'station_count_desc_fresh_only_top5', country_history: countryHistory, sources: meta.sources || [] } };
}
