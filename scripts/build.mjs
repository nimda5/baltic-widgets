import {cp,mkdir,readFile,writeFile,readdir,stat,rm} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('.'),target=path.join(root,'dist');
await stat(path.join(root,'data','lv','horoscope.json'));
// Always rebuild this exact output directory so retired country files cannot be published.
if(path.dirname(target)!==root||path.basename(target)!=='dist')throw Error('Unsafe build destination');
await rm(target,{recursive:true,force:true});
await mkdir(target,{recursive:true});
await cp(path.join(root,'public'),target,{recursive:true});
await cp(path.join(root,'data'),path.join(target,'data'),{recursive:true});
await writeFile(path.join(target,'.nojekyll'),'');
async function styles(dir){for(const entry of await readdir(dir,{withFileTypes:true})){
  const file=path.join(dir,entry.name);if(entry.isDirectory())await styles(file);
  else if(entry.name.endsWith('.css')){const base=path.relative(path.dirname(file),target).split(path.sep).join('/')||'.';const s=await readFile(file,'utf8');await writeFile(file,s.replace(/url\((['"]?)\/(?!\/)/g,`url($1${base}/`));}
}}
await styles(target);console.log('Static site:',target);
