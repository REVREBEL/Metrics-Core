/* eslint-disable @typescript-eslint/no-explicit-any */
// AUTOMATICALLY GENERATED - DO NOT EDIT

export type Component = {
  name: string;
  type: string;
  title?: string;
  description?: string;
  files?: Array<{ path: string; type: string; target?: string }>;
  [key: string]: any;
};

const REGISTRY_ITEMS: Component[] = [
  {
    name: "metrics",
    type: "registry:theme",
    title: "Metrics by REVREBEL",
    description:
      "A bold hotel performance command center for REVREBEL Metrics: dark-blue strategy, smoke-light surfaces, retro-tech contrast, saturated status colors, punchy Khand typography, and dashboard UI built for clarity, speed, and action.",
    cssVars: {
      light: {
        background: "oklch(0.9659 0.0065 208.7829)",
        foreground: "oklch(0.3373 0.0925 258.5200)",
        card: "oklch(1.0000 0 0)",
        "card-foreground": "oklch(0.3373 0.0925 258.5200)",
        popover: "oklch(1.0000 0 0)",
        "popover-foreground": "oklch(0.3373 0.0925 258.5200)",
        primary: "oklch(0.3373 0.0925 258.5200)",
        "primary-foreground": "oklch(0.9659 0.0065 208.7829)",
        secondary: "oklch(0.8642 0.1141 79.7487)",
        "secondary-foreground": "oklch(0.3373 0.0925 258.5200)",
        muted: "oklch(0.8463 0.0383 219.9626)",
        "muted-foreground": "oklch(0.3373 0.0925 258.5200)",
        accent: "oklch(0.7170 0.1537 37.7036)",
        "accent-foreground": "oklch(1.0000 0 0)",
        destructive: "oklch(0.6254 0.1812 27.1628)",
        "destructive-foreground": "oklch(1.0000 0 0)",
        border: "oklch(0.3373 0.0925 258.5200)",
        input: "oklch(0.8463 0.0383 219.9626)",
        ring: "oklch(0.3373 0.0925 258.5200)",
        "chart-1": "oklch(0.8300 0.0400 219.3500)",
        "chart-2": "oklch(0.8400 0.1400 85.2100)",
        "chart-3": "oklch(0.6600 0.1800 44.7300)",
        "chart-4": "oklch(0.5500 0.2100 32)",
        "chart-5": "oklch(0.4500 0.1400 340.2100)",
        sidebar: "oklch(0.9659 0.0065 208.7829)",
        "sidebar-foreground": "oklch(0.3373 0.0925 258.5200)",
        "sidebar-primary": "oklch(0.3373 0.0925 258.5200)",
        "sidebar-primary-foreground": "oklch(1.0000 0 0)",
        "sidebar-accent": "oklch(0.8463 0.0383 219.9626)",
        "sidebar-accent-foreground": "oklch(0.3373 0.0925 258.5200)",
        "sidebar-border": "oklch(0.3373 0.0925 258.5200)",
        "sidebar-ring": "oklch(0.3373 0.0925 258.5200)",
        radius: "0.1rem",
        "font-brand": '"Barlow", sans-serif',
        "font-numbers": '"Funnel Sans", sans-serif',
        "font-eyebrow":
          '"Supreme", "Segoe UI Variable", "Segoe UI", "Aptos", "Calibri", "Arial", sans-serif',
        "font-buttons": '"Khand", ui-sans-serif, sans-serif, system-ui',
        "font-display": '"Khand", ui-sans-serif, sans-serif, system-ui',
        "font-sans": '"Khand", ui-sans-serif, sans-serif, system-ui',
        "font-serif": '"Roboto", ui-sans-serif, sans-serif, system-ui',
        "font-mono": '"Fira Code", ui-monospace, monospace',
        "color-background": "var(--background)",
        "color-foreground": "var(--foreground)",
        "color-card": "oklch(1.0000 0 0)",
        "color-card-foreground": "var(--card-foreground)",
        "color-popover": "var(--popover)",
        "color-popover-foreground": "var(--popover-foreground)",
        "color-primary": "var(--base-primary)",
        "color-primary-foreground": "var(--primary-foreground)",
        "color-secondary": "var(--secondary)",
        "color-secondary-foreground": "var(--secondary-foreground)",
        "color-muted": "var(--muted)",
        "color-muted-foreground": "var(--muted-foreground)",
        "color-accent": "var(--accent)",
        "color-accent-foreground": "var(--accent-foreground)",
        "color-destructive": "var(--destructive)",
        "color-destructive-foreground": "var(--destructive-foreground)",
        "color-border": "var(--border)",
        "color-input": "var(--input)",
        "color-ring": "var(--ring)",
        "color-chart-1": "var(--chart-1)",
        "color-chart-2": "var(--chart-2)",
        "color-chart-3": "var(--chart-3)",
        "color-chart-4": "var(--chart-4)",
        "color-chart-5": "var(--chart-5)",
        "color-sidebar": "var(--sidebar)",
        "color-sidebar-foreground": "var(--sidebar-foreground)",
        "color-sidebar-primary": "var(--sidebar-primary)",
        "color-sidebar-primary-foreground": "var(--sidebar-primary-foreground)",
        "color-sidebar-accent": "var(--sidebar-accent)",
        "color-sidebar-accent-foreground": "var(--sidebar-accent-foreground)",
        "color-sidebar-border": "var(--sidebar-border)",
        "color-sidebar-ring": "var(--sidebar-ring)",
        "color-chart-6": "var(--chart-6)",
        "color-chart-7": "var(--chart-7)",
        "color-dark-blue": "var(--primary-b000)",
        "color-dark-blue-fade": "var(--primary-l200)",
        "color-dark-blue-inverse": "var(--base-color-4-d100)",
        "color-dark-blue-inverse-fade": "var(--base-color-4-l200)",
        "color-dark-blue-100": "var(--primary-l400)",
        "color-dark-blue-200": "var(--primary-l300)",
        "color-dark-blue-300": "var(--primary-l200)",
        "color-dark-blue-400": "var(--primary-l100)",
        "color-dark-blue-500": "var(--primary-b000)",
        "color-dark-blue-600": "var(--primary-d100)",
        "color-dark-blue-700": "var(--primary-d200)",
        "color-dark-blue-800": "var(--primary-d300)",
        "color-dark-blue-900": "var(--primary-d400)",
        "color-dark-blue-100-inverse": "var(--base-color-4-d400)",
        "color-dark-blue-200-inverse": "var(--base-color-4-d300)",
        "color-dark-blue-300-inverse": "var(--base-color-4-d200)",
        "color-dark-blue-400-inverse": "var(--base-color-4-d100)",
        "color-dark-blue-500-inverse": "var(--base-color-4-b000)",
        "color-dark-blue-600-inverse": "var(--base-color-4-l100)",
        "color-dark-blue-700-inverse": "var(--base-color-4-l200)",
        "color-dark-blue-800-inverse": "var(--base-color-4-l300)",
        "color-dark-blue-900-inverse": "var(--base-color-4-l400)",
        "color-blue-50": "var(--primary-l500)",
        "color-blue-100": "var(--primary-l400)",
        "color-blue-200": "var(--primary-l300)",
        "color-blue-300": "var(--primary-l200)",
        "color-blue-400": "var(--primary-l100)",
        "color-blue-500": "var(--primary-b000)",
        "color-blue-600": "var(--primary-d100)",
        "color-blue-700": "var(--primary-d200)",
        "color-blue-800": "var(--primary-d300)",
        "color-blue-900": "var(--primary-d400)",
        "color-blue-950": "var(--primary-d500)",
        "color-dark-green": "var(--base-color-1)",
        "color-dark-green-fade": "var(--base-color-1-fade)",
        "color-dark-green-inverse": "var(--base-color-1-inverse)",
        "color-dark-green-inverse-fade": "var(--base-color-1-inverse-fade)",
        "color-dark-green-100": "var(--base-color-1-l400)",
        "color-dark-green-200": "var(--base-color-1-l300)",
        "color-dark-green-300": "var(--base-color-1-l200)",
        "color-dark-green-400": "var(--base-color-1-l100)",
        "color-dark-green-500": "var(--base-color-1-b000)",
        "color-dark-green-600": "var(--base-color-1-d100)",
        "color-dark-green-700": "var(--base-color-1-d200)",
        "color-dark-green-800": "var(--base-color-1-d300)",
        "color-dark-green-900": "var(--base-color-1-d400)",
        "color-emerald-50": "var(--base-color-1-l400)",
        "color-emerald-100": "var(--base-color-1-l400)",
        "color-emerald-200": "var(--base-color-1-l300)",
        "color-emerald-300": "var(--base-color-1-l200)",
        "color-emerald-400": "var(--base-color-1-l100)",
        "color-emerald-500": "var(--base-color-1-b000)",
        "color-emerald-600": "var(--base-color-1-d100)",
        "color-emerald-700": "var(--base-color-1-d200)",
        "color-emerald-800": "var(--base-color-1-d300)",
        "color-emerald-900": "var(--base-color-1-d400)",
        "color-emerald-950": "var(--base-color-1-l400)",
        "color-dark-green-100-inverse": "var(--base-color-9-d400)",
        "color-dark-green-200-inverse": "var(--base-color-9-d300)",
        "color-dark-green-300-inverse": "var(--base-color-9-d200)",
        "color-dark-green-400-inverse": "var(--base-color-9-d100)",
        "color-dark-green-500-inverse": "var(--base-color-9-b000)",
        "color-dark-green-600-inverse": "var(--base-color-9-l100)",
        "color-dark-green-700-inverse": "var(--base-color-9-l200)",
        "color-dark-green-800-inverse": "var(--base-color-9-l300)",
        "color-dark-green-900-inverse": "var(--base-color-9-l400)",
        "color-green": "var(--base-color-2)",
        "color-green-fade": "var(--base-color-2-fade)",
        "color-green-inverse": "var(--base-color-2-inverse)",
        "color-green-inverse-fade": "var(--base-color-2-inverse-fade)",
        "color-green-100": "var(--base-color-2-l400)",
        "color-green-200": "var(--base-color-2-l300)",
        "color-green-300": "var(--base-color-2-l200)",
        "color-green-400": "var(--base-color-2-l100)",
        "color-green-500": "var(--base-color-2-b000)",
        "color-green-600": "var(--base-color-2-d100)",
        "color-green-700": "var(--base-color-2-d200)",
        "color-green-800": "var(--base-color-2-d300)",
        "color-green-900": "var(--base-color-2-d400)",
        "color-teal-50": "var(--base-color-2-l500)",
        "color-teal-100": "var(--base-color-2-l400)",
        "color-teal-200": "var(--base-color-2-l300)",
        "color-teal-300": "var(--base-color-2-l200)",
        "color-teal-400": "var(--base-color-2-l100)",
        "color-teal-500": "var(--base-color-2-b000)",
        "color-teal-600": "var(--base-color-2-d100)",
        "color-teal-700": "var(--base-color-2-d200)",
        "color-teal-800": "var(--base-color-2-d300)",
        "color-teal-900": "var(--base-color-2-d400)",
        "color-teal-950": "var(--base-color-2-d500)",
        "color-green-100-inverse": "var(--base-color-5-d400)",
        "color-green-200-inverse": "var(--base-color-5-d300)",
        "color-green-300-inverse": "var(--base-color-5-d200)",
        "color-green-400-inverse": "var(--base-color-5-d100)",
        "color-green-500-inverse": "var(--base-color-5-b000)",
        "color-green-600-inverse": "var(--base-color-5-l100)",
        "color-green-700-inverse": "var(--base-color-5-l200)",
        "color-green-800-inverse": "var(--base-color-5-l300)",
        "color-green-900-inverse": "var(--base-color-5-l400)",
        "color-light-green": "var(--base-color-3)",
        "color-light-green-fade": "var(--base-color-3-fade)",
        "color-light-green-inverse": "var(--base-color-3-inverse)",
        "color-light-green-inverse-fade": "var(--base-color-3-inverse-fade)",
        "color-light-green-100": "var(--base-color-3-l400)",
        "color-light-green-200": "var(--base-color-3-l300)",
        "color-light-green-300": "var(--base-color-3-l200)",
        "color-light-green-400": "var(--base-color-3-l100)",
        "color-light-green-500": "var(--base-color-3-b000)",
        "color-light-green-600": "var(--base-color-3-d100)",
        "color-light-green-700": "var(--base-color-3-d200)",
        "color-light-green-800": "var(--base-color-3-d300)",
        "color-light-green-900": "var(--base-color-3-d400)",
        "color-lime-50": "var(--base-color-3-l400)",
        "color-lime-100": "var(--base-color-3-l400)",
        "color-lime-200": "var(--base-color-3-l300)",
        "color-lime-300": "var(--base-color-3-l200)",
        "color-lime-400": "var(--base-color-3-l100)",
        "color-lime-500": "var(--base-color-3-b000)",
        "color-lime-600": "var(--base-color-3-d100)",
        "color-lime-700": "var(--base-color-3-d200)",
        "color-lime-800": "var(--base-color-3-d300)",
        "color-lime-900": "var(--base-color-3-d400)",
        "color-lime-950": "var(--base-color-3-d400)",
        "color-light-green-100-inverse": "var(--base-color-8-d400)",
        "color-light-green-200-inverse": "var(--base-color-8-d300)",
        "color-light-green-300-inverse": "var(--base-color-8-d200)",
        "color-light-green-400-inverse": "var(--base-color-8-d100)",
        "color-light-green-500-inverse": "var(--base-color-8-b000)",
        "color-light-green-600-inverse": "var(--base-color-8-l100)",
        "color-light-green-700-inverse": "var(--base-color-8-l200)",
        "color-light-green-800-inverse": "var(--base-color-8-l300)",
        "color-light-green-900-inverse": "var(--base-color-8-l400)",
        "color-light-blue": "var(--base-color-4)",
        "color-light-blue-fade": "var(--base-color-4-inverse)",
        "color-light-blue-inverse": "var(--base-color-4-inverse)",
        "color-light-blue-inverse-fade": "var(--base-color-4-inverse-fade)",
        "color-light-blue-100": "var(--base-color-4-l400)",
        "color-light-blue-200": "var(--base-color-4-l300)",
        "color-light-blue-300": "var(--base-color-4-l200)",
        "color-light-blue-400": "var(--base-color-4-l100)",
        "color-light-blue-500": "var(--base-color-4-b000)",
        "color-light-blue-600": "var(--base-color-4-d100)",
        "color-light-blue-700": "var(--base-color-4-d200)",
        "color-light-blue-800": "var(--base-color-4-d300)",
        "color-light-blue-900": "var(--base-color-4-d400)",
        "color-cyan-50": "var(--base-color-4-l400)",
        "color-cyan-100": "var(--base-color-4-l400)",
        "color-cyan-200": "var(--base-color-4-l300)",
        "color-cyan-300": "var(--base-color-4-l200)",
        "color-cyan-400": "var(--base-color-4-l100)",
        "color-cyan-500": "var(--base-color-4-b000)",
        "color-cyan-600": "var(--base-color-4-d100)",
        "color-cyan-700": "var(--base-color-4-d200)",
        "color-cyan-800": "var(--base-color-4-d300)",
        "color-cyan-900": "var(--base-color-4-d400)",
        "color-cyan-950": "var(--base-color-4-d400)",
        "color-light-blue-100-inverse": "var(--primary-d400)",
        "color-light-blue-200-inverse": "var(--primary-d300)",
        "color-light-blue-300-inverse": "var(--primary-d200)",
        "color-light-blue-400-inverse": "var(--primary-d100)",
        "color-light-blue-500-inverse": "var(--primary-b000)",
        "color-light-blue-600-inverse": "var(--primary-l100)",
        "color-light-blue-700-inverse": "var(--primary-l200)",
        "color-light-blue-800-inverse": "var(--primary-l300)",
        "color-light-blue-900-inverse": "var(--primary-l400)",
        "color-yellow": "var(--base-color-5)",
        "color-yellow-fade": "var(--base-color-5-fade)",
        "color-yellow-inverse": "var(--base-color-5-inverse)",
        "color-yellow-inverse-fade": "var(--base-color-5-inverse-fade)",
        "color-yellow-100": "var(--base-color-5-l400)",
        "color-yellow-200": "var(--base-color-5-l300)",
        "color-yellow-300": "var(--base-color-5-l200)",
        "color-yellow-400": "var(--base-color-5-l100)",
        "color-yellow-500": "var(--base-color-5-b000)",
        "color-yellow-600": "var(--base-color-5-d100)",
        "color-yellow-700": "var(--base-color-5-d200)",
        "color-yellow-800": "var(--base-color-5-d300)",
        "color-yellow-900": "var(--base-color-5-d400)",
        "color-yellow-100-inverse": "var(--primary-d400)",
        "color-yellow-200-inverse": "var(--primary-d300)",
        "color-yellow-300-inverse": "var(--primary-d200)",
        "color-yellow-400-inverse": "var(--primary-d100)",
        "color-yellow-500-inverse": "var(--primary-b000)",
        "color-yellow-600-inverse": "var(--primary-l100)",
        "color-yellow-700-inverse": "var(--primary-l200)",
        "color-yellow-800-inverse": "var(--primary-l300)",
        "color-yellow-900-inverse": "var(--primary-l400)",
        "color-orange": "var(--base-color-6)",
        "color-orange-fade": "var(--base-color-6-fade)",
        "color-orange-inverse": "var(--base-color-6-inverse)",
        "color-orange-inverse-fade": "var(--base-color-6-inverse-fade)",
        "color-orange-50": "var(--base-color-6-l500)",
        "color-orange-100": "var(--base-color-6-l400)",
        "color-orange-200": "var(--base-color-6-l300)",
        "color-orange-300": "var(--base-color-6-l200)",
        "color-orange-400": "var(--base-color-6-l100)",
        "color-orange-500": "var(--base-color-6-b000)",
        "color-orange-600": "var(--base-color-6-d100)",
        "color-orange-700": "var(--base-color-6-d200)",
        "color-orange-800": "var(--base-color-6-d300)",
        "color-orange-900": "var(--base-color-6-d400)",
        "color-orange-950": "var(--base-color-6-d400)",
        "color-orange-100-inverse": "var(--primary-l400)",
        "color-orange-200-inverse": "var(--primary-l300)",
        "color-orange-300-inverse": "var(--primary-l200)",
        "color-orange-400-inverse": "var(--primary-l100)",
        "color-orange-500-inverse": "var(--primary-b000)",
        "color-orange-600-inverse": "var(--primary-d100)",
        "color-orange-700-inverse": "var(--primary-d200)",
        "color-orange-800-inverse": "var(--primary-d300)",
        "color-orange-900-inverse": "var(--primary-d400)",
        "color-red": "var(--base-color-7)",
        "color-red-fade": "var(--base-color-7-fade)",
        "color-red-inverse": "var(--base-color-7-inverse)",
        "color-red-inverse-fade": "var(--base-color-7-inverse-fade)",
        "color-red-50": "var(--base-color-7-l500)",
        "color-red-100": "var(--base-color-7-l400)",
        "color-red-200": "var(--base-color-7-l300)",
        "color-red-300": "var(--base-color-7-l200)",
        "color-red-400": "var(--base-color-7-l100)",
        "color-red-500": "var(--base-color-7-b000)",
        "color-red-600": "var(--base-color-7-d100)",
        "color-red-700": "var(--base-color-7-d200)",
        "color-red-800": "var(--base-color-7-d300)",
        "color-red-900": "var(--base-color-7-d400)",
        "color-red-950": "var(--base-color-7-l500)",
        "color-red-100-inverse": "var(--base-color-4-d400)",
        "color-red-200-inverse": "var(--base-color-4-d300)",
        "color-red-300-inverse": "var(--base-color-4-d200)",
        "color-red-400-inverse": "var(--base-color-4-d100)",
        "color-red-500-inverse": "var(--base-color-4-b000)",
        "color-red-600-inverse": "var(--base-color-4-l100)",
        "color-red-700-inverse": "var(--base-color-4-l200)",
        "color-red-800-inverse": "var(--base-color-4-l300)",
        "color-red-900-inverse": "var(--base-color-4-l400)",
        "color-purple": "var(--base-color-8)",
        "color-purple-fade": "var(--base-color-8-fade)",
        "color-purple-inverse": "var(--base-color-8-inverse)",
        "color-purple-inverse-fade": "var(--base-color-8-inverse-fade)",
        "color-purple-50": "var(--base-color-8-l500)",
        "color-purple-100": "var(--base-color-8-l400)",
        "color-purple-200": "var(--base-color-8-l300)",
        "color-purple-300": "var(--base-color-8-l200)",
        "color-purple-400": "var(--base-color-8-l100)",
        "color-purple-500": "var(--base-color-8-b000)",
        "color-purple-600": "var(--base-color-8-d100)",
        "color-purple-700": "var(--base-color-8-d200)",
        "color-purple-800": "var(--base-color-8-d300)",
        "color-purple-900": "var(--base-color-8-d400)",
        "color-purple-950": "var(--base-color-8-d500)",
        "color-purple-100-inverse": "var(--base-color-3-d400)",
        "color-purple-200-inverse": "var(--base-color-3-d300)",
        "color-purple-300-inverse": "var(--base-color-3-d200)",
        "color-purple-400-inverse": "var(--base-color-3-d100)",
        "color-purple-500-inverse": "var(--base-color-3-b000)",
        "color-purple-600-inverse": "var(--base-color-3-l100)",
        "color-purple-700-inverse": "var(--base-color-3-l200)",
        "color-purple-800-inverse": "var(--base-color-3-l300)",
        "color-purple-900-inverse": "var(--base-color-3-l400)",
        "color-smoke": "var(--base-color-9)",
        "color-smoke-fade": "var(--base-color-9-fade)",
        "color-smoke-inverse": "var(--base-color-9-inverse)",
        "color-smoke-inverse-fade": "var(--base-color-9-inverse-fade)",
        "color-smoke-100": "var(--base-color-9-l400)",
        "color-smoke-200": "var(--base-color-9-l300)",
        "color-smoke-300": "var(--base-color-9-l200)",
        "color-smoke-400": "var(--base-color-9-l100)",
        "color-smoke-500": "var(--base-color-9-b000)",
        "color-smoke-600": "var(--base-color-9-d100)",
        "color-smoke-700": "var(--base-color-9-d200)",
        "color-smoke-800": "var(--base-color-9-d300)",
        "color-smoke-900": "var(--base-color-9-d400)",
        "color-slate-50": "var(--base-color-9-b000)",
        "color-slate-100": "var(--base-color-9-l400)",
        "color-slate-200": "var(--base-color-9-l300)",
        "color-slate-300": "var(--base-color-9-l200)",
        "color-slate-400": "var(--base-color-9-l100)",
        "color-slate-500": "var(--base-color-9-b000)",
        "color-slate-600": "var(--base-color-9-d100)",
        "color-slate-700": "var(--base-color-9-d200)",
        "color-slate-800": "var(--base-color-9-d300)",
        "color-slate-900": "var(--base-color-9-d400)",
        "color-slate-950": "var(--base-color-9-d400)",
        "color-grey-100": "var(--base-grey-l700)",
        "color-grey-150": "var(--base-grey-l600)",
        "color-grey-200": "var(--base-grey-l500)",
        "color-grey-250": "var(--base-grey-l400)",
        "color-grey-300": "var(--base-grey-l300)",
        "color-grey-350": "var(--base-grey-l200)",
        "color-grey-400": "var(--base-grey-l100)",
        "color-grey-450": "var(--base-grey-d100)",
        "color-grey-500": "var(--base-grey-d200)",
        "color-grey-550": "var(--base-grey-d200)",
        "color-grey-600": "var(--base-grey-d400)",
        "color-grey-650": "var(--base-grey-d500)",
        "color-grey-700": "var(--base-grey-d600)",
        "color-grey-750": "var(--base-grey-d700)",
        "color-grey-800": "var(--base-grey-d800)",
        "shadow-2xs": "var(--shadow-2xs)",
        "shadow-xs": "var(--shadow-xs)",
        "shadow-sm":
          "0.95px .5px 0 currentColor,1.45px 1px 0 currentColor,1.95px 1.5px 0 currentColor,2.45px 2px 0 currentColor,2.95px 2.5px 0 currentColor,3.45px 3px 0 currentColor,3.95px 3.5px 0 currentColor",
        shadow:
          "0.95px .5px 0 currentColor,1.45px 1px 0 currentColor,1.95px 1.5px 0 currentColor,2.45px 2px 0 currentColor,2.95px 2.5px 0 currentColor,3.45px 3px 0 currentColor,3.95px 3.5px 0 currentColor,4.45px 4px 0 currentColor, currentColor,4.95px 4.5px 0 currentColor,5.45px 5px 0",
        "shadow-md":
          "0.95px .5px 0 currentColor,1.45px 1px 0 currentColor,1.95px 1.5px 0 currentColor,2.45px 2px 0 currentColor,2.95px 2.5px 0 currentColor,3.45px 3px 0 currentColor,3.95px 3.5px 0 currentColor,4.45px 4px 0 currentColor",
        "shadow-lg":
          "0.95px .5px 0 currentColor,1.45px 1px 0 currentColor,1.95px 1.5px 0 currentColor,2.45px 2px 0 currentColor,2.95px 2.5px 0 currentColor,3.45px 3px 0 currentColor,3.95px 3.5px 0 currentColor,4.45px 4px 0 currentColor,4.95px 4.5px 0 currentColor,5.45px 5px 0 currentColor,5.95px 5.5px 0 currentColor,6.45px 6px 0 currentColor,6.95px 6.5px 0 currentColor,7.45px 7px 0 currentColor,7.95px 7.5px 0 currentColor,8.45px 8px 0",
        "shadow-xl":
          "0.95px .5px 0 currentColor,1.45px 1px 0 currentColor,1.95px 1.5px 0 currentColor,2.45px 2px 0 currentColor,2.95px 2.5px 0 currentColor,3.45px 3px 0 currentColor,3.95px 3.5px 0 currentColor,4.45px 4px 0 currentColor,4.95px 4.5px 0 currentColor,5.45px 5px 0 currentColor,5.95px 5.5px 0 currentColor,6.45px 6px 0 currentColor,6.95px 6.5px 0 currentColor,7.45px 7px 0 currentColor,7.95px 7.5px 0 currentColor,8.45px 8px 0 currentColor,8.95px 8.5px 0 currentColor,9.45px 9px 0 currentColor,9.95px 9.5px 0 currentColor,10.45px 10px 0 currentColor",
        "shadow-2xl": "var(--shadow-2xl)",
        "radius-xs": ".25rem",
        "radius-sm": "calc(var(--radius) * 0.6)",
        "radius-md": "calc(var(--radius) * 0.8)",
        "radius-lg": "var(--radius)",
        "radius-xl": "calc(var(--radius) * 1.4)",
        "radius-2xl": "calc(var(--radius) * 1.8)",
        "radius-3xl": "calc(var(--radius) * 2.2)",
        "radius-4xl": "calc(var(--radius) * 2.6)",
        "tracking-tighter": "calc(var(--tracking-normal) - 0.05em)",
        "tracking-tight": "calc(var(--tracking-normal) - 0.025em)",
        "tracking-normal": "0em",
        "tracking-wide": "calc(var(--tracking-normal) + 0.025em)",
        "tracking-wider": "calc(var(--tracking-normal) + 0.05em)",
        "tracking-widest": "calc(var(--tracking-normal) + 0.1em)",
        "animate-rainbow": "rainbow var(--speed, 2s) infinite linear",
        "animate-heartbeat": "heartbeat 2s infinite ease-in-out",
        "spacing-xxs": ".5rem",
        "spacing-xs": "1rem",
        "spacing-sm": "2rem",
        "spacing-md": "3rem",
        "spacing-lg": "4rem",
        "spacing-xl": "6rem",
        "spacing-xxl": "8rem",
        "color-opacity-25":
          "color-mix(in oklch, var(--dark-blue), transparent 75%)",
        "color-opacity-50":
          "color-mix(in oklch, var(--dark-blue), transparent 50%)",
        "color-opacity-75":
          "color-mix(in oklch, var(--dark-blue), transparent 25%)",
        "chart-6": "oklch(52% 0.10 230.09)",
        "chart-7": "oklch(65% 0.12 219.43)",
        "chart-8": "oklch(78% 0.11 195.12)",
        spacing: "0.25rem",
        "base-primary": "oklch(0.3373 0.0925 258.5200)",
        "base-primary-fade": "oklch(61.56% 0.0494 258.73)",
        "base-primary-inverse": "oklch(83% 0.04 220)",
        "base-primary-inverse-fade": "oklch(86.40% 0.032 220)",
        "base-color-1": "oklch(54.28% 0.0982 220.31)",
        "base-color-1-fade": "oklch(71.63% 0.0762 214.60)",
        "base-color-1-inverse": "oklch(96% 0.01 210)",
        "base-color-1-inverse-fade": "oklch(86.40% 0.009 210)",
        "base-color-2": "oklch(66.27% 0.114 206.90)",
        "base-color-2-fade": "oklch(78.23% 0.094 203.21)",
        "base-color-2-inverse": "oklch(84% 0.14 85.21)",
        "base-color-2-inverse-fade": "oklch(94.00% 0.050 85.21)",
        "base-color-3": "#71c9c5",
        "base-color-3-fade": "oklch(86.35% 0.054 193.29)",
        "base-color-3-inverse": "oklch(45% 0.14 340)",
        "base-color-3-inverse-fade": "oklch(56.00% 0.112 340)",
        "base-color-4": "oklch(83% 0.04 220)",
        "base-color-4-fade": "oklch(90.61% 0.023 220.74)",
        "base-color-4-inverse": "oklch(27% 0.09 254.40)",
        "base-color-4-inverse-fade": "oklch(61.56% 0.0494 258.73)",
        "base-color-5": "oklch(84% 0.14 85.21)",
        "base-color-5-fade": "oklch(94.00% 0.050 85.21)",
        "base-color-5-inverse": "oklch(27% 0.09 254.40)",
        "base-color-5-inverse-fade": "oklch(61.56% 0.0494 258.73)",
        "base-color-6": "oklch(66% 0.18 45)",
        "base-color-6-fade": "oklch(82.08% 0.088 38.17)",
        "base-color-6-inverse": "oklch(27% 0.09 254.40)",
        "base-color-6-inverse-fade": "oklch(61.56% 0.0494 258.73)",
        "base-color-7": "oklch(55% 0.21 32)",
        "base-color-7-fade": "oklch(68.73% 0.144 25.60)",
        "base-color-7-inverse": "oklch(83% 0.04 220)",
        "base-color-7-inverse-fade": "oklch(90.61% 0.023 220.74)",
        "base-color-8": "oklch(45% 0.14 340)",
        "base-color-8-fade": "oklch(69.83% 0.061 347.29)",
        "base-color-8-inverse": "oklch(77.98% 0.085 191.74)",
        "base-color-8-inverse-fade": "oklch(86.35% 0.054 193.29)",
        "base-color-9": "oklch(96% 0.01 210)",
        "base-color-9-fade": "oklch(96.96% 0.005 212.02 / 0.5)",
        "base-color-9-inverse": "oklch(27% 0.09 254.40)",
        "base-color-9-inverse-fade": "oklch(61.56% 0.0494 258.73)",
        "primary-l500": "oklch(68.50% 0.0399 258.40)",
        "primary-l400": "oklch(61.56% 0.0494 258.73)",
        "primary-l300": "oklch(54.80% 0.0595 258.95)",
        "primary-l200": "oklch(47.91% 0.0703 259.06)",
        "primary-l100": "oklch(40.78% 0.0807 258.08)",
        "primary-b000": "oklch(33.73% 0.0925 258.52)",
        "primary-d100": "oklch(31.65% 0.0845 258.31)",
        "primary-d200": "oklch(29.28% 0.0776 259.05)",
        "primary-d300": "oklch(27.00% 0.0681 257.71)",
        "primary-d400": "oklch(24.53% 0.0608 258.67)",
        "primary-d500": "oklch(22.28% 0.0519 258.36)",
        "base-color-1-l400": "oklch(71.63% 0.0762 214.60)",
        "base-color-1-l300": "oklch(67.07% 0.0856 214.58)",
        "base-color-1-l200": "oklch(62.66% 0.0933 215.98)",
        "base-color-1-l100": "oklch(58.35% 0.0973 217.21)",
        "base-color-1-b000": "oklch(54.28% 0.0982 220.31)",
        "base-color-1-d100": "oklch(50.44% 0.0907 219.77)",
        "base-color-1-d200": "oklch(46.26% 0.0835 220.24)",
        "base-color-1-d300": "oklch(42.26% 0.0757 219.56)",
        "base-color-1-d400": "oklch(37.87% 0.0682 220.12)",
        "base-color-2-l500": "oklch(81.68% 0.081 203.65)",
        "base-color-2-l400": "oklch(78.23% 0.094 203.21)",
        "base-color-2-l300": "oklch(74.99% 0.104 203.94)",
        "base-color-2-l200": "oklch(71.90% 0.111 204.81)",
        "base-color-2-l100": "oklch(68.97% 0.114 205.27)",
        "base-color-2-b000": "oklch(66.27% 0.114 206.90)",
        "base-color-2-d100": "oklch(61.23% 0.105 207.31)",
        "base-color-2-d200": "oklch(56.35% 0.097 206.84)",
        "base-color-2-d300": "oklch(51.06% 0.087 206.33)",
        "base-color-2-d400": "oklch(45.94% 0.079 205.57)",
        "base-color-2-d500": "oklch(40.38% 0.069 206.07)",
        "base-color-3-l400": "oklch(86.35% 0.054 193.29)",
        "base-color-3-l300": "oklch(84.26% 0.063 192.24)",
        "base-color-3-l200": "oklch(81.97% 0.070 192.45)",
        "base-color-3-l100": "oklch(79.94% 0.078 191.58)",
        "base-color-3-b000": "oklch(77.98% 0.085 191.74)",
        "base-color-3-d100": "oklch(71.86% 0.078 192.37)",
        "base-color-3-d200": "oklch(65.90% 0.071 191.99)",
        "base-color-3-d300": "oklch(59.81% 0.064 191.50)",
        "base-color-3-d400": "oklch(53.53% 0.057 192.45)",
        "base-color-4-l400": "oklch(90.61% 0.023 220.74)",
        "base-color-4-l300": "oklch(89.18% 0.026 217.96)",
        "base-color-4-l200": "oklch(87.50% 0.030 220.61)",
        "base-color-4-l100": "oklch(86.03% 0.035 219.90)",
        "base-color-4-b000": "oklch(84.63% 0.038 219.96)",
        "base-color-4-d100": "oklch(78.00% 0.035 220.66)",
        "base-color-4-d200": "oklch(71.47% 0.032 220.74)",
        "base-color-4-d300": "oklch(64.80% 0.029 220.85)",
        "base-color-4-d400": "oklch(57.94% 0.025 221.09)",
        "base-color-5-l400": "oklch(94.00% 0.050 85.21)",
        "base-color-5-l300": "oklch(91.00% 0.070 85.21)",
        "base-color-5-l200": "oklch(88.04% 0.100 85.13)",
        "base-color-5-l100": "oklch(86.00% 0.120 85.21)",
        "base-color-5-b000": "oklch(86.42% 0.114 79.75)",
        "base-color-5-d100": "oklch(79.71% 0.105 79.05)",
        "base-color-5-d200": "oklch(73.06% 0.095 79.20)",
        "base-color-5-d300": "oklch(66.25% 0.086 79.38)",
        "base-color-5-d400": "oklch(59.27% 0.076 79.62)",
        "base-color-6-l500": "oklch(85.02% 0.072 37.58)",
        "base-color-6-l400": "oklch(82.08% 0.088 38.17)",
        "base-color-6-l300": "oklch(79.32% 0.105 38.34)",
        "base-color-6-l200": "oklch(76.67% 0.121 37.91)",
        "base-color-6-l100": "oklch(74.11% 0.138 38.05)",
        "base-color-6-b000": "oklch(71.70% 0.154 37.70)",
        "base-color-6-d100": "oklch(66.16% 0.141 37.56)",
        "base-color-6-d200": "oklch(60.80% 0.128 37.87)",
        "base-color-6-d300": "oklch(55.16% 0.115 37.54)",
        "base-color-6-d400": "oklch(49.39% 0.101 38.16)",
        "base-color-6-d500": "oklch(43.77% 0.087 37.71)",
        "base-color-7-l500": "oklch(79.91% 0.085 23.54)",
        "base-color-7-l400": "oklch(75.89% 0.105 24.16)",
        "base-color-7-l300": "oklch(72.15% 0.125 24.22)",
        "base-color-7-l200": "oklch(68.73% 0.144 25.60)",
        "base-color-7-l100": "oklch(65.42% 0.164 26.11)",
        "base-color-7-b000": "oklch(62.54% 0.181 27.16)",
        "base-color-7-d100": "oklch(57.79% 0.166 27.45)",
        "base-color-7-d200": "oklch(53.12% 0.151 27.38)",
        "base-color-7-d300": "oklch(48.18% 0.135 27.29)",
        "base-color-7-d400": "oklch(43.29% 0.119 27.17)",
        "base-color-7-d500": "oklch(38.27% 0.103 26.25)",
        "base-color-8-l500": "oklch(75.12% 0.050 345.99)",
        "base-color-8-l400": "oklch(69.83% 0.061 347.29)",
        "base-color-8-l300": "oklch(64.53% 0.072 347.34)",
        "base-color-8-l200": "oklch(59.51% 0.083 348.54)",
        "base-color-8-l100": "oklch(54.32% 0.096 349.45)",
        "base-color-8-b000": "oklch(49.40% 0.108 350.12)",
        "base-color-8-d100": "oklch(45.74% 0.099 349.97)",
        "base-color-8-d200": "oklch(42.15% 0.090 350.34)",
        "base-color-8-d300": "oklch(38.53% 0.081 349.71)",
        "base-color-8-d400": "oklch(34.77% 0.071 350.15)",
        "base-color-8-d500": "oklch(31.14% 0.060 349.81)",
        "base-color-9-l400": "oklch(97.93% 0.004 215.51)",
        "base-color-9-l300": "oklab(97.63% -0.003 -0.00)",
        "base-color-9-l200": "oklch(97.26% 0.005 212.03)",
        "base-color-9-l100": "oklch(96.96% 0.005 212.02)",
        "base-color-9-b000": "oklch(96.59% 0.006 209.63)",
        "base-color-9-d100": "oklch(89.29% 0.006 197.89)",
        "base-color-9-d200": "oklch(81.66% 0.005 211.84)",
        "base-color-9-d300": "oklch(74.04% 0.005 197.84)",
        "base-color-9-d400": "oklch(66.02% 0.004 215.06)",
        "base-grey-l700": "oklch(95.0% 0.009 254)",
        "base-grey-l600": "oklch(90.0% 0.008 254)",
        "base-grey-l500": "oklch(85.0% 0.007 254)",
        "base-grey-l400": "oklch(80.0% 0.006 254)",
        "base-grey-l300": "oklch(75.0% 0.005 254)",
        "base-grey-l200": "oklch(70.0% 0.004 254)",
        "base-grey-l100": "oklch(65.0% 0.003 254)",
        "base-grey-d100": "oklch(60.0% 0.002 254)",
        "base-grey-d200": "oklch(55.0% 0.001 254)",
        "base-grey-d300": "oklch(50.0% 0.000 254)",
        "base-grey-d400": "oklch(45.0% 0.001 254)",
        "base-grey-d500": "oklch(40.0% 0.002 254)",
        "base-grey-d600": "oklch(35.0% 0.003 254)",
        "base-grey-d700": "oklch(40.0% 0.004 254)",
        "base-grey-d800": "oklch(45.0% 0.005 254)",
        "color-indicator-positive-normal": "var(--color-green)",
        "color-indicator-positive-inverse": "var(--color-green-inverse)",
        "color-indicator-positive-var": "var(--color-green)",
        "color-indicator-negative-normal": "var(--color-red)",
        "color-indicator-negative-inverse": "var(--color-red-inverse)",
        "color-indicator-negative-var": "var(--color-red)",
        "color-indicator-total-normal": "var(--color-dark-blue)",
        "color-indicator-total-inverse": "var(--color-dark-blue-inverse)",
        "color-indicator-total-var": "var(--color-dark-blue-inverse)",
        "color-segment-total-normal": "var(--color-indicator-total-normal)",
        "color-segment-total-inverse": "var(--color-indicator-total-inverse)",
        "color-segment-total-var": "var(--color-indicator-total-var)",
        "color-segment-transient-normal": "var(--color-light-blue)",
        "color-segment-transient-inverse": "var(--color-yellow)",
        "color-segment-transient-var": "var(--color-yellow)",
        "color-segment-group-normal": "var(--color-light-green)",
        "color-segment-group-inverse": "var(--color-orange)",
        "color-segment-group-var": "var(--color-orange)",
        "color-segment-crew-normal": "var(--color-yellow)",
        "color-segment-crew-inverse": "var(--color-purple)",
        "color-segment-crew-var": "var(--color-purple)",
        "color-segment-complimentary-normal": "var(--base-grey-l700)",
        "color-segment-complimentary-inverse": "var(--base-grey-l400)",
        "color-segment-complimentary-var": "var(--base-grey-l400)",
        "color-segment-other-normal": "var(--color-grey-550)",
        "color-segment-other-inverse": "var(--color-grey-250)",
        "color-segment-other-var": "var(--color-grey-250)",
        "color-channel-expedia-normal": "var(--color-yellow)",
        "color-channel-expedia-inverse": "var(--color-yellow-inverse)",
        "color-channel-expedia-var": "var(--color-yellow)",
        "color-channel-booking-normal": "var(--color-light-blue)",
        "color-channel-booking-inverse": "var(--color-light-blue-inverse)",
        "color-channel-booking-var": "var(--color-light-blue)",
        "color-channel-agoda-normal": "var(--color-dark-blue-700)",
        "color-channel-agoda-inverse": "var(--color-dark-blue-700-inverse)",
        "color-channel-agoda-var": "var(--color-dark-blue-700)",
        "color-channel-hopper-normal": "var(--color-red-600)",
        "color-channel-hopper-inverse": "var(--color-red-600-inverse)",
        "color-channel-hopper-var": "var(--color-red-600)",
        "color-channel-hoteltonight-normal": "var(--color-purple-700)",
        "color-channel-hoteltonight-inverse": "var(--color-purple-700-inverse)",
        "color-channel-hoteltonight-var": "var(--color-purple-700)",
        "color-channel-hotelbeds-normal": "var(--color-purple-700)",
        "color-channel-hotelbeds-inverse": "var(--color-purple-700-inverse)",
        "color-channel-hotelbeds-var": "var(--color-purple-700)",
        "color-channel-priceline-normal": "var(--color-dark-blue-500)",
        "color-channel-priceline-inverse": "var(--color-dark-blue-500-inverse)",
        "color-channel-priceline-var": "var(--color-dark-blue-500)",
        "color-channel-airbnb-normal": "var(--color-red-200)",
        "color-channel-airbnb-inverse": "var(--color-red-200-inverse)",
        "color-channel-airbnb-var": "var(--color-red-200)",
        "color-channel-hotwire-normal": "var(--color-red)",
        "color-channel-hotwire-inverse": "var(--color-red-inverse)",
        "color-channel-hotwire-var": "var(--color-red)",
        "color-social-facebook-normal": "var(--color-purple)",
        "color-social-facebook-inverse": "var(--color-purple-inverse)",
        "color-social-facebook-var": "var(--color-purple)",
        "color-social-instagram-normal": "var(--color-red)",
        "color-social-instagram-inverse": "var(--color-red-inverse)",
        "color-social-instagram-var": "var(--color-red)",
        "color-social-x-normal": "var(--color-light-green)",
        "color-social-x-inverse": "var(--color-light-green-inverse)",
        "color-social-x-var": "var(--color-light-green)",
        "color-social-linkedin-normal": "var(--color-green)",
        "color-social-linkedin-inverse": "var(--color-green-inverse)",
        "color-social-linkedin-var": "var(--color-green)",
        "color-social-tiktok-normal": "var(--color-light-green-100)",
        "color-social-tiktok-inverse": "var(--color-light-green-100-inverse)",
        "color-social-tiktok-var": "var(--color-light-green-100)",
        "color-social-blog-normal": "var(--color-yellow)",
        "color-social-blog-inverse": "var(--color-yellow-inverse)",
        "color-social-blog-var": "var(--color-yellow)",
        "color-social-telegram-normal": "var(--color-light-blue)",
        "color-social-telegram-inverse": "var(--color-light-blue-inverse)",
        "color-social-telegram-var": "var(--color-light-blue)",
        "color-social-slack-normal": "var(--color-orange)",
        "color-social-slack-inverse": "var(--color-orange-inverse)",
        "color-social-slack-var": "var(--color-orange)",
        "color-social-youtube-normal": "var(--color-red-600)",
        "color-social-youtube-inverse": "var(--color-red-600-inverse)",
        "color-social-youtube-var": "var(--color-red-600)",
        "color-social-pinterest-normal": "var(--color-red-200)",
        "color-social-pinterest-inverse": "var(--color-red-200-inverse)",
        "color-social-pinterest-var": "var(--color-red-200)",
        "color-social-github-normal": "var(--color-grey-650)",
        "color-social-github-inverse": "var(--color-grey-250)",
        "color-social-github-var": "var(--color-grey-650)",
        "color-review-yelp-normal": "var(--color-red-700)",
        "color-review-yelp-inverse":
          "var(--color-red-700-inverse, var(--background))",
        "color-review-yelp-var": "var(--color-red-700)",
        "color-review-tripadvisor-normal": "var(--color-dark-green-700)",
        "color-review-tripadvisor-inverse":
          "var(--color-dark-green-700-inverse, var(--background))",
        "color-review-tripadvisor-var": "var(--color-dark-green-700)",
        "color-review-expedia-normal": "var(--color-channel-expedia-normal)",
        "color-review-expedia-inverse": "var(--color-channel-expedia-inverse)",
        "color-review-expedia-var": "var(--color-channel-expedia-var)",
        "color-review-booking-normal": "var(--color-channel-booking-normal)",
        "color-review-booking-inverse": "var(--color-channel-booking-inverse)",
        "color-review-booking-var": "var(--color-channel-booking-var)",
        "color-positive": "var(--color-indicator-positive-normal)",
        "color-positive-inverse": "var(--color-indicator-positive-inverse)",
        "color-negative": "var(--color-indicator-negative-normal)",
        "color-negative-inverse": "var(--color-indicator-negative-inverse)",
      },
      dark: {
        background: "oklch(0.2228 0.0519 258.36)",
        foreground: "oklch(0.9659 0.0065 208.7829)",
        card: "oklch(0.2453 0.0608 258.67)",
        "card-foreground": "oklch(0.9659 0.0065 208.7829)",
        popover: "oklch(0.2453 0.0608 258.67)",
        "popover-foreground": "oklch(0.9659 0.0065 208.7829)",
        primary: "oklch(0.8463 0.0383 219.9626)",
        "primary-foreground": "oklch(0.2228 0.0519 258.36)",
        secondary: "oklch(0.7170 0.1537 37.7036)",
        "secondary-foreground": "oklch(1.0000 0 0)",
        muted: "oklch(0.2700 0.0681 257.71)",
        "muted-foreground": "oklch(0.8918 0.026 217.96)",
        accent: "oklch(0.8642 0.1141 79.7487)",
        "accent-foreground": "oklch(0.2228 0.0519 258.36)",
        destructive: "oklch(0.6254 0.1812 27.1628)",
        "destructive-foreground": "oklch(1.0000 0 0)",
        border: "oklch(0.4791 0.0703 259.06)",
        input: "oklch(0.2700 0.0681 257.71)",
        ring: "oklch(0.8463 0.0383 219.9626)",
        "chart-1": "oklch(0.8463 0.0383 219.9626)",
        "chart-2": "oklch(0.8642 0.1141 79.7487)",
        "chart-3": "oklch(0.7170 0.1537 37.7036)",
        "chart-4": "oklch(0.6254 0.1812 27.1628)",
        "chart-5": "oklch(0.4940 0.108 350.12)",
        sidebar: "oklch(0.2453 0.0608 258.67)",
        "sidebar-foreground": "oklch(0.9659 0.0065 208.7829)",
        "sidebar-primary": "oklch(0.8463 0.0383 219.9626)",
        "sidebar-primary-foreground": "oklch(0.2228 0.0519 258.36)",
        "sidebar-accent": "oklch(0.7170 0.1537 37.7036)",
        "sidebar-accent-foreground": "oklch(1.0000 0 0)",
        "sidebar-border": "oklch(0.4791 0.0703 259.06)",
        "sidebar-ring": "oklch(0.8463 0.0383 219.9626)",
        radius: "0.1rem",
        "font-brand": '"Barlow", sans-serif',
        "font-numbers": '"Funnel Sans", sans-serif',
        "font-eyebrow":
          '"Supreme", "Segoe UI Variable", "Segoe UI", "Aptos", "Calibri", "Arial", sans-serif',
        "font-buttons": '"Khand", ui-sans-serif, sans-serif, system-ui',
        "font-display": '"Khand", ui-sans-serif, sans-serif, system-ui',
        "font-sans": '"Khand", ui-sans-serif, sans-serif, system-ui',
        "font-serif": '"Roboto", ui-sans-serif, sans-serif, system-ui',
        "font-mono": '"Fira Code", ui-monospace, monospace',
        "color-background": "var(--background)",
        "color-foreground": "var(--foreground)",
        "color-card": "oklch(1.0000 0 0)",
        "color-card-foreground": "var(--card-foreground)",
        "color-popover": "var(--popover)",
        "color-popover-foreground": "var(--popover-foreground)",
        "color-primary": "var(--base-primary)",
        "color-primary-foreground": "var(--primary-foreground)",
        "color-secondary": "var(--secondary)",
        "color-secondary-foreground": "var(--secondary-foreground)",
        "color-muted": "var(--muted)",
        "color-muted-foreground": "var(--muted-foreground)",
        "color-accent": "var(--accent)",
        "color-accent-foreground": "var(--accent-foreground)",
        "color-destructive": "var(--destructive)",
        "color-destructive-foreground": "var(--destructive-foreground)",
        "color-border": "var(--border)",
        "color-input": "var(--input)",
        "color-ring": "var(--ring)",
        "color-chart-1": "var(--chart-1)",
        "color-chart-2": "var(--chart-2)",
        "color-chart-3": "var(--chart-3)",
        "color-chart-4": "var(--chart-4)",
        "color-chart-5": "var(--chart-5)",
        "color-sidebar": "var(--sidebar)",
        "color-sidebar-foreground": "var(--sidebar-foreground)",
        "color-sidebar-primary": "var(--sidebar-primary)",
        "color-sidebar-primary-foreground": "var(--sidebar-primary-foreground)",
        "color-sidebar-accent": "var(--sidebar-accent)",
        "color-sidebar-accent-foreground": "var(--sidebar-accent-foreground)",
        "color-sidebar-border": "var(--sidebar-border)",
        "color-sidebar-ring": "var(--sidebar-ring)",
        "color-chart-6": "var(--chart-6)",
        "color-chart-7": "var(--chart-7)",
        "color-dark-blue": "var(--primary-b000)",
        "color-dark-blue-fade": "var(--primary-l200)",
        "color-dark-blue-inverse": "var(--base-color-4-d100)",
        "color-dark-blue-inverse-fade": "var(--base-color-4-l200)",
        "color-dark-blue-100": "var(--primary-l400)",
        "color-dark-blue-200": "var(--primary-l300)",
        "color-dark-blue-300": "var(--primary-l200)",
        "color-dark-blue-400": "var(--primary-l100)",
        "color-dark-blue-500": "var(--primary-b000)",
        "color-dark-blue-600": "var(--primary-d100)",
        "color-dark-blue-700": "var(--primary-d200)",
        "color-dark-blue-800": "var(--primary-d300)",
        "color-dark-blue-900": "var(--primary-d400)",
        "color-dark-blue-100-inverse": "var(--base-color-4-d400)",
        "color-dark-blue-200-inverse": "var(--base-color-4-d300)",
        "color-dark-blue-300-inverse": "var(--base-color-4-d200)",
        "color-dark-blue-400-inverse": "var(--base-color-4-d100)",
        "color-dark-blue-500-inverse": "var(--base-color-4-b000)",
        "color-dark-blue-600-inverse": "var(--base-color-4-l100)",
        "color-dark-blue-700-inverse": "var(--base-color-4-l200)",
        "color-dark-blue-800-inverse": "var(--base-color-4-l300)",
        "color-dark-blue-900-inverse": "var(--base-color-4-l400)",
        "color-blue-50": "var(--primary-l500)",
        "color-blue-100": "var(--primary-l400)",
        "color-blue-200": "var(--primary-l300)",
        "color-blue-300": "var(--primary-l200)",
        "color-blue-400": "var(--primary-l100)",
        "color-blue-500": "var(--primary-b000)",
        "color-blue-600": "var(--primary-d100)",
        "color-blue-700": "var(--primary-d200)",
        "color-blue-800": "var(--primary-d300)",
        "color-blue-900": "var(--primary-d400)",
        "color-blue-950": "var(--primary-d500)",
        "color-dark-green": "var(--base-color-1)",
        "color-dark-green-fade": "var(--base-color-1-fade)",
        "color-dark-green-inverse": "var(--base-color-1-inverse)",
        "color-dark-green-inverse-fade": "var(--base-color-1-inverse-fade)",
        "color-dark-green-100": "var(--base-color-1-l400)",
        "color-dark-green-200": "var(--base-color-1-l300)",
        "color-dark-green-300": "var(--base-color-1-l200)",
        "color-dark-green-400": "var(--base-color-1-l100)",
        "color-dark-green-500": "var(--base-color-1-b000)",
        "color-dark-green-600": "var(--base-color-1-d100)",
        "color-dark-green-700": "var(--base-color-1-d200)",
        "color-dark-green-800": "var(--base-color-1-d300)",
        "color-dark-green-900": "var(--base-color-1-d400)",
        "color-emerald-50": "var(--base-color-1-l400)",
        "color-emerald-100": "var(--base-color-1-l400)",
        "color-emerald-200": "var(--base-color-1-l300)",
        "color-emerald-300": "var(--base-color-1-l200)",
        "color-emerald-400": "var(--base-color-1-l100)",
        "color-emerald-500": "var(--base-color-1-b000)",
        "color-emerald-600": "var(--base-color-1-d100)",
        "color-emerald-700": "var(--base-color-1-d200)",
        "color-emerald-800": "var(--base-color-1-d300)",
        "color-emerald-900": "var(--base-color-1-d400)",
        "color-emerald-950": "var(--base-color-1-l400)",
        "color-dark-green-100-inverse": "var(--base-color-9-d400)",
        "color-dark-green-200-inverse": "var(--base-color-9-d300)",
        "color-dark-green-300-inverse": "var(--base-color-9-d200)",
        "color-dark-green-400-inverse": "var(--base-color-9-d100)",
        "color-dark-green-500-inverse": "var(--base-color-9-b000)",
        "color-dark-green-600-inverse": "var(--base-color-9-l100)",
        "color-dark-green-700-inverse": "var(--base-color-9-l200)",
        "color-dark-green-800-inverse": "var(--base-color-9-l300)",
        "color-dark-green-900-inverse": "var(--base-color-9-l400)",
        "color-green": "var(--base-color-2)",
        "color-green-fade": "var(--base-color-2-fade)",
        "color-green-inverse": "var(--base-color-2-inverse)",
        "color-green-inverse-fade": "var(--base-color-2-inverse-fade)",
        "color-green-100": "var(--base-color-2-l400)",
        "color-green-200": "var(--base-color-2-l300)",
        "color-green-300": "var(--base-color-2-l200)",
        "color-green-400": "var(--base-color-2-l100)",
        "color-green-500": "var(--base-color-2-b000)",
        "color-green-600": "var(--base-color-2-d100)",
        "color-green-700": "var(--base-color-2-d200)",
        "color-green-800": "var(--base-color-2-d300)",
        "color-green-900": "var(--base-color-2-d400)",
        "color-teal-50": "var(--base-color-2-l500)",
        "color-teal-100": "var(--base-color-2-l400)",
        "color-teal-200": "var(--base-color-2-l300)",
        "color-teal-300": "var(--base-color-2-l200)",
        "color-teal-400": "var(--base-color-2-l100)",
        "color-teal-500": "var(--base-color-2-b000)",
        "color-teal-600": "var(--base-color-2-d100)",
        "color-teal-700": "var(--base-color-2-d200)",
        "color-teal-800": "var(--base-color-2-d300)",
        "color-teal-900": "var(--base-color-2-d400)",
        "color-teal-950": "var(--base-color-2-d500)",
        "color-green-100-inverse": "var(--base-color-5-d400)",
        "color-green-200-inverse": "var(--base-color-5-d300)",
        "color-green-300-inverse": "var(--base-color-5-d200)",
        "color-green-400-inverse": "var(--base-color-5-d100)",
        "color-green-500-inverse": "var(--base-color-5-b000)",
        "color-green-600-inverse": "var(--base-color-5-l100)",
        "color-green-700-inverse": "var(--base-color-5-l200)",
        "color-green-800-inverse": "var(--base-color-5-l300)",
        "color-green-900-inverse": "var(--base-color-5-l400)",
        "color-light-green": "var(--base-color-3)",
        "color-light-green-fade": "var(--base-color-3-fade)",
        "color-light-green-inverse": "var(--base-color-3-inverse)",
        "color-light-green-inverse-fade": "var(--base-color-3-inverse-fade)",
        "color-light-green-100": "var(--base-color-3-l400)",
        "color-light-green-200": "var(--base-color-3-l300)",
        "color-light-green-300": "var(--base-color-3-l200)",
        "color-light-green-400": "var(--base-color-3-l100)",
        "color-light-green-500": "var(--base-color-3-b000)",
        "color-light-green-600": "var(--base-color-3-d100)",
        "color-light-green-700": "var(--base-color-3-d200)",
        "color-light-green-800": "var(--base-color-3-d300)",
        "color-light-green-900": "var(--base-color-3-d400)",
        "color-lime-50": "var(--base-color-3-l400)",
        "color-lime-100": "var(--base-color-3-l400)",
        "color-lime-200": "var(--base-color-3-l300)",
        "color-lime-300": "var(--base-color-3-l200)",
        "color-lime-400": "var(--base-color-3-l100)",
        "color-lime-500": "var(--base-color-3-b000)",
        "color-lime-600": "var(--base-color-3-d100)",
        "color-lime-700": "var(--base-color-3-d200)",
        "color-lime-800": "var(--base-color-3-d300)",
        "color-lime-900": "var(--base-color-3-d400)",
        "color-lime-950": "var(--base-color-3-d400)",
        "color-light-green-100-inverse": "var(--base-color-8-d400)",
        "color-light-green-200-inverse": "var(--base-color-8-d300)",
        "color-light-green-300-inverse": "var(--base-color-8-d200)",
        "color-light-green-400-inverse": "var(--base-color-8-d100)",
        "color-light-green-500-inverse": "var(--base-color-8-b000)",
        "color-light-green-600-inverse": "var(--base-color-8-l100)",
        "color-light-green-700-inverse": "var(--base-color-8-l200)",
        "color-light-green-800-inverse": "var(--base-color-8-l300)",
        "color-light-green-900-inverse": "var(--base-color-8-l400)",
        "color-light-blue": "var(--base-color-4)",
        "color-light-blue-fade": "var(--base-color-4-inverse)",
        "color-light-blue-inverse": "var(--base-color-4-inverse)",
        "color-light-blue-inverse-fade": "var(--base-color-4-inverse-fade)",
        "color-light-blue-100": "var(--base-color-4-l400)",
        "color-light-blue-200": "var(--base-color-4-l300)",
        "color-light-blue-300": "var(--base-color-4-l200)",
        "color-light-blue-400": "var(--base-color-4-l100)",
        "color-light-blue-500": "var(--base-color-4-b000)",
        "color-light-blue-600": "var(--base-color-4-d100)",
        "color-light-blue-700": "var(--base-color-4-d200)",
        "color-light-blue-800": "var(--base-color-4-d300)",
        "color-light-blue-900": "var(--base-color-4-d400)",
        "color-cyan-50": "var(--base-color-4-l400)",
        "color-cyan-100": "var(--base-color-4-l400)",
        "color-cyan-200": "var(--base-color-4-l300)",
        "color-cyan-300": "var(--base-color-4-l200)",
        "color-cyan-400": "var(--base-color-4-l100)",
        "color-cyan-500": "var(--base-color-4-b000)",
        "color-cyan-600": "var(--base-color-4-d100)",
        "color-cyan-700": "var(--base-color-4-d200)",
        "color-cyan-800": "var(--base-color-4-d300)",
        "color-cyan-900": "var(--base-color-4-d400)",
        "color-cyan-950": "var(--base-color-4-d400)",
        "color-light-blue-100-inverse": "var(--primary-d400)",
        "color-light-blue-200-inverse": "var(--primary-d300)",
        "color-light-blue-300-inverse": "var(--primary-d200)",
        "color-light-blue-400-inverse": "var(--primary-d100)",
        "color-light-blue-500-inverse": "var(--primary-b000)",
        "color-light-blue-600-inverse": "var(--primary-l100)",
        "color-light-blue-700-inverse": "var(--primary-l200)",
        "color-light-blue-800-inverse": "var(--primary-l300)",
        "color-light-blue-900-inverse": "var(--primary-l400)",
        "color-yellow": "var(--base-color-5)",
        "color-yellow-fade": "var(--base-color-5-fade)",
        "color-yellow-inverse": "var(--base-color-5-inverse)",
        "color-yellow-inverse-fade": "var(--base-color-5-inverse-fade)",
        "color-yellow-100": "var(--base-color-5-l400)",
        "color-yellow-200": "var(--base-color-5-l300)",
        "color-yellow-300": "var(--base-color-5-l200)",
        "color-yellow-400": "var(--base-color-5-l100)",
        "color-yellow-500": "var(--base-color-5-b000)",
        "color-yellow-600": "var(--base-color-5-d100)",
        "color-yellow-700": "var(--base-color-5-d200)",
        "color-yellow-800": "var(--base-color-5-d300)",
        "color-yellow-900": "var(--base-color-5-d400)",
        "color-yellow-100-inverse": "var(--primary-d400)",
        "color-yellow-200-inverse": "var(--primary-d300)",
        "color-yellow-300-inverse": "var(--primary-d200)",
        "color-yellow-400-inverse": "var(--primary-d100)",
        "color-yellow-500-inverse": "var(--primary-b000)",
        "color-yellow-600-inverse": "var(--primary-l100)",
        "color-yellow-700-inverse": "var(--primary-l200)",
        "color-yellow-800-inverse": "var(--primary-l300)",
        "color-yellow-900-inverse": "var(--primary-l400)",
        "color-orange": "var(--base-color-6)",
        "color-orange-fade": "var(--base-color-6-fade)",
        "color-orange-inverse": "var(--base-color-6-inverse)",
        "color-orange-inverse-fade": "var(--base-color-6-inverse-fade)",
        "color-orange-50": "var(--base-color-6-l500)",
        "color-orange-100": "var(--base-color-6-l400)",
        "color-orange-200": "var(--base-color-6-l300)",
        "color-orange-300": "var(--base-color-6-l200)",
        "color-orange-400": "var(--base-color-6-l100)",
        "color-orange-500": "var(--base-color-6-b000)",
        "color-orange-600": "var(--base-color-6-d100)",
        "color-orange-700": "var(--base-color-6-d200)",
        "color-orange-800": "var(--base-color-6-d300)",
        "color-orange-900": "var(--base-color-6-d400)",
        "color-orange-950": "var(--base-color-6-d400)",
        "color-orange-100-inverse": "var(--primary-l400)",
        "color-orange-200-inverse": "var(--primary-l300)",
        "color-orange-300-inverse": "var(--primary-l200)",
        "color-orange-400-inverse": "var(--primary-l100)",
        "color-orange-500-inverse": "var(--primary-b000)",
        "color-orange-600-inverse": "var(--primary-d100)",
        "color-orange-700-inverse": "var(--primary-d200)",
        "color-orange-800-inverse": "var(--primary-d300)",
        "color-orange-900-inverse": "var(--primary-d400)",
        "color-red": "var(--base-color-7)",
        "color-red-fade": "var(--base-color-7-fade)",
        "color-red-inverse": "var(--base-color-7-inverse)",
        "color-red-inverse-fade": "var(--base-color-7-inverse-fade)",
        "color-red-50": "var(--base-color-7-l500)",
        "color-red-100": "var(--base-color-7-l400)",
        "color-red-200": "var(--base-color-7-l300)",
        "color-red-300": "var(--base-color-7-l200)",
        "color-red-400": "var(--base-color-7-l100)",
        "color-red-500": "var(--base-color-7-b000)",
        "color-red-600": "var(--base-color-7-d100)",
        "color-red-700": "var(--base-color-7-d200)",
        "color-red-800": "var(--base-color-7-d300)",
        "color-red-900": "var(--base-color-7-d400)",
        "color-red-950": "var(--base-color-7-l500)",
        "color-red-100-inverse": "var(--base-color-4-d400)",
        "color-red-200-inverse": "var(--base-color-4-d300)",
        "color-red-300-inverse": "var(--base-color-4-d200)",
        "color-red-400-inverse": "var(--base-color-4-d100)",
        "color-red-500-inverse": "var(--base-color-4-b000)",
        "color-red-600-inverse": "var(--base-color-4-l100)",
        "color-red-700-inverse": "var(--base-color-4-l200)",
        "color-red-800-inverse": "var(--base-color-4-l300)",
        "color-red-900-inverse": "var(--base-color-4-l400)",
        "color-purple": "var(--base-color-8)",
        "color-purple-fade": "var(--base-color-8-fade)",
        "color-purple-inverse": "var(--base-color-8-inverse)",
        "color-purple-inverse-fade": "var(--base-color-8-inverse-fade)",
        "color-purple-50": "var(--base-color-8-l500)",
        "color-purple-100": "var(--base-color-8-l400)",
        "color-purple-200": "var(--base-color-8-l300)",
        "color-purple-300": "var(--base-color-8-l200)",
        "color-purple-400": "var(--base-color-8-l100)",
        "color-purple-500": "var(--base-color-8-b000)",
        "color-purple-600": "var(--base-color-8-d100)",
        "color-purple-700": "var(--base-color-8-d200)",
        "color-purple-800": "var(--base-color-8-d300)",
        "color-purple-900": "var(--base-color-8-d400)",
        "color-purple-950": "var(--base-color-8-d500)",
        "color-purple-100-inverse": "var(--base-color-3-d400)",
        "color-purple-200-inverse": "var(--base-color-3-d300)",
        "color-purple-300-inverse": "var(--base-color-3-d200)",
        "color-purple-400-inverse": "var(--base-color-3-d100)",
        "color-purple-500-inverse": "var(--base-color-3-b000)",
        "color-purple-600-inverse": "var(--base-color-3-l100)",
        "color-purple-700-inverse": "var(--base-color-3-l200)",
        "color-purple-800-inverse": "var(--base-color-3-l300)",
        "color-purple-900-inverse": "var(--base-color-3-l400)",
        "color-smoke": "var(--base-color-9)",
        "color-smoke-fade": "var(--base-color-9-fade)",
        "color-smoke-inverse": "var(--base-color-9-inverse)",
        "color-smoke-inverse-fade": "var(--base-color-9-inverse-fade)",
        "color-smoke-100": "var(--base-color-9-l400)",
        "color-smoke-200": "var(--base-color-9-l300)",
        "color-smoke-300": "var(--base-color-9-l200)",
        "color-smoke-400": "var(--base-color-9-l100)",
        "color-smoke-500": "var(--base-color-9-b000)",
        "color-smoke-600": "var(--base-color-9-d100)",
        "color-smoke-700": "var(--base-color-9-d200)",
        "color-smoke-800": "var(--base-color-9-d300)",
        "color-smoke-900": "var(--base-color-9-d400)",
        "color-slate-50": "var(--base-color-9-b000)",
        "color-slate-100": "var(--base-color-9-l400)",
        "color-slate-200": "var(--base-color-9-l300)",
        "color-slate-300": "var(--base-color-9-l200)",
        "color-slate-400": "var(--base-color-9-l100)",
        "color-slate-500": "var(--base-color-9-b000)",
        "color-slate-600": "var(--base-color-9-d100)",
        "color-slate-700": "var(--base-color-9-d200)",
        "color-slate-800": "var(--base-color-9-d300)",
        "color-slate-900": "var(--base-color-9-d400)",
        "color-slate-950": "var(--base-color-9-d400)",
        "color-grey-100": "var(--base-grey-l700)",
        "color-grey-150": "var(--base-grey-l600)",
        "color-grey-200": "var(--base-grey-l500)",
        "color-grey-250": "var(--base-grey-l400)",
        "color-grey-300": "var(--base-grey-l300)",
        "color-grey-350": "var(--base-grey-l200)",
        "color-grey-400": "var(--base-grey-l100)",
        "color-grey-450": "var(--base-grey-d100)",
        "color-grey-500": "var(--base-grey-d200)",
        "color-grey-550": "var(--base-grey-d200)",
        "color-grey-600": "var(--base-grey-d400)",
        "color-grey-650": "var(--base-grey-d500)",
        "color-grey-700": "var(--base-grey-d600)",
        "color-grey-750": "var(--base-grey-d700)",
        "color-grey-800": "var(--base-grey-d800)",
        "shadow-2xs": "var(--shadow-2xs)",
        "shadow-xs": "var(--shadow-xs)",
        "shadow-sm":
          "0.95px .5px 0 currentColor,1.45px 1px 0 currentColor,1.95px 1.5px 0 currentColor,2.45px 2px 0 currentColor,2.95px 2.5px 0 currentColor,3.45px 3px 0 currentColor,3.95px 3.5px 0 currentColor",
        shadow:
          "0.95px .5px 0 currentColor,1.45px 1px 0 currentColor,1.95px 1.5px 0 currentColor,2.45px 2px 0 currentColor,2.95px 2.5px 0 currentColor,3.45px 3px 0 currentColor,3.95px 3.5px 0 currentColor,4.45px 4px 0 currentColor, currentColor,4.95px 4.5px 0 currentColor,5.45px 5px 0",
        "shadow-md":
          "0.95px .5px 0 currentColor,1.45px 1px 0 currentColor,1.95px 1.5px 0 currentColor,2.45px 2px 0 currentColor,2.95px 2.5px 0 currentColor,3.45px 3px 0 currentColor,3.95px 3.5px 0 currentColor,4.45px 4px 0 currentColor",
        "shadow-lg":
          "0.95px .5px 0 currentColor,1.45px 1px 0 currentColor,1.95px 1.5px 0 currentColor,2.45px 2px 0 currentColor,2.95px 2.5px 0 currentColor,3.45px 3px 0 currentColor,3.95px 3.5px 0 currentColor,4.45px 4px 0 currentColor,4.95px 4.5px 0 currentColor,5.45px 5px 0 currentColor,5.95px 5.5px 0 currentColor,6.45px 6px 0 currentColor,6.95px 6.5px 0 currentColor,7.45px 7px 0 currentColor,7.95px 7.5px 0 currentColor,8.45px 8px 0",
        "shadow-xl":
          "0.95px .5px 0 currentColor,1.45px 1px 0 currentColor,1.95px 1.5px 0 currentColor,2.45px 2px 0 currentColor,2.95px 2.5px 0 currentColor,3.45px 3px 0 currentColor,3.95px 3.5px 0 currentColor,4.45px 4px 0 currentColor,4.95px 4.5px 0 currentColor,5.45px 5px 0 currentColor,5.95px 5.5px 0 currentColor,6.45px 6px 0 currentColor,6.95px 6.5px 0 currentColor,7.45px 7px 0 currentColor,7.95px 7.5px 0 currentColor,8.45px 8px 0 currentColor,8.95px 8.5px 0 currentColor,9.45px 9px 0 currentColor,9.95px 9.5px 0 currentColor,10.45px 10px 0 currentColor",
        "shadow-2xl": "var(--shadow-2xl)",
        "radius-xs": ".25rem",
        "radius-sm": "calc(var(--radius) * 0.6)",
        "radius-md": "calc(var(--radius) * 0.8)",
        "radius-lg": "var(--radius)",
        "radius-xl": "calc(var(--radius) * 1.4)",
        "radius-2xl": "calc(var(--radius) * 1.8)",
        "radius-3xl": "calc(var(--radius) * 2.2)",
        "radius-4xl": "calc(var(--radius) * 2.6)",
        "tracking-tighter": "calc(var(--tracking-normal) - 0.05em)",
        "tracking-tight": "calc(var(--tracking-normal) - 0.025em)",
        "tracking-normal": "0em",
        "tracking-wide": "calc(var(--tracking-normal) + 0.025em)",
        "tracking-wider": "calc(var(--tracking-normal) + 0.05em)",
        "tracking-widest": "calc(var(--tracking-normal) + 0.1em)",
        "animate-rainbow": "rainbow var(--speed, 2s) infinite linear",
        "animate-heartbeat": "heartbeat 2s infinite ease-in-out",
        "spacing-xxs": ".5rem",
        "spacing-xs": "1rem",
        "spacing-sm": "2rem",
        "spacing-md": "3rem",
        "spacing-lg": "4rem",
        "spacing-xl": "6rem",
        "spacing-xxl": "8rem",
        "color-opacity-25":
          "color-mix(in oklch, var(--dark-blue), transparent 75%)",
        "color-opacity-50":
          "color-mix(in oklch, var(--dark-blue), transparent 50%)",
        "color-opacity-75":
          "color-mix(in oklch, var(--dark-blue), transparent 25%)",
        "chart-6": "oklch(52% 0.10 230.09)",
        "chart-7": "oklch(65% 0.12 219.43)",
        "chart-8": "oklch(78% 0.11 195.12)",
        spacing: "0.25rem",
        "base-primary": "oklch(0.3373 0.0925 258.5200)",
        "base-primary-fade": "oklch(61.56% 0.0494 258.73)",
        "base-primary-inverse": "oklch(83% 0.04 220)",
        "base-primary-inverse-fade": "oklch(86.40% 0.032 220)",
        "base-color-1": "oklch(54.28% 0.0982 220.31)",
        "base-color-1-fade": "oklch(71.63% 0.0762 214.60)",
        "base-color-1-inverse": "oklch(96% 0.01 210)",
        "base-color-1-inverse-fade": "oklch(86.40% 0.009 210)",
        "base-color-2": "oklch(66.27% 0.114 206.90)",
        "base-color-2-fade": "oklch(78.23% 0.094 203.21)",
        "base-color-2-inverse": "oklch(84% 0.14 85.21)",
        "base-color-2-inverse-fade": "oklch(94.00% 0.050 85.21)",
        "base-color-3": "#71c9c5",
        "base-color-3-fade": "oklch(86.35% 0.054 193.29)",
        "base-color-3-inverse": "oklch(45% 0.14 340)",
        "base-color-3-inverse-fade": "oklch(56.00% 0.112 340)",
        "base-color-4": "oklch(83% 0.04 220)",
        "base-color-4-fade": "oklch(90.61% 0.023 220.74)",
        "base-color-4-inverse": "oklch(27% 0.09 254.40)",
        "base-color-4-inverse-fade": "oklch(61.56% 0.0494 258.73)",
        "base-color-5": "oklch(84% 0.14 85.21)",
        "base-color-5-fade": "oklch(94.00% 0.050 85.21)",
        "base-color-5-inverse": "oklch(27% 0.09 254.40)",
        "base-color-5-inverse-fade": "oklch(61.56% 0.0494 258.73)",
        "base-color-6": "oklch(66% 0.18 45)",
        "base-color-6-fade": "oklch(82.08% 0.088 38.17)",
        "base-color-6-inverse": "oklch(27% 0.09 254.40)",
        "base-color-6-inverse-fade": "oklch(61.56% 0.0494 258.73)",
        "base-color-7": "oklch(55% 0.21 32)",
        "base-color-7-fade": "oklch(68.73% 0.144 25.60)",
        "base-color-7-inverse": "oklch(83% 0.04 220)",
        "base-color-7-inverse-fade": "oklch(90.61% 0.023 220.74)",
        "base-color-8": "oklch(45% 0.14 340)",
        "base-color-8-fade": "oklch(69.83% 0.061 347.29)",
        "base-color-8-inverse": "oklch(77.98% 0.085 191.74)",
        "base-color-8-inverse-fade": "oklch(86.35% 0.054 193.29)",
        "base-color-9": "oklch(96% 0.01 210)",
        "base-color-9-fade": "oklch(96.96% 0.005 212.02 / 0.5)",
        "base-color-9-inverse": "oklch(27% 0.09 254.40)",
        "base-color-9-inverse-fade": "oklch(61.56% 0.0494 258.73)",
        "primary-l500": "oklch(68.50% 0.0399 258.40)",
        "primary-l400": "oklch(61.56% 0.0494 258.73)",
        "primary-l300": "oklch(54.80% 0.0595 258.95)",
        "primary-l200": "oklch(47.91% 0.0703 259.06)",
        "primary-l100": "oklch(40.78% 0.0807 258.08)",
        "primary-b000": "oklch(33.73% 0.0925 258.52)",
        "primary-d100": "oklch(31.65% 0.0845 258.31)",
        "primary-d200": "oklch(29.28% 0.0776 259.05)",
        "primary-d300": "oklch(27.00% 0.0681 257.71)",
        "primary-d400": "oklch(24.53% 0.0608 258.67)",
        "primary-d500": "oklch(22.28% 0.0519 258.36)",
        "base-color-1-l400": "oklch(71.63% 0.0762 214.60)",
        "base-color-1-l300": "oklch(67.07% 0.0856 214.58)",
        "base-color-1-l200": "oklch(62.66% 0.0933 215.98)",
        "base-color-1-l100": "oklch(58.35% 0.0973 217.21)",
        "base-color-1-b000": "oklch(54.28% 0.0982 220.31)",
        "base-color-1-d100": "oklch(50.44% 0.0907 219.77)",
        "base-color-1-d200": "oklch(46.26% 0.0835 220.24)",
        "base-color-1-d300": "oklch(42.26% 0.0757 219.56)",
        "base-color-1-d400": "oklch(37.87% 0.0682 220.12)",
        "base-color-2-l500": "oklch(81.68% 0.081 203.65)",
        "base-color-2-l400": "oklch(78.23% 0.094 203.21)",
        "base-color-2-l300": "oklch(74.99% 0.104 203.94)",
        "base-color-2-l200": "oklch(71.90% 0.111 204.81)",
        "base-color-2-l100": "oklch(68.97% 0.114 205.27)",
        "base-color-2-b000": "oklch(66.27% 0.114 206.90)",
        "base-color-2-d100": "oklch(61.23% 0.105 207.31)",
        "base-color-2-d200": "oklch(56.35% 0.097 206.84)",
        "base-color-2-d300": "oklch(51.06% 0.087 206.33)",
        "base-color-2-d400": "oklch(45.94% 0.079 205.57)",
        "base-color-2-d500": "oklch(40.38% 0.069 206.07)",
        "base-color-3-l400": "oklch(86.35% 0.054 193.29)",
        "base-color-3-l300": "oklch(84.26% 0.063 192.24)",
        "base-color-3-l200": "oklch(81.97% 0.070 192.45)",
        "base-color-3-l100": "oklch(79.94% 0.078 191.58)",
        "base-color-3-b000": "oklch(77.98% 0.085 191.74)",
        "base-color-3-d100": "oklch(71.86% 0.078 192.37)",
        "base-color-3-d200": "oklch(65.90% 0.071 191.99)",
        "base-color-3-d300": "oklch(59.81% 0.064 191.50)",
        "base-color-3-d400": "oklch(53.53% 0.057 192.45)",
        "base-color-4-l400": "oklch(90.61% 0.023 220.74)",
        "base-color-4-l300": "oklch(89.18% 0.026 217.96)",
        "base-color-4-l200": "oklch(87.50% 0.030 220.61)",
        "base-color-4-l100": "oklch(86.03% 0.035 219.90)",
        "base-color-4-b000": "oklch(84.63% 0.038 219.96)",
        "base-color-4-d100": "oklch(78.00% 0.035 220.66)",
        "base-color-4-d200": "oklch(71.47% 0.032 220.74)",
        "base-color-4-d300": "oklch(64.80% 0.029 220.85)",
        "base-color-4-d400": "oklch(57.94% 0.025 221.09)",
        "base-color-5-l400": "oklch(94.00% 0.050 85.21)",
        "base-color-5-l300": "oklch(91.00% 0.070 85.21)",
        "base-color-5-l200": "oklch(88.04% 0.100 85.13)",
        "base-color-5-l100": "oklch(86.00% 0.120 85.21)",
        "base-color-5-b000": "oklch(86.42% 0.114 79.75)",
        "base-color-5-d100": "oklch(79.71% 0.105 79.05)",
        "base-color-5-d200": "oklch(73.06% 0.095 79.20)",
        "base-color-5-d300": "oklch(66.25% 0.086 79.38)",
        "base-color-5-d400": "oklch(59.27% 0.076 79.62)",
        "base-color-6-l500": "oklch(85.02% 0.072 37.58)",
        "base-color-6-l400": "oklch(82.08% 0.088 38.17)",
        "base-color-6-l300": "oklch(79.32% 0.105 38.34)",
        "base-color-6-l200": "oklch(76.67% 0.121 37.91)",
        "base-color-6-l100": "oklch(74.11% 0.138 38.05)",
        "base-color-6-b000": "oklch(71.70% 0.154 37.70)",
        "base-color-6-d100": "oklch(66.16% 0.141 37.56)",
        "base-color-6-d200": "oklch(60.80% 0.128 37.87)",
        "base-color-6-d300": "oklch(55.16% 0.115 37.54)",
        "base-color-6-d400": "oklch(49.39% 0.101 38.16)",
        "base-color-6-d500": "oklch(43.77% 0.087 37.71)",
        "base-color-7-l500": "oklch(79.91% 0.085 23.54)",
        "base-color-7-l400": "oklch(75.89% 0.105 24.16)",
        "base-color-7-l300": "oklch(72.15% 0.125 24.22)",
        "base-color-7-l200": "oklch(68.73% 0.144 25.60)",
        "base-color-7-l100": "oklch(65.42% 0.164 26.11)",
        "base-color-7-b000": "oklch(62.54% 0.181 27.16)",
        "base-color-7-d100": "oklch(57.79% 0.166 27.45)",
        "base-color-7-d200": "oklch(53.12% 0.151 27.38)",
        "base-color-7-d300": "oklch(48.18% 0.135 27.29)",
        "base-color-7-d400": "oklch(43.29% 0.119 27.17)",
        "base-color-7-d500": "oklch(38.27% 0.103 26.25)",
        "base-color-8-l500": "oklch(75.12% 0.050 345.99)",
        "base-color-8-l400": "oklch(69.83% 0.061 347.29)",
        "base-color-8-l300": "oklch(64.53% 0.072 347.34)",
        "base-color-8-l200": "oklch(59.51% 0.083 348.54)",
        "base-color-8-l100": "oklch(54.32% 0.096 349.45)",
        "base-color-8-b000": "oklch(49.40% 0.108 350.12)",
        "base-color-8-d100": "oklch(45.74% 0.099 349.97)",
        "base-color-8-d200": "oklch(42.15% 0.090 350.34)",
        "base-color-8-d300": "oklch(38.53% 0.081 349.71)",
        "base-color-8-d400": "oklch(34.77% 0.071 350.15)",
        "base-color-8-d500": "oklch(31.14% 0.060 349.81)",
        "base-color-9-l400": "oklch(97.93% 0.004 215.51)",
        "base-color-9-l300": "oklab(97.63% -0.003 -0.00)",
        "base-color-9-l200": "oklch(97.26% 0.005 212.03)",
        "base-color-9-l100": "oklch(96.96% 0.005 212.02)",
        "base-color-9-b000": "oklch(96.59% 0.006 209.63)",
        "base-color-9-d100": "oklch(89.29% 0.006 197.89)",
        "base-color-9-d200": "oklch(81.66% 0.005 211.84)",
        "base-color-9-d300": "oklch(74.04% 0.005 197.84)",
        "base-color-9-d400": "oklch(66.02% 0.004 215.06)",
        "base-grey-l700": "oklch(95.0% 0.009 254)",
        "base-grey-l600": "oklch(90.0% 0.008 254)",
        "base-grey-l500": "oklch(85.0% 0.007 254)",
        "base-grey-l400": "oklch(80.0% 0.006 254)",
        "base-grey-l300": "oklch(75.0% 0.005 254)",
        "base-grey-l200": "oklch(70.0% 0.004 254)",
        "base-grey-l100": "oklch(65.0% 0.003 254)",
        "base-grey-d100": "oklch(60.0% 0.002 254)",
        "base-grey-d200": "oklch(55.0% 0.001 254)",
        "base-grey-d300": "oklch(50.0% 0.000 254)",
        "base-grey-d400": "oklch(45.0% 0.001 254)",
        "base-grey-d500": "oklch(40.0% 0.002 254)",
        "base-grey-d600": "oklch(35.0% 0.003 254)",
        "base-grey-d700": "oklch(40.0% 0.004 254)",
        "base-grey-d800": "oklch(45.0% 0.005 254)",
        "color-indicator-positive-normal": "var(--color-green)",
        "color-indicator-positive-inverse": "var(--color-green-inverse)",
        "color-indicator-positive-var": "var(--color-green)",
        "color-indicator-negative-normal": "var(--color-red)",
        "color-indicator-negative-inverse": "var(--color-red-inverse)",
        "color-indicator-negative-var": "var(--color-red)",
        "color-indicator-total-normal": "var(--color-dark-blue)",
        "color-indicator-total-inverse": "var(--color-dark-blue-inverse)",
        "color-indicator-total-var": "var(--color-dark-blue-inverse)",
        "color-segment-total-normal": "var(--color-indicator-total-normal)",
        "color-segment-total-inverse": "var(--color-indicator-total-inverse)",
        "color-segment-total-var": "var(--color-indicator-total-var)",
        "color-segment-transient-normal": "var(--color-light-blue)",
        "color-segment-transient-inverse": "var(--color-yellow)",
        "color-segment-transient-var": "var(--color-yellow)",
        "color-segment-group-normal": "var(--color-light-green)",
        "color-segment-group-inverse": "var(--color-orange)",
        "color-segment-group-var": "var(--color-orange)",
        "color-segment-crew-normal": "var(--color-yellow)",
        "color-segment-crew-inverse": "var(--color-purple)",
        "color-segment-crew-var": "var(--color-purple)",
        "color-segment-complimentary-normal": "var(--base-grey-l700)",
        "color-segment-complimentary-inverse": "var(--base-grey-l400)",
        "color-segment-complimentary-var": "var(--base-grey-l400)",
        "color-segment-other-normal": "var(--color-grey-550)",
        "color-segment-other-inverse": "var(--color-grey-250)",
        "color-segment-other-var": "var(--color-grey-250)",
        "color-channel-expedia-normal": "var(--color-yellow)",
        "color-channel-expedia-inverse": "var(--color-yellow-inverse)",
        "color-channel-expedia-var": "var(--color-yellow)",
        "color-channel-booking-normal": "var(--color-light-blue)",
        "color-channel-booking-inverse": "var(--color-light-blue-inverse)",
        "color-channel-booking-var": "var(--color-light-blue)",
        "color-channel-agoda-normal": "var(--color-dark-blue-700)",
        "color-channel-agoda-inverse": "var(--color-dark-blue-700-inverse)",
        "color-channel-agoda-var": "var(--color-dark-blue-700)",
        "color-channel-hopper-normal": "var(--color-red-600)",
        "color-channel-hopper-inverse": "var(--color-red-600-inverse)",
        "color-channel-hopper-var": "var(--color-red-600)",
        "color-channel-hoteltonight-normal": "var(--color-purple-700)",
        "color-channel-hoteltonight-inverse": "var(--color-purple-700-inverse)",
        "color-channel-hoteltonight-var": "var(--color-purple-700)",
        "color-channel-hotelbeds-normal": "var(--color-purple-700)",
        "color-channel-hotelbeds-inverse": "var(--color-purple-700-inverse)",
        "color-channel-hotelbeds-var": "var(--color-purple-700)",
        "color-channel-priceline-normal": "var(--color-dark-blue-500)",
        "color-channel-priceline-inverse": "var(--color-dark-blue-500-inverse)",
        "color-channel-priceline-var": "var(--color-dark-blue-500)",
        "color-channel-airbnb-normal": "var(--color-red-200)",
        "color-channel-airbnb-inverse": "var(--color-red-200-inverse)",
        "color-channel-airbnb-var": "var(--color-red-200)",
        "color-channel-hotwire-normal": "var(--color-red)",
        "color-channel-hotwire-inverse": "var(--color-red-inverse)",
        "color-channel-hotwire-var": "var(--color-red)",
        "color-social-facebook-normal": "var(--color-purple)",
        "color-social-facebook-inverse": "var(--color-purple-inverse)",
        "color-social-facebook-var": "var(--color-purple)",
        "color-social-instagram-normal": "var(--color-red)",
        "color-social-instagram-inverse": "var(--color-red-inverse)",
        "color-social-instagram-var": "var(--color-red)",
        "color-social-x-normal": "var(--color-light-green)",
        "color-social-x-inverse": "var(--color-light-green-inverse)",
        "color-social-x-var": "var(--color-light-green)",
        "color-social-linkedin-normal": "var(--color-green)",
        "color-social-linkedin-inverse": "var(--color-green-inverse)",
        "color-social-linkedin-var": "var(--color-green)",
        "color-social-tiktok-normal": "var(--color-light-green-100)",
        "color-social-tiktok-inverse": "var(--color-light-green-100-inverse)",
        "color-social-tiktok-var": "var(--color-light-green-100)",
        "color-social-blog-normal": "var(--color-yellow)",
        "color-social-blog-inverse": "var(--color-yellow-inverse)",
        "color-social-blog-var": "var(--color-yellow)",
        "color-social-telegram-normal": "var(--color-light-blue)",
        "color-social-telegram-inverse": "var(--color-light-blue-inverse)",
        "color-social-telegram-var": "var(--color-light-blue)",
        "color-social-slack-normal": "var(--color-orange)",
        "color-social-slack-inverse": "var(--color-orange-inverse)",
        "color-social-slack-var": "var(--color-orange)",
        "color-social-youtube-normal": "var(--color-red-600)",
        "color-social-youtube-inverse": "var(--color-red-600-inverse)",
        "color-social-youtube-var": "var(--color-red-600)",
        "color-social-pinterest-normal": "var(--color-red-200)",
        "color-social-pinterest-inverse": "var(--color-red-200-inverse)",
        "color-social-pinterest-var": "var(--color-red-200)",
        "color-social-github-normal": "var(--color-grey-650)",
        "color-social-github-inverse": "var(--color-grey-250)",
        "color-social-github-var": "var(--color-grey-650)",
        "color-review-yelp-normal": "var(--color-red-700)",
        "color-review-yelp-inverse":
          "var(--color-red-700-inverse, var(--background))",
        "color-review-yelp-var": "var(--color-red-700)",
        "color-review-tripadvisor-normal": "var(--color-dark-green-700)",
        "color-review-tripadvisor-inverse":
          "var(--color-dark-green-700-inverse, var(--background))",
        "color-review-tripadvisor-var": "var(--color-dark-green-700)",
        "color-review-expedia-normal": "var(--color-channel-expedia-normal)",
        "color-review-expedia-inverse": "var(--color-channel-expedia-inverse)",
        "color-review-expedia-var": "var(--color-channel-expedia-var)",
        "color-review-booking-normal": "var(--color-channel-booking-normal)",
        "color-review-booking-inverse": "var(--color-channel-booking-inverse)",
        "color-review-booking-var": "var(--color-channel-booking-var)",
        "color-positive": "var(--color-indicator-positive-normal)",
        "color-positive-inverse": "var(--color-indicator-positive-inverse)",
        "color-negative": "var(--color-indicator-negative-normal)",
        "color-negative-inverse": "var(--color-indicator-negative-inverse)",
      },
    },
    dependencies: ["radix-ui"],
    files: [
      {
        path: "registry/common/globals.css",
        type: "registry:style",
        target: "src/app/globals.css",
      },
      {
        path: "registry/common/postcss.config.mjs",
        type: "registry:file",
        target: "postcss.config.mjs",
      },
      {
        path: "registry/common/tsconfig.json",
        type: "registry:file",
        target: "tsconfig.json",
      },
      {
        path: "registry/common/package.json",
        type: "registry:file",
        target: "package.json",
      },
      {
        path: "registry/common/utils.ts",
        type: "registry:lib",
        target: "src/lib/utils.ts",
      },
      {
        path: "registry/common/use-mobile.ts",
        type: "registry:hook",
        target: "src/hooks/use-mobile.ts",
      },
    ],
  },
  {
    name: "blank",
    type: "registry:block",
    title: "Blank",
    description: "A blank application with all brand components and code",
    registryDependencies: [
      "https://metrics-ui.revrebel.io/r/theme.json",
      "https://metrics-ui.revrebel.io/r/brand-header.json",
      "https://metrics-ui.revrebel.io/r/brand-sidebar.json",
      "https://metrics-ui.revrebel.io/r/login.json",
      "https://metrics-ui.revrebel.io/r/logo.json",
      "https://metrics-ui.revrebel.io/r/hero.json",
      "https://metrics-ui.revrebel.io/r/promo.json",
      "https://metrics-ui.revrebel.io/r/product-grid.json",
      "https://metrics-ui.revrebel.io/r/accordion.json",
      "https://metrics-ui.revrebel.io/r/alert.json",
      "https://metrics-ui.revrebel.io/r/alert-dialog.json",
      "https://metrics-ui.revrebel.io/r/aspect-ratio.json",
      "https://metrics-ui.revrebel.io/r/avatar.json",
      "https://metrics-ui.revrebel.io/r/badge.json",
      "https://metrics-ui.revrebel.io/r/breadcrumb.json",
      "https://metrics-ui.revrebel.io/r/button.json",
      "https://metrics-ui.revrebel.io/r/calendar.json",
      "https://metrics-ui.revrebel.io/r/card.json",
      "https://metrics-ui.revrebel.io/r/carousel.json",
      "https://metrics-ui.revrebel.io/r/chart.json",
      "https://metrics-ui.revrebel.io/r/checkbox.json",
      "https://metrics-ui.revrebel.io/r/collapsible.json",
      "https://metrics-ui.revrebel.io/r/command.json",
      "https://metrics-ui.revrebel.io/r/context-menu.json",
      "https://metrics-ui.revrebel.io/r/dialog.json",
      "https://metrics-ui.revrebel.io/r/drawer.json",
      "https://metrics-ui.revrebel.io/r/dropdown-menu.json",
      "https://metrics-ui.revrebel.io/r/form.json",
      "https://metrics-ui.revrebel.io/r/hover-card.json",
      "https://metrics-ui.revrebel.io/r/input.json",
      "https://metrics-ui.revrebel.io/r/input-otp.json",
      "https://metrics-ui.revrebel.io/r/label.json",
      "https://metrics-ui.revrebel.io/r/menubar.json",
      "https://metrics-ui.revrebel.io/r/navigation-menu.json",
      "https://metrics-ui.revrebel.io/r/pagination.json",
      "https://metrics-ui.revrebel.io/r/popover.json",
      "https://metrics-ui.revrebel.io/r/progress.json",
      "https://metrics-ui.revrebel.io/r/radio-group.json",
      "https://metrics-ui.revrebel.io/r/resizable.json",
      "https://metrics-ui.revrebel.io/r/scroll-area.json",
      "https://metrics-ui.revrebel.io/r/select.json",
      "https://metrics-ui.revrebel.io/r/separator.json",
      "https://metrics-ui.revrebel.io/r/sheet.json",
      "https://metrics-ui.revrebel.io/r/sidebar.json",
      "https://metrics-ui.revrebel.io/r/skeleton.json",
      "https://metrics-ui.revrebel.io/r/slider.json",
      "https://metrics-ui.revrebel.io/r/sonner.json",
      "https://metrics-ui.revrebel.io/r/switch.json",
      "https://metrics-ui.revrebel.io/r/table.json",
      "https://metrics-ui.revrebel.io/r/tabs.json",
      "https://metrics-ui.revrebel.io/r/textarea.json",
      "https://metrics-ui.revrebel.io/r/toggle.json",
      "https://metrics-ui.revrebel.io/r/toggle-group.json",
      "https://metrics-ui.revrebel.io/r/tooltip.json",
      "https://metrics-ui.revrebel.io/r/data-table.json",
      "https://metrics-ui.revrebel.io/r/date-picker.json",
    ],
    files: [
      {
        path: "registry/app/demo/[name]/blocks/minimal-layout.tsx",
        type: "registry:file",
        target: "src/app/layout.tsx",
      },
      {
        path: "registry/app/demo/[name]/blocks/blank-page.tsx",
        type: "registry:page",
        target: "src/app/page.tsx",
      },
    ],
  },
  {
    name: "dashboard",
    type: "registry:block",
    title: "Dashboard",
    description: "A dashboard application with your brand themed components",
    registryDependencies: [
      "https://metrics-ui.revrebel.io/r/theme.json",
      "https://metrics-ui.revrebel.io/r/brand-header.json",
      "https://metrics-ui.revrebel.io/r/brand-sidebar.json",
      "https://metrics-ui.revrebel.io/r/login.json",
      "https://metrics-ui.revrebel.io/r/logo.json",
      "https://metrics-ui.revrebel.io/r/hero.json",
      "https://metrics-ui.revrebel.io/r/promo.json",
      "https://metrics-ui.revrebel.io/r/product-grid.json",
      "https://metrics-ui.revrebel.io/r/accordion.json",
      "https://metrics-ui.revrebel.io/r/alert.json",
      "https://metrics-ui.revrebel.io/r/alert-dialog.json",
      "https://metrics-ui.revrebel.io/r/aspect-ratio.json",
      "https://metrics-ui.revrebel.io/r/avatar.json",
      "https://metrics-ui.revrebel.io/r/badge.json",
      "https://metrics-ui.revrebel.io/r/breadcrumb.json",
      "https://metrics-ui.revrebel.io/r/button.json",
      "https://metrics-ui.revrebel.io/r/calendar.json",
      "https://metrics-ui.revrebel.io/r/card.json",
      "https://metrics-ui.revrebel.io/r/carousel.json",
      "https://metrics-ui.revrebel.io/r/chart.json",
      "https://metrics-ui.revrebel.io/r/checkbox.json",
      "https://metrics-ui.revrebel.io/r/collapsible.json",
      "https://metrics-ui.revrebel.io/r/command.json",
      "https://metrics-ui.revrebel.io/r/context-menu.json",
      "https://metrics-ui.revrebel.io/r/dialog.json",
      "https://metrics-ui.revrebel.io/r/drawer.json",
      "https://metrics-ui.revrebel.io/r/dropdown-menu.json",
      "https://metrics-ui.revrebel.io/r/form.json",
      "https://metrics-ui.revrebel.io/r/hover-card.json",
      "https://metrics-ui.revrebel.io/r/input.json",
      "https://metrics-ui.revrebel.io/r/input-otp.json",
      "https://metrics-ui.revrebel.io/r/label.json",
      "https://metrics-ui.revrebel.io/r/menubar.json",
      "https://metrics-ui.revrebel.io/r/navigation-menu.json",
      "https://metrics-ui.revrebel.io/r/pagination.json",
      "https://metrics-ui.revrebel.io/r/popover.json",
      "https://metrics-ui.revrebel.io/r/progress.json",
      "https://metrics-ui.revrebel.io/r/radio-group.json",
      "https://metrics-ui.revrebel.io/r/resizable.json",
      "https://metrics-ui.revrebel.io/r/scroll-area.json",
      "https://metrics-ui.revrebel.io/r/select.json",
      "https://metrics-ui.revrebel.io/r/separator.json",
      "https://metrics-ui.revrebel.io/r/sheet.json",
      "https://metrics-ui.revrebel.io/r/sidebar.json",
      "https://metrics-ui.revrebel.io/r/skeleton.json",
      "https://metrics-ui.revrebel.io/r/slider.json",
      "https://metrics-ui.revrebel.io/r/sonner.json",
      "https://metrics-ui.revrebel.io/r/switch.json",
      "https://metrics-ui.revrebel.io/r/table.json",
      "https://metrics-ui.revrebel.io/r/tabs.json",
      "https://metrics-ui.revrebel.io/r/textarea.json",
      "https://metrics-ui.revrebel.io/r/toggle.json",
      "https://metrics-ui.revrebel.io/r/toggle-group.json",
      "https://metrics-ui.revrebel.io/r/tooltip.json",
      "https://metrics-ui.revrebel.io/r/data-table.json",
      "https://metrics-ui.revrebel.io/r/date-picker.json",
    ],
    files: [
      {
        path: "registry/app/demo/[name]/blocks/shell-layout.tsx",
        type: "registry:file",
        target: "src/app/layout.tsx",
      },
      {
        path: "registry/app/demo/[name]/blocks/dashboard-page.tsx",
        type: "registry:page",
        target: "src/app/page.tsx",
      },
    ],
  },
  {
    name: "store",
    type: "registry:block",
    title: "Store",
    description: "A store application with your brand themed components",
    registryDependencies: [
      "https://metrics-ui.revrebel.io/r/theme.json",
      "https://metrics-ui.revrebel.io/r/brand-header.json",
      "https://metrics-ui.revrebel.io/r/brand-sidebar.json",
      "https://metrics-ui.revrebel.io/r/login.json",
      "https://metrics-ui.revrebel.io/r/logo.json",
      "https://metrics-ui.revrebel.io/r/hero.json",
      "https://metrics-ui.revrebel.io/r/promo.json",
      "https://metrics-ui.revrebel.io/r/product-grid.json",
      "https://metrics-ui.revrebel.io/r/accordion.json",
      "https://metrics-ui.revrebel.io/r/alert.json",
      "https://metrics-ui.revrebel.io/r/alert-dialog.json",
      "https://metrics-ui.revrebel.io/r/aspect-ratio.json",
      "https://metrics-ui.revrebel.io/r/avatar.json",
      "https://metrics-ui.revrebel.io/r/badge.json",
      "https://metrics-ui.revrebel.io/r/breadcrumb.json",
      "https://metrics-ui.revrebel.io/r/button.json",
      "https://metrics-ui.revrebel.io/r/calendar.json",
      "https://metrics-ui.revrebel.io/r/card.json",
      "https://metrics-ui.revrebel.io/r/carousel.json",
      "https://metrics-ui.revrebel.io/r/chart.json",
      "https://metrics-ui.revrebel.io/r/checkbox.json",
      "https://metrics-ui.revrebel.io/r/collapsible.json",
      "https://metrics-ui.revrebel.io/r/command.json",
      "https://metrics-ui.revrebel.io/r/context-menu.json",
      "https://metrics-ui.revrebel.io/r/dialog.json",
      "https://metrics-ui.revrebel.io/r/drawer.json",
      "https://metrics-ui.revrebel.io/r/dropdown-menu.json",
      "https://metrics-ui.revrebel.io/r/form.json",
      "https://metrics-ui.revrebel.io/r/hover-card.json",
      "https://metrics-ui.revrebel.io/r/input.json",
      "https://metrics-ui.revrebel.io/r/input-otp.json",
      "https://metrics-ui.revrebel.io/r/label.json",
      "https://metrics-ui.revrebel.io/r/menubar.json",
      "https://metrics-ui.revrebel.io/r/navigation-menu.json",
      "https://metrics-ui.revrebel.io/r/pagination.json",
      "https://metrics-ui.revrebel.io/r/popover.json",
      "https://metrics-ui.revrebel.io/r/progress.json",
      "https://metrics-ui.revrebel.io/r/radio-group.json",
      "https://metrics-ui.revrebel.io/r/resizable.json",
      "https://metrics-ui.revrebel.io/r/scroll-area.json",
      "https://metrics-ui.revrebel.io/r/select.json",
      "https://metrics-ui.revrebel.io/r/separator.json",
      "https://metrics-ui.revrebel.io/r/sheet.json",
      "https://metrics-ui.revrebel.io/r/sidebar.json",
      "https://metrics-ui.revrebel.io/r/skeleton.json",
      "https://metrics-ui.revrebel.io/r/slider.json",
      "https://metrics-ui.revrebel.io/r/sonner.json",
      "https://metrics-ui.revrebel.io/r/switch.json",
      "https://metrics-ui.revrebel.io/r/table.json",
      "https://metrics-ui.revrebel.io/r/tabs.json",
      "https://metrics-ui.revrebel.io/r/textarea.json",
      "https://metrics-ui.revrebel.io/r/toggle.json",
      "https://metrics-ui.revrebel.io/r/toggle-group.json",
      "https://metrics-ui.revrebel.io/r/tooltip.json",
      "https://metrics-ui.revrebel.io/r/data-table.json",
      "https://metrics-ui.revrebel.io/r/date-picker.json",
    ],
    files: [
      {
        path: "registry/app/demo/[name]/blocks/minimal-layout.tsx",
        type: "registry:file",
        target: "src/app/layout.tsx",
      },
      {
        path: "registry/app/demo/[name]/blocks/store-page.tsx",
        type: "registry:page",
        target: "src/app/page.tsx",
      },
    ],
  },
  {
    name: "brand-header",
    type: "registry:component",
    title: "Brand Header",
    description: "A styled, simple, reusable header",
    registryDependencies: [
      "https://metrics-ui.revrebel.io/r/theme.json",
      "https://metrics-ui.revrebel.io/r/button.json",
      "https://metrics-ui.revrebel.io/r/input.json",
      "https://metrics-ui.revrebel.io/r/avatar.json",
      "https://metrics-ui.revrebel.io/r/sidebar.json",
      "https://metrics-ui.revrebel.io/r/sonner.json",
      "https://metrics-ui.revrebel.io/r/logo.json",
    ],
    files: [
      {
        path: "registry/app/demo/[name]/components/brand-header.tsx",
        type: "registry:component",
        target: "src/components/brand-header.tsx",
      },
      {
        path: "registry/app/demo/[name]/blocks/shell-layout.tsx",
        type: "registry:file",
        target: "src/app/layout.tsx",
      },
      {
        path: "registry/app/demo/[name]/blocks/blank-page.tsx",
        type: "registry:page",
        target: "src/app/page.tsx",
      },
    ],
  },
  {
    name: "brand-sidebar",
    type: "registry:component",
    title: "Brand Sidebar",
    description: "A styled, simple, reusable sidebar",
    registryDependencies: [
      "https://metrics-ui.revrebel.io/r/theme.json",
      "https://metrics-ui.revrebel.io/r/badge.json",
      "https://metrics-ui.revrebel.io/r/button.json",
      "https://metrics-ui.revrebel.io/r/sidebar.json",
      "https://metrics-ui.revrebel.io/r/sonner.json",
    ],
    files: [
      {
        path: "registry/app/demo/[name]/components/brand-sidebar.tsx",
        type: "registry:component",
        target: "src/components/brand-sidebar.tsx",
      },
      {
        path: "registry/app/demo/[name]/blocks/shell-layout.tsx",
        type: "registry:file",
        target: "src/app/layout.tsx",
      },
      {
        path: "registry/app/demo/[name]/blocks/blank-page.tsx",
        type: "registry:page",
        target: "src/app/page.tsx",
      },
    ],
  },
  {
    name: "login",
    type: "registry:component",
    title: "Login",
    description: "Username & password login section with customer quote.",
    registryDependencies: [
      "https://metrics-ui.revrebel.io/r/theme.json",
      "https://metrics-ui.revrebel.io/r/badge.json",
      "https://metrics-ui.revrebel.io/r/button.json",
      "https://metrics-ui.revrebel.io/r/logo.json",
    ],
    files: [
      {
        path: "registry/app/demo/[name]/components/login.tsx",
        type: "registry:component",
        target: "src/components/login.tsx",
      },
      {
        path: "registry/app/demo/[name]/blocks/minimal-layout.tsx",
        type: "registry:file",
        target: "src/app/layout.tsx",
      },
      {
        path: "registry/app/demo/[name]/blocks/blank-page.tsx",
        type: "registry:page",
        target: "src/app/page.tsx",
      },
    ],
  },
  {
    name: "logo",
    type: "registry:component",
    title: "Brand Logo",
    description: "A styled, simple, reusable logo",
    registryDependencies: ["https://metrics-ui.revrebel.io/r/theme.json"],
    files: [
      {
        path: "registry/app/demo/[name]/components/logo.tsx",
        type: "registry:component",
        target: "src/components/logo.tsx",
      },
      {
        path: "registry/app/demo/[name]/blocks/minimal-layout.tsx",
        type: "registry:file",
        target: "src/app/layout.tsx",
      },
      {
        path: "registry/app/demo/[name]/blocks/blank-page.tsx",
        type: "registry:page",
        target: "src/app/page.tsx",
      },
    ],
  },
  {
    name: "hero",
    type: "registry:component",
    title: "Hero",
    description:
      "Attention-grabbing section for the top of your landing pages.",
    registryDependencies: [
      "https://metrics-ui.revrebel.io/r/theme.json",
      "https://metrics-ui.revrebel.io/r/badge.json",
      "https://metrics-ui.revrebel.io/r/button.json",
    ],
    files: [
      {
        path: "registry/app/demo/[name]/components/hero.tsx",
        type: "registry:component",
        target: "src/components/hero.tsx",
      },
      {
        path: "registry/app/demo/[name]/blocks/minimal-layout.tsx",
        type: "registry:file",
        target: "src/app/layout.tsx",
      },
      {
        path: "registry/app/demo/[name]/blocks/blank-page.tsx",
        type: "registry:page",
        target: "src/app/page.tsx",
      },
    ],
  },
  {
    name: "promo",
    type: "registry:component",
    title: "Promo",
    description:
      "Attention-grabbing section to display the current promotional deal.",
    registryDependencies: [
      "https://metrics-ui.revrebel.io/r/theme.json",
      "https://metrics-ui.revrebel.io/r/button.json",
    ],
    files: [
      {
        path: "registry/app/demo/[name]/components/promo.tsx",
        type: "registry:component",
        target: "src/components/promo.tsx",
      },
      {
        path: "registry/app/demo/[name]/blocks/minimal-layout.tsx",
        type: "registry:file",
        target: "src/app/layout.tsx",
      },
      {
        path: "registry/app/demo/[name]/blocks/blank-page.tsx",
        type: "registry:page",
        target: "src/app/page.tsx",
      },
    ],
  },
  {
    name: "product-grid",
    type: "registry:component",
    title: "Product Grid",
    description: "Product grid displaying all products with API to fetch data",
    registryDependencies: ["https://metrics-ui.revrebel.io/r/theme.json"],
    files: [
      {
        path: "registry/app/demo/[name]/components/product-grid.tsx",
        type: "registry:component",
        target: "src/components/product-grid.tsx",
      },
      {
        path: "registry/app/demo/[name]/components/product-grid.tsx",
        type: "registry:lib",
        target: "src/lib/products.ts",
      },
      {
        path: "registry/app/demo/[name]/blocks/minimal-layout.tsx",
        type: "registry:file",
        target: "src/app/layout.tsx",
      },
    ],
  },
  {
    name: "accordion",
    type: "registry:ui",
    title: "Accordion",
    description:
      "A vertically stacked set of interactive headings that each reveal a section of content.",
    files: [
      {
        path: "src/primitives/ui/accordion.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "alert",
    type: "registry:ui",
    title: "Alert",
    description: "Displays a callout for user attention.",
    files: [
      {
        path: "src/primitives/ui/alert.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "alert-dialog",
    type: "registry:ui",
    title: "Alert Dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
    files: [
      {
        path: "src/primitives/ui/alert-dialog.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "aspect-ratio",
    type: "registry:ui",
    title: "Aspect Ratio",
    description: "Displays content within a desired ratio.",
    files: [
      {
        path: "src/primitives/ui/aspect-ratio.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "avatar",
    type: "registry:ui",
    title: "Avatar",
    description: "An image element with a fallback for representing the user.",
    files: [
      {
        path: "src/primitives/ui/avatar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "badge",
    type: "registry:ui",
    title: "Badge",
    description: "Displays a small count or status indicator.",
    files: [
      {
        path: "src/primitives/ui/badge.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "breadcrumb",
    type: "registry:ui",
    title: "Breadcrumb",
    description:
      "Displays the path to the current resource using a hierarchy of links.",
    files: [
      {
        path: "src/primitives/ui/breadcrumb.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button",
    type: "registry:ui",
    title: "Button",
    description: "Allows users to take actions with a single click or tap.",
    files: [
      {
        path: "src/primitives/buttons/button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "calendar",
    type: "registry:ui",
    title: "Calendar",
    description:
      "A date field component that allows users to enter and edit date.",
    files: [
      {
        path: "src/primitives/ui/calendar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "card",
    type: "registry:ui",
    title: "Card",
    description:
      "Containers for displaying content and actions about a single subject.",
    files: [
      {
        path: "src/primitives/ui/card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "carousel",
    type: "registry:ui",
    title: "Carousel",
    description: "A carousel with motion and swipe built using Embla.",
    files: [
      {
        path: "src/primitives/ui/carousel.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "chart",
    type: "registry:ui",
    title: "Chart",
    description:
      "Beautiful charts. Built using Recharts. Copy and paste into your apps.",
    files: [
      {
        path: "src/primitives/charts/chart.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "checkbox",
    type: "registry:ui",
    title: "Checkbox",
    description:
      "Allows users to select multiple items from a list of options.",
    files: [
      {
        path: "src/primitives/ui/checkbox.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "collapsible",
    type: "registry:ui",
    title: "Collapsible",
    description: "An interactive component which expands/collapses a panel.",
    files: [
      {
        path: "src/primitives/ui/collapsible.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "command",
    type: "registry:ui",
    title: "Command",
    description: "Fast, composable, unstyled command menu for React.",
    files: [
      {
        path: "src/primitives/ui/command.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "context-menu",
    type: "registry:ui",
    title: "Context Menu",
    description:
      "Displays a menu located at the pointer, triggered by a right-click or a long-press.",
    files: [
      {
        path: "src/primitives/ui/context-menu.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dialog",
    type: "registry:ui",
    title: "Dialog",
    description:
      "A modal dialog that interrupts the user with important content.",
    files: [
      {
        path: "src/primitives/ui/dialog.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "drawer",
    type: "registry:ui",
    title: "Drawer",
    description: "A drawer component for React.",
    files: [
      {
        path: "src/primitives/ui/drawer.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dropdown-menu",
    type: "registry:ui",
    title: "Dropdown Menu",
    description: "Displays a menu to the user triggered by a button.",
    files: [
      {
        path: "src/primitives/dropdowns/dropdown-menu.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "form",
    type: "registry:ui",
    title: "Form",
    description: "Building forms with React Hook Form and Zod.",
    files: [
      {
        path: "src/primitives/auto-form/form.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "hover-card",
    type: "registry:ui",
    title: "Hover Card",
    description:
      "For sighted users to preview content available behind a link.",
    files: [
      {
        path: "src/primitives/ui/hover-card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input",
    type: "registry:ui",
    title: "Input",
    description:
      "Displays a form input field or a component that looks like an input field.",
    files: [
      {
        path: "src/primitives/inputs/input.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-otp",
    type: "registry:ui",
    title: "Input OTP",
    description:
      "Accessible one-time password component with copy paste functionality.",
    files: [
      {
        path: "src/primitives/inputs/input-otp.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "label",
    type: "registry:ui",
    title: "Label",
    description: "Renders an accessible label associated with controls.",
    files: [
      {
        path: "src/primitives/ui/label.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "menubar",
    type: "registry:ui",
    title: "Menubar",
    description: "A visually persistent menu common in desktop applications.",
    files: [
      {
        path: "src/primitives/menus/menubar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "navigation-menu",
    type: "registry:ui",
    title: "Navigation Menu",
    description: "A collection of links for navigating websites.",
    files: [
      {
        path: "src/primitives/menus/navigation-menu.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "pagination",
    type: "registry:ui",
    title: "Pagination",
    description: "Pagination with page navigation, next and previous links.",
    files: [
      {
        path: "registry/app/demo/[name]/ui/pagination.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "popover",
    type: "registry:ui",
    title: "Popover",
    description: "Displays rich content in a portal, triggered by a button.",
    files: [
      {
        path: "src/primitives/popovers/popover.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "progress",
    type: "registry:ui",
    title: "Progress",
    description:
      "Displays an indicator showing the completion progress of a task.",
    files: [
      {
        path: "src/primitives/ui/progress.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "radio-group",
    type: "registry:ui",
    title: "Radio Group",
    description:
      "A set of checkable buttons where only one button can be checked at a time.",
    files: [
      {
        path: "src/primitives/ui/radio-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "resizable",
    type: "registry:ui",
    title: "Resizable",
    description:
      "Accessible resizable panel groups and layouts with keyboard support.",
    files: [
      {
        path: "registry/app/demo/[name]/ui/resizable.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "scroll-area",
    type: "registry:ui",
    title: "Scroll Area",
    description:
      "Augments native scroll functionality for custom, cross-browser styling.",
    files: [
      {
        path: "src/primitives/ui/scroll-area.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "select",
    type: "registry:ui",
    title: "Select",
    description:
      "Displays a list of options for the user to pick from—triggered by a button.",
    files: [
      {
        path: "src/primitives/ui/select.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "separator",
    type: "registry:ui",
    title: "Separator",
    description: "Visually or semantically separates content.",
    files: [
      {
        path: "src/primitives/ui/separator.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "sheet",
    type: "registry:ui",
    title: "Sheet",
    description:
      "Extends the Dialog component to display content that complements the main content of the screen.",
    files: [
      {
        path: "src/primitives/ui/sheet.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "sidebar",
    type: "registry:ui",
    title: "Sidebar",
    description: "A composable, themeable and customizable sidebar component.",
    files: [
      {
        path: "src/primitives/layouts/sidebar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "skeleton",
    type: "registry:ui",
    title: "Skeleton",
    description: "Use to show a placeholder while content is loading.",
    files: [
      {
        path: "src/primitives/skeleton/skeleton.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "slider",
    type: "registry:ui",
    title: "Slider",
    description:
      "An input where the user selects a value from within a given range.",
    files: [
      {
        path: "src/primitives/ui/slider.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "sonner",
    type: "registry:ui",
    title: "Sonner",
    description: "An opinionated toast component for React.",
    files: [
      {
        path: "src/primitives/ui/sonner.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "switch",
    type: "registry:ui",
    title: "Switch",
    description:
      "A control that allows the user to toggle between checked and not checked.",
    files: [
      {
        path: "src/primitives/ui/switch.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "table",
    type: "registry:ui",
    title: "Table",
    description: "A responsive table component.",
    files: [
      {
        path: "src/primitives/tables/table.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tabs",
    type: "registry:ui",
    title: "Tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    files: [
      {
        path: "src/primitives/ui/tabs.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "textarea",
    type: "registry:ui",
    title: "Textarea",
    description:
      "Displays a form textarea or a component that looks like a textarea.",
    files: [
      {
        path: "src/primitives/ui/textarea.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "toggle",
    type: "registry:ui",
    title: "Toggle",
    description: "A two-state button that can be either on or off.",
    files: [
      {
        path: "src/primitives/ui/toggle.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "toggle-group",
    type: "registry:ui",
    title: "Toggle Group",
    description: "A set of two-state buttons that can be toggled on or off.",
    registryDependencies: ["https://metrics-ui.revrebel.io/r/toggle.json"],
    files: [
      {
        path: "src/primitives/ui/toggle-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tooltip",
    type: "registry:ui",
    title: "Tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    files: [
      {
        path: "src/primitives/ui/tooltip.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "data-table",
    type: "registry:ui",
    title: "Data Table",
    description: "Powerful table and datagrids built using TanStack Table.",
    registryDependencies: ["https://metrics-ui.revrebel.io/r/table.json"],
    files: [],
  },
  {
    name: "date-picker",
    type: "registry:ui",
    title: "Date Picker",
    description: "A date picker component with range and presets.",
    registryDependencies: [
      "https://metrics-ui.revrebel.io/r/button.json",
      "https://metrics-ui.revrebel.io/r/calendar.json",
      "https://metrics-ui.revrebel.io/r/popover.json",
    ],
    files: [],
  },
  {
    name: "config",
    type: "registry:ui",
    title: "Config",
    description: "Auto-generated registry entry for config.",
    files: [
      {
        path: "src/primitives/auto-form/config.ts",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dependencies",
    type: "registry:ui",
    title: "Dependencies",
    description: "Auto-generated registry entry for dependencies.",
    files: [
      {
        path: "src/primitives/auto-form/dependencies.ts",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "array",
    type: "registry:ui",
    title: "Array",
    description: "Auto-generated registry entry for array.",
    files: [
      {
        path: "src/primitives/auto-form/fields/array.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "date",
    type: "registry:ui",
    title: "Date",
    description: "Auto-generated registry entry for date.",
    files: [
      {
        path: "src/primitives/auto-form/fields/date.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "enum",
    type: "registry:ui",
    title: "Enum",
    description: "Auto-generated registry entry for enum.",
    files: [
      {
        path: "src/primitives/auto-form/fields/enum.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "field-group",
    type: "registry:ui",
    title: "Field Group",
    description: "Auto-generated registry entry for field-group.",
    files: [
      {
        path: "src/primitives/auto-form/fields/field-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "field",
    type: "registry:ui",
    title: "Field",
    description: "Auto-generated registry entry for field.",
    files: [
      {
        path: "src/primitives/auto-form/fields/field.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "number",
    type: "registry:ui",
    title: "Number",
    description: "Auto-generated registry entry for number.",
    files: [
      {
        path: "src/primitives/auto-form/fields/number.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "object",
    type: "registry:ui",
    title: "Object",
    description: "Auto-generated registry entry for object.",
    files: [
      {
        path: "src/primitives/auto-form/fields/object.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "helpers",
    type: "registry:ui",
    title: "Helpers",
    description: "Auto-generated registry entry for helpers.",
    files: [
      {
        path: "src/primitives/auto-form/helpers.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "shared-form-types",
    type: "registry:ui",
    title: "Shared Form Types",
    description: "Auto-generated registry entry for shared-form-types.",
    files: [
      {
        path: "src/primitives/auto-form/shared-form-types.ts",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "types",
    type: "registry:ui",
    title: "Types",
    description: "Auto-generated registry entry for types.",
    files: [
      {
        path: "src/primitives/auto-form/types.ts",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-default",
    type: "registry:ui",
    title: "Button Default",
    description: "Auto-generated registry entry for button-default.",
    files: [
      {
        path: "src/primitives/buttons/button-default.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-destructive",
    type: "registry:ui",
    title: "Button Destructive",
    description: "Auto-generated registry entry for button-destructive.",
    files: [
      {
        path: "src/primitives/buttons/button-destructive.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-ghost",
    type: "registry:ui",
    title: "Button Ghost",
    description: "Auto-generated registry entry for button-ghost.",
    files: [
      {
        path: "src/primitives/buttons/button-ghost.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-group-dropdown",
    type: "registry:ui",
    title: "Button Group Dropdown",
    description: "Auto-generated registry entry for button-group-dropdown.",
    files: [
      {
        path: "src/primitives/buttons/button-group-dropdown.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-group-input-group",
    type: "registry:ui",
    title: "Button Group Input Group",
    description: "Auto-generated registry entry for button-group-input-group.",
    files: [
      {
        path: "src/primitives/buttons/button-group-input-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-group-input",
    type: "registry:ui",
    title: "Button Group Input",
    description: "Auto-generated registry entry for button-group-input.",
    files: [
      {
        path: "src/primitives/buttons/button-group-input.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-group-nested",
    type: "registry:ui",
    title: "Button Group Nested",
    description: "Auto-generated registry entry for button-group-nested.",
    files: [
      {
        path: "src/primitives/buttons/button-group-nested.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-group-orientation",
    type: "registry:ui",
    title: "Button Group Orientation",
    description: "Auto-generated registry entry for button-group-orientation.",
    files: [
      {
        path: "src/primitives/buttons/button-group-orientation.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-group-popover",
    type: "registry:ui",
    title: "Button Group Popover",
    description: "Auto-generated registry entry for button-group-popover.",
    files: [
      {
        path: "src/primitives/buttons/button-group-popover.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-group-select",
    type: "registry:ui",
    title: "Button Group Select",
    description: "Auto-generated registry entry for button-group-select.",
    files: [
      {
        path: "src/primitives/buttons/button-group-select.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-group-separator",
    type: "registry:ui",
    title: "Button Group Separator",
    description: "Auto-generated registry entry for button-group-separator.",
    files: [
      {
        path: "src/primitives/buttons/button-group-separator.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-group-size",
    type: "registry:ui",
    title: "Button Group Size",
    description: "Auto-generated registry entry for button-group-size.",
    files: [
      {
        path: "src/primitives/buttons/button-group-size.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-group-split",
    type: "registry:ui",
    title: "Button Group Split",
    description: "Auto-generated registry entry for button-group-split.",
    files: [
      {
        path: "src/primitives/buttons/button-group-split.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-group",
    type: "registry:ui",
    title: "Button Group",
    description: "Auto-generated registry entry for button-group.",
    files: [
      {
        path: "src/primitives/buttons/button-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-icon",
    type: "registry:ui",
    title: "Button Icon",
    description: "Auto-generated registry entry for button-icon.",
    files: [
      {
        path: "src/primitives/buttons/button-icon.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-link",
    type: "registry:ui",
    title: "Button Link",
    description: "Auto-generated registry entry for button-link.",
    files: [
      {
        path: "src/primitives/buttons/button-link.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-outline",
    type: "registry:ui",
    title: "Button Outline",
    description: "Auto-generated registry entry for button-outline.",
    files: [
      {
        path: "src/primitives/buttons/button-outline.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-render",
    type: "registry:ui",
    title: "Button Render",
    description: "Auto-generated registry entry for button-render.",
    files: [
      {
        path: "src/primitives/buttons/button-render.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-rounded",
    type: "registry:ui",
    title: "Button Rounded",
    description: "Auto-generated registry entry for button-rounded.",
    files: [
      {
        path: "src/primitives/buttons/button-rounded.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-secondary",
    type: "registry:ui",
    title: "Button Secondary",
    description: "Auto-generated registry entry for button-secondary.",
    files: [
      {
        path: "src/primitives/buttons/button-secondary.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-size",
    type: "registry:ui",
    title: "Button Size",
    description: "Auto-generated registry entry for button-size.",
    files: [
      {
        path: "src/primitives/buttons/button-size.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-spinner",
    type: "registry:ui",
    title: "Button Spinner",
    description: "Auto-generated registry entry for button-spinner.",
    files: [
      {
        path: "src/primitives/buttons/button-spinner.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button-with-icon",
    type: "registry:ui",
    title: "Button With Icon",
    description: "Auto-generated registry entry for button-with-icon.",
    files: [
      {
        path: "src/primitives/buttons/button-with-icon.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "discover-button",
    type: "registry:ui",
    title: "Discover Button",
    description: "Auto-generated registry entry for discover-button.",
    files: [
      {
        path: "src/primitives/buttons/discover-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "status-button",
    type: "registry:ui",
    title: "Status Button",
    description: "Auto-generated registry entry for status-button.",
    files: [
      {
        path: "src/primitives/buttons/status-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "toolbar-button",
    type: "registry:ui",
    title: "Toolbar Button",
    description: "Auto-generated registry entry for toolbar-button.",
    files: [
      {
        path: "src/primitives/buttons/toolbar-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "chart-demos",
    type: "registry:ui",
    title: "Chart Demos",
    description: "Auto-generated registry entry for chart-demos.",
    files: [
      {
        path: "src/primitives/charts/chart-demos.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "chart-sales-metrics",
    type: "registry:ui",
    title: "Chart Sales Metrics",
    description: "Auto-generated registry entry for chart-sales-metrics.",
    files: [
      {
        path: "src/primitives/charts/chart-sales-metrics.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "line-chart",
    type: "registry:ui",
    title: "Line Chart",
    description: "Auto-generated registry entry for line-chart.",
    files: [
      {
        path: "src/primitives/charts/line-chart.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "statistics-card",
    type: "registry:ui",
    title: "Statistics Card",
    description: "Auto-generated registry entry for statistics-card.",
    files: [
      {
        path: "src/primitives/charts/statistics-card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "statistics-with-status",
    type: "registry:ui",
    title: "Statistics With Status",
    description: "Auto-generated registry entry for statistics-with-status.",
    files: [
      {
        path: "src/primitives/charts/statistics-with-status.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "widget-product-insights",
    type: "registry:ui",
    title: "Widget Product Insights",
    description: "Auto-generated registry entry for widget-product-insights.",
    files: [
      {
        path: "src/primitives/charts/widget-product-insights.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "widget-total-earning",
    type: "registry:ui",
    title: "Widget Total Earning",
    description: "Auto-generated registry entry for widget-total-earning.",
    files: [
      {
        path: "src/primitives/charts/widget-total-earning.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "data-grid-column-filter",
    type: "registry:ui",
    title: "Data Grid Column Filter",
    description: "Auto-generated registry entry for data-grid-column-filter.",
    files: [
      {
        path: "src/primitives/data-grid/data-grid-column-filter.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "data-grid-column-header",
    type: "registry:ui",
    title: "Data Grid Column Header",
    description: "Auto-generated registry entry for data-grid-column-header.",
    files: [
      {
        path: "src/primitives/data-grid/data-grid-column-header.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "data-grid-column-visibility",
    type: "registry:ui",
    title: "Data Grid Column Visibility",
    description:
      "Auto-generated registry entry for data-grid-column-visibility.",
    files: [
      {
        path: "src/primitives/data-grid/data-grid-column-visibility.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "data-grid-pagination",
    type: "registry:ui",
    title: "Data Grid Pagination",
    description: "Auto-generated registry entry for data-grid-pagination.",
    files: [
      {
        path: "src/primitives/data-grid/data-grid-pagination.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "data-grid-table-dnd-rows",
    type: "registry:ui",
    title: "Data Grid Table Dnd Rows",
    description: "Auto-generated registry entry for data-grid-table-dnd-rows.",
    files: [
      {
        path: "src/primitives/data-grid/data-grid-table-dnd-rows.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "data-grid-table-dnd",
    type: "registry:ui",
    title: "Data Grid Table Dnd",
    description: "Auto-generated registry entry for data-grid-table-dnd.",
    files: [
      {
        path: "src/primitives/data-grid/data-grid-table-dnd.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "data-grid-table",
    type: "registry:ui",
    title: "Data Grid Table",
    description: "Auto-generated registry entry for data-grid-table.",
    files: [
      {
        path: "src/primitives/data-grid/data-grid-table.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "data-grid",
    type: "registry:ui",
    title: "Data Grid",
    description: "Auto-generated registry entry for data-grid.",
    files: [
      {
        path: "src/primitives/data-grid/data-grid.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dropdown-language",
    type: "registry:ui",
    title: "Dropdown Language",
    description: "Auto-generated registry entry for dropdown-language.",
    files: [
      {
        path: "src/primitives/dropdowns/dropdown-language.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dropdown-menu-avatar",
    type: "registry:ui",
    title: "Dropdown Menu Avatar",
    description: "Auto-generated registry entry for dropdown-menu-avatar.",
    files: [
      {
        path: "src/primitives/dropdowns/dropdown-menu-avatar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dropdown-menu-basic",
    type: "registry:ui",
    title: "Dropdown Menu Basic",
    description: "Auto-generated registry entry for dropdown-menu-basic.",
    files: [
      {
        path: "src/primitives/dropdowns/dropdown-menu-basic.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dropdown-menu-checkboxes-icons",
    type: "registry:ui",
    title: "Dropdown Menu Checkboxes Icons",
    description:
      "Auto-generated registry entry for dropdown-menu-checkboxes-icons.",
    files: [
      {
        path: "src/primitives/dropdowns/dropdown-menu-checkboxes-icons.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dropdown-menu-checkboxes",
    type: "registry:ui",
    title: "Dropdown Menu Checkboxes",
    description: "Auto-generated registry entry for dropdown-menu-checkboxes.",
    files: [
      {
        path: "src/primitives/dropdowns/dropdown-menu-checkboxes.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dropdown-menu-destructive",
    type: "registry:ui",
    title: "Dropdown Menu Destructive",
    description: "Auto-generated registry entry for dropdown-menu-destructive.",
    files: [
      {
        path: "src/primitives/dropdowns/dropdown-menu-destructive.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dropdown-menu-icons",
    type: "registry:ui",
    title: "Dropdown Menu Icons",
    description: "Auto-generated registry entry for dropdown-menu-icons.",
    files: [
      {
        path: "src/primitives/dropdowns/dropdown-menu-icons.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dropdown-menu-radio-group",
    type: "registry:ui",
    title: "Dropdown Menu Radio Group",
    description: "Auto-generated registry entry for dropdown-menu-radio-group.",
    files: [
      {
        path: "src/primitives/dropdowns/dropdown-menu-radio-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dropdown-menu-radio-icons",
    type: "registry:ui",
    title: "Dropdown Menu Radio Icons",
    description: "Auto-generated registry entry for dropdown-menu-radio-icons.",
    files: [
      {
        path: "src/primitives/dropdowns/dropdown-menu-radio-icons.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dropdown-menu-shortcuts",
    type: "registry:ui",
    title: "Dropdown Menu Shortcuts",
    description: "Auto-generated registry entry for dropdown-menu-shortcuts.",
    files: [
      {
        path: "src/primitives/dropdowns/dropdown-menu-shortcuts.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dropdown-menu-submenu",
    type: "registry:ui",
    title: "Dropdown Menu Submenu",
    description: "Auto-generated registry entry for dropdown-menu-submenu.",
    files: [
      {
        path: "src/primitives/dropdowns/dropdown-menu-submenu.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dropdown-profile",
    type: "registry:ui",
    title: "Dropdown Profile",
    description: "Auto-generated registry entry for dropdown-profile.",
    files: [
      {
        path: "src/primitives/dropdowns/dropdown-profile.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "select-dropdown",
    type: "registry:ui",
    title: "Select Dropdown",
    description: "Auto-generated registry entry for select-dropdown.",
    files: [
      {
        path: "src/primitives/dropdowns/select-dropdown.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "smooth-dropdown",
    type: "registry:ui",
    title: "Smooth Dropdown",
    description: "Auto-generated registry entry for smooth-dropdown.",
    files: [
      {
        path: "src/primitives/dropdowns/smooth-dropdown.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "image-edit-block",
    type: "registry:ui",
    title: "Image Edit Block",
    description: "Auto-generated registry entry for image-edit-block.",
    files: [
      {
        path: "src/primitives/image-blocks/image-edit-block.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "image-edit-dialog",
    type: "registry:ui",
    title: "Image Edit Dialog",
    description: "Auto-generated registry entry for image-edit-dialog.",
    files: [
      {
        path: "src/primitives/image-blocks/image-edit-dialog.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "combobox-option",
    type: "registry:ui",
    title: "Combobox Option",
    description: "Auto-generated registry entry for combobox-option.",
    files: [
      {
        path: "src/primitives/inputs/combobox-option.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "combobox",
    type: "registry:ui",
    title: "Combobox",
    description: "Auto-generated registry entry for combobox.",
    files: [
      {
        path: "src/primitives/inputs/combobox.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-badge",
    type: "registry:ui",
    title: "Input Badge",
    description: "Auto-generated registry entry for input-badge.",
    files: [
      {
        path: "src/primitives/inputs/input-badge.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-basic",
    type: "registry:ui",
    title: "Input Basic",
    description: "Auto-generated registry entry for input-basic.",
    files: [
      {
        path: "src/primitives/inputs/input-basic.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-button-group",
    type: "registry:ui",
    title: "Input Button Group",
    description: "Auto-generated registry entry for input-button-group.",
    files: [
      {
        path: "src/primitives/inputs/input-button-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-disabled",
    type: "registry:ui",
    title: "Input Disabled",
    description: "Auto-generated registry entry for input-disabled.",
    files: [
      {
        path: "src/primitives/inputs/input-disabled.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-field",
    type: "registry:ui",
    title: "Input Field",
    description: "Auto-generated registry entry for input-field.",
    files: [
      {
        path: "src/primitives/inputs/input-field.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-fieldgroup",
    type: "registry:ui",
    title: "Input Fieldgroup",
    description: "Auto-generated registry entry for input-fieldgroup.",
    files: [
      {
        path: "src/primitives/inputs/input-fieldgroup.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-file",
    type: "registry:ui",
    title: "Input File",
    description: "Auto-generated registry entry for input-file.",
    files: [
      {
        path: "src/primitives/inputs/input-file.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-form",
    type: "registry:ui",
    title: "Input Form",
    description: "Auto-generated registry entry for input-form.",
    files: [
      {
        path: "src/primitives/inputs/input-form.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-grid",
    type: "registry:ui",
    title: "Input Grid",
    description: "Auto-generated registry entry for input-grid.",
    files: [
      {
        path: "src/primitives/inputs/input-grid.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-basic",
    type: "registry:ui",
    title: "Input Group Basic",
    description: "Auto-generated registry entry for input-group-basic.",
    files: [
      {
        path: "src/primitives/inputs/input-group-basic.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-block-end",
    type: "registry:ui",
    title: "Input Group Block End",
    description: "Auto-generated registry entry for input-group-block-end.",
    files: [
      {
        path: "src/primitives/inputs/input-group-block-end.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-block-start",
    type: "registry:ui",
    title: "Input Group Block Start",
    description: "Auto-generated registry entry for input-group-block-start.",
    files: [
      {
        path: "src/primitives/inputs/input-group-block-start.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-button-group",
    type: "registry:ui",
    title: "Input Group Button Group",
    description: "Auto-generated registry entry for input-group-button-group.",
    files: [
      {
        path: "src/primitives/inputs/input-group-button-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-button",
    type: "registry:ui",
    title: "Input Group Button",
    description: "Auto-generated registry entry for input-group-button.",
    files: [
      {
        path: "src/primitives/inputs/input-group-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-custom",
    type: "registry:ui",
    title: "Input Group Custom",
    description: "Auto-generated registry entry for input-group-custom.",
    files: [
      {
        path: "src/primitives/inputs/input-group-custom.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-dropdown",
    type: "registry:ui",
    title: "Input Group Dropdown",
    description: "Auto-generated registry entry for input-group-dropdown.",
    files: [
      {
        path: "src/primitives/inputs/input-group-dropdown.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-icon",
    type: "registry:ui",
    title: "Input Group Icon",
    description: "Auto-generated registry entry for input-group-icon.",
    files: [
      {
        path: "src/primitives/inputs/input-group-icon.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-in-card",
    type: "registry:ui",
    title: "Input Group In Card",
    description: "Auto-generated registry entry for input-group-in-card.",
    files: [
      {
        path: "src/primitives/inputs/input-group-in-card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-inline-end",
    type: "registry:ui",
    title: "Input Group Inline End",
    description: "Auto-generated registry entry for input-group-inline-end.",
    files: [
      {
        path: "src/primitives/inputs/input-group-inline-end.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-inline-start",
    type: "registry:ui",
    title: "Input Group Inline Start",
    description: "Auto-generated registry entry for input-group-inline-start.",
    files: [
      {
        path: "src/primitives/inputs/input-group-inline-start.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-kbd",
    type: "registry:ui",
    title: "Input Group Kbd",
    description: "Auto-generated registry entry for input-group-kbd.",
    files: [
      {
        path: "src/primitives/inputs/input-group-kbd.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-label",
    type: "registry:ui",
    title: "Input Group Label",
    description: "Auto-generated registry entry for input-group-label.",
    files: [
      {
        path: "src/primitives/inputs/input-group-label.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-spinner",
    type: "registry:ui",
    title: "Input Group Spinner",
    description: "Auto-generated registry entry for input-group-spinner.",
    files: [
      {
        path: "src/primitives/inputs/input-group-spinner.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-text",
    type: "registry:ui",
    title: "Input Group Text",
    description: "Auto-generated registry entry for input-group-text.",
    files: [
      {
        path: "src/primitives/inputs/input-group-text.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-textarea-examples",
    type: "registry:ui",
    title: "Input Group Textarea Examples",
    description:
      "Auto-generated registry entry for input-group-textarea-examples.",
    files: [
      {
        path: "src/primitives/inputs/input-group-textarea-examples.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-textarea",
    type: "registry:ui",
    title: "Input Group Textarea",
    description: "Auto-generated registry entry for input-group-textarea.",
    files: [
      {
        path: "src/primitives/inputs/input-group-textarea.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-tooltip",
    type: "registry:ui",
    title: "Input Group Tooltip",
    description: "Auto-generated registry entry for input-group-tooltip.",
    files: [
      {
        path: "src/primitives/inputs/input-group-tooltip.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-with-addons",
    type: "registry:ui",
    title: "Input Group With Addons",
    description: "Auto-generated registry entry for input-group-with-addons.",
    files: [
      {
        path: "src/primitives/inputs/input-group-with-addons.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-with-buttons",
    type: "registry:ui",
    title: "Input Group With Buttons",
    description: "Auto-generated registry entry for input-group-with-buttons.",
    files: [
      {
        path: "src/primitives/inputs/input-group-with-buttons.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-with-kbd",
    type: "registry:ui",
    title: "Input Group With Kbd",
    description: "Auto-generated registry entry for input-group-with-kbd.",
    files: [
      {
        path: "src/primitives/inputs/input-group-with-kbd.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group-with-tooltip",
    type: "registry:ui",
    title: "Input Group With Tooltip",
    description: "Auto-generated registry entry for input-group-with-tooltip.",
    files: [
      {
        path: "src/primitives/inputs/input-group-with-tooltip.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-group",
    type: "registry:ui",
    title: "Input Group",
    description: "Auto-generated registry entry for input-group.",
    files: [
      {
        path: "src/primitives/inputs/input-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-inline",
    type: "registry:ui",
    title: "Input Inline",
    description: "Auto-generated registry entry for input-inline.",
    files: [
      {
        path: "src/primitives/inputs/input-inline.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-input-group",
    type: "registry:ui",
    title: "Input Input Group",
    description: "Auto-generated registry entry for input-input-group.",
    files: [
      {
        path: "src/primitives/inputs/input-input-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-invalid",
    type: "registry:ui",
    title: "Input Invalid",
    description: "Auto-generated registry entry for input-invalid.",
    files: [
      {
        path: "src/primitives/inputs/input-invalid.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-otp-alphanumeric",
    type: "registry:ui",
    title: "Input Otp Alphanumeric",
    description: "Auto-generated registry entry for input-otp-alphanumeric.",
    files: [
      {
        path: "src/primitives/inputs/input-otp-alphanumeric.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-otp-controlled",
    type: "registry:ui",
    title: "Input Otp Controlled",
    description: "Auto-generated registry entry for input-otp-controlled.",
    files: [
      {
        path: "src/primitives/inputs/input-otp-controlled.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-otp-disabled",
    type: "registry:ui",
    title: "Input Otp Disabled",
    description: "Auto-generated registry entry for input-otp-disabled.",
    files: [
      {
        path: "src/primitives/inputs/input-otp-disabled.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-otp-form",
    type: "registry:ui",
    title: "Input Otp Form",
    description: "Auto-generated registry entry for input-otp-form.",
    files: [
      {
        path: "src/primitives/inputs/input-otp-form.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-otp-four-digits",
    type: "registry:ui",
    title: "Input Otp Four Digits",
    description: "Auto-generated registry entry for input-otp-four-digits.",
    files: [
      {
        path: "src/primitives/inputs/input-otp-four-digits.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-otp-invalid",
    type: "registry:ui",
    title: "Input Otp Invalid",
    description: "Auto-generated registry entry for input-otp-invalid.",
    files: [
      {
        path: "src/primitives/inputs/input-otp-invalid.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-otp-pattern",
    type: "registry:ui",
    title: "Input Otp Pattern",
    description: "Auto-generated registry entry for input-otp-pattern.",
    files: [
      {
        path: "src/primitives/inputs/input-otp-pattern.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "input-otp-separator",
    type: "registry:ui",
    title: "Input Otp Separator",
    description: "Auto-generated registry entry for input-otp-separator.",
    files: [
      {
        path: "src/primitives/inputs/input-otp-separator.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "coming-soon",
    type: "registry:ui",
    title: "Coming Soon",
    description: "Auto-generated registry entry for coming-soon.",
    files: [
      {
        path: "src/primitives/layouts/coming-soon.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "measured-container",
    type: "registry:ui",
    title: "Measured Container",
    description: "Auto-generated registry entry for measured-container.",
    files: [
      {
        path: "src/primitives/layouts/measured-container.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "navigation-progress",
    type: "registry:ui",
    title: "Navigation Progress",
    description: "Auto-generated registry entry for navigation-progress.",
    files: [
      {
        path: "src/primitives/layouts/navigation-progress.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "resizable-handle",
    type: "registry:ui",
    title: "Resizable Handle",
    description: "Auto-generated registry entry for resizable-handle.",
    files: [
      {
        path: "src/primitives/layouts/resizable-handle.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "resizable-vertical",
    type: "registry:ui",
    title: "Resizable Vertical",
    description: "Auto-generated registry entry for resizable-vertical.",
    files: [
      {
        path: "src/primitives/layouts/resizable-vertical.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "social-proof-01",
    type: "registry:ui",
    title: "Social Proof 01",
    description: "Auto-generated registry entry for social-proof-01.",
    files: [
      {
        path: "src/primitives/layouts/social-proof-01.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "social-proof-07",
    type: "registry:ui",
    title: "Social Proof 07",
    description: "Auto-generated registry entry for social-proof-07.",
    files: [
      {
        path: "src/primitives/layouts/social-proof-07.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "sub-nav",
    type: "registry:ui",
    title: "Sub Nav",
    description: "Auto-generated registry entry for sub-nav.",
    files: [
      {
        path: "src/primitives/layouts/sub-nav.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "swap-layout-loader",
    type: "registry:ui",
    title: "Swap Layout Loader",
    description: "Auto-generated registry entry for swap-layout-loader.",
    files: [
      {
        path: "src/primitives/layouts/swap-layout-loader.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "swap-layout",
    type: "registry:ui",
    title: "Swap Layout",
    description: "Auto-generated registry entry for swap-layout.",
    files: [
      {
        path: "src/primitives/layouts/swap-layout.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "link-bubble-menu",
    type: "registry:ui",
    title: "Link Bubble Menu",
    description: "Auto-generated registry entry for link-bubble-menu.",
    files: [
      {
        path: "src/primitives/links/link-bubble-menu.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "link-edit-block",
    type: "registry:ui",
    title: "Link Edit Block",
    description: "Auto-generated registry entry for link-edit-block.",
    files: [
      {
        path: "src/primitives/links/link-edit-block.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "link-edit-popover",
    type: "registry:ui",
    title: "Link Edit Popover",
    description: "Auto-generated registry entry for link-edit-popover.",
    files: [
      {
        path: "src/primitives/links/link-edit-popover.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "link-popover-block",
    type: "registry:ui",
    title: "Link Popover Block",
    description: "Auto-generated registry entry for link-popover-block.",
    files: [
      {
        path: "src/primitives/links/link-popover-block.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "list-item",
    type: "registry:ui",
    title: "List Item",
    description: "Auto-generated registry entry for list-item.",
    files: [
      {
        path: "src/primitives/lists/list-item.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "menu-option",
    type: "registry:ui",
    title: "Menu Option",
    description: "Auto-generated registry entry for menu-option.",
    files: [
      {
        path: "src/primitives/menus/menu-option.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "menu-other",
    type: "registry:ui",
    title: "Menu Other",
    description: "Auto-generated registry entry for menu-other.",
    files: [
      {
        path: "src/primitives/menus/menu-other.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "menu",
    type: "registry:ui",
    title: "Menu",
    description: "Auto-generated registry entry for menu.",
    files: [
      {
        path: "src/primitives/menus/menu.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "menubar-checkbox",
    type: "registry:ui",
    title: "Menubar Checkbox",
    description: "Auto-generated registry entry for menubar-checkbox.",
    files: [
      {
        path: "src/primitives/menus/menubar-checkbox.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "menubar-icons",
    type: "registry:ui",
    title: "Menubar Icons",
    description: "Auto-generated registry entry for menubar-icons.",
    files: [
      {
        path: "src/primitives/menus/menubar-icons.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "menubar-radio",
    type: "registry:ui",
    title: "Menubar Radio",
    description: "Auto-generated registry entry for menubar-radio.",
    files: [
      {
        path: "src/primitives/menus/menubar-radio.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "menubar-submenu",
    type: "registry:ui",
    title: "Menubar Submenu",
    description: "Auto-generated registry entry for menubar-submenu.",
    files: [
      {
        path: "src/primitives/menus/menubar-submenu.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "popover-alignments",
    type: "registry:ui",
    title: "Popover Alignments",
    description: "Auto-generated registry entry for popover-alignments.",
    files: [
      {
        path: "src/primitives/popovers/popover-alignments.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "popover-basic",
    type: "registry:ui",
    title: "Popover Basic",
    description: "Auto-generated registry entry for popover-basic.",
    files: [
      {
        path: "src/primitives/popovers/popover-basic.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "popover-form",
    type: "registry:ui",
    title: "Popover Form",
    description: "Auto-generated registry entry for popover-form.",
    files: [
      {
        path: "src/primitives/popovers/popover-form.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "add-to-cursor",
    type: "registry:ui",
    title: "Add To Cursor",
    description: "Auto-generated registry entry for add-to-cursor.",
    files: [
      {
        path: "src/primitives/registry/add-to-cursor.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "component-card",
    type: "registry:ui",
    title: "Component Card",
    description: "Auto-generated registry entry for component-card.",
    files: [
      {
        path: "src/primitives/registry/component-card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "mcp-tabs",
    type: "registry:ui",
    title: "Mcp Tabs",
    description: "Auto-generated registry entry for mcp-tabs.",
    files: [
      {
        path: "src/primitives/registry/mcp-tabs.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "open-in-v0",
    type: "registry:ui",
    title: "Open In V0",
    description: "Auto-generated registry entry for open-in-v0.",
    files: [
      {
        path: "src/primitives/registry/open-in-v0.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "registry-logo",
    type: "registry:ui",
    title: "Registry Logo",
    description: "Auto-generated registry entry for registry-logo.",
    files: [
      {
        path: "src/primitives/registry/registry-logo.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "registry-sidebar",
    type: "registry:ui",
    title: "Registry Sidebar",
    description: "Auto-generated registry entry for registry-sidebar.",
    files: [
      {
        path: "src/primitives/registry/registry-sidebar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "theme-toggle",
    type: "registry:ui",
    title: "Theme Toggle",
    description: "Auto-generated registry entry for theme-toggle.",
    files: [
      {
        path: "src/primitives/registry/theme-toggle.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "five",
    type: "registry:ui",
    title: "Five",
    description: "Auto-generated registry entry for five.",
    files: [
      {
        path: "src/primitives/sections/five.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "four",
    type: "registry:ui",
    title: "Four",
    description: "Auto-generated registry entry for four.",
    files: [
      {
        path: "src/primitives/sections/four.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "one",
    type: "registry:ui",
    title: "One",
    description: "Auto-generated registry entry for one.",
    files: [
      {
        path: "src/primitives/sections/one.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "three",
    type: "registry:ui",
    title: "Three",
    description: "Auto-generated registry entry for three.",
    files: [
      {
        path: "src/primitives/sections/three.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "toolbar-section",
    type: "registry:ui",
    title: "Toolbar Section",
    description: "Auto-generated registry entry for toolbar-section.",
    files: [
      {
        path: "src/primitives/sections/toolbar-section.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "two",
    type: "registry:ui",
    title: "Two",
    description: "Auto-generated registry entry for two.",
    files: [
      {
        path: "src/primitives/sections/two.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "empty-state",
    type: "registry:ui",
    title: "Empty State",
    description: "Auto-generated registry entry for empty-state.",
    files: [
      {
        path: "src/primitives/skeleton/empty-state.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "skeleton-avatar",
    type: "registry:ui",
    title: "Skeleton Avatar",
    description: "Auto-generated registry entry for skeleton-avatar.",
    files: [
      {
        path: "src/primitives/skeleton/skeleton-avatar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "skeleton-card",
    type: "registry:ui",
    title: "Skeleton Card",
    description: "Auto-generated registry entry for skeleton-card.",
    files: [
      {
        path: "src/primitives/skeleton/skeleton-card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "skeleton-demo",
    type: "registry:ui",
    title: "Skeleton Demo",
    description: "Auto-generated registry entry for skeleton-demo.",
    files: [
      {
        path: "src/primitives/skeleton/skeleton-demo.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "skeleton-form",
    type: "registry:ui",
    title: "Skeleton Form",
    description: "Auto-generated registry entry for skeleton-form.",
    files: [
      {
        path: "src/primitives/skeleton/skeleton-form.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "skeleton-table",
    type: "registry:ui",
    title: "Skeleton Table",
    description: "Auto-generated registry entry for skeleton-table.",
    files: [
      {
        path: "src/primitives/skeleton/skeleton-table.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "skeleton-text",
    type: "registry:ui",
    title: "Skeleton Text",
    description: "Auto-generated registry entry for skeleton-text.",
    files: [
      {
        path: "src/primitives/skeleton/skeleton-text.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "datatable-transaction",
    type: "registry:ui",
    title: "Datatable Transaction",
    description: "Auto-generated registry entry for datatable-transaction.",
    files: [
      {
        path: "src/primitives/tables/datatable-transaction.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "table-actions",
    type: "registry:ui",
    title: "Table Actions",
    description: "Auto-generated registry entry for table-actions.",
    files: [
      {
        path: "src/primitives/tables/table-actions.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "table-footer",
    type: "registry:ui",
    title: "Table Footer",
    description: "Auto-generated registry entry for table-footer.",
    files: [
      {
        path: "src/primitives/tables/table-footer.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "discrete-tabs",
    type: "registry:ui",
    title: "Discrete Tabs",
    description: "Auto-generated registry entry for discrete-tabs.",
    files: [
      {
        path: "src/primitives/tabs/discrete-tabs.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tabs-disabled",
    type: "registry:ui",
    title: "Tabs Disabled",
    description: "Auto-generated registry entry for tabs-disabled.",
    files: [
      {
        path: "src/primitives/tabs/tabs-disabled.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tabs-icons",
    type: "registry:ui",
    title: "Tabs Icons",
    description: "Auto-generated registry entry for tabs-icons.",
    files: [
      {
        path: "src/primitives/tabs/tabs-icons.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tabs-line",
    type: "registry:ui",
    title: "Tabs Line",
    description: "Auto-generated registry entry for tabs-line.",
    files: [
      {
        path: "src/primitives/tabs/tabs-line.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tabs-vertical",
    type: "registry:ui",
    title: "Tabs Vertical",
    description: "Auto-generated registry entry for tabs-vertical.",
    files: [
      {
        path: "src/primitives/tabs/tabs-vertical.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "long-text",
    type: "registry:ui",
    title: "Long Text",
    description: "Auto-generated registry entry for long-text.",
    files: [
      {
        path: "src/primitives/textarea/long-text.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "textarea-button",
    type: "registry:ui",
    title: "Textarea Button",
    description: "Auto-generated registry entry for textarea-button.",
    files: [
      {
        path: "src/primitives/textarea/textarea-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "textarea-disabled",
    type: "registry:ui",
    title: "Textarea Disabled",
    description: "Auto-generated registry entry for textarea-disabled.",
    files: [
      {
        path: "src/primitives/textarea/textarea-disabled.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "textarea-field",
    type: "registry:ui",
    title: "Textarea Field",
    description: "Auto-generated registry entry for textarea-field.",
    files: [
      {
        path: "src/primitives/textarea/textarea-field.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "textarea-invalid",
    type: "registry:ui",
    title: "Textarea Invalid",
    description: "Auto-generated registry entry for textarea-invalid.",
    files: [
      {
        path: "src/primitives/textarea/textarea-invalid.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "v1-1-0",
    type: "registry:ui",
    title: "V1 1 0",
    description: "Auto-generated registry entry for v1-1-0.",
    files: [
      {
        path: "src/primitives/timelines/content/v1-1-0.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "v1-2-0",
    type: "registry:ui",
    title: "V1 2 0",
    description: "Auto-generated registry entry for v1-2-0.",
    files: [
      {
        path: "src/primitives/timelines/content/v1-2-0.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "v1-3-0",
    type: "registry:ui",
    title: "V1 3 0",
    description: "Auto-generated registry entry for v1-3-0.",
    files: [
      {
        path: "src/primitives/timelines/content/v1-3-0.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "timeline-component-05",
    type: "registry:ui",
    title: "Timeline Component 05",
    description: "Auto-generated registry entry for timeline-component-05.",
    files: [
      {
        path: "src/primitives/timelines/timeline-component-05.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "typography-blockquote",
    type: "registry:ui",
    title: "Typography Blockquote",
    description: "Auto-generated registry entry for typography-blockquote.",
    files: [
      {
        path: "src/primitives/typography/typography-blockquote.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "typography-h1",
    type: "registry:ui",
    title: "Typography H1",
    description: "Auto-generated registry entry for typography-h1.",
    files: [
      {
        path: "src/primitives/typography/typography-h1.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "typography-h2",
    type: "registry:ui",
    title: "Typography H2",
    description: "Auto-generated registry entry for typography-h2.",
    files: [
      {
        path: "src/primitives/typography/typography-h2.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "typography-h3",
    type: "registry:ui",
    title: "Typography H3",
    description: "Auto-generated registry entry for typography-h3.",
    files: [
      {
        path: "src/primitives/typography/typography-h3.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "typography-h4",
    type: "registry:ui",
    title: "Typography H4",
    description: "Auto-generated registry entry for typography-h4.",
    files: [
      {
        path: "src/primitives/typography/typography-h4.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "typography-inline-code",
    type: "registry:ui",
    title: "Typography Inline Code",
    description: "Auto-generated registry entry for typography-inline-code.",
    files: [
      {
        path: "src/primitives/typography/typography-inline-code.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "typography-large",
    type: "registry:ui",
    title: "Typography Large",
    description: "Auto-generated registry entry for typography-large.",
    files: [
      {
        path: "src/primitives/typography/typography-large.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "typography-lead",
    type: "registry:ui",
    title: "Typography Lead",
    description: "Auto-generated registry entry for typography-lead.",
    files: [
      {
        path: "src/primitives/typography/typography-lead.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "typography-list",
    type: "registry:ui",
    title: "Typography List",
    description: "Auto-generated registry entry for typography-list.",
    files: [
      {
        path: "src/primitives/typography/typography-list.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "typography-muted",
    type: "registry:ui",
    title: "Typography Muted",
    description: "Auto-generated registry entry for typography-muted.",
    files: [
      {
        path: "src/primitives/typography/typography-muted.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "typography-p",
    type: "registry:ui",
    title: "Typography P",
    description: "Auto-generated registry entry for typography-p.",
    files: [
      {
        path: "src/primitives/typography/typography-p.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "typography-small",
    type: "registry:ui",
    title: "Typography Small",
    description: "Auto-generated registry entry for typography-small.",
    files: [
      {
        path: "src/primitives/typography/typography-small.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "typography-table",
    type: "registry:ui",
    title: "Typography Table",
    description: "Auto-generated registry entry for typography-table.",
    files: [
      {
        path: "src/primitives/typography/typography-table.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "command-menu",
    type: "registry:ui",
    title: "Command Menu",
    description: "Auto-generated registry entry for command-menu.",
    files: [
      {
        path: "src/primitives/ui/command-menu.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "config-drawer",
    type: "registry:ui",
    title: "Config Drawer",
    description: "Auto-generated registry entry for config-drawer.",
    files: [
      {
        path: "src/primitives/ui/config-drawer.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "copy-code",
    type: "registry:ui",
    title: "Copy Code",
    description: "Auto-generated registry entry for copy-code.",
    files: [
      {
        path: "src/primitives/ui/copy-code.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "day-picker",
    type: "registry:ui",
    title: "Day Picker",
    description: "Auto-generated registry entry for day-picker.",
    files: [
      {
        path: "src/primitives/ui/day-picker.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "direction",
    type: "registry:ui",
    title: "Direction",
    description: "Auto-generated registry entry for direction.",
    files: [
      {
        path: "src/primitives/ui/direction.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "edit-switch",
    type: "registry:ui",
    title: "Edit Switch",
    description: "Auto-generated registry entry for edit-switch.",
    files: [
      {
        path: "src/primitives/ui/edit-switch.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "empty",
    type: "registry:ui",
    title: "Empty",
    description: "Auto-generated registry entry for empty.",
    files: [
      {
        path: "src/primitives/ui/empty.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "filters",
    type: "registry:ui",
    title: "Filters",
    description: "Auto-generated registry entry for filters.",
    files: [
      {
        path: "src/primitives/ui/filters.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "group",
    type: "registry:ui",
    title: "Group",
    description: "Auto-generated registry entry for group.",
    files: [
      {
        path: "src/primitives/ui/group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "hover-card-sides",
    type: "registry:ui",
    title: "Hover Card Sides",
    description: "Auto-generated registry entry for hover-card-sides.",
    files: [
      {
        path: "src/primitives/ui/hover-card-sides.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "item",
    type: "registry:ui",
    title: "Item",
    description: "Auto-generated registry entry for item.",
    files: [
      {
        path: "src/primitives/ui/item.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "kbd",
    type: "registry:ui",
    title: "Kbd",
    description: "Auto-generated registry entry for kbd.",
    files: [
      {
        path: "src/primitives/ui/kbd.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "native-select",
    type: "registry:ui",
    title: "Native Select",
    description: "Auto-generated registry entry for native-select.",
    files: [
      {
        path: "src/primitives/ui/native-select.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "number-field",
    type: "registry:ui",
    title: "Number Field",
    description: "Auto-generated registry entry for number-field.",
    files: [
      {
        path: "src/primitives/ui/number-field.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "preview-card",
    type: "registry:ui",
    title: "Preview Card",
    description: "Auto-generated registry entry for preview-card.",
    files: [
      {
        path: "src/primitives/ui/preview-card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "rating",
    type: "registry:ui",
    title: "Rating",
    description: "Auto-generated registry entry for rating.",
    files: [
      {
        path: "src/primitives/ui/rating.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "sortable-table-head",
    type: "registry:ui",
    title: "Sortable Table Head",
    description: "Auto-generated registry entry for sortable-table-head.",
    files: [
      {
        path: "src/primitives/ui/sortable-table-head.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "spinner",
    type: "registry:ui",
    title: "Spinner",
    description: "Auto-generated registry entry for spinner.",
    files: [
      {
        path: "src/primitives/ui/spinner.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "toast",
    type: "registry:ui",
    title: "Toast",
    description: "Auto-generated registry entry for toast.",
    files: [
      {
        path: "src/primitives/ui/toast.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "account-settings",
    type: "registry:ui",
    title: "Account Settings",
    description: "Auto-generated registry entry for account-settings.",
    files: [
      {
        path: "src/primitives/users/account-settings.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "connect-account",
    type: "registry:ui",
    title: "Connect Account",
    description: "Auto-generated registry entry for connect-account.",
    files: [
      {
        path: "src/primitives/users/connect-account.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "danger-zone",
    type: "registry:ui",
    title: "Danger Zone",
    description: "Auto-generated registry entry for danger-zone.",
    files: [
      {
        path: "src/primitives/users/danger-zone.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "email-password",
    type: "registry:ui",
    title: "Email Password",
    description: "Auto-generated registry entry for email-password.",
    files: [
      {
        path: "src/primitives/users/email-password.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "forgot-password-form",
    type: "registry:ui",
    title: "Forgot Password Form",
    description: "Auto-generated registry entry for forgot-password-form.",
    files: [
      {
        path: "src/primitives/users/forgot-password-form.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "forgot-password",
    type: "registry:ui",
    title: "Forgot Password",
    description: "Auto-generated registry entry for forgot-password.",
    files: [
      {
        path: "src/primitives/users/forgot-password.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "login-form",
    type: "registry:ui",
    title: "Login Form",
    description: "Auto-generated registry entry for login-form.",
    files: [
      {
        path: "src/primitives/users/login-form.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "login-page",
    type: "registry:ui",
    title: "Login Page",
    description: "Auto-generated registry entry for login-page.",
    files: [
      {
        path: "src/primitives/users/login-page.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "password-input",
    type: "registry:ui",
    title: "Password Input",
    description: "Auto-generated registry entry for password-input.",
    files: [
      {
        path: "src/primitives/users/password-input.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "personal-info",
    type: "registry:ui",
    title: "Personal Info",
    description: "Auto-generated registry entry for personal-info.",
    files: [
      {
        path: "src/primitives/users/personal-info.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "profile-dropdown",
    type: "registry:ui",
    title: "Profile Dropdown",
    description: "Auto-generated registry entry for profile-dropdown.",
    files: [
      {
        path: "src/primitives/users/profile-dropdown.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "register-form",
    type: "registry:ui",
    title: "Register Form",
    description: "Auto-generated registry entry for register-form.",
    files: [
      {
        path: "src/primitives/users/register-form.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "register",
    type: "registry:ui",
    title: "Register",
    description: "Auto-generated registry entry for register.",
    files: [
      {
        path: "src/primitives/users/register.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "sign-out-dialog",
    type: "registry:ui",
    title: "Sign Out Dialog",
    description: "Auto-generated registry entry for sign-out-dialog.",
    files: [
      {
        path: "src/primitives/users/sign-out-dialog.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "social-url",
    type: "registry:ui",
    title: "Social Url",
    description: "Auto-generated registry entry for social-url.",
    files: [
      {
        path: "src/primitives/users/social-url.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "verify-email",
    type: "registry:ui",
    title: "Verify Email",
    description: "Auto-generated registry entry for verify-email.",
    files: [
      {
        path: "src/primitives/users/verify-email.tsx",
        type: "registry:ui",
      },
    ],
  },
] as Component[];

export const REGISTRY: Record<string, any> = {
  ui_components_shared_ui_config_drawer: {
    name: "config-drawer",
    type: "component",
    metadata: {
      sourcePath: "src/components/_shared-ui/config-drawer.tsx",
      metadataKey: "components/_shared-ui/config-drawer",
    },
  },
  ui_components_shared_ui_controls_dashboard_dropdown: {
    name: "dashboard-dropdown",
    type: "component",
    metadata: {
      sourcePath: "src/components/_shared-ui/controls/dashboard-dropdown.tsx",
      metadataKey: "components/_shared-ui/controls/dashboard-dropdown",
    },
  },
  ui_components_shared_ui_controls_year_month_selector: {
    name: "year-month-selector",
    type: "component",
    metadata: {
      sourcePath: "src/components/_shared-ui/controls/year-month-selector.tsx",
      metadataKey: "components/_shared-ui/controls/year-month-selector",
    },
  },
  ui_components_shared_ui_dashboard_tabs: {
    name: "dashboard-tabs",
    type: "component",
    metadata: {
      sourcePath: "src/components/_shared-ui/dashboard-tabs.tsx",
      metadataKey: "components/_shared-ui/dashboard-tabs",
    },
  },
  ui_components_shared_ui_metric_card_shell: {
    name: "metric-card-shell",
    type: "component",
    metadata: {
      sourcePath: "src/components/_shared-ui/metric-card-shell.tsx",
      metadataKey: "components/_shared-ui/metric-card-shell",
    },
  },
  ui_components_shared_ui_metric_card_tabs: {
    name: "metric-card-tabs",
    type: "component",
    metadata: {
      sourcePath: "src/components/_shared-ui/metric-card-tabs.tsx",
      metadataKey: "components/_shared-ui/metric-card-tabs",
    },
  },
  ui_components_shared_ui_metric_card: {
    name: "metric-card",
    type: "component",
    metadata: {
      sourcePath: "src/components/_shared-ui/metric-card.tsx",
      metadataKey: "components/_shared-ui/metric-card",
    },
  },
  ui_components_shared_ui_metric_layout: {
    name: "metric-layout",
    type: "component",
    metadata: {
      sourcePath: "src/components/_shared-ui/metric-layout.tsx",
      metadataKey: "components/_shared-ui/metric-layout",
    },
  },
  ui_components_shared_ui_metric_trend_icon: {
    name: "metric-trend-icon",
    type: "component",
    metadata: {
      sourcePath: "src/components/_shared-ui/metric-trend-icon.tsx",
      metadataKey: "components/_shared-ui/metric-trend-icon",
    },
  },
  ui_components_shared_ui_popover: {
    name: "popover",
    type: "component",
    metadata: {
      sourcePath: "src/components/_shared-ui/popover.tsx",
      metadataKey: "components/_shared-ui/popover",
    },
  },
  ui_components_metrics_charts_analytics_chart: {
    name: "analytics-chart",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-charts/analytics-chart.tsx",
      metadataKey: "components/metrics-charts/analytics-chart",
    },
  },
  ui_components_metrics_charts_analytics: {
    name: "analytics",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-charts/analytics.tsx",
      metadataKey: "components/metrics-charts/analytics",
    },
  },
  ui_components_metrics_charts_area_chart_interactive: {
    name: "area-chart-interactive",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-charts/area-chart-interactive.tsx",
      metadataKey: "components/metrics-charts/area-chart-interactive",
    },
  },
  ui_components_metrics_charts_bar_chart_interactive: {
    name: "bar-chart-interactive",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-charts/bar-chart-interactive.tsx",
      metadataKey: "components/metrics-charts/bar-chart-interactive",
    },
  },
  ui_components_metrics_charts_bar_with_label_custom: {
    name: "bar-with-label-custom",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-charts/bar-with-label-custom.tsx",
      metadataKey: "components/metrics-charts/bar-with-label-custom",
    },
  },
  ui_components_metrics_charts_calendar_heatmap: {
    name: "calendar-heatmap",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-charts/calendar-heatmap.tsx",
      metadataKey: "components/metrics-charts/calendar-heatmap",
    },
  },
  ui_components_metrics_charts_interactive_area_line_combo: {
    name: "interactive-area-line-combo",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-charts/interactive-area-line-combo.tsx",
      metadataKey: "components/metrics-charts/interactive-area-line-combo",
    },
  },
  ui_components_metrics_charts_line_chart_interactive: {
    name: "line-chart-interactive",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-charts/line-chart-interactive.tsx",
      metadataKey: "components/metrics-charts/line-chart-interactive",
    },
  },
  ui_components_metrics_charts_otb_stacked_bar_chart: {
    name: "otb-stacked-bar-chart",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-charts/otb-stacked-bar-chart.tsx",
      metadataKey: "components/metrics-charts/otb-stacked-bar-chart",
    },
  },
  ui_components_metrics_charts_overview: {
    name: "overview",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-charts/overview.tsx",
      metadataKey: "components/metrics-charts/overview",
    },
  },
  ui_components_metrics_charts_pie_chart_donut_center_text: {
    name: "pie-chart-donut-center-text",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-charts/pie-chart-donut-center-text.tsx",
      metadataKey: "components/metrics-charts/pie-chart-donut-center-text",
    },
  },
  ui_components_metrics_charts_pie_chart_interactive: {
    name: "pie-chart-interactive",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-charts/pie-chart-interactive.tsx",
      metadataKey: "components/metrics-charts/pie-chart-interactive",
    },
  },
  ui_components_metrics_charts_pie_donut_chart_active: {
    name: "pie-donut-chart-active",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-charts/pie-donut-chart-active.tsx",
      metadataKey: "components/metrics-charts/pie-donut-chart-active",
    },
  },
  ui_components_metrics_charts_radial_ring_chart_with_label: {
    name: "radial-ring-chart-with-label",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-charts/radial-ring-chart-with-label.tsx",
      metadataKey: "components/metrics-charts/radial-ring-chart-with-label",
    },
  },
  ui_components_metrics_charts_recent_sales: {
    name: "recent-sales",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-charts/recent-sales.tsx",
      metadataKey: "components/metrics-charts/recent-sales",
    },
  },
  ui_components_metrics_charts_top_channels_chart: {
    name: "top-channels-chart",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-charts/top-channels-chart.tsx",
      metadataKey: "components/metrics-charts/top-channels-chart",
    },
  },
  ui_components_metrics_charts_top_services_bar_chart: {
    name: "top-services-bar-chart",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-charts/top-services-bar-chart.tsx",
      metadataKey: "components/metrics-charts/top-services-bar-chart",
    },
  },
  ui_components_metrics_charts_top_services_chart: {
    name: "top-services-chart",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-charts/top-services-chart.tsx",
      metadataKey: "components/metrics-charts/top-services-chart",
    },
  },
  ui_components_metrics_core_browser_stats_card: {
    name: "browser-stats-card",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-core/browser-stats-card.tsx",
      metadataKey: "components/metrics-core/browser-stats-card",
    },
  },
  ui_components_metrics_core_budget_snapshot_card: {
    name: "budget-snapshot-card",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-core/budget-snapshot-card.tsx",
      metadataKey: "components/metrics-core/budget-snapshot-card",
    },
  },
  ui_components_metrics_core_conversion_card: {
    name: "conversion-card",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-core/conversion-card.tsx",
      metadataKey: "components/metrics-core/conversion-card",
    },
  },
  ui_components_metrics_core_metric_dashboard_card: {
    name: "metric-dashboard-card",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-core/metric-dashboard-card.tsx",
      metadataKey: "components/metrics-core/metric-dashboard-card",
    },
  },
  ui_components_metrics_core_model_comparison_card: {
    name: "model-comparison-card",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-core/model-comparison-card.tsx",
      metadataKey: "components/metrics-core/model-comparison-card",
    },
  },
  ui_components_metrics_core_performance_card_other: {
    name: "performance-card-other",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-core/performance-card-other.tsx",
      metadataKey: "components/metrics-core/performance-card-other",
    },
  },
  ui_components_metrics_core_performance_card: {
    name: "performance-card",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-core/performance-card.tsx",
      metadataKey: "components/metrics-core/performance-card",
    },
  },
  ui_components_metrics_core_sales_metrics_card: {
    name: "sales-metrics-card",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-core/sales-metrics-card.tsx",
      metadataKey: "components/metrics-core/sales-metrics-card",
    },
  },
  ui_components_metrics_core_simple_kpi_cards: {
    name: "simple-kpi-cards",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-core/simple-kpi-cards.tsx",
      metadataKey: "components/metrics-core/simple-kpi-cards",
    },
  },
  ui_components_metrics_core_simple_statistics_cards: {
    name: "simple-statistics-cards",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-core/simple-statistics-cards.tsx",
      metadataKey: "components/metrics-core/simple-statistics-cards",
    },
  },
  ui_components_metrics_core_social_visits_card: {
    name: "social-visits-card",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-core/social-visits-card.tsx",
      metadataKey: "components/metrics-core/social-visits-card",
    },
  },
  ui_components_metrics_core_stat_card: {
    name: "stat-card",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-core/stat-card.tsx",
      metadataKey: "components/metrics-core/stat-card",
    },
  },
  ui_components_metrics_core_statistics_card_fin: {
    name: "statistics-card-fin",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-core/statistics-card-fin.tsx",
      metadataKey: "components/metrics-core/statistics-card-fin",
    },
  },
  ui_components_metrics_core_total_earning_card: {
    name: "total-earning-card",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-core/total-earning-card.tsx",
      metadataKey: "components/metrics-core/total-earning-card",
    },
  },
  ui_components_metrics_core_total_stats_card: {
    name: "total-stats-card",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-core/total-stats-card.tsx",
      metadataKey: "components/metrics-core/total-stats-card",
    },
  },
  ui_components_metrics_errors_forbidden: {
    name: "forbidden",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-errors/forbidden.tsx",
      metadataKey: "components/metrics-errors/forbidden",
    },
  },
  ui_components_metrics_errors_general_error: {
    name: "general-error",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-errors/general-error.tsx",
      metadataKey: "components/metrics-errors/general-error",
    },
  },
  ui_components_metrics_errors_maintenance_error: {
    name: "maintenance-error",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-errors/maintenance-error.tsx",
      metadataKey: "components/metrics-errors/maintenance-error",
    },
  },
  ui_components_metrics_errors_not_found_error: {
    name: "not-found-error",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-errors/not-found-error.tsx",
      metadataKey: "components/metrics-errors/not-found-error",
    },
  },
  ui_components_metrics_errors_unauthorized_error: {
    name: "unauthorized-error",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-errors/unauthorized-error.tsx",
      metadataKey: "components/metrics-errors/unauthorized-error",
    },
  },
  ui_components_metrics_feedback_empty_state: {
    name: "empty-state",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-feedback/empty-state.tsx",
      metadataKey: "components/metrics-feedback/empty-state",
    },
  },
  ui_components_metrics_layouts_campaigns_active_page: {
    name: "active_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/campaigns/active_page.tsx",
      metadataKey: "components/metrics-layouts/campaigns/active_page",
    },
  },
  ui_components_metrics_layouts_campaigns_campaigns_layout: {
    name: "campaigns_layout",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/campaigns/campaigns_layout.tsx",
      metadataKey: "components/metrics-layouts/campaigns/campaigns_layout",
    },
  },
  ui_components_metrics_layouts_campaigns_performance_page: {
    name: "performance_page",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/campaigns/performance_page.tsx",
      metadataKey: "components/metrics-layouts/campaigns/performance_page",
    },
  },
  ui_components_metrics_layouts_campaigns_setup_page: {
    name: "setup_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/campaigns/setup_page.tsx",
      metadataKey: "components/metrics-layouts/campaigns/setup_page",
    },
  },
  ui_components_metrics_layouts_chats_chat_assistant_page: {
    name: "chat-assistant_page",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/chats/chat-assistant_page.tsx",
      metadataKey: "components/metrics-layouts/chats/chat-assistant_page",
    },
  },
  ui_components_metrics_layouts_chats_chats_layout: {
    name: "chats_layout",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/chats/chats_layout.tsx",
      metadataKey: "components/metrics-layouts/chats/chats_layout",
    },
  },
  ui_components_metrics_layouts_chats_new_page: {
    name: "new_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/chats/new_page.tsx",
      metadataKey: "components/metrics-layouts/chats/new_page",
    },
  },
  ui_components_metrics_layouts_dashboard_channels_page: {
    name: "channels_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/dashboard/channels_page.tsx",
      metadataKey: "components/metrics-layouts/dashboard/channels_page",
    },
  },
  ui_components_metrics_layouts_dashboard_dashboard_homepage: {
    name: "dashboard_homepage",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/dashboard/dashboard_homepage.tsx",
      metadataKey: "components/metrics-layouts/dashboard/dashboard_homepage",
    },
  },
  ui_components_metrics_layouts_dashboard_dashboard_layout: {
    name: "dashboard_layout",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/dashboard/dashboard_layout.tsx",
      metadataKey: "components/metrics-layouts/dashboard/dashboard_layout",
    },
  },
  ui_components_metrics_layouts_dashboard_demand_page: {
    name: "demand_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/dashboard/demand_page.tsx",
      metadataKey: "components/metrics-layouts/dashboard/demand_page",
    },
  },
  ui_components_metrics_layouts_dashboard_roomtypes_page: {
    name: "roomtypes_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/dashboard/roomtypes_page.tsx",
      metadataKey: "components/metrics-layouts/dashboard/roomtypes_page",
    },
  },
  ui_components_metrics_layouts_dashboard_segments_page: {
    name: "segments_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/dashboard/segments_page.tsx",
      metadataKey: "components/metrics-layouts/dashboard/segments_page",
    },
  },
  ui_components_metrics_layouts_dashboard_website_page: {
    name: "website_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/dashboard/website_page.tsx",
      metadataKey: "components/metrics-layouts/dashboard/website_page",
    },
  },
  ui_components_metrics_layouts_data_library_data_health_page: {
    name: "data-health_page",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/data-library/data-health_page.tsx",
      metadataKey: "components/metrics-layouts/data-library/data-health_page",
    },
  },
  ui_components_metrics_layouts_data_library_data_library_layout: {
    name: "data-library_layout",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/data-library/data-library_layout.tsx",
      metadataKey:
        "components/metrics-layouts/data-library/data-library_layout",
    },
  },
  ui_components_metrics_layouts_data_library_lookups_page: {
    name: "lookups_page",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/data-library/lookups_page.tsx",
      metadataKey: "components/metrics-layouts/data-library/lookups_page",
    },
  },
  ui_components_metrics_layouts_data_library_lookups_manager_table_row: {
    name: "lookups-manager_table-row",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/data-library/lookups-manager_table-row.tsx",
      metadataKey:
        "components/metrics-layouts/data-library/lookups-manager_table-row",
    },
  },
  ui_components_metrics_layouts_data_library_lookups_manager_table: {
    name: "lookups-manager_table",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/data-library/lookups-manager_table.tsx",
      metadataKey:
        "components/metrics-layouts/data-library/lookups-manager_table",
    },
  },
  ui_components_metrics_layouts_data_library_mapping_manager_table: {
    name: "mapping-manager_table",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/data-library/mapping-manager_table.tsx",
      metadataKey:
        "components/metrics-layouts/data-library/mapping-manager_table",
    },
  },
  ui_components_metrics_layouts_data_library_mapping_row_edit_drawer: {
    name: "mapping-row-edit_drawer",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/data-library/mapping-row-edit_drawer.tsx",
      metadataKey:
        "components/metrics-layouts/data-library/mapping-row-edit_drawer",
    },
  },
  ui_components_metrics_layouts_data_library_mappings_page: {
    name: "mappings_page",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/data-library/mappings_page.tsx",
      metadataKey: "components/metrics-layouts/data-library/mappings_page",
    },
  },
  ui_components_metrics_layouts_data_library_unmapped_codes_page: {
    name: "unmapped-codes_page",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/data-library/unmapped-codes_page.tsx",
      metadataKey:
        "components/metrics-layouts/data-library/unmapped-codes_page",
    },
  },
  ui_components_metrics_layouts_help_desk_documentation_page: {
    name: "documentation_page",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/help-desk/documentation_page.tsx",
      metadataKey: "components/metrics-layouts/help-desk/documentation_page",
    },
  },
  ui_components_metrics_layouts_help_desk_helpdesk_layout: {
    name: "helpdesk_layout",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/help-desk/helpdesk_layout.tsx",
      metadataKey: "components/metrics-layouts/help-desk/helpdesk_layout",
    },
  },
  ui_components_metrics_layouts_help_desk_helpdesk_page: {
    name: "helpdesk_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/help-desk/helpdesk_page.tsx",
      metadataKey: "components/metrics-layouts/help-desk/helpdesk_page",
    },
  },
  ui_components_metrics_layouts_metric_library_base_page: {
    name: "base_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/metric-library/base_page.tsx",
      metadataKey: "components/metrics-layouts/metric-library/base_page",
    },
  },
  ui_components_metrics_layouts_metric_library_calculated_page: {
    name: "calculated_page",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/metric-library/calculated_page.tsx",
      metadataKey: "components/metrics-layouts/metric-library/calculated_page",
    },
  },
  ui_components_metrics_layouts_metric_library_metric_library_layout: {
    name: "metric-library_layout",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/metric-library/metric-library_layout.tsx",
      metadataKey:
        "components/metrics-layouts/metric-library/metric-library_layout",
    },
  },
  ui_components_metrics_layouts_properties_events_page: {
    name: "events_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/properties/events_page.tsx",
      metadataKey: "components/metrics-layouts/properties/events_page",
    },
  },
  ui_components_metrics_layouts_properties_lookups_page: {
    name: "lookups_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/properties/lookups_page.tsx",
      metadataKey: "components/metrics-layouts/properties/lookups_page",
    },
  },
  ui_components_metrics_layouts_properties_notes_page: {
    name: "notes_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/properties/notes_page.tsx",
      metadataKey: "components/metrics-layouts/properties/notes_page",
    },
  },
  ui_components_metrics_layouts_properties_page: {
    name: "page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/properties/page.tsx",
      metadataKey: "components/metrics-layouts/properties/page",
    },
  },
  ui_components_metrics_layouts_properties_properties_layout: {
    name: "properties_layout",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/properties/properties_layout.tsx",
      metadataKey: "components/metrics-layouts/properties/properties_layout",
    },
  },
  ui_components_metrics_layouts_properties_strategies_page: {
    name: "strategies_page",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/properties/strategies_page.tsx",
      metadataKey: "components/metrics-layouts/properties/strategies_page",
    },
  },
  ui_components_metrics_layouts_properties_tasks_page: {
    name: "tasks_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/properties/tasks_page.tsx",
      metadataKey: "components/metrics-layouts/properties/tasks_page",
    },
  },
  ui_components_metrics_layouts_settings_account_form: {
    name: "account_form",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/settings/account_form.tsx",
      metadataKey: "components/metrics-layouts/settings/account_form",
    },
  },
  ui_components_metrics_layouts_settings_account_page: {
    name: "account_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/settings/account_page.tsx",
      metadataKey: "components/metrics-layouts/settings/account_page",
    },
  },
  ui_components_metrics_layouts_settings_account_settings_page: {
    name: "account-settings_page",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/settings/account-settings_page.tsx",
      metadataKey: "components/metrics-layouts/settings/account-settings_page",
    },
  },
  ui_components_metrics_layouts_settings_content_section_page: {
    name: "content-section_page",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/settings/content-section_page.tsx",
      metadataKey: "components/metrics-layouts/settings/content-section_page",
    },
  },
  ui_components_metrics_layouts_settings_display_form: {
    name: "display_form",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/settings/display_form.tsx",
      metadataKey: "components/metrics-layouts/settings/display_form",
    },
  },
  ui_components_metrics_layouts_settings_display_page: {
    name: "display_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/settings/display_page.tsx",
      metadataKey: "components/metrics-layouts/settings/display_page",
    },
  },
  ui_components_metrics_layouts_settings_forgot_password_page: {
    name: "forgot-password_page",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/settings/forgot-password_page.tsx",
      metadataKey: "components/metrics-layouts/settings/forgot-password_page",
    },
  },
  ui_components_metrics_layouts_settings_login_page: {
    name: "login_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/settings/login_page.tsx",
      metadataKey: "components/metrics-layouts/settings/login_page",
    },
  },
  ui_components_metrics_layouts_settings_notifications_form: {
    name: "notifications_form",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/settings/notifications_form.tsx",
      metadataKey: "components/metrics-layouts/settings/notifications_form",
    },
  },
  ui_components_metrics_layouts_settings_notifications_page: {
    name: "notifications_page",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/settings/notifications_page.tsx",
      metadataKey: "components/metrics-layouts/settings/notifications_page",
    },
  },
  ui_components_metrics_layouts_settings_profile_form: {
    name: "profile_form",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/settings/profile_form.tsx",
      metadataKey: "components/metrics-layouts/settings/profile_form",
    },
  },
  ui_components_metrics_layouts_settings_profile_page: {
    name: "profile_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/settings/profile_page.tsx",
      metadataKey: "components/metrics-layouts/settings/profile_page",
    },
  },
  ui_components_metrics_layouts_settings_register_page: {
    name: "register_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/settings/register_page.tsx",
      metadataKey: "components/metrics-layouts/settings/register_page",
    },
  },
  ui_components_metrics_layouts_settings_settings_layout: {
    name: "settings_layout",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/settings/settings_layout.tsx",
      metadataKey: "components/metrics-layouts/settings/settings_layout",
    },
  },
  ui_components_metrics_layouts_settings_settings_sidebar_nav: {
    name: "settings_sidebar-nav",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/settings/settings_sidebar-nav.tsx",
      metadataKey: "components/metrics-layouts/settings/settings_sidebar-nav",
    },
  },
  ui_components_metrics_layouts_settings_users_invite_dialog: {
    name: "users-invite_dialog",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/settings/users-invite_dialog.tsx",
      metadataKey: "components/metrics-layouts/settings/users-invite_dialog",
    },
  },
  ui_components_metrics_layouts_strategies_playbooks_page: {
    name: "playbooks_page",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/strategies/playbooks_page.tsx",
      metadataKey: "components/metrics-layouts/strategies/playbooks_page",
    },
  },
  ui_components_metrics_layouts_strategies_recommended_actions_page: {
    name: "recommended-actions_page",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/strategies/recommended-actions_page.tsx",
      metadataKey:
        "components/metrics-layouts/strategies/recommended-actions_page",
    },
  },
  ui_components_metrics_layouts_strategies_strategies_layout: {
    name: "strategies_layout",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/strategies/strategies_layout.tsx",
      metadataKey: "components/metrics-layouts/strategies/strategies_layout",
    },
  },
  ui_components_metrics_layouts_strategies_triggers_page: {
    name: "triggers_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/strategies/triggers_page.tsx",
      metadataKey: "components/metrics-layouts/strategies/triggers_page",
    },
  },
  ui_components_metrics_layouts_tasks_calendar_view_page: {
    name: "calendar-view_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/tasks/calendar-view_page.tsx",
      metadataKey: "components/metrics-layouts/tasks/calendar-view_page",
    },
  },
  ui_components_metrics_layouts_tasks_data_actions_table_row: {
    name: "data-actions_table-row",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/tasks/data-actions_table-row.tsx",
      metadataKey: "components/metrics-layouts/tasks/data-actions_table-row",
    },
  },
  ui_components_metrics_layouts_tasks_data_bulk_actions_table: {
    name: "data-bulk-actions_table",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/tasks/data-bulk-actions_table.tsx",
      metadataKey: "components/metrics-layouts/tasks/data-bulk-actions_table",
    },
  },
  ui_components_metrics_layouts_tasks_data_data: {
    name: "data",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/tasks/data/data.tsx",
      metadataKey: "components/metrics-layouts/tasks/data/data",
    },
  },
  ui_components_metrics_layouts_tasks_group_views: {
    name: "group-views",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/tasks/group-views.tsx",
      metadataKey: "components/metrics-layouts/tasks/group-views",
    },
  },
  ui_components_metrics_layouts_tasks_growth_plan_header: {
    name: "growth-plan_header",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/tasks/growth-plan_header.tsx",
      metadataKey: "components/metrics-layouts/tasks/growth-plan_header",
    },
  },
  ui_components_metrics_layouts_tasks_growth_plan_sidebar: {
    name: "growth-plan_sidebar",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/tasks/growth-plan_sidebar.tsx",
      metadataKey: "components/metrics-layouts/tasks/growth-plan_sidebar",
    },
  },
  ui_components_metrics_layouts_tasks_growth_plan_states: {
    name: "growth-plan_states",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/tasks/growth-plan_states.tsx",
      metadataKey: "components/metrics-layouts/tasks/growth-plan_states",
    },
  },
  ui_components_metrics_layouts_tasks_growth_plan_view_switcher: {
    name: "growth-plan-view_switcher",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/tasks/growth-plan-view_switcher.tsx",
      metadataKey: "components/metrics-layouts/tasks/growth-plan-view_switcher",
    },
  },
  ui_components_metrics_layouts_tasks_kanban_page: {
    name: "kanban_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/tasks/kanban_page.tsx",
      metadataKey: "components/metrics-layouts/tasks/kanban_page",
    },
  },
  ui_components_metrics_layouts_tasks_meeting_recap_page: {
    name: "meeting-recap_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/tasks/meeting-recap_page.tsx",
      metadataKey: "components/metrics-layouts/tasks/meeting-recap_page",
    },
  },
  ui_components_metrics_layouts_tasks_owner_rollup_page: {
    name: "owner-rollup_page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/tasks/owner-rollup_page.tsx",
      metadataKey: "components/metrics-layouts/tasks/owner-rollup_page",
    },
  },
  ui_components_metrics_layouts_tasks_tasks_dialogs: {
    name: "tasks_dialogs",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/tasks/tasks_dialogs.tsx",
      metadataKey: "components/metrics-layouts/tasks/tasks_dialogs",
    },
  },
  ui_components_metrics_layouts_tasks_tasks_layout: {
    name: "tasks_layout",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/tasks/tasks_layout.tsx",
      metadataKey: "components/metrics-layouts/tasks/tasks_layout",
    },
  },
  ui_components_metrics_layouts_tasks_tasks_provider: {
    name: "tasks_provider",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/tasks/tasks_provider.tsx",
      metadataKey: "components/metrics-layouts/tasks/tasks_provider",
    },
  },
  ui_components_metrics_layouts_tasks_tasks_table: {
    name: "tasks_table",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/tasks/tasks_table.tsx",
      metadataKey: "components/metrics-layouts/tasks/tasks_table",
    },
  },
  ui_components_metrics_layouts_tasks_tasks_columns: {
    name: "tasks-columns",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/tasks/tasks-columns.tsx",
      metadataKey: "components/metrics-layouts/tasks/tasks-columns",
    },
  },
  ui_components_metrics_layouts_tasks_tasks_import_dialog: {
    name: "tasks-import_dialog",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/tasks/tasks-import_dialog.tsx",
      metadataKey: "components/metrics-layouts/tasks/tasks-import_dialog",
    },
  },
  ui_components_metrics_layouts_tasks_tasks_multi_delete_dialog: {
    name: "tasks-multi-delete_dialog",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/tasks/tasks-multi-delete_dialog.tsx",
      metadataKey: "components/metrics-layouts/tasks/tasks-multi-delete_dialog",
    },
  },
  ui_components_metrics_layouts_tasks_tasks_mutate_drawer: {
    name: "tasks-mutate_drawer",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/tasks/tasks-mutate_drawer.tsx",
      metadataKey: "components/metrics-layouts/tasks/tasks-mutate_drawer",
    },
  },
  ui_components_metrics_layouts_tasks_tasks_primary_buttons: {
    name: "tasks-primary-buttons",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/tasks/tasks-primary-buttons.tsx",
      metadataKey: "components/metrics-layouts/tasks/tasks-primary-buttons",
    },
  },
  ui_components_metrics_layouts_tasks_workstream_mutate_drawer: {
    name: "workstream-mutate_drawer",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/tasks/workstream-mutate_drawer.tsx",
      metadataKey: "components/metrics-layouts/tasks/workstream-mutate_drawer",
    },
  },
  ui_components_metrics_layouts_tasks_workstreams_section: {
    name: "workstreams_section",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/tasks/workstreams_section.tsx",
      metadataKey: "components/metrics-layouts/tasks/workstreams_section",
    },
  },
  ui_components_metrics_layouts_users_data_bulk_actions_table: {
    name: "data-bulk-actions_table",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/users/data-bulk-actions_table.tsx",
      metadataKey: "components/metrics-layouts/users/data-bulk-actions_table",
    },
  },
  ui_components_metrics_layouts_users_data_row_actions_table_row: {
    name: "data-row-actions_table_row",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/users/data-row-actions_table_row.tsx",
      metadataKey:
        "components/metrics-layouts/users/data-row-actions_table_row",
    },
  },
  ui_components_metrics_layouts_users_page: {
    name: "page",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/users/page.tsx",
      metadataKey: "components/metrics-layouts/users/page",
    },
  },
  ui_components_metrics_layouts_users_permissions_panel_page: {
    name: "permissions-panel_page",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/users/permissions-panel_page.tsx",
      metadataKey: "components/metrics-layouts/users/permissions-panel_page",
    },
  },
  ui_components_metrics_layouts_users_users_columns: {
    name: "users_columns",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/users/users_columns.tsx",
      metadataKey: "components/metrics-layouts/users/users_columns",
    },
  },
  ui_components_metrics_layouts_users_users_dialogs: {
    name: "users_dialogs",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/users/users_dialogs.tsx",
      metadataKey: "components/metrics-layouts/users/users_dialogs",
    },
  },
  ui_components_metrics_layouts_users_users_provider: {
    name: "users_provider",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/users/users_provider.tsx",
      metadataKey: "components/metrics-layouts/users/users_provider",
    },
  },
  ui_components_metrics_layouts_users_users_table: {
    name: "users_table",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/users/users_table.tsx",
      metadataKey: "components/metrics-layouts/users/users_table",
    },
  },
  ui_components_metrics_layouts_users_users_action_dialog: {
    name: "users-action_dialog",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/users/users-action_dialog.tsx",
      metadataKey: "components/metrics-layouts/users/users-action_dialog",
    },
  },
  ui_components_metrics_layouts_users_users_delete_dialog: {
    name: "users-delete_dialog",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/users/users-delete_dialog.tsx",
      metadataKey: "components/metrics-layouts/users/users-delete_dialog",
    },
  },
  ui_components_metrics_layouts_users_users_invite_dialog: {
    name: "users-invite_dialog",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/users/users-invite_dialog.tsx",
      metadataKey: "components/metrics-layouts/users/users-invite_dialog",
    },
  },
  ui_components_metrics_layouts_users_users_multi_delete_dialog: {
    name: "users-multi-delete_dialog",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/users/users-multi-delete_dialog.tsx",
      metadataKey: "components/metrics-layouts/users/users-multi-delete_dialog",
    },
  },
  ui_components_metrics_layouts_users_users_primary_buttons: {
    name: "users-primary-buttons",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-layouts/users/users-primary-buttons.tsx",
      metadataKey: "components/metrics-layouts/users/users-primary-buttons",
    },
  },
  ui_components_metrics_layouts_users_verify_email: {
    name: "verify-email",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-layouts/users/verify-email.tsx",
      metadataKey: "components/metrics-layouts/users/verify-email",
    },
  },
  ui_components_metrics_sections_analytics_overview: {
    name: "analytics-overview",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-sections/analytics-overview.tsx",
      metadataKey: "components/metrics-sections/analytics-overview",
    },
  },
  ui_components_metrics_sections_analytics_section: {
    name: "analytics-section",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-sections/analytics-section.tsx",
      metadataKey: "components/metrics-sections/analytics-section",
    },
  },
  ui_components_metrics_sections_campaigns_section: {
    name: "campaigns-section",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-sections/campaigns-section.tsx",
      metadataKey: "components/metrics-sections/campaigns-section",
    },
  },
  ui_components_metrics_sections_charts_grid: {
    name: "charts-grid",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-sections/charts-grid.tsx",
      metadataKey: "components/metrics-sections/charts-grid",
    },
  },
  ui_components_metrics_sections_dashboard_section: {
    name: "dashboard-section",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-sections/dashboard-section.tsx",
      metadataKey: "components/metrics-sections/dashboard-section",
    },
  },
  ui_components_metrics_sections_overview_section: {
    name: "overview-section",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-sections/overview-section.tsx",
      metadataKey: "components/metrics-sections/overview-section",
    },
  },
  ui_components_metrics_sections_posts_section: {
    name: "posts-section",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-sections/posts-section.tsx",
      metadataKey: "components/metrics-sections/posts-section",
    },
  },
  ui_components_metrics_sections_sales_metrics: {
    name: "sales-metrics",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-sections/sales-metrics.tsx",
      metadataKey: "components/metrics-sections/sales-metrics",
    },
  },
  ui_components_metrics_tables_daily_pickup_table: {
    name: "daily-pickup-table",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-tables/daily-pickup-table.tsx",
      metadataKey: "components/metrics-tables/daily-pickup-table",
    },
  },
  ui_components_metrics_tables_data_table: {
    name: "data-table",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-tables/data-table.tsx",
      metadataKey: "components/metrics-tables/data-table",
    },
  },
  ui_components_metrics_tables_market_segment_group_rooms_table: {
    name: "market-segment-group-rooms-table",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-tables/market-segment-group-rooms-table.tsx",
      metadataKey: "components/metrics-tables/market-segment-group-rooms-table",
    },
  },
  ui_components_metrics_tables_market_segment_transient_rooms_table: {
    name: "market-segment-transient-rooms-table",
    type: "component",
    metadata: {
      sourcePath:
        "src/components/metrics-tables/market-segment-transient-rooms-table.tsx",
      metadataKey:
        "components/metrics-tables/market-segment-transient-rooms-table",
    },
  },
  ui_components_metrics_timeline_timeline_component: {
    name: "timeline-component",
    type: "component",
    metadata: {
      sourcePath: "src/components/metrics-timeline/timeline-component.tsx",
      metadataKey: "components/metrics-timeline/timeline-component",
    },
  },
  ui_primitives_auto_form_common_label: {
    name: "label",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/auto-form/common/label.tsx",
      metadataKey: "primitives/auto-form/common/label",
    },
  },
  ui_primitives_auto_form_common_tooltip: {
    name: "tooltip",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/auto-form/common/tooltip.tsx",
      metadataKey: "primitives/auto-form/common/tooltip",
    },
  },
  ui_primitives_auto_form_fields_array: {
    name: "array",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/auto-form/fields/array.tsx",
      metadataKey: "primitives/auto-form/fields/array",
    },
  },
  ui_primitives_auto_form_fields_checkbox: {
    name: "checkbox",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/auto-form/fields/checkbox.tsx",
      metadataKey: "primitives/auto-form/fields/checkbox",
    },
  },
  ui_primitives_auto_form_fields_date: {
    name: "date",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/auto-form/fields/date.tsx",
      metadataKey: "primitives/auto-form/fields/date",
    },
  },
  ui_primitives_auto_form_fields_enum: {
    name: "enum",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/auto-form/fields/enum.tsx",
      metadataKey: "primitives/auto-form/fields/enum",
    },
  },
  ui_primitives_auto_form_fields_field_group: {
    name: "field-group",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/auto-form/fields/field-group.tsx",
      metadataKey: "primitives/auto-form/fields/field-group",
    },
  },
  ui_primitives_auto_form_fields_field: {
    name: "field",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/auto-form/fields/field.tsx",
      metadataKey: "primitives/auto-form/fields/field",
    },
  },
  ui_primitives_auto_form_fields_form: {
    name: "form",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/auto-form/fields/form.tsx",
      metadataKey: "primitives/auto-form/fields/form",
    },
  },
  ui_primitives_auto_form_fields_input: {
    name: "input",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/auto-form/fields/input.tsx",
      metadataKey: "primitives/auto-form/fields/input",
    },
  },
  ui_primitives_auto_form_fields_number: {
    name: "number",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/auto-form/fields/number.tsx",
      metadataKey: "primitives/auto-form/fields/number",
    },
  },
  ui_primitives_auto_form_fields_object: {
    name: "object",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/auto-form/fields/object.tsx",
      metadataKey: "primitives/auto-form/fields/object",
    },
  },
  ui_primitives_auto_form_fields_radio_group: {
    name: "radio-group",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/auto-form/fields/radio-group.tsx",
      metadataKey: "primitives/auto-form/fields/radio-group",
    },
  },
  ui_primitives_auto_form_fields_switch: {
    name: "switch",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/auto-form/fields/switch.tsx",
      metadataKey: "primitives/auto-form/fields/switch",
    },
  },
  ui_primitives_auto_form_fields_textarea: {
    name: "textarea",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/auto-form/fields/textarea.tsx",
      metadataKey: "primitives/auto-form/fields/textarea",
    },
  },
  ui_primitives_auto_form_form: {
    name: "form",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/auto-form/form.tsx",
      metadataKey: "primitives/auto-form/form",
    },
  },
  ui_primitives_auto_form_helpers: {
    name: "helpers",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/auto-form/helpers.tsx",
      metadataKey: "primitives/auto-form/helpers",
    },
  },
  ui_primitives_buttons_button_default: {
    name: "button-default",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-default.tsx",
      metadataKey: "primitives/buttons/button-default",
    },
  },
  ui_primitives_buttons_button_destructive: {
    name: "button-destructive",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-destructive.tsx",
      metadataKey: "primitives/buttons/button-destructive",
    },
  },
  ui_primitives_buttons_button_ghost: {
    name: "button-ghost",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-ghost.tsx",
      metadataKey: "primitives/buttons/button-ghost",
    },
  },
  ui_primitives_buttons_button_group_dropdown: {
    name: "button-group-dropdown",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-group-dropdown.tsx",
      metadataKey: "primitives/buttons/button-group-dropdown",
    },
  },
  ui_primitives_buttons_button_group_input_group: {
    name: "button-group-input-group",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-group-input-group.tsx",
      metadataKey: "primitives/buttons/button-group-input-group",
    },
  },
  ui_primitives_buttons_button_group_input: {
    name: "button-group-input",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-group-input.tsx",
      metadataKey: "primitives/buttons/button-group-input",
    },
  },
  ui_primitives_buttons_button_group_nested: {
    name: "button-group-nested",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-group-nested.tsx",
      metadataKey: "primitives/buttons/button-group-nested",
    },
  },
  ui_primitives_buttons_button_group_orientation: {
    name: "button-group-orientation",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-group-orientation.tsx",
      metadataKey: "primitives/buttons/button-group-orientation",
    },
  },
  ui_primitives_buttons_button_group_popover: {
    name: "button-group-popover",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-group-popover.tsx",
      metadataKey: "primitives/buttons/button-group-popover",
    },
  },
  ui_primitives_buttons_button_group_select: {
    name: "button-group-select",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-group-select.tsx",
      metadataKey: "primitives/buttons/button-group-select",
    },
  },
  ui_primitives_buttons_button_group_separator: {
    name: "button-group-separator",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-group-separator.tsx",
      metadataKey: "primitives/buttons/button-group-separator",
    },
  },
  ui_primitives_buttons_button_group_size: {
    name: "button-group-size",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-group-size.tsx",
      metadataKey: "primitives/buttons/button-group-size",
    },
  },
  ui_primitives_buttons_button_group_split: {
    name: "button-group-split",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-group-split.tsx",
      metadataKey: "primitives/buttons/button-group-split",
    },
  },
  ui_primitives_buttons_button_group: {
    name: "button-group",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-group.tsx",
      metadataKey: "primitives/buttons/button-group",
    },
  },
  ui_primitives_buttons_button_icon: {
    name: "button-icon",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-icon.tsx",
      metadataKey: "primitives/buttons/button-icon",
    },
  },
  ui_primitives_buttons_button_link: {
    name: "button-link",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-link.tsx",
      metadataKey: "primitives/buttons/button-link",
    },
  },
  ui_primitives_buttons_button_outline: {
    name: "button-outline",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-outline.tsx",
      metadataKey: "primitives/buttons/button-outline",
    },
  },
  ui_primitives_buttons_button_render: {
    name: "button-render",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-render.tsx",
      metadataKey: "primitives/buttons/button-render",
    },
  },
  ui_primitives_buttons_button_rounded: {
    name: "button-rounded",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-rounded.tsx",
      metadataKey: "primitives/buttons/button-rounded",
    },
  },
  ui_primitives_buttons_button_secondary: {
    name: "button-secondary",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-secondary.tsx",
      metadataKey: "primitives/buttons/button-secondary",
    },
  },
  ui_primitives_buttons_button_size: {
    name: "button-size",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-size.tsx",
      metadataKey: "primitives/buttons/button-size",
    },
  },
  ui_primitives_buttons_button_spinner: {
    name: "button-spinner",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-spinner.tsx",
      metadataKey: "primitives/buttons/button-spinner",
    },
  },
  ui_primitives_buttons_button_with_icon: {
    name: "button-with-icon",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button-with-icon.tsx",
      metadataKey: "primitives/buttons/button-with-icon",
    },
  },
  ui_primitives_buttons_button: {
    name: "button",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/button.tsx",
      metadataKey: "primitives/buttons/button",
    },
  },
  ui_primitives_buttons_discover_button: {
    name: "discover-button",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/discover-button.tsx",
      metadataKey: "primitives/buttons/discover-button",
    },
  },
  ui_primitives_buttons_status_button: {
    name: "status-button",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/status-button.tsx",
      metadataKey: "primitives/buttons/status-button",
    },
  },
  ui_primitives_buttons_toolbar_button: {
    name: "toolbar-button",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/buttons/toolbar-button.tsx",
      metadataKey: "primitives/buttons/toolbar-button",
    },
  },
  ui_primitives_charts_chart_demos: {
    name: "chart-demos",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/charts/chart-demos.tsx",
      metadataKey: "primitives/charts/chart-demos",
    },
  },
  ui_primitives_charts_chart_sales_metrics: {
    name: "chart-sales-metrics",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/charts/chart-sales-metrics.tsx",
      metadataKey: "primitives/charts/chart-sales-metrics",
    },
  },
  ui_primitives_charts_chart: {
    name: "chart",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/charts/chart.tsx",
      metadataKey: "primitives/charts/chart",
    },
  },
  ui_primitives_charts_line_chart: {
    name: "line-chart",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/charts/line-chart.tsx",
      metadataKey: "primitives/charts/line-chart",
    },
  },
  ui_primitives_charts_statistics_card: {
    name: "statistics-card",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/charts/statistics-card.tsx",
      metadataKey: "primitives/charts/statistics-card",
    },
  },
  ui_primitives_charts_statistics_with_status: {
    name: "statistics-with-status",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/charts/statistics-with-status.tsx",
      metadataKey: "primitives/charts/statistics-with-status",
    },
  },
  ui_primitives_charts_widget_product_insights: {
    name: "widget-product-insights",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/charts/widget-product-insights.tsx",
      metadataKey: "primitives/charts/widget-product-insights",
    },
  },
  ui_primitives_charts_widget_total_earning: {
    name: "widget-total-earning",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/charts/widget-total-earning.tsx",
      metadataKey: "primitives/charts/widget-total-earning",
    },
  },
  ui_primitives_data_grid_data_grid_column_filter: {
    name: "data-grid-column-filter",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/data-grid/data-grid-column-filter.tsx",
      metadataKey: "primitives/data-grid/data-grid-column-filter",
    },
  },
  ui_primitives_data_grid_data_grid_column_header: {
    name: "data-grid-column-header",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/data-grid/data-grid-column-header.tsx",
      metadataKey: "primitives/data-grid/data-grid-column-header",
    },
  },
  ui_primitives_data_grid_data_grid_column_visibility: {
    name: "data-grid-column-visibility",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/data-grid/data-grid-column-visibility.tsx",
      metadataKey: "primitives/data-grid/data-grid-column-visibility",
    },
  },
  ui_primitives_data_grid_data_grid_pagination: {
    name: "data-grid-pagination",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/data-grid/data-grid-pagination.tsx",
      metadataKey: "primitives/data-grid/data-grid-pagination",
    },
  },
  ui_primitives_data_grid_data_grid_table_dnd_rows: {
    name: "data-grid-table-dnd-rows",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/data-grid/data-grid-table-dnd-rows.tsx",
      metadataKey: "primitives/data-grid/data-grid-table-dnd-rows",
    },
  },
  ui_primitives_data_grid_data_grid_table_dnd: {
    name: "data-grid-table-dnd",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/data-grid/data-grid-table-dnd.tsx",
      metadataKey: "primitives/data-grid/data-grid-table-dnd",
    },
  },
  ui_primitives_data_grid_data_grid_table: {
    name: "data-grid-table",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/data-grid/data-grid-table.tsx",
      metadataKey: "primitives/data-grid/data-grid-table",
    },
  },
  ui_primitives_data_grid_data_grid: {
    name: "data-grid",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/data-grid/data-grid.tsx",
      metadataKey: "primitives/data-grid/data-grid",
    },
  },
  ui_primitives_dropdowns_dropdown_language: {
    name: "dropdown-language",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/dropdowns/dropdown-language.tsx",
      metadataKey: "primitives/dropdowns/dropdown-language",
    },
  },
  ui_primitives_dropdowns_dropdown_menu_avatar: {
    name: "dropdown-menu-avatar",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/dropdowns/dropdown-menu-avatar.tsx",
      metadataKey: "primitives/dropdowns/dropdown-menu-avatar",
    },
  },
  ui_primitives_dropdowns_dropdown_menu_basic: {
    name: "dropdown-menu-basic",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/dropdowns/dropdown-menu-basic.tsx",
      metadataKey: "primitives/dropdowns/dropdown-menu-basic",
    },
  },
  ui_primitives_dropdowns_dropdown_menu_checkboxes_icons: {
    name: "dropdown-menu-checkboxes-icons",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/dropdowns/dropdown-menu-checkboxes-icons.tsx",
      metadataKey: "primitives/dropdowns/dropdown-menu-checkboxes-icons",
    },
  },
  ui_primitives_dropdowns_dropdown_menu_checkboxes: {
    name: "dropdown-menu-checkboxes",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/dropdowns/dropdown-menu-checkboxes.tsx",
      metadataKey: "primitives/dropdowns/dropdown-menu-checkboxes",
    },
  },
  ui_primitives_dropdowns_dropdown_menu_destructive: {
    name: "dropdown-menu-destructive",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/dropdowns/dropdown-menu-destructive.tsx",
      metadataKey: "primitives/dropdowns/dropdown-menu-destructive",
    },
  },
  ui_primitives_dropdowns_dropdown_menu_icons: {
    name: "dropdown-menu-icons",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/dropdowns/dropdown-menu-icons.tsx",
      metadataKey: "primitives/dropdowns/dropdown-menu-icons",
    },
  },
  ui_primitives_dropdowns_dropdown_menu_radio_group: {
    name: "dropdown-menu-radio-group",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/dropdowns/dropdown-menu-radio-group.tsx",
      metadataKey: "primitives/dropdowns/dropdown-menu-radio-group",
    },
  },
  ui_primitives_dropdowns_dropdown_menu_radio_icons: {
    name: "dropdown-menu-radio-icons",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/dropdowns/dropdown-menu-radio-icons.tsx",
      metadataKey: "primitives/dropdowns/dropdown-menu-radio-icons",
    },
  },
  ui_primitives_dropdowns_dropdown_menu_shortcuts: {
    name: "dropdown-menu-shortcuts",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/dropdowns/dropdown-menu-shortcuts.tsx",
      metadataKey: "primitives/dropdowns/dropdown-menu-shortcuts",
    },
  },
  ui_primitives_dropdowns_dropdown_menu_submenu: {
    name: "dropdown-menu-submenu",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/dropdowns/dropdown-menu-submenu.tsx",
      metadataKey: "primitives/dropdowns/dropdown-menu-submenu",
    },
  },
  ui_primitives_dropdowns_dropdown_menu: {
    name: "dropdown-menu",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/dropdowns/dropdown-menu.tsx",
      metadataKey: "primitives/dropdowns/dropdown-menu",
    },
  },
  ui_primitives_dropdowns_dropdown_profile: {
    name: "dropdown-profile",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/dropdowns/dropdown-profile.tsx",
      metadataKey: "primitives/dropdowns/dropdown-profile",
    },
  },
  ui_primitives_dropdowns_select_dropdown: {
    name: "select-dropdown",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/dropdowns/select-dropdown.tsx",
      metadataKey: "primitives/dropdowns/select-dropdown",
    },
  },
  ui_primitives_dropdowns_smooth_dropdown: {
    name: "smooth-dropdown",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/dropdowns/smooth-dropdown.tsx",
      metadataKey: "primitives/dropdowns/smooth-dropdown",
    },
  },
  ui_primitives_image_blocks_image_edit_block: {
    name: "image-edit-block",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/image-blocks/image-edit-block.tsx",
      metadataKey: "primitives/image-blocks/image-edit-block",
    },
  },
  ui_primitives_image_blocks_image_edit_dialog: {
    name: "image-edit-dialog",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/image-blocks/image-edit-dialog.tsx",
      metadataKey: "primitives/image-blocks/image-edit-dialog",
    },
  },
  ui_primitives_inputs_combobox_option: {
    name: "combobox-option",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/combobox-option.tsx",
      metadataKey: "primitives/inputs/combobox-option",
    },
  },
  ui_primitives_inputs_combobox: {
    name: "combobox",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/combobox.tsx",
      metadataKey: "primitives/inputs/combobox",
    },
  },
  ui_primitives_inputs_input_badge: {
    name: "input-badge",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-badge.tsx",
      metadataKey: "primitives/inputs/input-badge",
    },
  },
  ui_primitives_inputs_input_basic: {
    name: "input-basic",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-basic.tsx",
      metadataKey: "primitives/inputs/input-basic",
    },
  },
  ui_primitives_inputs_input_button_group: {
    name: "input-button-group",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-button-group.tsx",
      metadataKey: "primitives/inputs/input-button-group",
    },
  },
  ui_primitives_inputs_input_disabled: {
    name: "input-disabled",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-disabled.tsx",
      metadataKey: "primitives/inputs/input-disabled",
    },
  },
  ui_primitives_inputs_input_field: {
    name: "input-field",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-field.tsx",
      metadataKey: "primitives/inputs/input-field",
    },
  },
  ui_primitives_inputs_input_fieldgroup: {
    name: "input-fieldgroup",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-fieldgroup.tsx",
      metadataKey: "primitives/inputs/input-fieldgroup",
    },
  },
  ui_primitives_inputs_input_file: {
    name: "input-file",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-file.tsx",
      metadataKey: "primitives/inputs/input-file",
    },
  },
  ui_primitives_inputs_input_form: {
    name: "input-form",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-form.tsx",
      metadataKey: "primitives/inputs/input-form",
    },
  },
  ui_primitives_inputs_input_grid: {
    name: "input-grid",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-grid.tsx",
      metadataKey: "primitives/inputs/input-grid",
    },
  },
  ui_primitives_inputs_input_group_basic: {
    name: "input-group-basic",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-basic.tsx",
      metadataKey: "primitives/inputs/input-group-basic",
    },
  },
  ui_primitives_inputs_input_group_block_end: {
    name: "input-group-block-end",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-block-end.tsx",
      metadataKey: "primitives/inputs/input-group-block-end",
    },
  },
  ui_primitives_inputs_input_group_block_start: {
    name: "input-group-block-start",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-block-start.tsx",
      metadataKey: "primitives/inputs/input-group-block-start",
    },
  },
  ui_primitives_inputs_input_group_button_group: {
    name: "input-group-button-group",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-button-group.tsx",
      metadataKey: "primitives/inputs/input-group-button-group",
    },
  },
  ui_primitives_inputs_input_group_button: {
    name: "input-group-button",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-button.tsx",
      metadataKey: "primitives/inputs/input-group-button",
    },
  },
  ui_primitives_inputs_input_group_custom: {
    name: "input-group-custom",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-custom.tsx",
      metadataKey: "primitives/inputs/input-group-custom",
    },
  },
  ui_primitives_inputs_input_group_dropdown: {
    name: "input-group-dropdown",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-dropdown.tsx",
      metadataKey: "primitives/inputs/input-group-dropdown",
    },
  },
  ui_primitives_inputs_input_group_icon: {
    name: "input-group-icon",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-icon.tsx",
      metadataKey: "primitives/inputs/input-group-icon",
    },
  },
  ui_primitives_inputs_input_group_in_card: {
    name: "input-group-in-card",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-in-card.tsx",
      metadataKey: "primitives/inputs/input-group-in-card",
    },
  },
  ui_primitives_inputs_input_group_inline_end: {
    name: "input-group-inline-end",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-inline-end.tsx",
      metadataKey: "primitives/inputs/input-group-inline-end",
    },
  },
  ui_primitives_inputs_input_group_inline_start: {
    name: "input-group-inline-start",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-inline-start.tsx",
      metadataKey: "primitives/inputs/input-group-inline-start",
    },
  },
  ui_primitives_inputs_input_group_kbd: {
    name: "input-group-kbd",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-kbd.tsx",
      metadataKey: "primitives/inputs/input-group-kbd",
    },
  },
  ui_primitives_inputs_input_group_label: {
    name: "input-group-label",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-label.tsx",
      metadataKey: "primitives/inputs/input-group-label",
    },
  },
  ui_primitives_inputs_input_group_spinner: {
    name: "input-group-spinner",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-spinner.tsx",
      metadataKey: "primitives/inputs/input-group-spinner",
    },
  },
  ui_primitives_inputs_input_group_text: {
    name: "input-group-text",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-text.tsx",
      metadataKey: "primitives/inputs/input-group-text",
    },
  },
  ui_primitives_inputs_input_group_textarea_examples: {
    name: "input-group-textarea-examples",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-textarea-examples.tsx",
      metadataKey: "primitives/inputs/input-group-textarea-examples",
    },
  },
  ui_primitives_inputs_input_group_textarea: {
    name: "input-group-textarea",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-textarea.tsx",
      metadataKey: "primitives/inputs/input-group-textarea",
    },
  },
  ui_primitives_inputs_input_group_tooltip: {
    name: "input-group-tooltip",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-tooltip.tsx",
      metadataKey: "primitives/inputs/input-group-tooltip",
    },
  },
  ui_primitives_inputs_input_group_with_addons: {
    name: "input-group-with-addons",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-with-addons.tsx",
      metadataKey: "primitives/inputs/input-group-with-addons",
    },
  },
  ui_primitives_inputs_input_group_with_buttons: {
    name: "input-group-with-buttons",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-with-buttons.tsx",
      metadataKey: "primitives/inputs/input-group-with-buttons",
    },
  },
  ui_primitives_inputs_input_group_with_kbd: {
    name: "input-group-with-kbd",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-with-kbd.tsx",
      metadataKey: "primitives/inputs/input-group-with-kbd",
    },
  },
  ui_primitives_inputs_input_group_with_tooltip: {
    name: "input-group-with-tooltip",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group-with-tooltip.tsx",
      metadataKey: "primitives/inputs/input-group-with-tooltip",
    },
  },
  ui_primitives_inputs_input_group: {
    name: "input-group",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-group.tsx",
      metadataKey: "primitives/inputs/input-group",
    },
  },
  ui_primitives_inputs_input_inline: {
    name: "input-inline",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-inline.tsx",
      metadataKey: "primitives/inputs/input-inline",
    },
  },
  ui_primitives_inputs_input_input_group: {
    name: "input-input-group",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-input-group.tsx",
      metadataKey: "primitives/inputs/input-input-group",
    },
  },
  ui_primitives_inputs_input_invalid: {
    name: "input-invalid",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-invalid.tsx",
      metadataKey: "primitives/inputs/input-invalid",
    },
  },
  ui_primitives_inputs_input_otp_alphanumeric: {
    name: "input-otp-alphanumeric",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-otp-alphanumeric.tsx",
      metadataKey: "primitives/inputs/input-otp-alphanumeric",
    },
  },
  ui_primitives_inputs_input_otp_controlled: {
    name: "input-otp-controlled",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-otp-controlled.tsx",
      metadataKey: "primitives/inputs/input-otp-controlled",
    },
  },
  ui_primitives_inputs_input_otp_disabled: {
    name: "input-otp-disabled",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-otp-disabled.tsx",
      metadataKey: "primitives/inputs/input-otp-disabled",
    },
  },
  ui_primitives_inputs_input_otp_form: {
    name: "input-otp-form",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-otp-form.tsx",
      metadataKey: "primitives/inputs/input-otp-form",
    },
  },
  ui_primitives_inputs_input_otp_four_digits: {
    name: "input-otp-four-digits",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-otp-four-digits.tsx",
      metadataKey: "primitives/inputs/input-otp-four-digits",
    },
  },
  ui_primitives_inputs_input_otp_invalid: {
    name: "input-otp-invalid",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-otp-invalid.tsx",
      metadataKey: "primitives/inputs/input-otp-invalid",
    },
  },
  ui_primitives_inputs_input_otp_pattern: {
    name: "input-otp-pattern",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-otp-pattern.tsx",
      metadataKey: "primitives/inputs/input-otp-pattern",
    },
  },
  ui_primitives_inputs_input_otp_separator: {
    name: "input-otp-separator",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-otp-separator.tsx",
      metadataKey: "primitives/inputs/input-otp-separator",
    },
  },
  ui_primitives_inputs_input_otp: {
    name: "input-otp",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input-otp.tsx",
      metadataKey: "primitives/inputs/input-otp",
    },
  },
  ui_primitives_inputs_input: {
    name: "input",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/inputs/input.tsx",
      metadataKey: "primitives/inputs/input",
    },
  },
  ui_primitives_layouts_brand_header: {
    name: "brand-header",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/layouts/brand-header.tsx",
      metadataKey: "primitives/layouts/brand-header",
    },
  },
  ui_primitives_layouts_brand_sidebar: {
    name: "brand-sidebar",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/layouts/brand-sidebar.tsx",
      metadataKey: "primitives/layouts/brand-sidebar",
    },
  },
  ui_primitives_layouts_coming_soon: {
    name: "coming-soon",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/layouts/coming-soon.tsx",
      metadataKey: "primitives/layouts/coming-soon",
    },
  },
  ui_primitives_layouts_hero: {
    name: "hero",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/layouts/hero.tsx",
      metadataKey: "primitives/layouts/hero",
    },
  },
  ui_primitives_layouts_measured_container: {
    name: "measured-container",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/layouts/measured-container.tsx",
      metadataKey: "primitives/layouts/measured-container",
    },
  },
  ui_primitives_layouts_navigation_menu: {
    name: "navigation-menu",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/layouts/navigation-menu.tsx",
      metadataKey: "primitives/layouts/navigation-menu",
    },
  },
  ui_primitives_layouts_navigation_progress: {
    name: "navigation-progress",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/layouts/navigation-progress.tsx",
      metadataKey: "primitives/layouts/navigation-progress",
    },
  },
  ui_primitives_layouts_resizable_handle: {
    name: "resizable-handle",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/layouts/resizable-handle.tsx",
      metadataKey: "primitives/layouts/resizable-handle",
    },
  },
  ui_primitives_layouts_resizable_vertical: {
    name: "resizable-vertical",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/layouts/resizable-vertical.tsx",
      metadataKey: "primitives/layouts/resizable-vertical",
    },
  },
  ui_primitives_layouts_sidebar: {
    name: "sidebar",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/layouts/sidebar.tsx",
      metadataKey: "primitives/layouts/sidebar",
    },
  },
  ui_primitives_layouts_social_proof_01: {
    name: "social-proof-01",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/layouts/social-proof-01.tsx",
      metadataKey: "primitives/layouts/social-proof-01",
    },
  },
  ui_primitives_layouts_social_proof_07: {
    name: "social-proof-07",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/layouts/social-proof-07.tsx",
      metadataKey: "primitives/layouts/social-proof-07",
    },
  },
  ui_primitives_layouts_sub_nav: {
    name: "sub-nav",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/layouts/sub-nav.tsx",
      metadataKey: "primitives/layouts/sub-nav",
    },
  },
  ui_primitives_layouts_swap_layout_loader: {
    name: "swap-layout-loader",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/layouts/swap-layout-loader.tsx",
      metadataKey: "primitives/layouts/swap-layout-loader",
    },
  },
  ui_primitives_layouts_swap_layout: {
    name: "swap-layout",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/layouts/swap-layout.tsx",
      metadataKey: "primitives/layouts/swap-layout",
    },
  },
  ui_primitives_links_link_bubble_menu: {
    name: "link-bubble-menu",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/links/link-bubble-menu.tsx",
      metadataKey: "primitives/links/link-bubble-menu",
    },
  },
  ui_primitives_links_link_edit_block: {
    name: "link-edit-block",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/links/link-edit-block.tsx",
      metadataKey: "primitives/links/link-edit-block",
    },
  },
  ui_primitives_links_link_edit_popover: {
    name: "link-edit-popover",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/links/link-edit-popover.tsx",
      metadataKey: "primitives/links/link-edit-popover",
    },
  },
  ui_primitives_links_link_popover_block: {
    name: "link-popover-block",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/links/link-popover-block.tsx",
      metadataKey: "primitives/links/link-popover-block",
    },
  },
  ui_primitives_lists_list_item: {
    name: "list-item",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/lists/list-item.tsx",
      metadataKey: "primitives/lists/list-item",
    },
  },
  ui_primitives_menus_menu_option: {
    name: "menu-option",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/menus/menu-option.tsx",
      metadataKey: "primitives/menus/menu-option",
    },
  },
  ui_primitives_menus_menu_other: {
    name: "menu-other",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/menus/menu-other.tsx",
      metadataKey: "primitives/menus/menu-other",
    },
  },
  ui_primitives_menus_menu: {
    name: "menu",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/menus/menu.tsx",
      metadataKey: "primitives/menus/menu",
    },
  },
  ui_primitives_menus_menubar_checkbox: {
    name: "menubar-checkbox",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/menus/menubar-checkbox.tsx",
      metadataKey: "primitives/menus/menubar-checkbox",
    },
  },
  ui_primitives_menus_menubar_icons: {
    name: "menubar-icons",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/menus/menubar-icons.tsx",
      metadataKey: "primitives/menus/menubar-icons",
    },
  },
  ui_primitives_menus_menubar_radio: {
    name: "menubar-radio",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/menus/menubar-radio.tsx",
      metadataKey: "primitives/menus/menubar-radio",
    },
  },
  ui_primitives_menus_menubar_submenu: {
    name: "menubar-submenu",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/menus/menubar-submenu.tsx",
      metadataKey: "primitives/menus/menubar-submenu",
    },
  },
  ui_primitives_menus_menubar: {
    name: "menubar",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/menus/menubar.tsx",
      metadataKey: "primitives/menus/menubar",
    },
  },
  ui_primitives_menus_navigation_menu: {
    name: "navigation-menu",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/menus/navigation-menu.tsx",
      metadataKey: "primitives/menus/navigation-menu",
    },
  },
  ui_primitives_popovers_popover_alignments: {
    name: "popover-alignments",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/popovers/popover-alignments.tsx",
      metadataKey: "primitives/popovers/popover-alignments",
    },
  },
  ui_primitives_popovers_popover_basic: {
    name: "popover-basic",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/popovers/popover-basic.tsx",
      metadataKey: "primitives/popovers/popover-basic",
    },
  },
  ui_primitives_popovers_popover_form: {
    name: "popover-form",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/popovers/popover-form.tsx",
      metadataKey: "primitives/popovers/popover-form",
    },
  },
  ui_primitives_popovers_popover: {
    name: "popover",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/popovers/popover.tsx",
      metadataKey: "primitives/popovers/popover",
    },
  },
  ui_primitives_registry_add_to_cursor: {
    name: "add-to-cursor",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/registry/add-to-cursor.tsx",
      metadataKey: "primitives/registry/add-to-cursor",
    },
  },
  ui_primitives_registry_component_card: {
    name: "component-card",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/registry/component-card.tsx",
      metadataKey: "primitives/registry/component-card",
    },
  },
  ui_primitives_registry_mcp_tabs: {
    name: "mcp-tabs",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/registry/mcp-tabs.tsx",
      metadataKey: "primitives/registry/mcp-tabs",
    },
  },
  ui_primitives_registry_open_in_v0: {
    name: "open-in-v0",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/registry/open-in-v0.tsx",
      metadataKey: "primitives/registry/open-in-v0",
    },
  },
  ui_primitives_registry_registry_logo: {
    name: "registry-logo",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/registry/registry-logo.tsx",
      metadataKey: "primitives/registry/registry-logo",
    },
  },
  ui_primitives_registry_registry_sidebar: {
    name: "registry-sidebar",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/registry/registry-sidebar.tsx",
      metadataKey: "primitives/registry/registry-sidebar",
    },
  },
  ui_primitives_registry_theme_toggle: {
    name: "theme-toggle",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/registry/theme-toggle.tsx",
      metadataKey: "primitives/registry/theme-toggle",
    },
  },
  ui_primitives_sections_five: {
    name: "five",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/sections/five.tsx",
      metadataKey: "primitives/sections/five",
    },
  },
  ui_primitives_sections_four: {
    name: "four",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/sections/four.tsx",
      metadataKey: "primitives/sections/four",
    },
  },
  ui_primitives_sections_one: {
    name: "one",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/sections/one.tsx",
      metadataKey: "primitives/sections/one",
    },
  },
  ui_primitives_sections_three: {
    name: "three",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/sections/three.tsx",
      metadataKey: "primitives/sections/three",
    },
  },
  ui_primitives_sections_toolbar_section: {
    name: "toolbar-section",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/sections/toolbar-section.tsx",
      metadataKey: "primitives/sections/toolbar-section",
    },
  },
  ui_primitives_sections_two: {
    name: "two",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/sections/two.tsx",
      metadataKey: "primitives/sections/two",
    },
  },
  ui_primitives_skeleton_empty_state: {
    name: "empty-state",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/skeleton/empty-state.tsx",
      metadataKey: "primitives/skeleton/empty-state",
    },
  },
  ui_primitives_skeleton_skeleton_avatar: {
    name: "skeleton-avatar",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/skeleton/skeleton-avatar.tsx",
      metadataKey: "primitives/skeleton/skeleton-avatar",
    },
  },
  ui_primitives_skeleton_skeleton_card: {
    name: "skeleton-card",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/skeleton/skeleton-card.tsx",
      metadataKey: "primitives/skeleton/skeleton-card",
    },
  },
  ui_primitives_skeleton_skeleton_demo: {
    name: "skeleton-demo",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/skeleton/skeleton-demo.tsx",
      metadataKey: "primitives/skeleton/skeleton-demo",
    },
  },
  ui_primitives_skeleton_skeleton_form: {
    name: "skeleton-form",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/skeleton/skeleton-form.tsx",
      metadataKey: "primitives/skeleton/skeleton-form",
    },
  },
  ui_primitives_skeleton_skeleton_table: {
    name: "skeleton-table",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/skeleton/skeleton-table.tsx",
      metadataKey: "primitives/skeleton/skeleton-table",
    },
  },
  ui_primitives_skeleton_skeleton_text: {
    name: "skeleton-text",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/skeleton/skeleton-text.tsx",
      metadataKey: "primitives/skeleton/skeleton-text",
    },
  },
  ui_primitives_skeleton_skeleton: {
    name: "skeleton",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/skeleton/skeleton.tsx",
      metadataKey: "primitives/skeleton/skeleton",
    },
  },
  ui_primitives_tables_datatable_transaction: {
    name: "datatable-transaction",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/tables/datatable-transaction.tsx",
      metadataKey: "primitives/tables/datatable-transaction",
    },
  },
  ui_primitives_tables_table_actions: {
    name: "table-actions",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/tables/table-actions.tsx",
      metadataKey: "primitives/tables/table-actions",
    },
  },
  ui_primitives_tables_table_footer: {
    name: "table-footer",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/tables/table-footer.tsx",
      metadataKey: "primitives/tables/table-footer",
    },
  },
  ui_primitives_tables_table: {
    name: "table",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/tables/table.tsx",
      metadataKey: "primitives/tables/table",
    },
  },
  ui_primitives_tabs_discrete_tabs: {
    name: "discrete-tabs",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/tabs/discrete-tabs.tsx",
      metadataKey: "primitives/tabs/discrete-tabs",
    },
  },
  ui_primitives_tabs_tabs_disabled: {
    name: "tabs-disabled",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/tabs/tabs-disabled.tsx",
      metadataKey: "primitives/tabs/tabs-disabled",
    },
  },
  ui_primitives_tabs_tabs_icons: {
    name: "tabs-icons",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/tabs/tabs-icons.tsx",
      metadataKey: "primitives/tabs/tabs-icons",
    },
  },
  ui_primitives_tabs_tabs_line: {
    name: "tabs-line",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/tabs/tabs-line.tsx",
      metadataKey: "primitives/tabs/tabs-line",
    },
  },
  ui_primitives_tabs_tabs_vertical: {
    name: "tabs-vertical",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/tabs/tabs-vertical.tsx",
      metadataKey: "primitives/tabs/tabs-vertical",
    },
  },
  ui_primitives_tabs_tabs: {
    name: "tabs",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/tabs/tabs.tsx",
      metadataKey: "primitives/tabs/tabs",
    },
  },
  ui_primitives_textarea_long_text: {
    name: "long-text",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/textarea/long-text.tsx",
      metadataKey: "primitives/textarea/long-text",
    },
  },
  ui_primitives_textarea_textarea_button: {
    name: "textarea-button",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/textarea/textarea-button.tsx",
      metadataKey: "primitives/textarea/textarea-button",
    },
  },
  ui_primitives_textarea_textarea_disabled: {
    name: "textarea-disabled",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/textarea/textarea-disabled.tsx",
      metadataKey: "primitives/textarea/textarea-disabled",
    },
  },
  ui_primitives_textarea_textarea_field: {
    name: "textarea-field",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/textarea/textarea-field.tsx",
      metadataKey: "primitives/textarea/textarea-field",
    },
  },
  ui_primitives_textarea_textarea_invalid: {
    name: "textarea-invalid",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/textarea/textarea-invalid.tsx",
      metadataKey: "primitives/textarea/textarea-invalid",
    },
  },
  ui_primitives_textarea_textarea: {
    name: "textarea",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/textarea/textarea.tsx",
      metadataKey: "primitives/textarea/textarea",
    },
  },
  ui_primitives_timelines_content_v1_1_0: {
    name: "v1-1-0",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/timelines/content/v1-1-0.tsx",
      metadataKey: "primitives/timelines/content/v1-1-0",
    },
  },
  ui_primitives_timelines_content_v1_2_0: {
    name: "v1-2-0",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/timelines/content/v1-2-0.tsx",
      metadataKey: "primitives/timelines/content/v1-2-0",
    },
  },
  ui_primitives_timelines_content_v1_3_0: {
    name: "v1-3-0",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/timelines/content/v1-3-0.tsx",
      metadataKey: "primitives/timelines/content/v1-3-0",
    },
  },
  ui_primitives_timelines_timeline_component_05: {
    name: "timeline-component-05",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/timelines/timeline-component-05.tsx",
      metadataKey: "primitives/timelines/timeline-component-05",
    },
  },
  ui_primitives_typography_typography_blockquote: {
    name: "typography-blockquote",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/typography/typography-blockquote.tsx",
      metadataKey: "primitives/typography/typography-blockquote",
    },
  },
  ui_primitives_typography_typography_h1: {
    name: "typography-h1",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/typography/typography-h1.tsx",
      metadataKey: "primitives/typography/typography-h1",
    },
  },
  ui_primitives_typography_typography_h2: {
    name: "typography-h2",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/typography/typography-h2.tsx",
      metadataKey: "primitives/typography/typography-h2",
    },
  },
  ui_primitives_typography_typography_h3: {
    name: "typography-h3",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/typography/typography-h3.tsx",
      metadataKey: "primitives/typography/typography-h3",
    },
  },
  ui_primitives_typography_typography_h4: {
    name: "typography-h4",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/typography/typography-h4.tsx",
      metadataKey: "primitives/typography/typography-h4",
    },
  },
  ui_primitives_typography_typography_inline_code: {
    name: "typography-inline-code",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/typography/typography-inline-code.tsx",
      metadataKey: "primitives/typography/typography-inline-code",
    },
  },
  ui_primitives_typography_typography_large: {
    name: "typography-large",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/typography/typography-large.tsx",
      metadataKey: "primitives/typography/typography-large",
    },
  },
  ui_primitives_typography_typography_lead: {
    name: "typography-lead",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/typography/typography-lead.tsx",
      metadataKey: "primitives/typography/typography-lead",
    },
  },
  ui_primitives_typography_typography_list: {
    name: "typography-list",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/typography/typography-list.tsx",
      metadataKey: "primitives/typography/typography-list",
    },
  },
  ui_primitives_typography_typography_muted: {
    name: "typography-muted",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/typography/typography-muted.tsx",
      metadataKey: "primitives/typography/typography-muted",
    },
  },
  ui_primitives_typography_typography_p: {
    name: "typography-p",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/typography/typography-p.tsx",
      metadataKey: "primitives/typography/typography-p",
    },
  },
  ui_primitives_typography_typography_small: {
    name: "typography-small",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/typography/typography-small.tsx",
      metadataKey: "primitives/typography/typography-small",
    },
  },
  ui_primitives_typography_typography_table: {
    name: "typography-table",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/typography/typography-table.tsx",
      metadataKey: "primitives/typography/typography-table",
    },
  },
  ui_primitives_ui_accordion: {
    name: "accordion",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/accordion.tsx",
      metadataKey: "primitives/ui/accordion",
    },
  },
  ui_primitives_ui_alert_dialog: {
    name: "alert-dialog",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/alert-dialog.tsx",
      metadataKey: "primitives/ui/alert-dialog",
    },
  },
  ui_primitives_ui_alert: {
    name: "alert",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/alert.tsx",
      metadataKey: "primitives/ui/alert",
    },
  },
  ui_primitives_ui_aspect_ratio: {
    name: "aspect-ratio",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/aspect-ratio.tsx",
      metadataKey: "primitives/ui/aspect-ratio",
    },
  },
  ui_primitives_ui_avatar: {
    name: "avatar",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/avatar.tsx",
      metadataKey: "primitives/ui/avatar",
    },
  },
  ui_primitives_ui_badge: {
    name: "badge",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/badge.tsx",
      metadataKey: "primitives/ui/badge",
    },
  },
  ui_primitives_ui_breadcrumb: {
    name: "breadcrumb",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/breadcrumb.tsx",
      metadataKey: "primitives/ui/breadcrumb",
    },
  },
  ui_primitives_ui_calendar: {
    name: "calendar",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/calendar.tsx",
      metadataKey: "primitives/ui/calendar",
    },
  },
  ui_primitives_ui_card: {
    name: "card",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/card.tsx",
      metadataKey: "primitives/ui/card",
    },
  },
  ui_primitives_ui_carousel: {
    name: "carousel",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/carousel.tsx",
      metadataKey: "primitives/ui/carousel",
    },
  },
  ui_primitives_ui_checkbox: {
    name: "checkbox",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/checkbox.tsx",
      metadataKey: "primitives/ui/checkbox",
    },
  },
  ui_primitives_ui_collapsible: {
    name: "collapsible",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/collapsible.tsx",
      metadataKey: "primitives/ui/collapsible",
    },
  },
  ui_primitives_ui_combobox: {
    name: "combobox",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/combobox.tsx",
      metadataKey: "primitives/ui/combobox",
    },
  },
  ui_primitives_ui_command_menu: {
    name: "command-menu",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/command-menu.tsx",
      metadataKey: "primitives/ui/command-menu",
    },
  },
  ui_primitives_ui_command: {
    name: "command",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/command.tsx",
      metadataKey: "primitives/ui/command",
    },
  },
  ui_primitives_ui_config_drawer: {
    name: "config-drawer",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/config-drawer.tsx",
      metadataKey: "primitives/ui/config-drawer",
    },
  },
  ui_primitives_ui_context_menu: {
    name: "context-menu",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/context-menu.tsx",
      metadataKey: "primitives/ui/context-menu",
    },
  },
  ui_primitives_ui_copy_code: {
    name: "copy-code",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/copy-code.tsx",
      metadataKey: "primitives/ui/copy-code",
    },
  },
  ui_primitives_ui_date_picker: {
    name: "date-picker",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/date-picker.tsx",
      metadataKey: "primitives/ui/date-picker",
    },
  },
  ui_primitives_ui_day_picker: {
    name: "day-picker",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/day-picker.tsx",
      metadataKey: "primitives/ui/day-picker",
    },
  },
  ui_primitives_ui_dialog: {
    name: "dialog",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/dialog.tsx",
      metadataKey: "primitives/ui/dialog",
    },
  },
  ui_primitives_ui_direction: {
    name: "direction",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/direction.tsx",
      metadataKey: "primitives/ui/direction",
    },
  },
  ui_primitives_ui_drawer: {
    name: "drawer",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/drawer.tsx",
      metadataKey: "primitives/ui/drawer",
    },
  },
  ui_primitives_ui_edit_switch: {
    name: "edit-switch",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/edit-switch.tsx",
      metadataKey: "primitives/ui/edit-switch",
    },
  },
  ui_primitives_ui_empty: {
    name: "empty",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/empty.tsx",
      metadataKey: "primitives/ui/empty",
    },
  },
  ui_primitives_ui_filters: {
    name: "filters",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/filters.tsx",
      metadataKey: "primitives/ui/filters",
    },
  },
  ui_primitives_ui_group: {
    name: "group",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/group.tsx",
      metadataKey: "primitives/ui/group",
    },
  },
  ui_primitives_ui_hover_card_sides: {
    name: "hover-card-sides",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/hover-card-sides.tsx",
      metadataKey: "primitives/ui/hover-card-sides",
    },
  },
  ui_primitives_ui_hover_card: {
    name: "hover-card",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/hover-card.tsx",
      metadataKey: "primitives/ui/hover-card",
    },
  },
  ui_primitives_ui_item: {
    name: "item",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/item.tsx",
      metadataKey: "primitives/ui/item",
    },
  },
  ui_primitives_ui_kbd: {
    name: "kbd",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/kbd.tsx",
      metadataKey: "primitives/ui/kbd",
    },
  },
  ui_primitives_ui_label: {
    name: "label",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/label.tsx",
      metadataKey: "primitives/ui/label",
    },
  },
  ui_primitives_ui_logo: {
    name: "logo",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/logo.tsx",
      metadataKey: "primitives/ui/logo",
    },
  },
  ui_primitives_ui_native_select: {
    name: "native-select",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/native-select.tsx",
      metadataKey: "primitives/ui/native-select",
    },
  },
  ui_primitives_ui_navigation_menu: {
    name: "navigation-menu",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/navigation-menu.tsx",
      metadataKey: "primitives/ui/navigation-menu",
    },
  },
  ui_primitives_ui_number_field: {
    name: "number-field",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/number-field.tsx",
      metadataKey: "primitives/ui/number-field",
    },
  },
  ui_primitives_ui_pagination: {
    name: "pagination",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/pagination.tsx",
      metadataKey: "primitives/ui/pagination",
    },
  },
  ui_primitives_ui_preview_card: {
    name: "preview-card",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/preview-card.tsx",
      metadataKey: "primitives/ui/preview-card",
    },
  },
  ui_primitives_ui_product_grid: {
    name: "product-grid",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/product-grid.tsx",
      metadataKey: "primitives/ui/product-grid",
    },
  },
  ui_primitives_ui_progress: {
    name: "progress",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/progress.tsx",
      metadataKey: "primitives/ui/progress",
    },
  },
  ui_primitives_ui_promo: {
    name: "promo",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/promo.tsx",
      metadataKey: "primitives/ui/promo",
    },
  },
  ui_primitives_ui_radio_group: {
    name: "radio-group",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/radio-group.tsx",
      metadataKey: "primitives/ui/radio-group",
    },
  },
  ui_primitives_ui_rating: {
    name: "rating",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/rating.tsx",
      metadataKey: "primitives/ui/rating",
    },
  },
  ui_primitives_ui_resizable: {
    name: "resizable",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/resizable.tsx",
      metadataKey: "primitives/ui/resizable",
    },
  },
  ui_primitives_ui_scroll_area: {
    name: "scroll-area",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/scroll-area.tsx",
      metadataKey: "primitives/ui/scroll-area",
    },
  },
  ui_primitives_ui_select: {
    name: "select",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/select.tsx",
      metadataKey: "primitives/ui/select",
    },
  },
  ui_primitives_ui_separator: {
    name: "separator",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/separator.tsx",
      metadataKey: "primitives/ui/separator",
    },
  },
  ui_primitives_ui_sheet: {
    name: "sheet",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/sheet.tsx",
      metadataKey: "primitives/ui/sheet",
    },
  },
  ui_primitives_ui_slider: {
    name: "slider",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/slider.tsx",
      metadataKey: "primitives/ui/slider",
    },
  },
  ui_primitives_ui_sonner: {
    name: "sonner",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/sonner.tsx",
      metadataKey: "primitives/ui/sonner",
    },
  },
  ui_primitives_ui_sortable_table_head: {
    name: "sortable-table-head",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/sortable-table-head.tsx",
      metadataKey: "primitives/ui/sortable-table-head",
    },
  },
  ui_primitives_ui_spinner: {
    name: "spinner",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/spinner.tsx",
      metadataKey: "primitives/ui/spinner",
    },
  },
  ui_primitives_ui_switch: {
    name: "switch",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/switch.tsx",
      metadataKey: "primitives/ui/switch",
    },
  },
  ui_primitives_ui_tabs: {
    name: "tabs",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/tabs.tsx",
      metadataKey: "primitives/ui/tabs",
    },
  },
  ui_primitives_ui_textarea: {
    name: "textarea",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/textarea.tsx",
      metadataKey: "primitives/ui/textarea",
    },
  },
  ui_primitives_ui_toast: {
    name: "toast",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/toast.tsx",
      metadataKey: "primitives/ui/toast",
    },
  },
  ui_primitives_ui_toggle_group: {
    name: "toggle-group",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/toggle-group.tsx",
      metadataKey: "primitives/ui/toggle-group",
    },
  },
  ui_primitives_ui_toggle: {
    name: "toggle",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/toggle.tsx",
      metadataKey: "primitives/ui/toggle",
    },
  },
  ui_primitives_ui_tooltip: {
    name: "tooltip",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/ui/tooltip.tsx",
      metadataKey: "primitives/ui/tooltip",
    },
  },
  ui_primitives_users_account_settings: {
    name: "account-settings",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/users/account-settings.tsx",
      metadataKey: "primitives/users/account-settings",
    },
  },
  ui_primitives_users_connect_account: {
    name: "connect-account",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/users/connect-account.tsx",
      metadataKey: "primitives/users/connect-account",
    },
  },
  ui_primitives_users_danger_zone: {
    name: "danger-zone",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/users/danger-zone.tsx",
      metadataKey: "primitives/users/danger-zone",
    },
  },
  ui_primitives_users_email_password: {
    name: "email-password",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/users/email-password.tsx",
      metadataKey: "primitives/users/email-password",
    },
  },
  ui_primitives_users_forgot_password_form: {
    name: "forgot-password-form",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/users/forgot-password-form.tsx",
      metadataKey: "primitives/users/forgot-password-form",
    },
  },
  ui_primitives_users_forgot_password: {
    name: "forgot-password",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/users/forgot-password.tsx",
      metadataKey: "primitives/users/forgot-password",
    },
  },
  ui_primitives_users_login_form: {
    name: "login-form",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/users/login-form.tsx",
      metadataKey: "primitives/users/login-form",
    },
  },
  ui_primitives_users_login_page: {
    name: "login-page",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/users/login-page.tsx",
      metadataKey: "primitives/users/login-page",
    },
  },
  ui_primitives_users_login: {
    name: "login",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/users/login.tsx",
      metadataKey: "primitives/users/login",
    },
  },
  ui_primitives_users_password_input: {
    name: "password-input",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/users/password-input.tsx",
      metadataKey: "primitives/users/password-input",
    },
  },
  ui_primitives_users_personal_info: {
    name: "personal-info",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/users/personal-info.tsx",
      metadataKey: "primitives/users/personal-info",
    },
  },
  ui_primitives_users_profile_dropdown: {
    name: "profile-dropdown",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/users/profile-dropdown.tsx",
      metadataKey: "primitives/users/profile-dropdown",
    },
  },
  ui_primitives_users_register_form: {
    name: "register-form",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/users/register-form.tsx",
      metadataKey: "primitives/users/register-form",
    },
  },
  ui_primitives_users_register: {
    name: "register",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/users/register.tsx",
      metadataKey: "primitives/users/register",
    },
  },
  ui_primitives_users_sign_out_dialog: {
    name: "sign-out-dialog",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/users/sign-out-dialog.tsx",
      metadataKey: "primitives/users/sign-out-dialog",
    },
  },
  ui_primitives_users_social_url: {
    name: "social-url",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/users/social-url.tsx",
      metadataKey: "primitives/users/social-url",
    },
  },
  ui_primitives_users_verify_email: {
    name: "verify-email",
    type: "ui-primitive",
    metadata: {
      sourcePath: "src/primitives/users/verify-email.tsx",
      metadataKey: "primitives/users/verify-email",
    },
  },
};

export function getRegistryItems(): Component[] {
  return REGISTRY_ITEMS;
}

export function getRegistryItem(name: string): Component | undefined {
  return REGISTRY_ITEMS.find((item) => item.name === name);
}

export function getBlocks(): Component[] {
  return REGISTRY_ITEMS.filter((item) => item.type === "registry:block");
}

export function getUIPrimitives(): Component[] {
  return REGISTRY_ITEMS.filter((item) => item.type === "registry:ui");
}

export function getComponents(): Component[] {
  return REGISTRY_ITEMS.filter((item) => item.type === "registry:component");
}
