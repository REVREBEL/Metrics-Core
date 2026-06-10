import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconCircle,
  IconCircleCheck,
  IconCircleX,
  IconClockHour1Filled,
  IconHelpCircleFilled,
} from "@tabler/icons-react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const taskStatuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: IconHelpCircleFilled,
  },
  {
    value: "todo",
    label: "Todo",
    icon: IconCircle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: IconClockHour1Filled,
  },
  {
    value: "done",
    label: "Done",
    icon: IconCircleCheck,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: IconCircleX,
  },
];

export const initiativeStatuses = [
  {
    value: "discussed",
    label: "Discussed",
    icon: IconHelpCircleFilled,
  },
  {
    value: "planning",
    label: "Planning",
    icon: IconClockHour1Filled,
  },
  {
    value: "active",
    label: "Active",
    icon: IconArrowRight,
  },
  {
    value: "blocked",
    label: "Blocked",
    icon: IconCircleX,
  },
  {
    value: "at_risk",
    label: "At Risk",
    icon: IconArrowDown,
  },
  {
    value: "completed",
    label: "Completed",
    icon: IconCircleCheck,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: IconCircleX,
  },
  {
    value: "archived",
    label: "Archived",
    icon: IconCircle,
  },
];

export const priorities = [
  {
    value: "low",
    label: "Low",
    icon: IconArrowDown,
  },
  {
    value: "medium",
    label: "Medium",
    icon: IconArrowRight,
  },
  {
    value: "high",
    label: "High",
    icon: IconArrowUp,
  },
];
