import {mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {database} from '../services/database.mjs';
import {initializeHoroscope,horoscopeData} from '../parsers/horoscope.mjs';
import {localized,languages} from '../services/localization.mjs';
const args=Object.fromEntries(process.argv.slice(2).map(x=>x.replace(/^--/,'').split('=')));
const dir=path.resolve(process.env.DATA_DIR||'var');await mkdir(dir,{recursive:true});
const db=database(dir);initializeHoroscope(db);
try{for(const lang of languages){
  const folder=path.join(dir,'exports',lang);await mkdir(folder,{recursive:true});
  const doc=localized(horoscopeData(db,{lang,timeZone:args.tz||'Europe/Riga',now:args.date?new Date(args.date+'T12:00:00Z'):new Date()}),lang,'horoscope');
  await writeFile(path.join(folder,'horoscope.json'),JSON.stringify(doc));
  console.log(JSON.stringify({lang,date:doc.data.date,file:path.join(folder,'horoscope.json'),provider:doc.data.generation.provider}));
}}finally{db.close();}
