import type { ExternalAssignee } from "./data/schema";
import { externalAssignees as seedAssignees } from "./data/tasks";

export type ExternalAssigneeRow = {
  id: string;
  hotelId?: string | null;
  propertyId?: string | null;
  name: string;
  entityType: ExternalAssignee["entityType"];
  contactEmail?: string | null;
  createdAt: string;
};

const assigneesStore = new Map<string, ExternalAssigneeRow[]>();

for (const assignee of seedAssignees) {
  const scope = assignee.propertyId ?? assignee.hotelId ?? "default";
  const scopedRows = assigneesStore.get(scope) ?? [];
  scopedRows.push({
    id: assignee.id,
    hotelId: assignee.hotelId,
    propertyId: assignee.propertyId,
    name: assignee.name,
    entityType: assignee.entityType,
    contactEmail: assignee.contactEmail ?? null,
    createdAt: assignee.createdAt,
  });
  assigneesStore.set(scope, scopedRows);
}

export function rowToAssignee(row: ExternalAssigneeRow): ExternalAssignee {
  return {
    id: row.id,
    hotelId: row.hotelId ?? undefined,
    propertyId: row.propertyId ?? undefined,
    name: row.name,
    entityType: row.entityType,
    contactEmail: row.contactEmail ?? undefined,
    createdAt: row.createdAt,
  };
}

export async function listExternalAssigneesAction(
  hotelId: string,
): Promise<ExternalAssigneeRow[]> {
  return assigneesStore.get(hotelId) ?? [];
}

export async function createExternalAssigneeAction(input: {
  hotelId: string;
  name: string;
  entityType: ExternalAssignee["entityType"];
  contactEmail?: string;
}): Promise<{ ok: boolean; message: string; data?: ExternalAssigneeRow }> {
  const now = new Date().toISOString();
  const newRow: ExternalAssigneeRow = {
    id: `ext-${Date.now()}`,
    hotelId: input.hotelId,
    name: input.name,
    entityType: input.entityType,
    contactEmail: input.contactEmail ?? null,
    createdAt: now,
  };

  const scopedRows = assigneesStore.get(input.hotelId) ?? [];
  assigneesStore.set(input.hotelId, [...scopedRows, newRow]);

  return { ok: true, message: "External assignee created.", data: newRow };
}

export async function updateExternalAssigneeAction(input: {
  id: string;
  hotelId: string;
  name: string;
  entityType: ExternalAssignee["entityType"];
  contactEmail?: string;
}): Promise<{ ok: boolean; message: string; data?: ExternalAssigneeRow }> {
  const scopedRows = assigneesStore.get(input.hotelId) ?? [];
  const index = scopedRows.findIndex((row) => row.id === input.id);

  if (index === -1) {
    return { ok: false, message: "External assignee not found." };
  }

  const updatedRow: ExternalAssigneeRow = {
    ...scopedRows[index],
    name: input.name,
    entityType: input.entityType,
    contactEmail: input.contactEmail ?? null,
  };

  const nextRows = [...scopedRows];
  nextRows[index] = updatedRow;
  assigneesStore.set(input.hotelId, nextRows);

  return { ok: true, message: "External assignee updated.", data: updatedRow };
}

export async function deleteExternalAssigneeAction(
  id: string,
  hotelId: string,
): Promise<void> {
  const scopedRows = assigneesStore.get(hotelId) ?? [];
  assigneesStore.set(
    hotelId,
    scopedRows.filter((row) => row.id !== id),
  );
}
