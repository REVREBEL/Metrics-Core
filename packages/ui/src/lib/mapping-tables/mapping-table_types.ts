export type MappingCoverageStatus = "ready" | "partial" | "needs_review";

export type MappingRowStatus =
  | "mapped"
  | "partial"
  | "unmapped"
  | "inactive"
  | "draft"
  | "needs_review"
  | "deprecated";

export type MappingTableMetadata = {
  key: string;
  displayName: string;
  description: string;
  sourceTableName: string;
  standardTableName: string;
  category: string;
  approximateRowCount: number;
  mappedRowCount: number;
  partialRowCount: number;
  unmappedRowCount: number;
  lastUpdated: string;
  lastRefreshed: string;
  status: MappingCoverageStatus;
  requiredPermission: string;
};

export type MappingTableRow = {
  id: string;
  sourceSystem: string;
  sourceCode: string;
  sourceValue: string;
  standardCode: string;
  standardValue: string;
  standardGroup?: string;
  confidence: number;
  status: MappingRowStatus;
  reviewReason?: string;
  updatedAt: string;
  updatedBy: string;
};

export type MappingDraftSavePayload = {
  tableKey: string;
  rowId: string;
  sourceCode: string;
  sourceSystem: string;
  previousValues: Record<string, unknown>;
  newValues: Record<string, unknown>;
  changeReason: string;
  updatedBy: string;
};

export type MappingDraftSaveResult = {
  ok: boolean;
  draftId?: string;
  savedAt?: string;
  message?: string;
  errors?: Record<string, string[]>;
};

export type MappingPublishPayload = {
  draftId: string;
  tableKey: string;
  rowId: string;
  sourceCode: string;
  sourceSystem: string;
  publishedBy: string;
  changeReason?: string;
};

export type MappingPublishResult = {
  ok: boolean;
  publishedAt?: string;
  message?: string;
  errors?: Record<string, string[]>;
};
