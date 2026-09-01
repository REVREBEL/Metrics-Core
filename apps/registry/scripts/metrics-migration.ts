export type RegistryComponent = {
  name: string;
  title: string;
  description: string;
  type: "primitive" | "metric-card";
  files: string[];
  dependencies?: string[];
  registryDependencies?: string[];
  cssVars?: string[];
  status: "ready" | "needs-refactor" | "deprecated";
};

const metricCssVars = [
  "--color-primary",
  "--color-secondary",
  "--color-positive",
  "--color-negative",
  "--color-total",
  "--color-transient",
  "--color-group",
  "--muted",
  "--muted-foreground",
  "--card",
  "--card-foreground",
  "--border",
];

export const metricsRegistryComponents: RegistryComponent[] = [
  {
    name: "card",
    title: "Card",
    description: "Shared card primitive from Metrics.",
    type: "primitive",
    files: ["registry/primitives/card.tsx"],
    status: "ready",
  },
  {
    name: "performance-card",
    title: "Performance Card",
    description: "REVREBEL performance metric card.",
    type: "metric-card",
    files: ["registry/metric-cards/performance-card.tsx"],
    dependencies: ["recharts"],
    registryDependencies: ["card"],
    cssVars: metricCssVars,
    status: "needs-refactor",
  },
  {
    name: "budget-snapshot-card",
    title: "Budget Snapshot Card",
    description: "Segment budget snapshot metric card.",
    type: "metric-card",
    files: ["registry/metric-cards/budget-snapshot-card.tsx"],
    dependencies: ["recharts"],
    registryDependencies: ["card"],
    cssVars: metricCssVars,
    status: "needs-refactor",
  },
  {
    name: "simple-kpi-cards",
    title: "Simple KPI Cards",
    description: "Compact KPI cards group.",
    type: "metric-card",
    files: ["registry/metric-cards/simple-kpi-cards.tsx"],
    registryDependencies: ["card"],
    cssVars: metricCssVars,
    status: "needs-refactor",
  },
  {
    name: "simple-statistics-cards",
    title: "Simple Statistics Cards",
    description: "Compact statistics card set.",
    type: "metric-card",
    files: ["registry/metric-cards/simple-statistics-cards.tsx"],
    registryDependencies: ["card"],
    cssVars: metricCssVars,
    status: "needs-refactor",
  },
  {
    name: "sales-metrics-card",
    title: "Sales Metrics Card",
    description: "Sales metrics card from Metrics.",
    type: "metric-card",
    files: ["registry/metric-cards/sales-metrics-card.tsx"],
    dependencies: ["recharts"],
    registryDependencies: ["card"],
    cssVars: metricCssVars,
    status: "needs-refactor",
  },
];
