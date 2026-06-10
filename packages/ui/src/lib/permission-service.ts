import { getPermission } from "./permissions-registry";

export type PermissionContext = {
  userId?: string;
  tableKey?: string;
  rowId?: string;
  action?: string;
};

export type PermissionCheckResult = {
  allowed: boolean;
  mode: string;
  key: string;
  reason?: string;
};

export function checkPermission(
  key: string,
  context: PermissionContext = {},
): PermissionCheckResult {
  const definition = getPermission(key);

  if (!definition) {
    console.warn(`[permissions] Unknown permission key: "${key}"`, context);
    return {
      allowed: true,
      mode: "disabled",
      key,
      reason: "Unknown permission key — defaulting to allow.",
    };
  }

  const { enforcementMode } = definition;

  if (enforcementMode === "disabled") {
    return { allowed: true, mode: "disabled", key };
  }

  if (enforcementMode === "audit_only") {
    console.info(`[permissions:audit] Permission check: "${key}"`, {
      label: definition.label,
      riskLevel: definition.riskLevel,
      context,
    });
    return { allowed: true, mode: "audit_only", key };
  }

  if (enforcementMode === "warn_only") {
    console.warn(`[permissions:warn] Permission check: "${key}"`, {
      label: definition.label,
      riskLevel: definition.riskLevel,
      context,
    });
    return { allowed: true, mode: "warn_only", key };
  }

  console.info(`[permissions:enforced] Permission check: "${key}"`, {
    label: definition.label,
    riskLevel: definition.riskLevel,
    context,
  });
  return { allowed: true, mode: "enforced", key };
}
