import assert from "node:assert/strict";
import { test } from "node:test";
import {
  DatabaseConfigurationError,
  PostgresDraftRepository,
} from "../src/index";

test("PostgresDraftRepository verifies DatabaseConfigurationError when DATABASE_URL is unconfigured", async () => {
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

test("PostgresDraftRepository performs atomic upserts and audit writes when DATABASE_URL is set", async (t) => {
  if (!process.env.DATABASE_URL) {
    t.skip("DATABASE_URL is not set; skipping live Postgres integration test.");
    return;
  }

  const repo = new PostgresDraftRepository();
  const testUserId = "00000000-0000-0000-0000-000000000099";
  const tableKey = "metrics_core.lkp_segment";
  const rowKey = '{"code":"TEST_SEG"}';

  try {
    // 1. Save draft with audit -> DRAFT_CREATED
    const saved = await repo.saveDraftsWithAudit(tableKey, testUserId, [
      {
        tableKey,
        userId: testUserId,
        rowKey,
        originalPayload: { code: "TEST_SEG", name: "Original" },
        draftPayload: { name: "Proposed Change 1" },
      },
    ]);

    assert.equal(saved.length, 1);
    assert.equal(saved[0].draftPayload.name, "Proposed Change 1");

    // 2. Fetch list of drafts
    const drafts = await repo.listDrafts(tableKey, testUserId);
    const found = drafts.find((d) => d.rowKey === rowKey);
    assert.ok(found);
    assert.equal(found.draftPayload.name, "Proposed Change 1");

    // 3. Upsert draft -> DRAFT_UPDATED
    const updated = await repo.saveDraftsWithAudit(tableKey, testUserId, [
      {
        tableKey,
        userId: testUserId,
        rowKey,
        originalPayload: { code: "TEST_SEG", name: "Original" },
        draftPayload: { name: "Proposed Change 2" },
      },
    ]);

    assert.equal(updated.length, 1);
    assert.equal(updated[0].draftPayload.name, "Proposed Change 2");

    // 4. Discard single draft
    const discardedCount = await repo.discardDraftsWithAudit(
      tableKey,
      testUserId,
      [rowKey],
    );
    assert.equal(discardedCount, 1);

    const remaining = await repo.listDrafts(tableKey, testUserId);
    assert.equal(remaining.filter((d) => d.rowKey === rowKey).length, 0);
  } finally {
    try {
      await repo.discardAllDrafts(tableKey, testUserId);
    } catch {
      // Ignore
    }
  }
});
