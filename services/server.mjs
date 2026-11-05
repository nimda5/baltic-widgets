import {ensureCollectorState} from './collector-state.mjs';
import {initializeHoroscope,horoscopeData,calendarDate} from '../parsers/horoscope.mjs';
import http from 'node:http';
import {initializeMarkets,refreshMarkets,refreshCommodityArchive,exchangeData} from '../parsers/markets.mjs';
import {initializeGas,refreshGas,gasData} from '../parsers/gas.mjs';
import {localized,languages} from './localization.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir, readFile, writeFile, rename, unlink } from 'node:fs/promises';
import { database, saveStations, widgetData } from './database.mjs';
import { refreshArchive } from '../parsers/oil-history.mjs';
import { run as collectFuel } from '../parsers/fuel.mjs';
import { initializeElectricity, refreshElectricity, electricityData } from '../parsers/electricity.mjs';

const project = fileURLToPath(new URL('../', import.meta.url));
const dataDir = path.resolve(process.env.DATA_DIR || path.join(project, 'var'));
const publicDir = path.resolve(process.env.PUBLIC_DIR || path.join(project, 'public'));
const interval = Number(process.env.COLLECT_INTERVAL_HOURS || 6);
const port = Number(process.env.PORT || 8080), host = process.env.HOST || '0.0.0.0';
if (!(interval >= 6 && interval <= 168) || !(port >= 1 && port <= 65535)) throw new Error('Invalid runtime configuration');
await mkdir(dataDir, { recursive: true });
const db = database(dataDir);
initializeElectricity(db);initializeGas(db);initializeMarkets(db);initializeHoroscope(db);
let running = false, stopped = false, timer, lastRun = null;
let electricityRunning=false,electricityTimer,electricityLastRun=null;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.geojson': 'application/geo+json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp' };
function json(res, value, status = 200) { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }).end(JSON.stringify(value)); }
async function atomic(file,value){const tmp=file+'.'+crypto.randomUUID()+'.tmp';try{await writeFile(tmp,JSON.stringify(value));await rename(tmp,file);}finally{await unlink(tmp).catch(e=>{if(e.code!=='ENOENT')throw e;});}}
export async function exportWidgets() {
  await mkdir(path.join(dataDir, 'exports'), { recursive: true });
  for(const lang of languages){
    const folder=path.join(dataDir,'exports',lang);await mkdir(folder,{recursive:true});
    for(const market of ['LV','LT','EE'])await atomic(path.join(folder,`fuel-${market}.json`),localized(widgetData(db,market),lang,'fuel'));
    await atomic(path.join(folder,'electricity.json'),localized(electricityData(db),lang,'electricity'));
    await atomic(path.join(folder,'gas.json'),localized(gasData(db),lang,'gas'));
    await atomic(path.join(folder,'exchange.json'),localized(exchangeData(db),lang,'exchange'));
    await atomic(path.join(folder,'horoscope.json'),localized(horoscopeData(db,{lang}),lang,'horoscope'));
  }
  for (const market of ['LV', 'LT', 'EE']) await atomic(path.join(dataDir, 'exports', `fuel-${market}.json`), localized(widgetData(db, market),'lv','fuel'));
  await atomic(path.join(dataDir,'exports','electricity.json'),electricityData(db));
  await atomic(path.join(dataDir,'exports','gas.json'),gasData(db));
  await atomic(path.join(dataDir, 'exports', 'archive-info.json'), JSON.parse(db.prepare("SELECT value FROM metadata WHERE key='archive'").get()?.value || '{}'));
}

async function updateElectricity(){
  if(electricityRunning||stopped)return;electricityRunning=true;
  const report={started_at:new Date().toISOString(),errors:[]};
  try{
    await mkdir(path.join(dataDir,'exports'),{recursive:true});
    const results=await Promise.allSettled([refreshElectricity(db,Date.now(),{archiveDir:path.join(dataDir,'archives','electricity')}),refreshGas(db,dataDir),refreshMarkets(db,dataDir),refreshCommodityArchive(db,dataDir)]);
    for(let i=0;i<results.length;i++){const r=results[i],name=['electricity','gas','markets','commodity_archive'][i];if(r.status==='fulfilled'){report[name]=r.value;for(const error of r.value.errors || [])report.errors.push(name+': '+error);}else report.errors.push(name+': '+r.reason.message);}
    for(const [name,data] of [['electricity',electricityData(db)],['gas',gasData(db)],['exchange',exchangeData(db)]]){
      await atomic(path.join(dataDir,'exports',name+'.json'),localized(data,'lv',name));
      for(const lang of languages){const folder=path.join(dataDir,'exports',lang);await mkdir(folder,{recursive:true});await atomic(path.join(folder,name+'.json'),localized(data,lang,name));}
    }
  }catch(e){report.errors.push(e.message);}
  finally{report.finished_at=new Date().toISOString();electricityLastRun=report;electricityRunning=false;
    db.prepare('INSERT OR REPLACE INTO metadata VALUES(?,?)').run('electricity_last_run',JSON.stringify(report));
    console.log(JSON.stringify({event:'electricity_updated',...report}));if(!stopped)electricityTimer=setTimeout(updateElectricity,1800000);}
}

async function update() {
  if (running || stopped) return;
  running = true;
  const status = { started_at: new Date().toISOString(), errors: [] };
  try {
    try { await refreshArchive(db, dataDir); } catch (e) { status.errors.push(`archive: ${e.message}`); }
    try {
      await ensureCollectorState(db,path.join(dataDir,'collector'));
      const doc = await collectFuel(path.join(dataDir, 'collector'), undefined, { setExitCode: false });
      saveStations(db, doc);
      for (const s of doc.sources.filter(s => s.status === 'error')) status.errors.push(`${s.id}: ${s.error}`);
    } catch (e) { status.errors.push(`collector: ${e.message}`); }
    await exportWidgets();
  } catch (e) { status.errors.push(`export: ${e.message}`); }
  finally {
    status.finished_at = new Date().toISOString(); lastRun = status; running = false;
    db.prepare('INSERT OR REPLACE INTO metadata VALUES(?,?)').run('last_run', JSON.stringify(status));
    console.log(JSON.stringify({ event: 'collection_finished', ...status }));
    if (!stopped) timer = setTimeout(update, interval * 3600000);
  }
}

let horoscopeDate,horoscopeBusy=false;
async function updateHoroscope(){
  if(horoscopeBusy||stopped||horoscopeDate===calendarDate())return;
  horoscopeBusy=true;
  try{const date=calendarDate();for(const lang of languages){const folder=path.join(dataDir,'exports',lang);await mkdir(folder,{recursive:true});await atomic(path.join(folder,'horoscope.json'),localized(horoscopeData(db,{lang}),lang,'horoscope'));}horoscopeDate=date;console.log(JSON.stringify({event:'horoscope_generated',date,timezone:'Europe/Riga'}));}
  catch(e){console.error('Horoscope generation failed:',e.message);}finally{horoscopeBusy=false;}
}
await updateHoroscope();
const horoscopeTimer=setInterval(updateHoroscope,60000);
const server = http.createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
    const url = new URL(req.url, 'http://localhost');
    const market = url.searchParams.get('market') || 'LV';
    const localizedPath=/^\/data\/(lv|lt|et|ru|en)\/(.+)$/.exec(url.pathname);
    const lang=url.searchParams.get('lang') || localizedPath?.[1] || 'lv';
    if (!['LV', 'LT', 'EE'].includes(market)) return json(res, { error: 'Unknown market' }, 400);
    const requested = localizedPath ? '/data/'+localizedPath[2] : decodeURIComponent(url.pathname);
    if (requested === '/api/health') return json(res, { status: (lastRun?.errors.length || electricityLastRun?.errors.length) ? 'degraded' : 'ok', collecting: running,
      last_run: lastRun || JSON.parse(db.prepare("SELECT value FROM metadata WHERE key='last_run'").get()?.value || 'null'),
      archive: JSON.parse(db.prepare("SELECT value FROM metadata WHERE key='archive'").get()?.value || 'null'),
      station_count: db.prepare('SELECT count(*) AS n FROM stations').get().n,
      horoscope:{date:calendarDate(),timezone:'Europe/Riga',provider:'local_rules',check_interval_seconds:60},collect_interval_hours: interval,electricity: electricityLastRun || JSON.parse(db.prepare("SELECT value FROM metadata WHERE key='electricity_last_run'").get()?.value || 'null') });
    if (/^\/data\/fuel-(LV|LT|EE)\.json$/.test(requested)) return json(res,localized(widgetData(db,requested.slice(-7,-5)),lang,'fuel'));
    if (requested === '/data/fuel.json') return json(res, localized(widgetData(db, market),lang,'fuel'));
    if (requested === '/data/gas.json') return json(res,localized(gasData(db),lang,'gas'));
    if (requested === '/data/electricity.json') return json(res,localized(electricityData(db),lang,'electricity'));
    if(requested==='/data/exchange.json')return json(res,localized(exchangeData(db),lang,'exchange'));
    if(requested==='/data/horoscope.json')return json(res,localized(horoscopeData(db,{lang,timeZone:url.searchParams.get('tz')||'Europe/Riga',mood:url.searchParams.get('mood')||'serious',variant:url.searchParams.get('variant')||'0'}),lang,'horoscope'));
    if (requested === '/api/history') {
      const country = url.searchParams.get('country') || market, fuel = url.searchParams.get('fuel') || '95';
      const tax = url.searchParams.get('tax') || 'with_taxes';
      const from = url.searchParams.get('from') || '2005-01-01', to = url.searchParams.get('to') || '9999-12-31';
      if (!['LV', 'LT', 'EE'].includes(country) || !['95', 'diesel', 'LPG', 'heating_oil', 'fuel_oil_1', 'fuel_oil_2'].includes(fuel) || !['with_taxes', 'without_taxes'].includes(tax) || !/^\d{4}-\d\d-\d\d$/.test(from) || !/^\d{4}-\d\d-\d\d$/.test(to)) return json(res, { error: 'Invalid history query' }, 400);
      return json(res, { source: 'European Commission Weekly Oil Bulletin', scope: 'national_average', frequency: 'weekly', country, fuel, tax_basis: tax,
        data: db.prepare('SELECT at,value,unit FROM national_prices WHERE country=? AND fuel=? AND tax_basis=? AND at>=? AND at<=? ORDER BY at').all(country, fuel, tax, from, to) });
    }
    if (requested === '/data/fuel-stations.geojson') {
      const content = await readFile(path.join(dataDir, 'collector', 'fuel-stations.geojson'));
      res.writeHead(200, { 'Content-Type': 'application/geo+json', 'Cache-Control': 'no-store' }).end(content); return;
    }
    const target = path.resolve(publicDir, '.' + (requested === '/' ? '/index.html' : requested));
    if (!target.startsWith(publicDir + path.sep)) { res.writeHead(403).end(); return; }
    let content = await readFile(target);
    const type = types[path.extname(target)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch (e) { res.writeHead(e.code === 'ENOENT' || e.code === 'EISDIR' ? 404 : 400).end('Not found'); }
});

await new Promise((resolve, reject) => { server.once('error', reject); server.listen(port, host, resolve); });
console.log(`Widgets server listening on ${host}:${port}`);
// A single service owns this data directory. A crash can leave the one-shot collector lock.
await unlink(path.join(dataDir, 'collector', '.collector.lock')).catch(e => { if (e.code !== 'ENOENT') throw e; });
if (process.env.DISABLE_COLLECTION !== '1') update();
if (process.env.DISABLE_COLLECTION !== '1') updateElectricity();
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => {
  stopped = true; clearTimeout(timer);clearTimeout(electricityTimer);clearInterval(horoscopeTimer); server.close();
  const finish = () => { if (running||electricityRunning||horoscopeBusy) setTimeout(finish, 100); else { db.close(); process.exit(0); } }; finish();
});
