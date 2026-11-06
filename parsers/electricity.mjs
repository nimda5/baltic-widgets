import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const source = 'https://dashboard.elering.ee/api/nps/price';
const day = 86400000;
export function initializeElectricity(db) {
  db.exec(`CREATE TABLE IF NOT EXISTS electricity_prices(market TEXT,at TEXT,valid_to TEXT,value REAL,source TEXT,resolution_seconds INTEGER,PRIMARY KEY(market,at,source));`);
}

export function parseElectricity(payload, fetchedAt = new Date().toISOString(), {allowEmptyAreas=false}={}) {
  if (payload.success !== true || !payload.data) throw new Error('Elering response invalid');
  const records = [];
  for (const market of ['LV','LT','EE']) {
    const points = payload.data[market.toLowerCase()];
    if (!Array.isArray(points) || (!points.length && !allowEmptyAreas)) throw new Error(`Elering ${market} data missing`);
    if(!points.length)continue;
    const ordered = [...points].sort((a,b) => a.timestamp-b.timestamp);
    const seen = new Set();
    for (let i=0;i<ordered.length;i++) {
      const p=ordered[i];
      if (!Number.isInteger(p.timestamp) || typeof p.price !== 'number' || !Number.isFinite(p.price) || seen.has(p.timestamp)) throw new Error('Invalid/duplicate Elering observation');
      seen.add(p.timestamp);
      const gap = ordered[i+1] ? ordered[i+1].timestamp-p.timestamp : p.timestamp-ordered[i-1]?.timestamp;
      const duration = [900,3600].includes(gap) ? gap : 900;
      records.push({market,at:new Date(p.timestamp*1000).toISOString(),valid_to:new Date((p.timestamp+duration)*1000).toISOString(),value:p.price,resolution:duration,fetched_at:fetchedAt});
    }
  }
  return records;
}

export function saveElectricity(db, records) {
  initializeElectricity(db);
  const insert=db.prepare('INSERT OR REPLACE INTO electricity_prices VALUES(?,?,?,?,?,?)');
  db.exec('BEGIN IMMEDIATE');
  try { for (const p of records) insert.run(p.market,p.at,p.valid_to,p.value,'elering',p.resolution); db.exec('COMMIT'); }
  catch(e) {db.exec('ROLLBACK');throw e;}
}

async function fetchRange(start,end,{allowEmptyAreas=false,archiveDir}={}) {
  const url=new URL(source);url.searchParams.set('start',new Date(start).toISOString());url.searchParams.set('end',new Date(end).toISOString());
  const res=await fetch(url,{signal:AbortSignal.timeout(30000),headers:{'User-Agent':'BalticWidgets/1.1'}});
  if(!res.ok)throw new Error(`Elering HTTP ${res.status}`);
  const payload=await res.json();const records=parseElectricity(payload,undefined,{allowEmptyAreas});
  if(archiveDir){await mkdir(archiveDir,{recursive:true});await writeFile(path.join(archiveDir,`${new Date(start).toISOString().slice(0,10)}_${new Date(end).toISOString().slice(0,10)}.json`),JSON.stringify(payload));}
  return records;
}

export async function refreshElectricity(db, now=Date.now(), {archiveDir}={}) {
  initializeElectricity(db);
  const prior=JSON.parse(db.prepare("SELECT value FROM metadata WHERE key='electricity_backfill'").get()?.value || 'null');
  const minLatest=db.prepare("SELECT min(latest) AS at FROM (SELECT max(at) AS latest FROM electricity_prices WHERE source='elering' GROUP BY market)").get()?.at;
  // Requests stay below Elering's documented maximum of one year.
  const full=prior?.archive_version!==2;
  const start=full ? Date.parse('2010-01-01T00:00:00Z') : Math.min(now-2*day,minLatest ? Date.parse(minLatest) : now-2*day);
  const end=now+2*day;
  let count=0;
  for(let cursor=start;cursor<end;) {
    const next=Math.min(cursor+(full?330:90)*day,end);
    const records=await fetchRange(cursor,next,{allowEmptyAreas:full,archiveDir});saveElectricity(db,records);count+=records.length;cursor=next;
  }
  const coverage=db.prepare("SELECT market,min(at) AS first,max(at) AS last,count(*) AS observations FROM electricity_prices WHERE source='elering' GROUP BY market").all();
  const report={archive_version:2,updated_at:new Date(now).toISOString(),source_url:source,rows_received:count,coverage,tax_basis:'without_vat_or_retail_fees'};
  db.prepare('INSERT OR REPLACE INTO metadata VALUES(?,?)').run('electricity_backfill',JSON.stringify(report));
  return report;
}

export function electricityData(db, now=Date.now()) {
  initializeElectricity(db);
  const metadata=JSON.parse(db.prepare("SELECT value FROM metadata WHERE key='electricity_backfill'").get()?.value || 'null');
  const nowISO=new Date(now).toISOString(),areas={};
  for(const market of ['LV','LT','EE']) {
    const current=db.prepare("SELECT * FROM electricity_prices WHERE market=? AND source='elering' AND at<=? AND valid_to>? ORDER BY at DESC LIMIT 1").get(market,nowISO,nowISO);
    if(!current)continue;
    const previous=db.prepare("SELECT value FROM electricity_prices WHERE market=? AND source='elering' AND at<? ORDER BY at DESC LIMIT 1").get(market,current.at);
    // Include every published day-ahead interval, while the headline stays current.
    const history=db.prepare("SELECT at,value FROM electricity_prices WHERE market=? AND source='elering' AND at>=? ORDER BY at").all(market,new Date(now-7*day).toISOString());
    const daily=db.prepare("SELECT substr(at,1,10)||'T12:00:00.000Z' AS at,sum(value*resolution_seconds)/sum(resolution_seconds) AS value,sum(resolution_seconds) AS coverage_seconds FROM electricity_prices WHERE market=? AND source='elering' AND at<=? GROUP BY substr(at,1,10) ORDER BY at").all(market,nowISO);
    areas[market]={price_eur_mwh:current.value,previous_eur_mwh:previous?.value ?? null,valid_from:current.at,valid_to:current.valid_to,history,history_daily:daily,
      source:'Nord Pool / Elering',tax_basis:'without_vat_or_retail_fees',resolution_seconds:current.resolution_seconds};
  }
  return {schema_version:1,demo:false,updated_at:metadata?.updated_at || nowISO,source:'Nord Pool day-ahead prices, published by Elering',data:{areas,aggregation_timezone:'UTC'}};
}
