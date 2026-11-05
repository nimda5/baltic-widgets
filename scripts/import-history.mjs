import { database } from '../services/database.mjs';
import { importArchive, refreshArchive } from '../parsers/oil-history.mjs';
const folder = process.env.DATA_DIR || process.argv[2] || 'var';
const db = database(folder);
try { console.log(JSON.stringify(process.argv[3] ? await importArchive(db, process.argv[3]) : await refreshArchive(db, folder, true), null, 2)); }
finally { db.close(); }
