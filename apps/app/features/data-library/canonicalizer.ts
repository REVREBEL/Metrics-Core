export function normalizeKeyValue(val: unknown): string {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val.trim();
  return String(val);
}

export function canonicalizeRowKey(
  primaryKeyFields: string[],
  row: Record<string, unknown>,
): string {
  const obj: Record<string, string> = {};
  for (let i = 0; i < primaryKeyFields.length; i++) {
    const key = primaryKeyFields[i];
    obj[key] = normalizeKeyValue(row[key]);
  }
  return JSON.stringify(obj);
}
