import {load} from 'cheerio';
import {createHash} from 'node:crypto';
const clean=s=>String(s??'').replace(/[\u200b-\u200f]/g,'').replace(/\s+/g,' ').trim();
const key=s=>clean(s).normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
const id=s=>createHash('sha256').update(s).digest('hex').slice(0,20);
export const extraURLs={kool:'https://kool.lv/',neste:'https://stacijas.neste.lv/api/station-search',rietumu:'https://rietumunafta.lv/degvielas-mazumtirdznieciba/'};

export function koolSnippetURLs(html){
  const $=load(html),script=$('script').map((_,e)=>$(e).text()).get().find(s=>/window\.ServerData\s*=/.test(s));
  if(!script)throw Error('KOOL public page metadata missing');
  const start=script.indexOf('{',script.search(/window\.ServerData\s*=/));
  let depth=0,string=false,escape=false,end;
  for(let i=start;i<script.length;i++){
    const c=script[i];if(string){if(escape)escape=false;else if(c==='\\')escape=true;else if(c==='"')string=false;}
    else if(c==='"')string=true;else if(c==='{')depth++;else if(c==='}'&&--depth===0){end=i+1;break;}
  }
  const pages=JSON.parse(script.slice(start,end)).mags?.mag?.pages;
  if(!Array.isArray(pages))throw Error('KOOL page schema changed');
  const url=title=>{
    const value=pages.find(p=>p.title===title)?.htmlUrl,u=new URL(value);
    if(u.protocol!=='https:'||u.hostname!=='c-p.rmcdn.net'||!u.pathname.endsWith('.html'))throw Error('KOOL content host changed');
    return u.href;
  };
  return {prices:url('Degviela'),directory:url('Degvielas uzpildes stacijas')};
}

export function parseKoolPrices(html){
  const $=load(html);$('script,style').remove();
  if(!$.text().includes('Zemākās cenas DUS tīklā'))throw Error('KOOL price scope changed');
  const widgets=$('[data-id]').map((_,e)=>{
    const style=$(e).attr('style')||'',left=Number(style.match(/\bleft:\s*([\d.]+)px/)?.[1]),top=Number(style.match(/\btop:\s*([\d.]+)px/)?.[1]);
    return {left,top,text:clean($(e).text()),first:clean($(e).find('p').first().text())};
  }).get();
  return ['95E','DD'].map((label,index)=>{
    const labels=widgets.filter(w=>w.text===label&&Number.isFinite(w.left)&&Number.isFinite(w.top));
    if(labels.length!==1)throw Error('KOOL fuel labels changed');const anchor=labels[0];
    const quotes=widgets.filter(w=>Math.abs(w.left-anchor.left)<12&&w.top>anchor.top&&w.top-anchor.top<85&&/^\d[,.]\d{3}$/.test(w.first));
    if(quotes.length!==1)throw Error('KOOL price column changed');
    return {fuel:index?'diesel':'95',value:quotes[0].first,label,scope:'network_published_minimum',country:'LV',brand:'KOOL'};
  });
}

export function parseKoolDirectory(html){
  const $=load(html);$('script,style').remove();const entries=[];
  for(const widget of $('[data-id]').toArray()){
    const text=clean($(widget).text());if(!text.startsWith('*'))continue;
    for(const address of text.split('*').map(clean).filter(Boolean)){
      const normalized=key(address);
      // The same Zvidzāni location is listed in two regional sections, with an
      // extra district in one. Deduplicate only comma-component prefixes.
      const parts=address.split(',').map(clean),prefix=key(parts.slice(0,2).join(','));
      const prior=entries.find(e=>key(e.address)===normalized||(parts.length>=2&&key(e.address.split(',').slice(0,2).join(','))===prefix));
      if(prior){if(address.length>prior.address.length)prior.address=address;continue;}
      entries.push({country:'LV',brand:'KOOL',name:'KOOL',address,directory_id:id(prefix||normalized),directory_url:'https://kool.lv/7/'});
    }
  }
  if(!entries.length)throw Error('KOOL directory is empty');return entries;
}

export function koolMapURL(html){
  const $=load(html),link=$('a[href]').map((_,e)=>$(e).attr('href')).get().find(h=>h.startsWith('https://www.google.com/maps/d/viewer?'));
  if(!link)throw Error('KOOL official map link missing');const mid=new URL(link).searchParams.get('mid');
  if(!mid||!/^[\w-]+$/.test(mid))throw Error('KOOL map identity changed');
  return 'https://www.google.com/maps/d/kml?'+new URLSearchParams({mid,forcekml:'1'});
}

export function addKoolCoordinates(records,kml){
  const $=load(kml,{xmlMode:true}),points=$('Placemark').map((_,e)=>{
    const name=key($(e).children('name').text().replace(/^kool\s*/i,''));
    const [lon,lat]=$(e).find('Point>coordinates').text().trim().split(',').map(Number);return{name,lat,lon};
  }).get();
  if(!points.length)throw Error('KOOL map is empty');
  const candidates=records.map(record=>{
    const parts=record.address.split(',').map(key),direct=points.filter(p=>p.name===parts[0]);
    return direct.length?direct:points.filter(p=>parts.includes(p.name));
  });
  return records.map((record,i)=>{
    const list=candidates[i];if(list.length!==1)return record;const point=list[0];
    if(candidates.filter(c=>c.length===1&&c[0]===point).length!==1)return record;
    return {...record,lat:point.lat,lon:point.lon};
  });
}

export function parseNesteDirectory(data){
  if(!Array.isArray(data))throw Error('Neste directory schema changed');const seen=new Set();
  const rows=data.filter(s=>s.countryCode==='LAT'&&s.hasFuels===true).map(s=>{
    if(!s.stationNumber||!s.stationName||!s.address||!s.municipality||seen.has(s.stationNumber))throw Error('Neste station identity changed');
    seen.add(s.stationNumber);return {country:'LV',brand:'Neste',name:clean(s.stationName),address:clean(s.address)+', '+clean(s.municipality),
      lat:s.location?.coordinates?.[1],lon:s.location?.coordinates?.[0],directory_id:String(s.stationNumber),directory_url:'https://stacijas.neste.lv/'};
  });
  if(!rows.length)throw Error('Neste LV fuel directory is empty');return rows;
}

export function parseRietumu(html){
  const $=load(html);$('script,style').remove();
  if(!/stacijas atrodas Kuldīgā,\s*Ganību ielā 31/i.test(clean($.text())))throw Error('Rietumu station address changed');
  const labels=$('span').filter((_,e)=>clean($(e).text())==='Dīzeļdegviela');
  if(labels.length!==1)throw Error('Rietumu diesel label changed');
  const value=clean(labels.next('.price').text()).match(/^(\d[.,]\d{3})\s*€\/l$/)?.[1];
  if(!value)throw Error('Rietumu diesel quote missing');
  return [{country:'LV',brand:'Rietumu Nafta',name:'Rietumu Nafta Kuldīga',address:'Ganību iela 31, Kuldīga',
    directory_id:'ganibu-31-kuldiga',directory_url:extraURLs.rietumu,fuel:'diesel',value,label:'Dīzeļdegviela'}];
}
