export type ChangeRequestStatus =
  | "submitted"
  | "approved"
  | "rejected"
  | "withdrawn";

export interface ChangeRequestItemRecord {
  id: string;
  changeRequestId: string;
  draftEditId: string;
  rowKey: string;
  originalPayload: Record<string, unknown> | null;
  submittedPayload: Record<string, unknown>;
  validationSnapshot: Record<string, unknown> | null;
  createdAt: Date;
}

export interface ChangeRequestRecord {
  id: string;
  tableKey: string;
  title: string;
  description: string | null;
  submitterId: string;
  reviewerId: string | null;
  status: ChangeRequestStatus;
  reviewNotes: string | null;
  submittedAt: Date;
  reviewedAt: Date | null;
  withdrawnAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChangeRequestWithItems extends ChangeRequestRecord {
  items: ChangeRequestItemRecord[];
}

export interface CreateChangeRequestParams {
  tableKey: string;
  title: string;
  description?: string;
  submitterId: string;
  drafts: Array<{
    draftEditId: string;
    rowKey: string;
    originalPayload: Record<string, unknown> | null;
    draftPayload: Record<string, unknown>;
    validationSnapshot?: Record<string, unknown>;
  }>;
}

export interface ReviewChangeRequestParams {
  changeRequestId: string;
  reviewerId: string;
  decision: "approve" | "reject";
  reviewNotes?: string;
}

export interface WithdrawChangeRequestParams {
  changeRequestId: string;
  actorId: string;
}

export interface ChangeRequestFilters {
  status?: ChangeRequestStatus;
  tableKey?: string;
  submitterId?: string;
}

export interface ChangeRequestRepository {
  createChangeRequestWithAudit(
    params: CreateChangeRequestParams,
  ): Promise<ChangeRequestWithItems>;
  listChangeRequests(
    filters?: ChangeRequestFilters,
  ): Promise<ChangeRequestRecord[]>;
  getChangeRequest(id: string): Promise<ChangeRequestWithItems | null>;
  reviewChangeRequestWithAudit(
    params: ReviewChangeRequestParams,
  ): Promise<ChangeRequestWithItems>;
  withdrawChangeRequestWithAudit(
    params: WithdrawChangeRequestParams,
  ): Promise<ChangeRequestWithItems>;
}
