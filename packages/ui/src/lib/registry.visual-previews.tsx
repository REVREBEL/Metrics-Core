"use client";

import {
  IconChartBar,
  IconDatabase,
  IconLayoutDashboard,
  IconLayoutGrid,
  IconTable,
} from "@tabler/icons-react";
import type { ComponentType } from "react";

import { Button } from "@/primitives/buttons/button";
import { Input } from "@/primitives/inputs/input";
import { Skeleton } from "@/primitives/skeleton/skeleton";
import { Textarea } from "@/primitives/textarea/textarea";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyP,
  TypographySmall,
} from "@/primitives/typography";
import { Badge } from "@/primitives/ui-core/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/primitives/ui-core/card";
import { Label } from "@/primitives/ui-core/label";
import { Separator } from "@/primitives/ui-core/separator";
import { Switch } from "@/primitives/ui-core/switch";

export type PreviewProps = {
  description?: string;
  name: string;
  sourcePath?: string;
  title?: string;
};

export type VisualPreview = ComponentType<PreviewProps>;

export type RegistryPreviewTemplate =
  | "button"
  | "tabs"
  | "form-field"
  | "typography"
  | "layout"
  | "icon"
  | "chart"
  | "data-table"
  | "metric-card"
  | "content-block"
  | "generic";

export type RegistryPreviewLayout = "compact" | "half" | "full" | "grouped";

export type RegistryPreviewInput = {
  description?: string;
  name: string;
  sourcePath?: string;
  title?: string;
  type?: string;
};

export type RegistryPreviewSpec = {
  layout: RegistryPreviewLayout;
  template: RegistryPreviewTemplate;
};

function GenericPrimitivePreview({ name, sourcePath }: PreviewProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Badge variant="outline">Primitive</Badge>
        <span className="font-mono text-muted-foreground text-xs">{name}</span>
      </div>
      <div className="rounded-lg border bg-muted/25 p-4">
        <div className="h-2 w-24 rounded bg-primary/50" />
        <div className="mt-3 h-2 w-40 rounded bg-muted-foreground/20" />
        <div className="mt-2 h-2 w-32 rounded bg-muted-foreground/15" />
      </div>
      <p className="text-muted-foreground text-xs">{sourcePath}</p>
    </div>
  );
}

function CompactPrimitivePreview({ name, sourcePath }: PreviewProps) {
  return (
    <div className="space-y-4 rounded-2xl border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-muted-foreground text-xs">{sourcePath}</p>
        </div>
        <Badge variant="outline">Compact</Badge>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border bg-background p-3">
          <div className="mb-2 text-muted-foreground text-xs">Default</div>
          <Badge>Live</Badge>
        </div>
        <div className="rounded-lg border bg-background p-3">
          <div className="mb-2 text-muted-foreground text-xs">Alt</div>
          <Switch checked aria-label="preview switch" />
        </div>
      </div>
    </div>
  );
}

function ButtonStatesPreview() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border bg-background p-4">
          <div className="mb-3 text-muted-foreground text-xs">Variants</div>
          <div className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>
        <div className="rounded-xl border bg-background p-4">
          <div className="mb-3 text-muted-foreground text-xs">Sizes and states</div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabsNavigationPreview() {
  return (
    <div className="space-y-4 rounded-2xl border bg-card p-4">
      <div className="rounded-xl border bg-background p-4">
        <div className="mb-3 text-muted-foreground text-xs">Tabs and overflow</div>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-full bg-foreground px-4 py-2 text-background text-sm">
            Overview
          </button>
          <button className="rounded-full border px-4 py-2 text-sm">Segments</button>
          <button
            className="rounded-full border px-4 py-2 text-muted-foreground text-sm opacity-50"
            disabled
            type="button"
          >
            Disabled
          </button>
        </div>
        <div className="mt-3 rounded-lg border p-3 text-sm">Active tab content</div>
      </div>
    </div>
  );
}

function FormFieldPreview({ name }: PreviewProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border bg-background p-4">
          <div className="mb-3 text-muted-foreground text-xs">Field states</div>
          <div className="space-y-3">
            <Input defaultValue={name} />
            <Input aria-invalid defaultValue="Needs attention" />
            <Textarea defaultValue="Previewing interactive states with real primitives." />
          </div>
        </div>
        <div className="rounded-xl border bg-background p-4">
          <div className="mb-3 text-muted-foreground text-xs">Toggle states</div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Switch defaultChecked id="preview-switch" />
              <Label htmlFor="preview-switch">Enabled</Label>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input defaultChecked type="checkbox" />
              Checked
            </label>
            <div className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm">
              Error: field requires a value.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypographySpecimenPreview() {
  return (
    <div className="space-y-4 rounded-2xl border bg-card p-5">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-3">
          <TypographyH1>Registry Heading</TypographyH1>
          <TypographyH2>Section hierarchy stays visible.</TypographyH2>
          <TypographyP>
            Typography previews need actual specimens, not metadata-only cards.
          </TypographyP>
          <TypographySmall>Supporting copy and annotation.</TypographySmall>
        </div>
        <div className="rounded-xl border bg-background p-4">
          <div className="text-muted-foreground text-xs">Scale preview</div>
          <div className="mt-3 space-y-2">
            <TypographyH3>H3 / Panel title</TypographyH3>
            <TypographyP>Paragraph rhythm</TypographyP>
            <TypographySmall>12-14px support text</TypographySmall>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconAssetPreview({ name }: PreviewProps) {
  return (
    <div className="space-y-4 rounded-2xl border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-muted-foreground text-xs">Asset preview at multiple sizes</p>
        </div>
        <Badge variant="outline">Icon / Asset</Badge>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[16, 24, 40].map((size) => (
          <div key={size} className="rounded-xl border bg-background p-4 text-center">
            <div
              className="mx-auto rounded bg-muted"
              style={{ height: size, width: size }}
            />
            <div className="mt-2 text-[10px] text-muted-foreground">{size}px</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricsCardPreview({ name, sourcePath }: PreviewProps) {
  return (
    <Card className="max-w-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{name}</CardTitle>
          <Badge>Metrics</Badge>
        </div>
        <CardDescription>{sourcePath}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-muted-foreground text-xs">Actual</p>
            <p className="font-semibold text-2xl tabular-nums">84.2%</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Budget</p>
            <p className="font-semibold text-2xl tabular-nums">79.0%</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Variance</p>
            <p className="font-semibold text-2xl text-primary tabular-nums">+5.2</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ChartPreview({ name, sourcePath }: PreviewProps) {
  return (
    <Card className="max-w-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconChartBar className="size-5" />
          {name}
        </CardTitle>
        <CardDescription>{sourcePath}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-40 items-end gap-2 rounded-xl border bg-background p-4">
          {[42, 72, 55, 88, 64, 96, 70].map((height, index) => (
            <div key={`${height}-${index}`} className="flex flex-1 flex-col justify-end gap-2">
              <div className="rounded-t bg-primary/80" style={{ height: `${height}%` }} />
              <div className="text-center text-[10px] text-muted-foreground">{index + 1}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TablePreview({ name, sourcePath }: PreviewProps) {
  return (
    <Card className="max-w-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconTable className="size-5" />
          {name}
        </CardTitle>
        <CardDescription>{sourcePath}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {["Transient", "Group", "Crew"].map((row, index) => (
          <div key={row} className="grid grid-cols-3 gap-2 rounded-xl border bg-background p-3 text-sm">
            <span>{row}</span>
            <span className="text-muted-foreground">{80 + index * 7} rooms</span>
            <span className="text-right font-medium">${(180 + index * 24).toLocaleString()}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function SectionPreview({ name, sourcePath }: PreviewProps) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-muted-foreground text-xs">{sourcePath}</p>
        </div>
        <IconLayoutDashboard className="size-5 text-primary" />
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border bg-background p-4" />
        <div className="rounded-lg border bg-background p-4" />
        <div className="rounded-lg border bg-background p-4" />
      </div>
      <div className="mt-3 h-32 rounded-lg border bg-background" />
    </div>
  );
}

function FullCanvasPreview({ name, description }: PreviewProps) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {description || "This preview needs a wider canvas to render its layout correctly."}
          </p>
        </div>
        <IconLayoutGrid className="size-5 text-primary" />
      </div>
      <div className="grid gap-3 lg:grid-cols-[240px_1fr]">
        <div className="rounded-xl border bg-background p-4" />
        <div className="space-y-3 rounded-xl border bg-background p-4">
          <div className="h-6 w-1/3 rounded bg-muted" />
          <div className="grid gap-3 md:grid-cols-3">
            <div className="h-24 rounded-lg bg-muted" />
            <div className="h-24 rounded-lg bg-muted" />
            <div className="h-24 rounded-lg bg-muted" />
          </div>
          <div className="h-48 rounded-lg border bg-card" />
        </div>
      </div>
    </div>
  );
}

function DataPreview({ name, sourcePath }: PreviewProps) {
  return (
    <div className="rounded-2xl border bg-card p-4">
      <div className="flex items-center gap-2">
        <IconDatabase className="size-5 text-primary" />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-muted-foreground text-xs">{sourcePath}</p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="space-y-2">
        <div className="h-2 rounded bg-primary/60" />
        <div className="h-2 w-4/5 rounded bg-muted-foreground/20" />
        <div className="h-2 w-2/3 rounded bg-muted-foreground/20" />
      </div>
    </div>
  );
}

const exactPreviews: Record<string, VisualPreview> = {
  "src/primitives/ui-core/badge.tsx": () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  "src/primitives/ui-core/card.tsx": () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Revenue Snapshot</CardTitle>
        <CardDescription>Visual card primitive preview.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-semibold text-3xl">$128.4K</p>
      </CardContent>
    </Card>
  ),
  "src/primitives/ui-core/switch.tsx": () => (
    <div className="flex items-center gap-2">
      <Switch defaultChecked id="preview-switch" />
      <Label htmlFor="preview-switch">Enabled</Label>
    </div>
  ),
  "src/primitives/skeleton/skeleton.tsx": () => (
    <div className="space-y-3">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-20 w-full" />
    </div>
  ),
};

const templateRenderers: Record<RegistryPreviewTemplate, VisualPreview> = {
  button: ButtonStatesPreview,
  tabs: TabsNavigationPreview,
  "form-field": FormFieldPreview,
  typography: TypographySpecimenPreview,
  layout: FullCanvasPreview,
  icon: IconAssetPreview,
  chart: ChartPreview,
  "data-table": TablePreview,
  "metric-card": MetricsCardPreview,
  "content-block": SectionPreview,
  generic: GenericPrimitivePreview,
};

function inferSourcePath(input: RegistryPreviewInput) {
  return input.sourcePath ?? "";
}

/**
 * Add new preview templates here by:
 * 1. defining a new `RegistryPreviewTemplate` value,
 * 2. mapping source paths or explicit item metadata in `getRegistryPreviewSpec`,
 * 3. registering the renderer in `templateRenderers`.
 */
export function getRegistryPreviewSpec(input: RegistryPreviewInput): RegistryPreviewSpec {
  const sourcePath = inferSourcePath(input);

  if (sourcePath.includes("/typography/")) {
    return { template: "typography", layout: "grouped" };
  }

  if (sourcePath.includes("/buttons/")) {
    return { template: "button", layout: "grouped" };
  }

  if (
    sourcePath.includes("/tabs/") ||
    sourcePath.includes("/navigation") ||
    sourcePath.includes("/breadcrumb") ||
    sourcePath.includes("/menus/") ||
    sourcePath.includes("/dropdowns/")
  ) {
    return { template: "tabs", layout: "half" };
  }

  if (
    sourcePath.includes("/inputs/") ||
    sourcePath.includes("/textarea/") ||
    sourcePath.includes("/popovers/") ||
    sourcePath.includes("/forms/") ||
    sourcePath.includes("/ui/accordion") ||
    sourcePath.includes("/ui/calendar") ||
    sourcePath.includes("/ui/dialog") ||
    sourcePath.includes("/ui/select") ||
    sourcePath.includes("/ui/tooltip")
  ) {
    return { template: "form-field", layout: "half" };
  }

  if (sourcePath.includes("/metrics-charts/") || sourcePath.includes("/charts/")) {
    return { template: "chart", layout: "full" };
  }

  if (
    sourcePath.includes("/metrics-tables/") ||
    sourcePath.includes("/tables/") ||
    sourcePath.includes("/data-grid/")
  ) {
    return { template: "data-table", layout: "full" };
  }

  if (
    input.type === "registry:block" ||
    sourcePath.includes("/layouts/") ||
    sourcePath.includes("/sections/") ||
    sourcePath.includes("/metrics-layouts/")
  ) {
    return { template: "layout", layout: "full" };
  }

  if (
    sourcePath.includes("/metrics-core/") ||
    sourcePath.includes("/_shared-ui/") ||
    sourcePath.includes("/metrics-feedback/")
  ) {
    return { template: "metric-card", layout: "half" };
  }

  if (
    sourcePath.includes("/ui-registry/") ||
    sourcePath.includes("/lib/") ||
    sourcePath.includes("/context/")
  ) {
    return { template: "content-block", layout: "half" };
  }

  if (
    sourcePath.includes("/icons/") ||
    sourcePath.includes("/logos/") ||
    input.name.includes("icon")
  ) {
    return { template: "icon", layout: "compact" };
  }

  if (
    sourcePath.includes("/ui/avatar") ||
    sourcePath.includes("/ui/badge") ||
    sourcePath.includes("/ui/progress") ||
    sourcePath.includes("/ui/switch") ||
    sourcePath.includes("/ui/checkbox") ||
    sourcePath.includes("/skeleton/")
  ) {
    return { template: "icon", layout: "compact" };
  }

  return { template: "generic", layout: "compact" };
}

export function getVisualPreview(input: RegistryPreviewInput): VisualPreview {
  const sourcePath = inferSourcePath(input);

  if (sourcePath && exactPreviews[sourcePath]) {
    return exactPreviews[sourcePath];
  }

  return templateRenderers[getRegistryPreviewSpec(input).template];
}

export function getPreviewLayoutClasses(layout: RegistryPreviewLayout) {
  switch (layout) {
    case "full":
    case "grouped":
      return "xl:col-span-2";
    case "half":
      return "xl:col-span-1";
    case "compact":
    default:
      return "xl:col-span-1";
  }
}
