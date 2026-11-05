import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {monthlyHistory} from './markets.mjs';
export const gasSource='https://www.eex.com/en/markets/natural-gas/gas-market-transparency';
const zones=['LTU','LVA-EST'];
export function initializeGas(db){db.exec(`CREATE TABLE IF NOT EXISTS gas_prices(zone TEXT,day TEXT,value REAL,volume REAL,final INTEGER,fetched_at TEXT,source_url TEXT,PRIMARY KEY(zone,day));`);}
export function parseGasCSV(text,zone,fetchedAt=new Date().toISOString()){
  if(!zones.includes(zone))throw Error('Unknown gas zone');
  const lines=text.replace(/^\uFEFF/,'').trim().split(/\r?\n/).map(l=>l.split(';'));
  const header=lines.shift(),historical=header[0]==='Index name';
  const dateIndex=historical?1:0,priceIndex=historical?2:1;
  if(!(historical?header[1]==='Delivery date':header[0]==='Gasday') || !/NGP|Index ?Value/i.test(header[priceIndex]) || !/MWh/.test(header[priceIndex]))throw Error('EEX gas CSV schema changed');
  const volumeIndex=header.findIndex(s=>/Index ?Volume/i.test(s)),statusIndex=header.indexOf('Status');
  if(volumeIndex<0 || (!historical && statusIndex<0))throw Error('EEX gas volume/status missing');
  const seen=new Set(),rows=[];
  for(const cells of lines){
    if(cells.length!==header.length)throw Error('Invalid EEX gas CSV row');
    const match=/^(\d\d)\/(\d\d)\/(\d{4})$/.exec(cells[dateIndex]);
    if(!match)throw Error('Invalid EEX gas day');
    const day=`${match[3]}-${match[2]}-${match[1]}`,value=Number(cells[priceIndex]),volume=Number(cells[volumeIndex]);
    if(new Date(day+'T00:00:00Z').toISOString().slice(0,10)!==day || !cells[priceIndex].trim() || !Number.isFinite(value) || !Number.isFinite(volume) || volume<0 || seen.has(day))throw Error('Invalid/duplicate EEX gas value');
    seen.add(day);
    // EEX uses zero price/volume placeholders for days without trades.
    if(volume===0)continue;
    if(!historical && !['Final NGP','Temporary NGP'].includes(cells[statusIndex]))throw Error('Unknown EEX gas status');
    rows.push({zone,day,value,volume,final:historical||cells[statusIndex]==='Final NGP'?1:0,fetched_at:fetchedAt});
  }
  if(!rows.length)throw Error('No traded gas prices');return rows;
}
export function saveGas(db,rows){
  initializeGas(db);db.exec('BEGIN IMMEDIATE');
  try{const insert=db.prepare(`INSERT INTO gas_prices VALUES(?,?,?,?,?,?,?) ON CONFLICT(zone,day) DO UPDATE SET value=excluded.value,volume=excluded.volume,final=excluded.final,fetched_at=excluded.fetched_at,source_url=excluded.source_url WHERE excluded.final>=gas_prices.final`);
    for(const r of rows)insert.run(r.zone,r.day,r.value,r.volume,r.final,r.fetched_at,r.source_url);db.exec('COMMIT');
  }catch(e){db.exec('ROLLBACK');throw e;}
}
export async function refreshGas(db,dataDir){
  const fetchedAt=new Date().toISOString();
  const files=await Promise.all(zones.flatMap(zone=>['60_Days','15_Mins'].map(async range=>{
    const name=`${zone}_NGP_${range}.csv`,url=`https://gasandregistry.eex.com/Gas/NGP/${name}`;
    const res=await fetch(url,{signal:AbortSignal.timeout(30000)});if(!res.ok)throw Error(`EEX gas HTTP ${res.status}`);
    const text=await res.text();return {name,text,rows:parseGasCSV(text,zone,fetchedAt).map(r=>({...r,source_url:url}))};
  })));
  await mkdir(path.join(dataDir,'archives','gas'),{recursive:true});
  for(const file of files)await writeFile(path.join(dataDir,'archives','gas',file.name),file.text);
  saveGas(db,files.flatMap(f=>f.rows));
  const report={updated_at:fetchedAt,source_url:gasSource,rows:db.prepare('SELECT count(*) AS n FROM gas_prices').get().n,from:db.prepare('SELECT min(day) AS day FROM gas_prices').get().day};
  db.prepare('INSERT OR REPLACE INTO metadata VALUES(?,?)').run('gas',JSON.stringify(report));return report;
}
export function gasData(db,now=new Date()){
  initializeGas(db);const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Riga',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
  const areas={};for(const market of ['LV','LT','EE']){
    const zone=market==='LT'?'LTU':'LVA-EST';
    const rows=db.prepare('SELECT * FROM gas_prices WHERE zone=? AND day<=? ORDER BY day').all(zone,today);
    if(!rows.length)continue;const latest=rows.at(-1);
    areas[market]={price_eur_mwh:latest.value,previous_eur_mwh:rows.at(-2)?.value??null,observed_date:latest.day,provisional:!latest.final,zone,unit:'EUR/MWh',index:'EEX NGP',scope:'wholesale_reference',tax_basis:'without_vat_network_and_supplier_fees',source_url:latest.source_url,
      history:rows.map(r=>({at:r.day+'T12:00:00Z',value:r.value,provisional:!r.final})),history_source:`EEX NGP · ${zone}`,updated_at:latest.fetched_at,
      chart_series:[{label:'Europe · World Bank · monthly benchmark',unit:'EUR/MWh',digits:2,history:monthlyHistory(db,'gas_europe_monthly_eur'),history_source:'World Bank Europe / ECB monthly FX · EUR/MWh',frequency:'monthly'}].filter(s=>s.history.length>0)};
  }
  const meta=JSON.parse(db.prepare("SELECT value FROM metadata WHERE key='gas'").get()?.value||'{}');
  return {schema_version:1,demo:false,source:'EEX Neutral Gas Price',updated_at:meta.updated_at||now.toISOString(),data:{areas}};
}
