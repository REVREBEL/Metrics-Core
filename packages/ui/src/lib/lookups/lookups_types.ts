export type LookupTableStatus = "ready" | "draft" | "needs_review";

export type LookupTableMetadata = {
  key: string;
  displayName: string;
  description: string;
  approximateRowCount: number;
  lastUpdated: string;
  lastRefreshed: string;
  status: LookupTableStatus;
};

export type LookupTableRow = {
  id: string;
  sourceSystem: string;
  rawCode: string;
  rawName: string;
  mappedValue: string;
  mappedGroup?: string;
  isActive: boolean;
  notes?: string;
  updatedAt: string;
  updatedBy: string;
};

export type LookupTableChange = {
  id: string;
  mappedValue?: string;
  mappedGroup?: string;
  isActive?: boolean;
  notes?: string;
  lastKnownUpdatedAt?: string;
  isDeleted?: boolean;
};

export type SaveLookupTableChangesPayload = {
  tableKey: string;
  changes: LookupTableChange[];
};

export type SaveLookupTableChangesResult = {
  ok: boolean;
  savedAt?: string;
  message?: string;
  errors?: Record<string, string[]>;
};
