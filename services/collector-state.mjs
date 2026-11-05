import {mkdir,writeFile,access} from 'node:fs/promises';
import path from 'node:path';
// A SQLite backup may be moved without the collector's JSON cache. Seed it before
// refreshing so a failed source does not erase its last successful observations.
export async function ensureCollectorState(db,dir){
  const file=path.join(dir,'fuel-stations.json');
  try{await access(file);return;}catch(e){if(e.code!=='ENOENT')throw e;}
  const data=db.prepare('SELECT json FROM stations').all().map(row=>JSON.parse(row.json));
  if(!data.length)return;
  const metadata=JSON.parse(db.prepare("SELECT value FROM metadata WHERE key='stations'").get()?.value||'{}');
  await mkdir(dir,{recursive:true});
  try{await writeFile(file,JSON.stringify({schema_version:1,updated_at:metadata.updated_at||new Date().toISOString(),source:'Recovered collector state from SQLite',sources:metadata.sources||[],data}),{flag:'wx'});}catch(e){if(e.code!=='EEXIST')throw e;}
}
