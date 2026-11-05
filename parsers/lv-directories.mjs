import {load} from 'cheerio';
import {createHash} from 'node:crypto';

export const directoryURLs={
  virsi:'https://www.virsi.lv/lv/privatpersonam/uzpildes-stacijas',
  viada:'https://www.viada.lv/dus',
  straujupite:'https://straujupite.lv/degvielas-uzpildes-stacijas/',
};
const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
const key=s=>clean(s).normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase()
  .replace(/\bLV\s*-?\s*\d{4}\b/gi,'').replace(/\badrese\s*:/g,'')
  .replace(/sosejas|sos\./g,'soseja').replace(/[^\p{L}\p{N}]/gu,'');
const identity=s=>createHash('sha256').update(s).digest('hex').slice(0,20);
function validate(rows,brand){
  if(!rows.length)throw Error(`${brand} directory is empty`);
  const ids=new Set(),addresses=new Set();
  for(const row of rows){const address=key(row.address);if(!row.directory_id||!address||ids.has(row.directory_id)||addresses.has(address))throw Error(`${brand} directory identity changed`);ids.add(row.directory_id);addresses.add(address);}
  return rows;
}

// Only the operator's own stations in explicitly Latvian regions are included.
// Partner stations and the operator's Lithuanian location are separate upstream.
export function parseVirsiDirectory(data){
  if(!Array.isArray(data.stations))throw Error('Virši directory schema changed');
  const regions=new Set(['riga_region','vidzeme','latgale','zemgale','kurzeme']);
  return validate(data.stations.filter(s=>regions.has(s.region)).map(s=>({
    country:'LV',brand:'Virši',name:clean(s.title),address:clean(s.address),
    lat:s.coordinates?.lat,lon:s.coordinates?.lng,directory_id:String(s.id||''),directory_url:directoryURLs.virsi,
  })),'Virši');
}

// The /dus list is Latvia-specific. The separate map includes Lithuania too and
// is used only to enrich exact matching addresses with coordinates.
export function parseViadaDirectory(html){
  const $=load(html),rows=[];
  $('.dus-list tr').each((_,tr)=>{
    const cell=$(tr).find('td').first(),name=clean(cell.find('.dus-name').text()).replace(/\*$/,'');
    if(!name)return;
    const copy=cell.clone();copy.find('.dus-name').remove();
    const address=clean(copy.text()).replace(/^[^:]*:\s*(?:Adrese:\s*)?/i,'').replace(/,?\s*(?:\+?371\s*)?\d{8}\s*$/,'').replace(/[,\s]+$/,'');
    if(!/\bLV\s*-?\s*\d{4}\b/i.test(address))throw Error('Viada Latvia address missing country/postcode');
    rows.push({country:'LV',brand:'Viada',name,address,directory_id:identity(address),directory_url:directoryURLs.viada});
  });
  return validate(rows,'Viada');
}

export function parseStraujupiteDirectory(html){
  const $=load(html),rows=[];
  $('.elementor-tab-content[aria-labelledby]').each((_,panel)=>{
    const title=$('#'+$(panel).attr('aria-labelledby')),name=clean(title.text());
    if(!name)return;
    const address=clean($(panel).find('.elementor-widget-text-editor').first().text());
    if(!address)throw Error('Straujupīte directory address missing');
    // Waze embeds expose an explicit point. Google embeds may expose a viewport
    // centre far from the station, so those coordinates are deliberately omitted.
    const src=$(panel).find('iframe[src*="embed.waze.com/iframe"]').attr('src');
    const point=src?new URL(src):null;
    rows.push({country:'LV',brand:'Straujupīte',name:'Straujupīte '+name,address,
      lat:point?.searchParams.get('lat'),lon:point?.searchParams.get('lon'),
      directory_id:identity(name),directory_url:directoryURLs.straujupite});
  });
  return validate(rows,'Straujupīte');
}

export function mergeDirectory(prices,directory){
  // Postal codes and spelling/punctuation differences do not change identity.
  // A shortened address must still identify the same street AND locality, or
  // the same named highway kilometre; ambiguous matches are never attached.
  const aliases=address=>{
    const parts=address.replace(/\bLV\s*-?\s*\d{4}\b/gi,'').split(',').map(clean).filter(Boolean);
    const result=new Set([key(address)]);
    if(parts.length>=2)result.add(key(parts.slice(0,2).join(',')));
    const highway=key(address).match(/^(.+?soseja\d+km)/);if(highway)result.add(highway[1]);
    return result;
  };
  const locations=directory.map(station=>({...station}));
  const indexed=locations.map(station=>({station,aliases:aliases(station.address)}));
  const attached=prices.map(price=>{
    const keys=aliases(price.address),matches=indexed.filter(row=>[...keys].some(k=>row.aliases.has(k)));
    if(matches.length!==1)return price;
    const station=matches[0].station;
    // Preserve the existing price-page identity and its SQLite history even
    // when the directory supplies a fuller address with postcode/district.
    station.id??=price.id??identity(`${price.country}|${price.brand}|${price.address}`);
    return {...station,...price,id:station.id,name:station.name,address:station.address};
  });
  return [...locations,...attached];
}
