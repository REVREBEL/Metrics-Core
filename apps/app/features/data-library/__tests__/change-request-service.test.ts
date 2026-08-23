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
  const changeReqRepo = new InMemoryChangeRequestRepository(draftRepo);

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
  const changeReqRepo = new InMemoryChangeRequestRepository(draftRepo);

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

test("change-request full lifecycle transitions draft status back and forth correctly in-memory", async () => {
  const draftRepo = new InMemoryDraftRepository();
  const changeReqRepo = new InMemoryChangeRequestRepository(draftRepo);

  const editorContext = {
    userId: "user-editor-1",
    isAuthenticated: true,
    permissions: ["data_library.change_requests.submit"],
  };

  const reviewerContext = {
    userId: "user-reviewer-1",
    isAuthenticated: true,
    permissions: ["data_library.change_requests.decide"],
  };

  // 1. Save valid draft
  const draft = await draftRepo.saveDraft({
    tableKey: "metrics_core.lkp_segment",
    userId: "user-editor-1",
    rowKey: "code=T1",
    originalPayload: { code: "T1", name: "Original" },
    draftPayload: { code: "T1", name: "New Name" },
  });
  assert.equal(draft.status, "draft");

  // 2. Submit draft
  const submitRes = await createFeatureChangeRequest(
    {
      tableKey: "metrics_core.lkp_segment",
      draftIds: [draft.id],
      title: "Testing Lifecycle Transitions",
    },
    editorContext,
    { changeReqRepo, draftRepo },
  );
  assert.equal(submitRes.success, true);

  // 3. Assert draft status is submitted
  const listDraftsAfterSubmit = await draftRepo.listDrafts(
    "metrics_core.lkp_segment",
    "user-editor-1",
  );
  // listDrafts only returns drafts in status "draft"
  assert.equal(listDraftsAfterSubmit.length, 0);

  // 4. Attempt second active submission on the same draft (draft is already submitted)
  const duplicateSubmitRes = await createFeatureChangeRequest(
    {
      tableKey: "metrics_core.lkp_segment",
      draftIds: [draft.id],
      title: "Duplicate submission",
    },
    editorContext,
    { changeReqRepo, draftRepo },
  );
  // 5. Assert duplicate submission fails
  assert.equal(duplicateSubmitRes.success, false);

  if (submitRes.success) {
    const reqId = submitRes.data.id;

    // 6. Reject request
    const rejectRes = await reviewFeatureChangeRequest(
      {
        changeRequestId: reqId,
        decision: "reject",
        notes: "Please revise title.",
      },
      reviewerContext,
      { changeReqRepo },
    );
    assert.equal(rejectRes.success, true);

    // 7. Assert draft status returns to draft
    const listDraftsAfterReject = await draftRepo.listDrafts(
      "metrics_core.lkp_segment",
      "user-editor-1",
    );
    assert.equal(listDraftsAfterReject.length, 1);
    assert.equal(listDraftsAfterReject[0].status, "draft");

    // 8. Resubmit draft
    const resubmitRes = await createFeatureChangeRequest(
      {
        tableKey: "metrics_core.lkp_segment",
        draftIds: [draft.id],
        title: "Testing Lifecycle Transitions - Resubmitted",
      },
      editorContext,
      { changeReqRepo, draftRepo },
    );
    assert.equal(resubmitRes.success, true);

    if (resubmitRes.success) {
      const newReqId = resubmitRes.data.id;

      // 9. Approve request
      const approveRes = await reviewFeatureChangeRequest(
        { changeRequestId: newReqId, decision: "approve" },
        reviewerContext,
        { changeReqRepo },
      );
      assert.equal(approveRes.success, true);

      // 10. Assert draft status is approved
      const listDraftsAfterApprove = await draftRepo.listDrafts(
        "metrics_core.lkp_segment",
        "user-editor-1",
      );
      assert.equal(listDraftsAfterApprove.length, 0);

      // 11. Assert approved draft cannot be submitted again
      const approvedSubmitRes = await createFeatureChangeRequest(
        {
          tableKey: "metrics_core.lkp_segment",
          draftIds: [draft.id],
          title: "Submit approved draft",
        },
        editorContext,
        { changeReqRepo, draftRepo },
      );
      assert.equal(approvedSubmitRes.success, false);
    }
  }
});

test("withdrawing change request resets draft status to draft so it can be resubmitted", async () => {
  const draftRepo = new InMemoryDraftRepository();
  const changeReqRepo = new InMemoryChangeRequestRepository(draftRepo);

  const editorContext = {
    userId: "user-editor-1",
    isAuthenticated: true,
    permissions: ["data_library.change_requests.submit"],
  };

  const draft = await draftRepo.saveDraft({
    tableKey: "metrics_core.lkp_segment",
    userId: "user-editor-1",
    rowKey: "code=T2",
    originalPayload: { code: "T2", name: "Org" },
    draftPayload: { code: "T2", name: "Draft Name" },
  });

  // Submit
  const submitRes = await createFeatureChangeRequest(
    {
      tableKey: "metrics_core.lkp_segment",
      draftIds: [draft.id],
      title: "Title for withdrawal testing",
    },
    editorContext,
    { changeReqRepo, draftRepo },
  );
  assert.equal(submitRes.success, true);

  if (submitRes.success) {
    const reqId = submitRes.data.id;

    // Withdraw
    const withdrawRes = await withdrawFeatureChangeRequest(
      reqId,
      editorContext,
      { changeReqRepo },
    );
    assert.equal(withdrawRes.success, true);

    // Draft should return to draft status
    const listDrafts = await draftRepo.listDrafts(
      "metrics_core.lkp_segment",
      "user-editor-1",
    );
    assert.equal(listDrafts.length, 1);
    assert.equal(listDrafts[0].status, "draft");

    // Can be resubmitted
    const resubmitRes = await createFeatureChangeRequest(
      {
        tableKey: "metrics_core.lkp_segment",
        draftIds: [draft.id],
        title: "Title for withdrawal testing - Resubmitted",
      },
      editorContext,
      { changeReqRepo, draftRepo },
    );
    assert.equal(resubmitRes.success, true);
  }
});

test("withdrawFeatureChangeRequest and getFeatureChangeRequest strictly verify permissions before ownership", async () => {
  const draftRepo = new InMemoryDraftRepository();
  const changeReqRepo = new InMemoryChangeRequestRepository(draftRepo);

  // Draft and Request created by user-1
  const draft = await draftRepo.saveDraft({
    tableKey: "metrics_core.lkp_segment",
    userId: "user-1",
    rowKey: "code=T3",
    originalPayload: null,
    draftPayload: { code: "T3" },
  });

  const user1Context = {
    userId: "user-1",
    isAuthenticated: true,
    permissions: ["data_library.change_requests.submit"],
  };

  const submitRes = await createFeatureChangeRequest(
    {
      tableKey: "metrics_core.lkp_segment",
      draftIds: [draft.id],
      title: "User 1 Request for Permission Checks",
    },
    user1Context,
    { changeReqRepo, draftRepo },
  );
  assert.equal(submitRes.success, true);

  if (submitRes.success) {
    const reqId = submitRes.data.id;

    // Revoked user (missing all data_library.change_requests permissions)
    const revokedContext = {
      userId: "user-1",
      isAuthenticated: true,
      permissions: [] as string[],
    };

    // Direct Get must FAIL with FORBIDDEN for the revoked user even though they are the original submitter
    const getRes = await getFeatureChangeRequest(reqId, revokedContext, {
      changeReqRepo,
    });
    assert.equal(getRes.success, false);
    if (!getRes.success) {
      assert.equal(getRes.error.code, "FORBIDDEN");
    }

    // Direct Withdraw must FAIL with FORBIDDEN for the revoked user even though they are the original submitter
    const withdrawRes = await withdrawFeatureChangeRequest(
      reqId,
      revokedContext,
      {
        changeReqRepo,
      },
    );
    assert.equal(withdrawRes.success, false);
    if (!withdrawRes.success) {
      assert.equal(withdrawRes.error.code, "FORBIDDEN");
    }
  }
});

test("DatabaseConfigurationError is mapped to structured INTERNAL_ERROR response when DATABASE_URL is missing", async () => {
  const originalEnv = process.env.DATABASE_URL;
  delete process.env.DATABASE_URL;

  const authContext = {
    userId: "user-editor-1",
    isAuthenticated: true,
    permissions: [
      "data_library.change_requests.submit",
      "data_library.change_requests.view_own",
      "data_library.change_requests.review",
    ],
  };

  try {
    // Calling createFeatureChangeRequest without injected repo fallback
    const createRes = await createFeatureChangeRequest(
      {
        tableKey: "metrics_core.lkp_segment",
        draftIds: ["some-draft"],
        title: "Testing Missing DB URL",
      },
      authContext,
    );
    assert.equal(createRes.success, false);
    if (!createRes.success) {
      assert.equal(createRes.error.code, "INTERNAL_ERROR");
      assert.match(createRes.error.message, /DATABASE_URL/i);
    }

    // Calling listFeatureChangeRequests
    const listRes = await listFeatureChangeRequests({}, authContext);
    assert.equal(listRes.success, false);
    if (!listRes.success) {
      assert.equal(listRes.error.code, "INTERNAL_ERROR");
      assert.match(listRes.error.message, /DATABASE_URL/i);
    }

    // Calling getFeatureChangeRequest
    const getRes = await getFeatureChangeRequest("some-id", authContext);
    assert.equal(getRes.success, false);
    if (!getRes.success) {
      assert.equal(getRes.error.code, "INTERNAL_ERROR");
      assert.match(getRes.error.message, /DATABASE_URL/i);
    }

    // Calling withdrawFeatureChangeRequest
    const withdrawRes = await withdrawFeatureChangeRequest(
      "some-id",
      authContext,
    );
    assert.equal(withdrawRes.success, false);
    if (!withdrawRes.success) {
      assert.equal(withdrawRes.error.code, "INTERNAL_ERROR");
      assert.match(withdrawRes.error.message, /DATABASE_URL/i);
    }
  } finally {
    process.env.DATABASE_URL = originalEnv;
  }
});
