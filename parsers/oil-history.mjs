import readExcelFile from 'read-excel-file/node';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import path from 'node:path';

export const archiveURL = 'https://energy.ec.europa.eu/document/download/906e60ca-8b6a-44e7-8589-652854d2fd3f_en?filename=Weekly_Oil_Bulletin_Prices_History_maticni_4web.xlsx';
const countries = ['LV', 'LT', 'EE'];
const date = value => value instanceof Date && Number.isFinite(value.getTime()) ? value.toISOString().slice(0, 10) : null;
const since = '2005-01-01';

export async function importArchive(db, file, now = new Date().toISOString()) {
  const buffer = await readFile(file);
  const sheets = await readExcelFile(buffer);
  const prices = [], raw = [];
  for (const { sheet, data } of sheets) {
    if (['Prices with taxes', 'Prices wo taxes', 'Consumption'].includes(sheet)) {
      const columns = data[0].map((h, i) => ({ h, i })).filter(c => /^(LV|LT|EE)_/.test(String(c.h)));
      for (let i = 2; i < data.length; i++) {
        const row = data[i], at = date(row[0]) || (sheet === 'Consumption' && Number.isInteger(row[0]) ? `${row[0]}-01-01` : null);
        if (!at || at < since) continue;
        for (const country of countries) {
          const cols = columns.filter(c => c.h.startsWith(country + '_'));
          const values = cols.map(c => ({ metric: c.h, value: row[c.i] ?? null, unit: sheet === 'Consumption' ? 'kt' : data[2][c.i] }));
          raw.push({ sheet, row: i + 1, country, at, values });
          if (sheet === 'Consumption') continue;
          for (const c of cols) {
            const fuel = c.h.match(/_(euro95|diesel|heating_oil|fuel_oil_1|fuel_oil_2|LPG)$/)?.[1];
            const value = row[c.i]; if (!fuel || typeof value !== 'number' || !Number.isFinite(value)) continue;
            const unit = String(data[2][c.i]).trim();
            if (!['1000 l', 't'].includes(unit)) throw new Error(`Unknown archive unit: ${unit}`);
            prices.push({ country, fuel: fuel === 'euro95' ? '95' : fuel, tax: sheet === 'Prices with taxes' ? 'with_taxes' : 'without_taxes', at,
              value: unit === '1000 l' ? value / 1000 : value, unit: unit === '1000 l' ? 'EUR/L' : 'EUR/t', raw: value, rawUnit: unit });
          }
        }
      }
    } else {
      let country = null;
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (/^[A-Z]{2}_$/.test(String(row[0]))) country = String(row[0]).slice(0, 2);
        const at = date(row[1]);
        if (countries.includes(country) && at && at >= since) raw.push({ sheet, row: i + 1, country, at, values: row });
      }
    }
  }
  for (const country of countries) for (const f of ['95', 'diesel']) {
    const rows = prices.filter(p => p.country === country && p.fuel === f && p.tax === 'with_taxes');
    if (rows.length < 1000 || !rows.some(p => p.at.startsWith('2005-'))) throw new Error(`Incomplete archive: ${country}/${f}`);
    if (rows.some(p => p.value <= 0 || p.value > 10)) throw new Error('Archive price outside plausible EUR/L range');
  }
  const insert = db.prepare('INSERT OR REPLACE INTO national_prices VALUES(?,?,?,?,?,?,?,?,?)');
  const insertRaw = db.prepare('INSERT OR REPLACE INTO archive_rows VALUES(?,?,?,?,?)');
  const report = { imported_at: now, source_url: archiveURL, sha256: createHash('sha256').update(buffer).digest('hex'),
    observations: prices.length, preserved_rows: raw.length, sheets: sheets.map(s => s.sheet),
    from: prices.reduce((a, p) => p.at < a ? p.at : a, '9999'), to: prices.reduce((a, p) => p.at > a ? p.at : a, '') };
  db.exec('BEGIN IMMEDIATE');
  try {
    db.exec('DELETE FROM national_prices; DELETE FROM archive_rows;');
    for (const p of prices) insert.run(p.country, p.fuel, p.tax, p.at, p.value, p.unit, p.raw, p.rawUnit, archiveURL);
    for (const r of raw) insertRaw.run(r.sheet, r.row, r.country, r.at, JSON.stringify(r.values));
    db.prepare('INSERT OR REPLACE INTO metadata VALUES(?,?)').run('archive', JSON.stringify(report));
    db.exec('COMMIT');
  } catch (e) { db.exec('ROLLBACK'); throw e; }
  return report;
}

export async function refreshArchive(db, folder, force = false) {
  const prior = JSON.parse(db.prepare("SELECT value FROM metadata WHERE key='archive'").get()?.value || '{}');
  if (!force && prior.imported_at && Date.now() - Date.parse(prior.imported_at) < 7 * 86400000) return prior;
  await mkdir(path.join(folder, 'archives'), { recursive: true });
  const res = await fetch(archiveURL, { signal: AbortSignal.timeout(60000) });
  if (!res.ok) throw new Error(`EC archive HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  if (buffer.length > 20_000_000 || buffer.subarray(0, 2).toString() !== 'PK') throw new Error('Invalid EC workbook');
  const file = path.join(folder, 'archives', 'ec-oil-history.xlsx');
  // Keep the previous source workbook if extraction or validation fails.
  await writeFile(file + '.tmp', buffer);
  const report = await importArchive(db, file + '.tmp');
  await rename(file + '.tmp', file);
  return report;
}
