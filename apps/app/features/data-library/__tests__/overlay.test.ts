import assert from "node:assert/strict";
import { test } from "node:test";
import { InMemoryDraftRepository } from "@repo/db";
import { canonicalizeRowKey } from "../canonicalizer";
import { saveFeatureDraftEdits } from "../draft-service";
import { getDataLibraryTableDefinition } from "../registry";
import type { DataLibraryOverlayRow } from "../service";

test("Three-layer overlay model constructs sourceValues, draftValues, effectiveValues, dirtyColumns, and rowKey", async () => {
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

  // 2. Fetch saved drafts from repository
  const drafts = await repo.listDrafts("metrics_core.lkp_segment", "user-123");
  assert.equal(drafts.length, 1);

  const activeDraft = drafts.find((d) => d.rowKey === expectedRowKey);
  assert.ok(activeDraft);

  // 3. Verify overlay properties matching DataLibraryOverlayRow structure
  const draftValues = activeDraft.draftPayload;
  const effectiveValues = { ...sourceRow, ...draftValues };
  const dirtyColumns = Object.keys(draftValues).filter(
    (k) => sourceRow[k as keyof typeof sourceRow] !== draftValues[k],
  );

  const overlayRow: DataLibraryOverlayRow = {
    ...effectiveValues,
    _overlay: {
      rowKey: expectedRowKey,
      sourceValues: sourceRow,
      draftValues,
      effectiveValues,
      draftId: activeDraft.id,
      draftUpdatedAt: activeDraft.updatedAt.toISOString(),
      dirtyColumns,
    },
  };

  assert.ok(overlayRow._overlay, "_overlay property must be attached");
  assert.equal(overlayRow._overlay.rowKey, expectedRowKey);
  assert.equal(overlayRow._overlay.sourceValues.name, "Corporate");
  assert.equal(overlayRow._overlay.draftValues?.name, "Corporate Travel");
  assert.equal(overlayRow._overlay.effectiveValues.name, "Corporate Travel");
  assert.equal(overlayRow._overlay.effectiveValues.sort, 15);
  assert.deepEqual(overlayRow._overlay.dirtyColumns.sort(), ["name", "sort"]);
});
