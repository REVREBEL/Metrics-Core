import assert from "node:assert/strict";
import { test } from "node:test";
import { InMemoryDraftRepository } from "@repo/db";
import { canonicalizeRowKey } from "../canonicalizer";
import { saveFeatureDraftEdits } from "../draft-service";
import { getDataLibraryTableDefinition } from "../registry";
import type { DataLibraryOverlayRow, RowFetcher } from "../service";
import { fetchFeatureDataLibraryRows } from "../service";

test("fetchFeatureDataLibraryRows constructs real three-layer overlay with sourceValues, draftValues, effectiveValues, dirtyColumns, and rowKey", async () => {
  const repo = new InMemoryDraftRepository();
  const authContext = {
    userId: "user-123",
    isAuthenticated: true,
    permissions: [
      "data_library.lookup_tables.view",
      "data_library.lookup_tables.edit",
    ],
  };

  const tableDef = getDataLibraryTableDefinition("metrics_core.lkp_segment");
  assert.ok(tableDef);

  const sourceRow = {
    code: "CORP",
    name: "Corporate",
    description: "Original description",
    sort: 10,
    segment_group_code: "COMM",
    is_active: true,
  };

  const expectedRowKey = canonicalizeRowKey(tableDef.primaryKey, sourceRow);

  // 1. Save draft edit
  const saveRes = await saveFeatureDraftEdits(
    {
      tableKey: "metrics_core.lkp_segment",
      changes: [
        {
          originalPayload: sourceRow,
          draftPayload: { name: "Corporate Travel", sort: 15 },
        },
      ],
    },
    authContext,
    { draftRepo: repo },
  );

  assert.equal(saveRes.success, true);

  // 2. Mock rowFetcher supplying sourceRow
  const mockRowFetcher: RowFetcher = async () => ({
    success: true,
    data: {
      rows: [sourceRow],
      totalRows: 1,
      page: 1,
      pageSize: 25,
      totalPages: 1,
    },
  });

  // 3. Call fetchFeatureDataLibraryRows directly
  const res = await fetchFeatureDataLibraryRows(
    {
      tableKey: "metrics_core.lkp_segment",
      page: 1,
      pageSize: 25,
    },
    authContext,
    repo,
    mockRowFetcher,
  );

  assert.equal(res.success, true);

  if (res.success) {
    const row = res.data.rows[0] as DataLibraryOverlayRow;
    assert.ok(row, "Row should be returned");
    assert.ok(
      row._overlay,
      "_overlay property must be constructed by fetchFeatureDataLibraryRows",
    );

    assert.equal(row._overlay.rowKey, expectedRowKey);
    assert.equal(row._overlay.sourceValues.name, "Corporate");
    assert.equal(row._overlay.draftValues?.name, "Corporate Travel");
    assert.equal(row._overlay.effectiveValues.name, "Corporate Travel");
    assert.equal(row._overlay.effectiveValues.sort, 15);
    assert.deepEqual(row._overlay.dirtyColumns.sort(), ["name", "sort"]);
  }
});
