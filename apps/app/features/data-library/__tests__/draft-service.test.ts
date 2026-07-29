import assert from "node:assert/strict";
import { test } from "node:test";
import {
  DatabaseConfigurationError,
  InMemoryDraftRepository,
  PostgresDraftRepository,
} from "@repo/db";
import { canonicalizeRowKey } from "../canonicalizer";
import {
  discardAllFeatureDraftEdits,
  discardFeatureDraftEdits,
  saveFeatureDraftEdits,
} from "../draft-service";
import { getDataLibraryTableDefinition } from "../registry";
import { validateRowDraft } from "../validation";

test("canonicalizeRowKey formats JSON matching primaryKey order", () => {
  const key = canonicalizeRowKey(
    ["property_code", "source_application_code", "code"],
    {
      code: "BAR",
      property_code: "NNNH",
      source_application_code: "STNT",
    },
  );
  assert.equal(
    key,
    '{"property_code":"NNNH","source_application_code":"STNT","code":"BAR"}',
  );
});

test("validateRowDraft rejects read-only field modifications", () => {
  const tableDef = getDataLibraryTableDefinition("metrics_core.map_segment");
  assert.ok(tableDef);
  const res = validateRowDraft(
    tableDef,
    { property_code: "MODIFIED" },
    { property_code: "NNNH", source_application_code: "STNT", code: "BAR" },
  );
  assert.equal(res.valid, false);
  assert.match(res.errors.property_code, /read-only/i);
});

test("validateRowDraft rejects primary key field mutations", () => {
  const tableDef = getDataLibraryTableDefinition("metrics_core.lkp_segment");
  assert.ok(tableDef);
  const res = validateRowDraft(
    tableDef,
    { code: "NEW_CODE" },
    { code: "CORP" },
  );
  assert.equal(res.valid, false);
  assert.match(res.errors.code, /read-only|immutable/i);
});

test("saveFeatureDraftEdits rejects unauthenticated and unauthorized requests (fail-closed)", async () => {
  const repo = new InMemoryDraftRepository();

  // 1. Unauthenticated
  const unauthRes = await saveFeatureDraftEdits(
    {
      tableKey: "metrics_core.lkp_segment",
      changes: [
        { originalPayload: { code: "CORP" }, draftPayload: { name: "Test" } },
      ],
    },
    { userId: "", isAuthenticated: false },
    { draftRepo: repo },
  );
  assert.equal(unauthRes.success, false);
  assert.match(unauthRes.message ?? "", /signed in/i);

  // 2. Unauthorized (empty permissions)
  const noPermRes = await saveFeatureDraftEdits(
    {
      tableKey: "metrics_core.lkp_segment",
      changes: [
        { originalPayload: { code: "CORP" }, draftPayload: { name: "Test" } },
      ],
    },
    { userId: "user-1", isAuthenticated: true, permissions: [] },
    { draftRepo: repo },
  );
  assert.equal(noPermRes.success, false);
  assert.match(noPermRes.message ?? "", /permission/i);
});

test("saveFeatureDraftEdits validates lookup dependency: permits active, rejects invalid/inactive new selection", async () => {
  const repo = new InMemoryDraftRepository();
  const authContext = {
    userId: "user-123",
    isAuthenticated: true,
    permissions: ["data_library.mapping_tables.edit"],
  };

  const mockLookupFetcher = async (_tableKey: string, search: string) => {
    if (search === "GOVN") return [{ code: "GOVN", is_active: true }];
    if (search === "INACT") return [{ code: "INACT", is_active: false }];
    return [];
  };

  // 1. Invalid code
  const invalidRes = await saveFeatureDraftEdits(
    {
      tableKey: "metrics_core.map_segment",
      changes: [
        {
          originalPayload: {
            property_code: "PROP1",
            source_application_code: "STNT",
            code: "SRC1",
            segment_code: "OLD",
          },
          draftPayload: { segment_code: "UNKNOWN" },
        },
      ],
    },
    authContext,
    { draftRepo: repo, lookupFetcher: mockLookupFetcher },
  );
  assert.equal(invalidRes.success, false);
  assert.match(invalidRes.errors?.segment_code ?? "", /not found/i);

  // 2. Newly selected inactive code
  const inactiveRes = await saveFeatureDraftEdits(
    {
      tableKey: "metrics_core.map_segment",
      changes: [
        {
          originalPayload: {
            property_code: "PROP1",
            source_application_code: "STNT",
            code: "SRC1",
            segment_code: "OLD",
          },
          draftPayload: { segment_code: "INACT" },
        },
      ],
    },
    authContext,
    { draftRepo: repo, lookupFetcher: mockLookupFetcher },
  );
  assert.equal(inactiveRes.success, false);
  assert.match(inactiveRes.errors?.segment_code ?? "", /inactive/i);

  // 3. Active valid code
  const activeRes = await saveFeatureDraftEdits(
    {
      tableKey: "metrics_core.map_segment",
      changes: [
        {
          originalPayload: {
            property_code: "PROP1",
            source_application_code: "STNT",
            code: "SRC1",
            segment_code: "OLD",
          },
          draftPayload: { segment_code: "GOVN" },
        },
      ],
    },
    authContext,
    { draftRepo: repo, lookupFetcher: mockLookupFetcher },
  );
  assert.equal(activeRes.success, true);
  assert.equal(activeRes.savedCount, 1);
});

test("saveFeatureDraftEdits persists, logs DRAFT_CREATED vs DRAFT_UPDATED, and updates drafts atomically", async () => {
  const repo = new InMemoryDraftRepository();
  const authContext = {
    userId: "user-123",
    isAuthenticated: true,
    permissions: ["data_library.lookup_tables.edit"],
  };

  // Initial save -> DRAFT_CREATED
  const saveRes = await saveFeatureDraftEdits(
    {
      tableKey: "metrics_core.lkp_segment",
      changes: [
        {
          originalPayload: { code: "CORP", name: "Corporate" },
          draftPayload: { name: "Corporate Travel" },
        },
      ],
    },
    authContext,
    { draftRepo: repo },
  );

  assert.equal(saveRes.success, true);
  assert.equal(saveRes.savedCount, 1);

  const drafts = await repo.listDrafts("metrics_core.lkp_segment", "user-123");
  assert.equal(drafts.length, 1);
  assert.equal(drafts[0].draftPayload.name, "Corporate Travel");
  assert.equal(repo.auditLogs.length, 1);
  assert.equal(repo.auditLogs[0].action, "DRAFT_CREATED");

  // Subsequent save -> DRAFT_UPDATED
  await saveFeatureDraftEdits(
    {
      tableKey: "metrics_core.lkp_segment",
      changes: [
        {
          originalPayload: { code: "CORP", name: "Corporate" },
          draftPayload: { name: "Corporate & Group Travel" },
        },
      ],
    },
    authContext,
    { draftRepo: repo },
  );

  assert.equal(repo.auditLogs.length, 2);
  assert.equal(repo.auditLogs[1].action, "DRAFT_UPDATED");
  assert.deepEqual(repo.auditLogs[1].beforeState, { name: "Corporate Travel" });
});

test("discardFeatureDraftEdits discards selected row and logs audit event", async () => {
  const repo = new InMemoryDraftRepository();
  const authContext = {
    userId: "user-123",
    isAuthenticated: true,
    permissions: ["data_library.lookup_tables.edit"],
  };

  await saveFeatureDraftEdits(
    {
      tableKey: "metrics_core.lkp_segment",
      changes: [
        {
          originalPayload: { code: "CORP" },
          draftPayload: { name: "Corporate Travel" },
        },
      ],
    },
    authContext,
    { draftRepo: repo },
  );

  const rowKey = canonicalizeRowKey(["code"], { code: "CORP" });

  // Discard selected row
  const discardRes = await discardFeatureDraftEdits(
    "metrics_core.lkp_segment",
    [rowKey],
    authContext,
    repo,
  );

  assert.equal(discardRes.success, true);
  assert.equal(discardRes.discardedCount, 1);

  const remaining = await repo.listDrafts(
    "metrics_core.lkp_segment",
    "user-123",
  );
  assert.equal(remaining.length, 0);

  const discardAudit = repo.auditLogs.find(
    (a) => a.action === "DRAFT_DISCARDED",
  );
  assert.ok(discardAudit);
});

test("discardAllFeatureDraftEdits removes all drafts and logs DRAFT_DISCARD_ALL audit event", async () => {
  const repo = new InMemoryDraftRepository();
  const authContext = {
    userId: "user-123",
    isAuthenticated: true,
    permissions: ["data_library.lookup_tables.edit"],
  };

  await saveFeatureDraftEdits(
    {
      tableKey: "metrics_core.lkp_segment",
      changes: [
        {
          originalPayload: { code: "CORP" },
          draftPayload: { name: "Corporate Travel" },
        },
      ],
    },
    authContext,
    { draftRepo: repo },
  );

  const res = await discardAllFeatureDraftEdits(
    "metrics_core.lkp_segment",
    authContext,
    repo,
  );

  assert.equal(res.success, true);
  assert.equal(res.discardedCount, 1);

  const remaining = await repo.listDrafts(
    "metrics_core.lkp_segment",
    "user-123",
  );
  assert.equal(remaining.length, 0);

  const audit = repo.auditLogs.find((a) => a.action === "DRAFT_DISCARD_ALL");
  assert.ok(audit);
});

test("PostgresDraftRepository throws DatabaseConfigurationError when DATABASE_URL is missing", () => {
  const origEnv = process.env.DATABASE_URL;
  delete process.env.DATABASE_URL;

  try {
    assert.throws(
      () => new PostgresDraftRepository(),
      DatabaseConfigurationError,
    );
  } finally {
    if (origEnv) {
      process.env.DATABASE_URL = origEnv;
    }
  }
});
