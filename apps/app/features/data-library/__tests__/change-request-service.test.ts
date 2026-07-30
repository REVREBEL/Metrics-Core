import assert from "node:assert/strict";
import { test } from "node:test";
import {
  InMemoryChangeRequestRepository,
  InMemoryDraftRepository,
} from "@repo/db";
import {
  createFeatureChangeRequest,
  getFeatureChangeRequest,
  listFeatureChangeRequests,
  reviewFeatureChangeRequest,
  withdrawFeatureChangeRequest,
} from "../change-request-service";

test("createFeatureChangeRequest validates title, description, permissions, and creates request with validation snapshot", async () => {
  const draftRepo = new InMemoryDraftRepository();
  const changeReqRepo = new InMemoryChangeRequestRepository();

  const submitterContext = {
    userId: "user-editor-1",
    isAuthenticated: true,
    permissions: ["data_library.change_requests.submit"],
  };

  // 1. Save draft
  const draft = await draftRepo.saveDraft({
    tableKey: "metrics_core.lkp_segment",
    userId: "user-editor-1",
    rowKey: "code=LUX",
    originalPayload: { code: "LUX", name: "Luxury" },
    draftPayload: { code: "LUX", name: "Ultra Luxury" },
  });

  // 2. Reject short title
  const shortTitleRes = await createFeatureChangeRequest(
    {
      tableKey: "metrics_core.lkp_segment",
      draftIds: [draft.id],
      title: "Hi",
    },
    submitterContext,
    { changeReqRepo, draftRepo },
  );
  assert.equal(shortTitleRes.success, false);
  if (!shortTitleRes.success) {
    assert.equal(shortTitleRes.error.code, "INVALID_REQUEST");
  }

  // 3. Successful creation
  const createRes = await createFeatureChangeRequest(
    {
      tableKey: "metrics_core.lkp_segment",
      draftIds: [draft.id],
      title: "Promote Luxury Segment",
      description: "Updating segment name for marketing alignment",
    },
    submitterContext,
    { changeReqRepo, draftRepo },
  );

  assert.equal(createRes.success, true);
  if (createRes.success) {
    assert.equal(createRes.data.title, "Promote Luxury Segment");
    assert.equal(createRes.data.status, "submitted");
    assert.equal(createRes.data.items.length, 1);
    assert.ok(createRes.data.items[0].validationSnapshot);
  }
});

test("reviewFeatureChangeRequest enforces self-review prohibition and rejection notes requirement", async () => {
  const draftRepo = new InMemoryDraftRepository();
  const changeReqRepo = new InMemoryChangeRequestRepository();

  const editorContext = {
    userId: "user-editor-1",
    isAuthenticated: true,
    permissions: [
      "data_library.change_requests.submit",
      "data_library.change_requests.decide",
    ],
  };

  const reviewerContext = {
    userId: "user-reviewer-1",
    isAuthenticated: true,
    permissions: ["data_library.change_requests.decide"],
  };

  const draft = await draftRepo.saveDraft({
    tableKey: "metrics_core.lkp_segment",
    userId: "user-editor-1",
    rowKey: "code=CORP",
    originalPayload: { code: "CORP", name: "Corporate" },
    draftPayload: { code: "CORP", name: "Corporate Travel" },
  });

  const createRes = await createFeatureChangeRequest(
    {
      tableKey: "metrics_core.lkp_segment",
      draftIds: [draft.id],
      title: "Corporate Segment Name Change",
    },
    editorContext,
    { changeReqRepo, draftRepo },
  );

  assert.equal(createRes.success, true);
  if (!createRes.success) return;

  const reqId = createRes.data.id;

  // 1. Prohibit self-review (editor trying to approve own request)
  const selfReviewRes = await reviewFeatureChangeRequest(
    { changeRequestId: reqId, decision: "approve" },
    editorContext,
    { changeReqRepo },
  );
  assert.equal(selfReviewRes.success, false);
  if (!selfReviewRes.success) {
    assert.equal(selfReviewRes.error.code, "FORBIDDEN");
    assert.match(selfReviewRes.error.message, /Self-review prohibited/i);
  }

  // 2. Reject without notes fails
  const noNotesRes = await reviewFeatureChangeRequest(
    { changeRequestId: reqId, decision: "reject", notes: "  " },
    reviewerContext,
    { changeReqRepo },
  );
  assert.equal(noNotesRes.success, false);
  if (!noNotesRes.success) {
    assert.equal(noNotesRes.error.code, "INVALID_REQUEST");
  }

  // 3. Reviewer approves
  const approveRes = await reviewFeatureChangeRequest(
    { changeRequestId: reqId, decision: "approve" },
    reviewerContext,
    { changeReqRepo },
  );
  assert.equal(approveRes.success, true);
  if (approveRes.success) {
    assert.equal(approveRes.data.status, "approved");
    assert.equal(approveRes.data.reviewerId, "user-reviewer-1");
  }
});

test("listFeatureChangeRequests and getFeatureChangeRequest enforce view_own vs queue scoping", async () => {
  const changeReqRepo = new InMemoryChangeRequestRepository();

  await changeReqRepo.createChangeRequestWithAudit({
    tableKey: "metrics_core.lkp_segment",
    title: "User 1 Request",
    submitterId: "user-1",
    drafts: [
      {
        draftEditId: "d1",
        rowKey: "k1",
        originalPayload: null,
        draftPayload: { code: "A" },
      },
    ],
  });

  await changeReqRepo.createChangeRequestWithAudit({
    tableKey: "metrics_core.lkp_segment",
    title: "User 2 Request",
    submitterId: "user-2",
    drafts: [
      {
        draftEditId: "d2",
        rowKey: "k2",
        originalPayload: null,
        draftPayload: { code: "B" },
      },
    ],
  });

  const user1ViewOwnContext = {
    userId: "user-1",
    isAuthenticated: true,
    permissions: ["data_library.change_requests.view_own"],
  };

  const reviewerContext = {
    userId: "user-reviewer",
    isAuthenticated: true,
    permissions: ["data_library.change_requests.review"],
  };

  // User 1 lists: gets only user 1 request
  const listUser1 = await listFeatureChangeRequests({}, user1ViewOwnContext, {
    changeReqRepo,
  });
  assert.equal(listUser1.success, true);
  if (listUser1.success) {
    assert.equal(listUser1.data.length, 1);
    assert.equal(listUser1.data[0].submitterId, "user-1");
  }

  // Reviewer lists: gets all requests
  const listReviewer = await listFeatureChangeRequests({}, reviewerContext, {
    changeReqRepo,
  });
  assert.equal(listReviewer.success, true);
  if (listReviewer.success) {
    assert.equal(listReviewer.data.length, 2);
  }

  // Direct get: user 1 cannot access user 2 request
  const allReqs = await changeReqRepo.listChangeRequests();
  const user2Req = allReqs.find((r) => r.submitterId === "user-2");
  assert.ok(user2Req);

  const getForbiddenRes = await getFeatureChangeRequest(
    user2Req.id,
    user1ViewOwnContext,
    { changeReqRepo },
  );
  assert.equal(getForbiddenRes.success, false);
  if (!getForbiddenRes.success) {
    assert.equal(getForbiddenRes.error.code, "FORBIDDEN");
  }
});

test("withdrawFeatureChangeRequest allows submitter to withdraw pending request", async () => {
  const changeReqRepo = new InMemoryChangeRequestRepository();

  const req = await changeReqRepo.createChangeRequestWithAudit({
    tableKey: "metrics_core.lkp_segment",
    title: "Request To Withdraw",
    submitterId: "user-1",
    drafts: [
      {
        draftEditId: "d1",
        rowKey: "k1",
        originalPayload: null,
        draftPayload: { code: "W" },
      },
    ],
  });

  const user1Context = {
    userId: "user-1",
    isAuthenticated: true,
    permissions: ["data_library.change_requests.submit"],
  };

  const user2Context = {
    userId: "user-2",
    isAuthenticated: true,
    permissions: ["data_library.change_requests.submit"],
  };

  // Other user cannot withdraw
  const forbiddenWithdraw = await withdrawFeatureChangeRequest(
    req.id,
    user2Context,
    { changeReqRepo },
  );
  assert.equal(forbiddenWithdraw.success, false);

  // Submitter withdraws
  const withdrawRes = await withdrawFeatureChangeRequest(req.id, user1Context, {
    changeReqRepo,
  });
  assert.equal(withdrawRes.success, true);
  if (withdrawRes.success) {
    assert.equal(withdrawRes.data.status, "withdrawn");
  }
});
