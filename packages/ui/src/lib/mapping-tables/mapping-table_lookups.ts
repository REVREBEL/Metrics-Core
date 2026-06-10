import { getLookupTableRows } from "@/lib/lookup-tables/service";

export type LookupOption = {
  value: string;
  label: string;
  group?: string;
  isDeprecated: boolean;
};

const MAPPING_STATUS_OPTIONS: LookupOption[] = [
  { value: "mapped", label: "Mapped", isDeprecated: false },
  { value: "draft", label: "Draft", isDeprecated: false },
  { value: "partial", label: "Partial", isDeprecated: false },
  { value: "needs_review", label: "Needs Review", isDeprecated: false },
  { value: "unmapped", label: "Unmapped", isDeprecated: false },
  { value: "deprecated", label: "Deprecated", isDeprecated: false },
  { value: "inactive", label: "Inactive", isDeprecated: false },
];

export async function resolveLookupOptions(
  lookupSource: string | undefined,
): Promise<LookupOption[]> {
  if (!lookupSource) return [];

  if (lookupSource === "_mapping_status") {
    return MAPPING_STATUS_OPTIONS;
  }

  try {
    const rows = await getLookupTableRows(lookupSource);
    return rows.map((row) => ({
      value: row.rawCode,
      label: row.rawName || row.rawCode,
      group: row.mappedGroup,
      isDeprecated: !row.isActive,
    }));
  } catch {
    return [];
  }
}

export async function getActiveOptions(
  lookupSource: string,
): Promise<LookupOption[]> {
  const all = await resolveLookupOptions(lookupSource);
  return all.filter((opt) => !opt.isDeprecated);
}

export async function validateDropdownValue(
  value: string,
  lookupSource: string,
): Promise<boolean> {
  if (!value) return false;
  const active = await getActiveOptions(lookupSource);
  return active.some((opt) => opt.value === value);
}
