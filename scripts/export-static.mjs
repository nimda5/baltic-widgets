import {initializeHoroscope,horoscopeData} from '../parsers/horoscope.mjs';
import {cp,mkdir,writeFile,readFile,readdir,unlink} from 'node:fs/promises';
import path from 'node:path';
import {database,widgetData} from '../services/database.mjs';
import {exchangeData} from '../parsers/markets.mjs';
import {gasData} from '../parsers/gas.mjs';
import {electricityData} from '../parsers/electricity.mjs';
import {languages,localized} from '../services/localization.mjs';
const target=path.resolve('artifacts/static-site');
const db=database(path.resolve(process.env.DATA_DIR || 'var'));
initializeHoroscope(db);
await cp('public',target,{recursive:true});
// Retired name-day country files must not survive an incremental export.
for(const name of ['calendar.json'])await unlink(path.join(target,'data','namedays',name)).catch(e=>{if(e.code!=='ENOENT')throw e;});
await mkdir(path.join(target,'data'),{recursive:true});
await writeFile(path.join(target,'data','horoscope.json'),JSON.stringify(localized(horoscopeData(db),'lv','horoscope')));
for(const market of ['LV','LT','EE'])await writeFile(path.join(target,'data',`fuel-${market}.json`),JSON.stringify(widgetData(db,market)));
await writeFile(path.join(target,'data','fuel.json'),JSON.stringify(widgetData(db,'LV')));
await writeFile(path.join(target,'data','electricity.json'),JSON.stringify(electricityData(db)));
await writeFile(path.join(target,'data','gas.json'),JSON.stringify(localized(gasData(db),'lv','gas')));
await writeFile(path.join(target,'data','exchange.json'),JSON.stringify(localized(exchangeData(db),'lv','exchange')));
for(const lang of languages){
  const folder=path.join(target,'data',lang);await mkdir(folder,{recursive:true});
  for(const market of ['LV','LT','EE'])await writeFile(path.join(folder,`fuel-${market}.json`),JSON.stringify(localized(widgetData(db,market),lang,'fuel')));
  await writeFile(path.join(folder,'fuel.json'),JSON.stringify(localized(widgetData(db,'LV'),lang,'fuel')));
  await writeFile(path.join(folder,'electricity.json'),JSON.stringify(localized(electricityData(db),lang,'electricity')));
  await writeFile(path.join(folder,'gas.json'),JSON.stringify(localized(gasData(db),lang,'gas')));
  await writeFile(path.join(folder,'exchange.json'),JSON.stringify(localized(exchangeData(db),lang,'exchange')));
  await writeFile(path.join(folder,'horoscope.json'),JSON.stringify(localized(horoscopeData(db,{lang}),lang,'horoscope')));
}
// CSS URLs resolve relative to the stylesheet, including GitHub Pages project paths.
async function styles(dir){for(const entry of await readdir(dir,{withFileTypes:true})){
  const file=path.join(dir,entry.name);if(entry.isDirectory())await styles(file);
  else if(entry.name.endsWith('.css')){const base=path.relative(path.dirname(file),target).split(path.sep).join('/') || '.';
    const s=await readFile(file,'utf8');await writeFile(file,s.replace(/url\((['"]?)\/(?!\/)/g,`url($1${base}/`));}
}}
await styles(target);db.close();console.log(target);
