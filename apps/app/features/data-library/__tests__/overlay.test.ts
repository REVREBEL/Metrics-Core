import assert from "node:assert/strict";
import { test } from "node:test";
import { InMemoryDraftRepository } from "@repo/db";
import { canonicalizeRowKey } from "../canonicalizer";
import { listFeatureDraftEdits, saveFeatureDraftEdits } from "../draft-service";
import { getDataLibraryTableDefinition } from "../registry";

test("Three-layer overlay preserves source, draft, and effective values", async () => {
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

  const rowKey = canonicalizeRowKey(tableDef.primaryKey, sourceRow);

  // Save a draft change
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

  // List saved drafts
  const drafts = await listFeatureDraftEdits(
    "metrics_core.lkp_segment",
    authContext,
    repo,
  );
  assert.equal(drafts.length, 1);

  const activeDraft = drafts.find((d) => d.rowKey === rowKey);
  assert.ok(activeDraft);

  // Compute 3-Layer Overlay
  const draftValues = activeDraft.draftPayload;
  const effectiveValues = { ...sourceRow, ...draftValues };
  const dirtyColumns = Object.keys(draftValues).filter(
    (k) => sourceRow[k as keyof typeof sourceRow] !== draftValues[k],
  );

  assert.equal(sourceRow.name, "Corporate");
  assert.equal(effectiveValues.name, "Corporate Travel");
  assert.deepEqual(dirtyColumns, ["name", "sort"]);
});
