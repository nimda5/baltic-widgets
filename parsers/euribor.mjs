import {load} from 'cheerio';
import {mkdir,writeFile,rename,unlink} from 'node:fs/promises';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {saveMarketRows,fetchMarket} from './markets.mjs';

export const euriborSource='https://reports.suomenpankki.fi/WebForms/ReportViewerPage.aspx?output=xml&report=%2Ftilastot%2Fmarkkina-_ja_hallinnolliset_korot%2Feuribor_korot_xml_short_en';
export const euriborTerms='https://www.suomenpankki.fi/en/statistics/interest-rates-and-exchange-rates/euribor-rates/';

// The official recent daily feed is delayed by 24 hours. Never substitute
// monthly averages, a different maturity, or act/365 for the act/360 fixing.
export function parseEuribor(xml,{now=new Date()}={}){
 const $=load(xml,{xml:true});
 if($('Report').attr('frequency')!=='D'||$('Report').attr('creator')!=='Bank of Finland')throw Error('Unexpected Euribor report');
 const rows=[],seen=new Set();
 $('period').each((_,period)=>{
  const day=$(period).attr('value');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(day)||!Number.isFinite(Date.parse(day))||new Date(day).toISOString().slice(0,10)!==day||day>now.toISOString().slice(0,10)||seen.has(day))throw Error('Invalid/duplicate Euribor date');
  seen.add(day);
  const rate=$(period).find('rate[name="6 month (act/360)"]');
  if(rate.length!==1||rate.find('intr').length!==1)throw Error('Missing Euribor 6M act/360 rate');
  const raw=rate.find('intr').attr('value');
  if(!/^[+-]?\d+(\.\d+)?$/.test(raw||''))throw Error('Invalid Euribor value');
  const value=Number(raw);
  if(!Number.isFinite(value)||value < -10||value>100)throw Error('Invalid Euribor range');
  rows.push({series:'euribor_6m',at:day+'T00:00:00.000Z',value,unit:'%',source:'Bank of Finland / EMMI · Euribor 6M act/360 · 24h delayed',source_url:euriborSource});
 });
 if(rows.length<2)throw Error('Incomplete Euribor daily feed');
 return rows.sort((a,b)=>a.at.localeCompare(b.at));
}

export async function refreshEuribor(db,dir,now=new Date()){
 const xml=await(await fetchMarket(euriborSource)).text(),rows=parseEuribor(xml,{now});
 const folder=path.join(dir,'archives','markets');await mkdir(folder,{recursive:true});
 const file=path.join(folder,'euribor-6m-recent.xml'),tmp=file+'.'+randomUUID()+'.tmp';
 try{await writeFile(tmp,xml);await rename(tmp,file);}finally{await unlink(tmp).catch(e=>{if(e.code!=='ENOENT')throw e;});}
 saveMarketRows(db,rows);
 const report={updated_at:now.toISOString(),observed_at:rows.at(-1).at,rows:rows.length,source_url:euriborSource,delay_hours:24,terms_url:euriborTerms};
 db.prepare('INSERT OR REPLACE INTO metadata VALUES(?,?)').run('euribor_last_run',JSON.stringify(report));return report;
}
