"use server";

import { isChangeRequestStatus } from "@repo/db";
import type {
  CreateChangeRequestInput,
  ReviewChangeRequestInput,
} from "./change-request-service";
import {
  createFeatureChangeRequest,
  getFeatureChangeRequest,
  listFeatureChangeRequests,
  reviewFeatureChangeRequest,
  withdrawFeatureChangeRequest,
} from "./change-request-service";
import { getCurrentWorkspaceSession } from "./session";

export async function createChangeRequestAction(
  input: CreateChangeRequestInput,
) {
  const authContext = await getCurrentWorkspaceSession();
  return createFeatureChangeRequest(input, authContext);
}

export async function listChangeRequestsAction(
  tableKey?: string,
  status?: string,
) {
  if (status !== undefined && !isChangeRequestStatus(status)) {
    return {
      success: false,
      error: {
        code: "INVALID_REQUEST",
        message: "Unsupported change-request status.",
      },
    };
  }

  const authContext = await getCurrentWorkspaceSession();
  return listFeatureChangeRequests(
    {
      tableKey,
      status,
    },
    authContext,
  );
}

export async function getChangeRequestAction(id: string) {
  const authContext = await getCurrentWorkspaceSession();
  return getFeatureChangeRequest(id, authContext);
}

export async function reviewChangeRequestAction(
  input: ReviewChangeRequestInput,
) {
  const authContext = await getCurrentWorkspaceSession();
  return reviewFeatureChangeRequest(input, authContext);
}

export async function withdrawChangeRequestAction(changeRequestId: string) {
  const authContext = await getCurrentWorkspaceSession();
  return withdrawFeatureChangeRequest(changeRequestId, authContext);
}
