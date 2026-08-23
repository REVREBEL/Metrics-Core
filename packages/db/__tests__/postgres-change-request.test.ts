import assert from "node:assert/strict";
import { test } from "node:test";
import {
  InMemoryChangeRequestRepository,
  PostgresChangeRequestRepository,
} from "../src";

test("PostgresChangeRequestRepository throws DatabaseConfigurationError when DATABASE_URL is missing", () => {
  const origDbUrl = process.env.DATABASE_URL;
  delete process.env.DATABASE_URL;

  try {
    assert.throws(() => new PostgresChangeRequestRepository(), /DATABASE_URL/i);
  } finally {
    if (origDbUrl) process.env.DATABASE_URL = origDbUrl;
  }
});

test("InMemoryChangeRequestRepository workflow: submission, review, self-review prohibition, rejection notes, and withdrawal", async () => {
  const repo = new InMemoryChangeRequestRepository();
  const submitterId = "user-123";
  const reviewerId = "user-456";

  // 1. Create change request
  const req = await repo.createChangeRequestWithAudit({
    tableKey: "metrics_core.lkp_segment",
    title: "New Hotel Segment Request",
    description: "Adding luxury travel segment",
    submitterId,
    drafts: [
      {
        draftEditId: "draft-1",
        rowKey: "code=LUX",
        originalPayload: { code: "LUX", name: "Luxury" },
        draftPayload: { code: "LUX", name: "Ultra Luxury" },
      },
    ],
  });

  assert.equal(req.status, "submitted");
  assert.equal(req.items.length, 1);
  assert.equal(req.items[0].rowKey, "code=LUX");

  // 2. Self-review prohibition
  await assert.rejects(
    () =>
      repo.reviewChangeRequestWithAudit({
        changeRequestId: req.id,
        reviewerId: submitterId, // Same as submitter
        decision: "approve",
      }),
    /Self-review prohibited/i,
  );

  // 3. Rejection without notes throws
  await assert.rejects(
    () =>
      repo.reviewChangeRequestWithAudit({
        changeRequestId: req.id,
        reviewerId,
        decision: "reject",
        reviewNotes: "  ", // Empty notes
      }),
    /Rejection notes are required/i,
  );

  // 4. Successful approval
  const approvedReq = await repo.reviewChangeRequestWithAudit({
    changeRequestId: req.id,
    reviewerId,
    decision: "approve",
  });

  assert.equal(approvedReq.status, "approved");
  assert.equal(approvedReq.reviewerId, reviewerId);

  // 5. Test withdrawal on new request
  const req2 = await repo.createChangeRequestWithAudit({
    tableKey: "metrics_core.lkp_segment",
    title: "Second Change Request",
    submitterId,
    drafts: [
      {
        draftEditId: "draft-2",
        rowKey: "code=CORP",
        originalPayload: { code: "CORP", name: "Corporate" },
        draftPayload: { code: "CORP", name: "Corporate Travel" },
      },
    ],
  });

  const withdrawnReq = await repo.withdrawChangeRequestWithAudit({
    changeRequestId: req2.id,
    actorId: submitterId,
  });

  assert.equal(withdrawnReq.status, "withdrawn");
  assert.ok(withdrawnReq.withdrawnAt);
});
