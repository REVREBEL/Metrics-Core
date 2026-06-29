import {
  IconAlertCircle,
  IconAlertTriangle,
  IconArchive,
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconBan,
  IconCircle,
  IconCircleCheck,
  IconCircleOff,
  IconClock,
  IconMessageCircle,
} from "@tabler/icons-react";

export const labels = [
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature" },
  { value: "documentation", label: "Documentation" },
];

// Initiative statuses from spec
export const initiativeStatuses = [
  { value: "discussed", label: "Discussed", icon: IconMessageCircle },
  { value: "planning", label: "Planning", icon: IconClock },
  { value: "active", label: "Active", icon: IconClock },
  { value: "blocked", label: "Blocked", icon: IconBan },
  { value: "at_risk", label: "At Risk", icon: IconAlertTriangle },
  { value: "completed", label: "Complete", icon: IconCircleCheck },
  { value: "canceled", label: "Canceled", icon: IconCircleOff },
  { value: "archived", label: "Archived", icon: IconArchive },
];

// Task statuses from spec
export const taskStatuses = [
  { value: "not_started", label: "Not Started", icon: IconCircle },
  { value: "in_progress", label: "In Progress", icon: IconClock },
  { value: "waiting", label: "Waiting", icon: IconClock },
  { value: "blocked", label: "Blocked", icon: IconAlertCircle },
  { value: "complete", label: "Complete", icon: IconCircleCheck },
  { value: "canceled", label: "Canceled", icon: IconCircleOff },
];

// Legacy statuses for backward compatibility
export const statuses = taskStatuses;

export const priorities = [
  { value: "low", label: "Low", icon: IconArrowDown },
  { value: "medium", label: "Medium", icon: IconArrowRight },
  { value: "high", label: "High", icon: IconArrowUp },
  { value: "critical", label: "Critical", icon: IconAlertTriangle },
];

// Strategy types from spec
export const strategyTypes = [
  { value: "promotion", label: "Promotion" },
  { value: "rate_strategy", label: "Rate Strategy" },
  { value: "sales_push", label: "Sales Push" },
  { value: "distribution_fix", label: "Distribution Fix" },
  { value: "campaign", label: "Campaign" },
  { value: "operational", label: "Operational" },
  { value: "content_update", label: "Content Update" },
  { value: "other", label: "Other" },
];

// Responsible entity types from spec
export const responsibleEntityTypes = [
  { value: "internal_department", label: "Internal Department" },
  { value: "third_party_agency", label: "Third-Party Agency" },
  { value: "vendor", label: "Vendor" },
  { value: "ownership", label: "Ownership" },
  { value: "brand_corporate", label: "Brand / Corporate" },
  { value: "management_company", label: "Management Company" },
  { value: "hotel_team", label: "Hotel Team" },
  { value: "other", label: "Other" },
];

// Departments
export const departments = [
  { value: "revenue_management", label: "Revenue Management" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "operations", label: "Operations" },
  { value: "front_office", label: "Front Office" },
  { value: "reservations", label: "Reservations" },
  { value: "finance", label: "Finance" },
  { value: "digital_agency", label: "Digital Agency" },
  { value: "ownership", label: "Ownership" },
];

// Assignee types from spec
export const assigneeTypes = [
  { value: "app_user", label: "App User" },
  { value: "external_assignee", label: "External Assignee" },
  { value: "department_placeholder", label: "Department Placeholder" },
  { value: "entity_placeholder", label: "Entity Placeholder" },
];
