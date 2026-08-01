import type {
  ChangeRequestFilters,
  ChangeRequestRecord,
  ChangeRequestRepository,
  ChangeRequestWithItems,
  DraftRepository,
} from "@repo/db";
import {
  DatabaseConfigurationError,
  PostgresChangeRequestRepository,
} from "@repo/db";
import { getDataLibraryTableDefinition } from "./registry";
import type { VerifiedWorkspaceSession } from "./session";
import { validateRowDraft } from "./validation";

export interface ChangeRequestServiceError {
  code:
    | "UNAUTHENTICATED"
    | "FORBIDDEN"
    | "INVALID_REQUEST"
    | "VALIDATION_FAILED"
    | "NOT_FOUND"
    | "INTERNAL_ERROR";
  message: string;
  details?: Record<string, unknown>;
  retryable?: boolean;
}

export type ChangeRequestServiceResult<T> =
  | { success: true; data: T }
  | { success: false; error: ChangeRequestServiceError };

export interface CreateChangeRequestInput {
  tableKey: string;
  draftIds: string[];
  title: string;
  description?: string;
}

export interface ReviewChangeRequestInput {
  changeRequestId: string;
  decision: "approve" | "reject";
  notes?: string;
}

function resolveChangeReqRepository(
  injected?: ChangeRequestRepository,
): ChangeRequestRepository {
  if (injected) return injected;
  if (!process.env.DATABASE_URL) {
    throw new DatabaseConfigurationError(
      "DATABASE_URL is required for change-request persistence.",
    );
  }
  return new PostgresChangeRequestRepository();
}

function mapChangeRequestError(
  err: unknown,
  fallbackMessage: string,
): { success: false; error: ChangeRequestServiceError } {
  if (err instanceof DatabaseConfigurationError) {
    return {
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: err.message || "Database configuration is missing.",
        retryable: false,
      },
    };
  }
  return {
    success: false,
    error: {
      code: "INTERNAL_ERROR",
      message: err instanceof Error ? err.message : fallbackMessage,
    },
  };
}

export async function createFeatureChangeRequest(
  input: CreateChangeRequestInput,
  authContext: VerifiedWorkspaceSession,
  deps?: {
    changeReqRepo?: ChangeRequestRepository;
    draftRepo?: DraftRepository;
  },
): Promise<ChangeRequestServiceResult<ChangeRequestWithItems>> {
  // 1. Auth check
  if (!authContext.isAuthenticated || !authContext.userId) {
    return {
      success: false,
      error: {
        code: "UNAUTHENTICATED",
        message: "You must be signed in to submit a change request.",
      },
    };
  }

  // 2. Permission check
  const permissions = authContext.permissions ?? [];
  const canSubmit =
    permissions.includes("data_library.change_requests.submit") ||
    permissions.includes("data_library.change_requests.admin");

  if (!canSubmit) {
    return {
      success: false,
      error: {
        code: "FORBIDDEN",
        message: "You do not have permission to submit change requests.",
      },
    };
  }

  // 3. Title & Description length bounds validations
  const trimmedTitle = input.title.trim();
  if (trimmedTitle.length < 3 || trimmedTitle.length > 100) {
    return {
      success: false,
      error: {
        code: "INVALID_REQUEST",
        message: "Title must be between 3 and 100 characters.",
      },
    };
  }

  const trimmedDescription = input.description?.trim();
  if (trimmedDescription && trimmedDescription.length > 500) {
    return {
      success: false,
      error: {
        code: "INVALID_REQUEST",
        message: "Description cannot exceed 500 characters.",
      },
    };
  }

  if (!input.draftIds || input.draftIds.length === 0) {
    return {
      success: false,
      error: {
        code: "INVALID_REQUEST",
        message: "At least one draft edit must be selected.",
      },
    };
  }

  // 4. Registry allowlist check
  const tableDef = getDataLibraryTableDefinition(input.tableKey);
  if (!tableDef) {
    return {
      success: false,
      error: {
        code: "INVALID_REQUEST",
        message: `Table '${input.tableKey}' is not registered in the Data Library allowlist.`,
      },
    };
  }

  // 5. Fetch submitter's saved drafts and re-validate every draft
  const draftRepo = deps?.draftRepo;
  let savedDrafts = [];
  try {
    if (draftRepo) {
      savedDrafts = await draftRepo.listDrafts(
        input.tableKey,
        authContext.userId,
      );
    } else {
      const { PostgresDraftRepository } = await import("@repo/db");
      const repo = new PostgresDraftRepository();
      savedDrafts = await repo.listDrafts(input.tableKey, authContext.userId);
    }
  } catch (err: unknown) {
    return mapChangeRequestError(err, "Failed to retrieve draft edits.");
  }

  const selectedDrafts = savedDrafts.filter((d) =>
    input.draftIds.includes(d.id),
  );

  if (selectedDrafts.length !== input.draftIds.length) {
    return {
      success: false,
      error: {
        code: "INVALID_REQUEST",
        message:
          "One or more selected draft IDs do not exist, belong to another table/user, or are already submitted.",
      },
    };
  }

  // Re-validate drafts prior to submission
  const validationDetails: Record<string, Record<string, string>> = {};
  const draftsForRepo = [];

  for (const draft of selectedDrafts) {
    const validationResult = validateRowDraft(
      tableDef,
      draft.draftPayload,
      draft.originalPayload,
    );

    if (!validationResult.valid) {
      validationDetails[draft.rowKey] = validationResult.errors;
    }

    draftsForRepo.push({
      draftEditId: draft.id,
      rowKey: draft.rowKey,
      originalPayload: draft.originalPayload,
      draftPayload: draft.draftPayload,
      validationSnapshot: {
        valid: validationResult.valid,
        errors: validationResult.errors,
        validatedAt: new Date().toISOString(),
      },
    });
  }

  if (Object.keys(validationDetails).length > 0) {
    return {
      success: false,
      error: {
        code: "VALIDATION_FAILED",
        message: "Draft validation failed prior to submission.",
        details: validationDetails as unknown as Record<string, unknown>,
      },
    };
  }

  // 6. Create change request via repository resolved within try context
  try {
    const changeReqRepo = resolveChangeReqRepository(deps?.changeReqRepo);
    const record = await changeReqRepo.createChangeRequestWithAudit({
      tableKey: input.tableKey,
      title: trimmedTitle,
      description: trimmedDescription,
      submitterId: authContext.userId,
      drafts: draftsForRepo,
    });

    return { success: true, data: record };
  } catch (err: unknown) {
    return mapChangeRequestError(err, "Failed to create change request.");
  }
}

export async function listFeatureChangeRequests(
  filters: ChangeRequestFilters = {},
  authContext: VerifiedWorkspaceSession,
  deps?: { changeReqRepo?: ChangeRequestRepository },
): Promise<ChangeRequestServiceResult<ChangeRequestRecord[]>> {
  if (!authContext.isAuthenticated || !authContext.userId) {
    return {
      success: false,
      error: {
        code: "UNAUTHENTICATED",
        message: "Authentication required to view change requests.",
      },
    };
  }

  const permissions = authContext.permissions ?? [];
  const isAdmin = permissions.includes("data_library.change_requests.admin");
  const canReview =
    permissions.includes("data_library.change_requests.review") ||
    permissions.includes("data_library.change_requests.decide");
  const canViewOwn =
    permissions.includes("data_library.change_requests.view_own") ||
    permissions.includes("data_library.change_requests.submit");

  if (!isAdmin && !canReview && !canViewOwn) {
    return {
      success: false,
      error: {
        code: "FORBIDDEN",
        message: "You do not have permission to view change requests.",
      },
    };
  }

  const effectiveFilters: ChangeRequestFilters = { ...filters };

  // Viewers without review/admin permissions are strictly scoped to their own requests
  if (!isAdmin && !canReview) {
    effectiveFilters.submitterId = authContext.userId;
  }

  try {
    const repo = resolveChangeReqRepository(deps?.changeReqRepo);
    const list = await repo.listChangeRequests(effectiveFilters);
    return { success: true, data: list };
  } catch (err: unknown) {
    return mapChangeRequestError(err, "Failed to list change requests.");
  }
}

export async function getFeatureChangeRequest(
  id: string,
  authContext: VerifiedWorkspaceSession,
  deps?: { changeReqRepo?: ChangeRequestRepository },
): Promise<ChangeRequestServiceResult<ChangeRequestWithItems>> {
  if (!authContext.isAuthenticated || !authContext.userId) {
    return {
      success: false,
      error: {
        code: "UNAUTHENTICATED",
        message: "Authentication required to view change request detail.",
      },
    };
  }

  try {
    const repo = resolveChangeReqRepository(deps?.changeReqRepo);
    const req = await repo.getChangeRequest(id);
    if (!req) {
      return {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: `Change request '${id}' was not found.`,
        },
      };
    }

    const permissions = authContext.permissions ?? [];
    const canViewOwn =
      permissions.includes("data_library.change_requests.view_own") ||
      permissions.includes("data_library.change_requests.submit");
    const canReview =
      permissions.includes("data_library.change_requests.review") ||
      permissions.includes("data_library.change_requests.decide");
    const isAdmin = permissions.includes("data_library.change_requests.admin");

    // Explicit permission enforcement before ownership checks
    if (!isAdmin && !canReview && !canViewOwn) {
      return {
        success: false,
        error: {
          code: "FORBIDDEN",
          message: "You do not have permission to view change requests.",
        },
      };
    }

    if (!isAdmin && !canReview && req.submitterId !== authContext.userId) {
      return {
        success: false,
        error: {
          code: "FORBIDDEN",
          message: "You do not have permission to view this change request.",
        },
      };
    }

    return { success: true, data: req };
  } catch (err: unknown) {
    return mapChangeRequestError(err, "Failed to get change request.");
  }
}

export async function reviewFeatureChangeRequest(
  input: ReviewChangeRequestInput,
  authContext: VerifiedWorkspaceSession,
  deps?: { changeReqRepo?: ChangeRequestRepository },
): Promise<ChangeRequestServiceResult<ChangeRequestWithItems>> {
  if (!authContext.isAuthenticated || !authContext.userId) {
    return {
      success: false,
      error: {
        code: "UNAUTHENTICATED",
        message: "Authentication required to review change requests.",
      },
    };
  }

  const permissions = authContext.permissions ?? [];
  const canDecide =
    permissions.includes("data_library.change_requests.decide") ||
    permissions.includes("data_library.change_requests.admin");

  if (!canDecide) {
    return {
      success: false,
      error: {
        code: "FORBIDDEN",
        message:
          "You do not have permission to approve or reject change requests.",
      },
    };
  }

  const trimmedNotes = input.notes?.trim() ?? "";
  if (input.decision === "reject" && trimmedNotes.length < 3) {
    return {
      success: false,
      error: {
        code: "INVALID_REQUEST",
        message:
          "Rejection notes are required and must be at least 3 characters.",
      },
    };
  }

  if (trimmedNotes.length > 2000) {
    return {
      success: false,
      error: {
        code: "INVALID_REQUEST",
        message: "Review notes cannot exceed 2,000 characters.",
      },
    };
  }

  try {
    const repo = resolveChangeReqRepository(deps?.changeReqRepo);
    const record = await repo.reviewChangeRequestWithAudit({
      changeRequestId: input.changeRequestId,
      reviewerId: authContext.userId,
      decision: input.decision,
      reviewNotes: trimmedNotes || undefined,
    });

    return { success: true, data: record };
  } catch (err: unknown) {
    const msg =
      err instanceof Error ? err.message : "Failed to review change request.";
    const isForbidden = msg.includes("Self-review prohibited");
    if (err instanceof DatabaseConfigurationError) {
      return mapChangeRequestError(err, "Database error during review.");
    }
    return {
      success: false,
      error: {
        code: isForbidden ? "FORBIDDEN" : "INVALID_REQUEST",
        message: msg,
      },
    };
  }
}

export async function withdrawFeatureChangeRequest(
  changeRequestId: string,
  authContext: VerifiedWorkspaceSession,
  deps?: { changeReqRepo?: ChangeRequestRepository },
): Promise<ChangeRequestServiceResult<ChangeRequestWithItems>> {
  if (!authContext.isAuthenticated || !authContext.userId) {
    return {
      success: false,
      error: {
        code: "UNAUTHENTICATED",
        message: "Authentication required to withdraw a change request.",
      },
    };
  }

  try {
    const repo = resolveChangeReqRepository(deps?.changeReqRepo);
    const existing = await repo.getChangeRequest(changeRequestId);
    if (!existing) {
      return {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: `Change request '${changeRequestId}' not found.`,
        },
      };
    }

    const permissions = authContext.permissions ?? [];
    const isAdmin = permissions.includes("data_library.change_requests.admin");
    const canWithdrawOwn =
      permissions.includes("data_library.change_requests.submit") ||
      permissions.includes("data_library.change_requests.view_own");

    // Verify workflow permission capability prior to scoping check
    if (!isAdmin && !canWithdrawOwn) {
      return {
        success: false,
        error: {
          code: "FORBIDDEN",
          message: "You do not have permission to withdraw change requests.",
        },
      };
    }

    if (!isAdmin && existing.submitterId !== authContext.userId) {
      return {
        success: false,
        error: {
          code: "FORBIDDEN",
          message: "You can only withdraw your own change requests.",
        },
      };
    }

    const record = await repo.withdrawChangeRequestWithAudit({
      changeRequestId,
      actorId: authContext.userId,
    });

    return { success: true, data: record };
  } catch (err: unknown) {
    return mapChangeRequestError(err, "Failed to withdraw change request.");
  }
}
