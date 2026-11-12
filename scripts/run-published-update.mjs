import {fileURLToPath} from 'node:url';
import {runPublishedUpdate} from '../services/published-update.mjs';
const profile=process.argv.find(a=>a.startsWith('--profile='))?.slice(10)||'auto';
try{await runPublishedUpdate({root:fileURLToPath(new URL('../',import.meta.url)),profile,force:process.argv.includes('--force')});}
catch(error){console.error(error.message);process.exitCode=1;}
