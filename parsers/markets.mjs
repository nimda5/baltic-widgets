import {load} from 'cheerio';
import readExcelFile from 'read-excel-file/node';
import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
export const marketSources={ecb:'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.xml',ecbRecent:'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml',nbp:'https://api.nbp.pl/api/cenyzlota/',btc:'https://community-api.coinmetrics.io/v4/timeseries/asset-metrics',worldbank:'https://thedocs.worldbank.org/en/doc/74e8be41ceb20fa0da750cda2f6b9e4e-0050012026/related/CMO-Historical-Data-Monthly.xlsx'};
export function initializeMarkets(db){db.exec(`CREATE TABLE IF NOT EXISTS market_prices(series TEXT,at TEXT,value REAL,unit TEXT,source TEXT,source_url TEXT,fx_at TEXT,raw_value REAL,raw_unit TEXT,PRIMARY KEY(series,at));`);}
const meta=(db,key)=>JSON.parse(db.prepare('SELECT value FROM metadata WHERE key=?').get(key)?.value || 'null');
function setMeta(db,key,value){db.prepare('INSERT OR REPLACE INTO metadata VALUES(?,?)').run(key,JSON.stringify(value));}
export function saveMarketRows(db,rows){
  initializeMarkets(db);const put=db.prepare('INSERT OR REPLACE INTO market_prices VALUES(?,?,?,?,?,?,?,?,?)');db.exec('BEGIN IMMEDIATE');
  try{for(const r of rows){if(!Number.isFinite(r.value)||r.value<=0||!Number.isFinite(Date.parse(r.at)))throw Error('Invalid market observation');put.run(r.series,r.at,r.value,r.unit,r.source,r.source_url,r.fx_at??null,r.raw_value??r.value,r.raw_unit??r.unit);}db.exec('COMMIT');}catch(e){db.exec('ROLLBACK');throw e;}
}
export function parseECB(xml,url=marketSources.ecb){
  const $=load(xml,{xml:true}),rows=[],seen=new Set();
  $('Cube[time]').each((_,el)=>{
    const day=$(el).attr('time');if(!/^\d{4}-\d\d-\d\d$/.test(day)||seen.has(day))throw Error('Invalid/duplicate ECB date');seen.add(day);
    for(const currency of ['USD','PLN']){const rate=Number($(el).children(`Cube[currency="${currency}"]`).attr('rate'));if(!(rate>0))throw Error('Missing ECB rate');rows.push({series:`eur_${currency.toLowerCase()}`,at:day+'T00:00:00.000Z',value:rate,unit:`${currency}/EUR`,source:'ECB reference rate',source_url:url});}
  });
  if(rows.length<2)throw Error('ECB XML schema changed');return rows.sort((a,b)=>a.at.localeCompare(b.at));
}
export function parseGold(data,url){
  if(!Array.isArray(data)||!data.length)throw Error('NBP gold data missing');
  const seen=new Set();return data.map(r=>{if(!/^\d{4}-\d\d-\d\d$/.test(r.data)||seen.has(r.data)||!(typeof r.cena==='number'&&r.cena>0))throw Error('Invalid NBP gold observation');seen.add(r.data);return {series:'gold_pln_g',at:r.data+'T00:00:00.000Z',value:r.cena,unit:'PLN/g',source:'NBP daily gold reference',source_url:url};});
}
export function parseBitcoin(payload,url){
  if(!Array.isArray(payload.data)||!payload.data.length||payload.next_page_url)throw Error('Incomplete Coin Metrics response');
  const rows=[],seen=new Set();for(const p of payload.data){if(p.asset!=='btc'||!Number.isFinite(Date.parse(p.time))||seen.has(p.time))throw Error('Invalid/duplicate Bitcoin observation');seen.add(p.time);if(p.PriceUSD===null||p.PriceUSD===undefined)continue;const value=Number(p.PriceUSD);if(!(value>0))throw Error('Invalid Bitcoin price');rows.push({series:'btc_usd',at:new Date(p.time).toISOString(),value,unit:'USD/BTC',source:'Coin Metrics Community PriceUSD · daily',source_url:url});}
  if(!rows.length)throw Error('No Bitcoin prices');return rows;
}
export async function parseWorldBank(buffer,sourceURL=marketSources.worldbank){
  const sheets=await readExcelFile(buffer),sheet=sheets.find(s=>s.sheet==='Monthly Prices'),descriptions=sheets.find(s=>s.sheet==='Description');
  if(!sheet)throw Error('World Bank monthly sheet missing');const data=sheet.data;
  const header=data.findIndex(r=>r.includes('Natural gas, Europe')&&r.includes('Gold'));if(header<0)throw Error('World Bank columns changed');
  const rows=[];
  for(const [column,series,unit] of [['Natural gas, Europe','gas_europe_monthly_usd','USD/MMBtu'],['Gold','gold_monthly_usd','USD/oz']]){
    const index=data[header].indexOf(column),expected=column==='Gold'?'($/troy oz)':'($/mmbtu)';if(data[header+1][index]!==expected)throw Error('World Bank unit changed');const seen=new Set();
    for(const row of data.slice(header+2)){
      const m=/^(\d{4})M(\d\d)$/.exec(row[0]);if(!m)continue;if(seen.has(row[0])||Number(m[2])<1||Number(m[2])>12)throw Error('Invalid/duplicate World Bank month');seen.add(row[0]);
      const value=row[index];if(value===null||value==='...'||value==='..'||value==='')continue;if(!(typeof value==='number'&&value>0))throw Error('Invalid World Bank price');
      rows.push({series,at:`${m[1]}-${m[2]}-01T00:00:00.000Z`,value,unit,source:'World Bank Pink Sheet · monthly average',source_url:sourceURL});
    }
  }
  if(rows.length<100)throw Error('World Bank archive incomplete');return {rows,descriptions:descriptions?.data || []};
}
export async function fetchMarket(url){const res=await fetch(url,{signal:AbortSignal.timeout(45000),headers:{'User-Agent':'BalticWidgets/1.3'}});if(!res.ok)throw Error(`HTTP ${res.status} (${new URL(url).host})`);return res;}
export async function refreshCommodityArchive(db,dataDir,now=new Date(),{force=false}={}){
  initializeMarkets(db);const previous=meta(db,'worldbank_archive');if(!force&&previous&&now.getTime()-Date.parse(previous.checked_at)<30*86400000)return previous;
  const page=await(await fetchMarket('https://www.worldbank.org/en/research/commodity-markets')).text();const $=load(page);const href=$('a[href]').map((_,el)=>$(el).attr('href')).get().find(u=>u.includes('/CMO-Historical-Data-Monthly.xlsx'));const url=new URL(href || marketSources.worldbank);if(url.protocol!=='https:' || url.hostname!=='thedocs.worldbank.org')throw Error('Unexpected World Bank archive host');
  const buffer=Buffer.from(await(await fetchMarket(url)).arrayBuffer());const {rows,descriptions}=await parseWorldBank(buffer,url.href);
  await mkdir(path.join(dataDir,'archives','markets'),{recursive:true});await writeFile(path.join(dataDir,'archives','markets','worldbank-monthly.xlsx'),buffer);await writeFile(path.join(dataDir,'archives','markets','worldbank-descriptions.json'),JSON.stringify(descriptions));saveMarketRows(db,rows);convertMonthlyMarketsToEUR(db);
  const at=rows.map(r=>r.at).sort(),report={checked_at:now.toISOString(),from:at[0],to:at.at(-1),rows:rows.length,sha256:createHash('sha256').update(buffer).digest('hex'),source_url:url.href};setMeta(db,'worldbank_archive',report);return report;
}
export function convertMarketsToEUR(db){
  const output=[];
  for(const [raw,fx,target,factor,unit] of [['gold_pln_g','eur_pln','gold_eur_oz',31.1034768,'EUR/oz'],['btc_usd','eur_usd','btc_eur',1,'EUR/BTC']]){
    const rates=db.prepare('SELECT at,value FROM market_prices WHERE series=? ORDER BY at').all(fx);let i=-1;
    for(const r of db.prepare('SELECT * FROM market_prices WHERE series=? ORDER BY at').all(raw)){
      while(i+1<rates.length && rates[i+1].at<=r.at)i++;
      if(i<0 || Date.parse(r.at)-Date.parse(rates[i].at)>7*86400000)continue;
      output.push({...r,series:target,value:r.value*factor/rates[i].value,unit,fx_at:rates[i].at,raw_value:r.value,raw_unit:r.unit,source:r.source+' / ECB FX'});
    }
  }
  saveMarketRows(db,output);return output.length+convertMonthlyMarketsToEUR(db);
}
// IT Btu = 1055.05585262 J; 1 MWh = 3.6e9 J.
export const MMBTU_PER_MWH=3600/1055.05585262;
export function convertMonthlyMarketsToEUR(db){
  initializeMarkets(db);
  const rates=new Map(db.prepare("SELECT substr(at,1,7) AS month,avg(value) AS rate FROM market_prices WHERE series='eur_usd' GROUP BY substr(at,1,7)").all().map(r=>[r.month,r.rate]));
  const rows=[];
  for(const [raw,target,factor,unit] of [['gas_europe_monthly_usd','gas_europe_monthly_eur',MMBTU_PER_MWH,'EUR/MWh'],['gold_monthly_usd','gold_monthly_eur',1,'EUR/oz']]){
    for(const r of db.prepare('SELECT * FROM market_prices WHERE series=? ORDER BY at').all(raw)){
      const rate=rates.get(r.at.slice(0,7));if(!(rate>0))continue;
      rows.push({...r,series:target,value:r.value*factor/rate,unit,fx_at:r.at,raw_value:r.value,raw_unit:r.unit,source:r.source+' / ECB monthly mean USD per EUR'});
    }
  }
  saveMarketRows(db,rows);setMeta(db,'monthly_eur_conversion',{method:'monthly_USD_price_divided_by_arithmetic_mean_of_ECB_USD_per_EUR_in_same_month',gas_mmbtu_per_mwh:MMBTU_PER_MWH,fx_source:marketSources.ecb,rows:rows.length});return rows.length;
}
export async function refreshMarkets(db,dataDir,now=new Date(),{backfill=true}={}){
  initializeMarkets(db);await mkdir(path.join(dataDir,'archives','markets'),{recursive:true});const report={updated_at:now.toISOString(),errors:[]};
  try{const full=backfill&&!meta(db,'ecb_backfill'),url=full?marketSources.ecb:marketSources.ecbRecent;const xml=await(await fetchMarket(url)).text();const rows=parseECB(xml,url);saveMarketRows(db,rows);await writeFile(path.join(dataDir,'archives','markets',full?'ecb-history.xml':'ecb-recent.xml'),xml);if(backfill)setMeta(db,'ecb_backfill',{updated_at:now.toISOString()});report.ecb=rows.length;}catch(e){report.errors.push('ECB: '+e.message);}
  try{
    const first=backfill&&!meta(db,'gold_backfill'),end=now.toISOString().slice(0,10),start=first?'2013-01-02':new Date(now-10*86400000).toISOString().slice(0,10);let cursor=Date.parse(start),all=[];
    while(cursor<=Date.parse(end)){
      const dates=[];for(let n=0;n<4 && cursor<=Date.parse(end);n++){const next=Math.min(cursor+92*86400000,Date.parse(end));dates.push([new Date(cursor).toISOString().slice(0,10),new Date(next).toISOString().slice(0,10)]);cursor=next+86400000;}
      const batches=await Promise.all(dates.map(async([a,b])=>{const url=`${marketSources.nbp}${a}/${b}/?format=json`;return parseGold(await(await fetchMarket(url)).json(),url);}));all.push(...batches.flat());
    }
    saveMarketRows(db,all);await writeFile(path.join(dataDir,'archives','markets',first?'nbp-gold-history.json':'nbp-gold-recent.json'),JSON.stringify(all));if(backfill)setMeta(db,'gold_backfill',{updated_at:now.toISOString()});report.gold=all.length;
  }catch(e){report.errors.push('NBP: '+e.message);}
  try{const first=backfill&&!meta(db,'bitcoin_backfill'),url=new URL(marketSources.btc);for(const [k,v] of Object.entries({assets:'btc',metrics:'PriceUSD',frequency:'1d',page_size:'10000',start_time:first?'2009-01-01':new Date(now-10*86400000).toISOString().slice(0,10)}))url.searchParams.set(k,v);const payload=await(await fetchMarket(url)).json(),rows=parseBitcoin(payload,url.href);saveMarketRows(db,rows);await writeFile(path.join(dataDir,'archives','markets',first?'bitcoin-history.json':'bitcoin-recent.json'),JSON.stringify(payload));if(backfill)setMeta(db,'bitcoin_backfill',{updated_at:now.toISOString()});report.bitcoin=rows.length;}catch(e){report.errors.push('Bitcoin: '+e.message);}
  report.converted=convertMarketsToEUR(db);setMeta(db,'markets_last_run',report);return report;
}
export function monthlyHistory(db,series){initializeMarkets(db);return db.prepare('SELECT at,value FROM market_prices WHERE series=? ORDER BY at').all(series);}
export function exchangeData(db){
  initializeMarkets(db);const data={comparison:'previous_published_observation'};
  for(const [series,key] of [['eur_usd','eur_usd'],['gold_eur_oz','gold_eur_oz'],['btc_eur','btc_eur']]){
    const rows=db.prepare('SELECT at,value,source,fx_at FROM market_prices WHERE series=? ORDER BY at').all(series);if(!rows.length)continue;const last=rows.at(-1);
    data[key]={price:last.value,previous:rows.at(-2)?.value??null,observed_at:last.at,fx_at:last.fx_at,history:rows.map(r=>({at:r.at,value:r.value})),history_source:last.source,frequency:'daily'};
    if(key==='gold_eur_oz'){const history=monthlyHistory(db,'gold_monthly_eur');if(history.length)data[key].chart_series=[{label:'Gold · World Bank · monthly',unit:'EUR/oz',digits:2,history,history_source:'World Bank / ECB monthly FX · monthly average',frequency:'monthly'}];}
  }
  const report=meta(db,'markets_last_run');return {schema_version:1,demo:false,updated_at:report?.updated_at||new Date().toISOString(),source:'ECB / NBP / Coin Metrics Community; long archive: World Bank',data,errors:report?.errors||[]};
}
