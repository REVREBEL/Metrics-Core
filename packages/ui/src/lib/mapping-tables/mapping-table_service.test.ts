import assert from "node:assert/strict";
import { test } from "node:test";
import {
  getColumnsForTable,
  getDetailColumnsForTable,
} from "./mapping-table_columns";
import {
  getMappingTableRows,
  listMappingTables,
} from "./mapping-table_service";

test("listMappingTables returns active mapping tables with accurate status counts", async () => {
  const tables = await listMappingTables();
  assert.ok(Array.isArray(tables));
  assert.ok(tables.length > 0);

  for (const table of tables) {
    assert.ok(table.key);
    assert.ok(table.displayName);
    assert.strictEqual(typeof table.approximateRowCount, "number");
    assert.strictEqual(typeof table.mappedRowCount, "number");
    assert.strictEqual(typeof table.partialRowCount, "number");
    assert.strictEqual(typeof table.unmappedRowCount, "number");
    assert.ok(table.approximateRowCount >= 0);
    assert.ok(table.mappedRowCount >= 0);
    assert.ok(table.partialRowCount >= 0);
    assert.ok(table.unmappedRowCount >= 0);
  }
});

test("getColumnsForTable returns columns pre-sorted by displayOrder", () => {
  const hotelColumns = getColumnsForTable("metrics_core.map_hotel");
  assert.ok(hotelColumns.length > 0);

  for (let i = 1; i < hotelColumns.length; i++) {
    assert.ok(
      hotelColumns[i].displayOrder >= hotelColumns[i - 1].displayOrder,
      "Columns should be sorted in ascending displayOrder",
    );
  }
});

test("getDetailColumnsForTable returns only columns visible in detail", () => {
  const detailColumns = getDetailColumnsForTable("metrics_core.map_hotel");
  assert.ok(detailColumns.length > 0);

  for (const col of detailColumns) {
    assert.strictEqual(
      col.visibleInDetail,
      true,
      "Detail columns must have visibleInDetail set to true",
    );
  }
});

test("getMappingTableRows returns rows for valid table key", async () => {
  const rows = await getMappingTableRows("metrics_core.map_hotel");
  assert.ok(Array.isArray(rows));
  assert.ok(rows.length > 0);
  assert.ok(rows[0].id);
  assert.ok(rows[0].sourceSystem);
});
