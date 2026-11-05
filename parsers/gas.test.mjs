import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {parseGasCSV,saveGas,gasData} from './gas.mjs';
const history='Index name;Delivery date;Index Value (€/MWh);Index Volume (MWh);Number of trades\nLVA-EST Neutral Gas Price 2026-11-04;04/11/2026;93.178;15206;66';
const current='Gasday;IndexValue (€/MWh);IndexVolume (MWh);Status;Timestamp (CET/CEST)\n05/11/2026;87.061;10616;Temporary NGP;05/11/2026 12:30\n06/11/2026;0;0;Temporary NGP;05/11/2026 12:30';
test('gas CSV keeps actual daily units, provisional status and drops no-trade placeholders',()=>{
  const rows=parseGasCSV(current,'LVA-EST');assert.equal(rows.length,1);assert.equal(rows[0].value,87.061);assert.equal(rows[0].final,0);
  assert.throws(()=>parseGasCSV(current.replace('87.061','NaN'),'LVA-EST'));
  assert.throws(()=>parseGasCSV(current.replace('05/11/2026;87','31/02/2026;87'),'LVA-EST'));
});
test('gas observations persist idempotently, final prices cannot be replaced by provisional prices, LV/EE share a zone',()=>{
  const db=new DatabaseSync(':memory:');db.exec('CREATE TABLE metadata(key TEXT PRIMARY KEY,value TEXT)');
  const rows=parseGasCSV(history,'LVA-EST').map(r=>({...r,source_url:'test'}));saveGas(db,rows);saveGas(db,rows);
  saveGas(db,[{...rows[0],value:1,final:0}]);assert.equal(db.prepare('SELECT value FROM gas_prices').get().value,93.178);
  saveGas(db,parseGasCSV(current,'LVA-EST').map(r=>({...r,source_url:'test'})));
  const j=gasData(db,new Date('2026-11-05T11:00:00Z'));assert.deepEqual(j.data.areas.LV,j.data.areas.EE);assert.equal(j.data.areas.LV.history.length,2);assert.equal(j.data.areas.LV.previous_eur_mwh,93.178);assert.equal(j.data.areas.LV.unit,'EUR/MWh');assert.equal(j.data.areas.LT,undefined);db.close();
});
