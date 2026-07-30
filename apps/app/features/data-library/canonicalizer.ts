export function normalizeKeyValue(val: unknown): string {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val.trim();
  return String(val);
}

export function canonicalizeRowKey(
  primaryKeyFields: string[],
  row: Record<string, unknown>,
): string {
  const entries = primaryKeyFields.map((key) => [
    key,
    normalizeKeyValue(row[key]),
  ]);
  return JSON.stringify(Object.fromEntries(entries));
}
