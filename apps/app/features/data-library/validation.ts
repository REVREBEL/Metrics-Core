import type { DataLibraryTableDefinition } from "./registry";

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  normalizedChanges: Record<string, unknown>;
}

export function validateRowDraft(
  tableDef: DataLibraryTableDefinition,
  proposedChanges: Record<string, unknown>,
  originalValues: Record<string, unknown> | null,
): ValidationResult {
  const errors: Record<string, string> = {};
  const normalizedChanges: Record<string, unknown> = {};

  const colMap = new Map(tableDef.columns.map((c) => [c.key, c]));

  // 1. Primary key immutability check
  for (const pkField of tableDef.primaryKey) {
    if (pkField in proposedChanges) {
      const origVal = originalValues ? originalValues[pkField] : undefined;
      const newVal = proposedChanges[pkField];
      if (
        origVal !== undefined &&
        String(newVal).trim() !== String(origVal).trim()
      ) {
        errors[pkField] =
          `Primary key field '${pkField}' is immutable and cannot be changed.`;
      }
    }
  }

  // 2. Column allowlist and editability check
  for (const [key, val] of Object.entries(proposedChanges)) {
    const colDef = colMap.get(key);
    if (!colDef) {
      errors[key] =
        `Field '${key}' is not a valid column for table '${tableDef.key}'.`;
      continue;
    }

    if (!colDef.editable) {
      const origVal = originalValues ? originalValues[key] : undefined;
      if (origVal !== undefined && String(val) !== String(origVal)) {
        errors[key] =
          `Field '${colDef.label}' (${key}) is read-only and cannot be modified.`;
      }
      continue;
    }

    // Normalization & Type Checking
    if (val === null || val === undefined) {
      if (colDef.required) {
        errors[key] = `${colDef.label} is required.`;
      } else {
        normalizedChanges[key] = null;
      }
      continue;
    }

    if (colDef.type === "string") {
      const strVal = String(val).trim();
      if (colDef.required && !strVal) {
        errors[key] = `${colDef.label} is required.`;
      } else {
        normalizedChanges[key] = strVal;
      }
    } else if (colDef.type === "integer") {
      const num = Number(val);
      if (Number.isNaN(num) || !Number.isInteger(num)) {
        errors[key] = `${colDef.label} must be a valid integer.`;
      } else {
        normalizedChanges[key] = num;
      }
    } else if (colDef.type === "boolean") {
      normalizedChanges[key] = Boolean(val);
    } else if (colDef.type === "date") {
      const strVal = String(val).trim();
      if (strVal && Number.isNaN(Date.parse(strVal))) {
        errors[key] = `${colDef.label} must be a valid date.`;
      } else {
        normalizedChanges[key] = strVal || null;
      }
    } else {
      normalizedChanges[key] = val;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    normalizedChanges,
  };
}
