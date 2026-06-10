"use client";

import {
  IconChartBar,
  IconDatabase,
  IconLayoutDashboard,
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
import { Alert, AlertDescription, AlertTitle } from "@/primitives/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/primitives/ui/avatar";
import { Badge } from "@/primitives/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/primitives/ui/card";
import { Checkbox } from "@/primitives/ui/checkbox";
import { Label } from "@/primitives/ui/label";
import { Progress } from "@/primitives/ui/progress";
import { Separator } from "@/primitives/ui/separator";
import { Switch } from "@/primitives/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/primitives/ui/tabs";

type PreviewProps = {
  name: string;
  sourcePath?: string;
};

export type VisualPreview = ComponentType<PreviewProps>;

function PrimitivePreview({ name, sourcePath }: PreviewProps) {
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

function MetricsCardPreview({ name, sourcePath }: PreviewProps) {
  return (
    <Card className="max-w-md">
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
            <p className="font-semibold text-2xl text-primary tabular-nums">
              +5.2
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ChartPreview({ name, sourcePath }: PreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconChartBar className="size-5" />
          {name}
        </CardTitle>
        <CardDescription>{sourcePath}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-32 items-end gap-2">
          {[42, 72, 55, 88, 64, 96, 70].map((height) => (
            <div
              className="flex-1 rounded-t bg-primary/80"
              key={height}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TablePreview({ name, sourcePath }: PreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconTable className="size-5" />
          {name}
        </CardTitle>
        <CardDescription>{sourcePath}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {["Transient", "Group", "Crew"].map((row, index) => (
          <div
            className="grid grid-cols-3 gap-2 rounded border p-2 text-sm"
            key={row}
          >
            <span>{row}</span>
            <span className="text-muted-foreground">
              {80 + index * 7} rooms
            </span>
            <span className="text-right font-medium">
              ${(180 + index * 24).toLocaleString()}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function SectionPreview({ name, sourcePath }: PreviewProps) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-muted-foreground text-xs">{sourcePath}</p>
        </div>
        <IconLayoutDashboard className="size-5 text-primary" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-muted p-3" />
        <div className="rounded-lg bg-muted p-3" />
        <div className="rounded-lg bg-muted p-3" />
      </div>
      <div className="mt-3 h-24 rounded-lg border bg-background" />
    </div>
  );
}

function DataPreview({ name, sourcePath }: PreviewProps) {
  return (
    <div className="rounded-xl border bg-card p-4">
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
  "src/primitives/buttons/button.tsx": () => (
    <div className="flex flex-wrap gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
  "src/primitives/ui/card.tsx": () => (
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
  "src/primitives/ui/alert.tsx": () => (
    <Alert>
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        This alert renders from the actual primitive.
      </AlertDescription>
    </Alert>
  ),
  "src/primitives/ui/avatar.tsx": () => (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png" />
        <AvatarFallback>RR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>UI</AvatarFallback>
      </Avatar>
    </div>
  ),
  "src/primitives/ui/badge.tsx": () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  "src/primitives/ui/checkbox.tsx": () => (
    <div className="flex items-center gap-2">
      <Checkbox defaultChecked id="preview-checkbox" />
      <Label htmlFor="preview-checkbox">Checked state</Label>
    </div>
  ),
  "src/primitives/ui/progress.tsx": () => <Progress value={68} />,
  "src/primitives/skeleton/skeleton.tsx": () => (
    <div className="space-y-3">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-20 w-full" />
    </div>
  ),
  "src/primitives/ui/switch.tsx": () => (
    <div className="flex items-center gap-2">
      <Switch defaultChecked id="preview-switch" />
      <Label htmlFor="preview-switch">Enabled</Label>
    </div>
  ),
  "src/primitives/ui/tabs.tsx": () => (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="rounded border p-3 text-sm">
        Overview content
      </TabsContent>
      <TabsContent value="details" className="rounded border p-3 text-sm">
        Details content
      </TabsContent>
    </Tabs>
  ),
  "src/primitives/inputs/input.tsx": () => (
    <Input placeholder="Revenue target" />
  ),
  "src/primitives/textarea/textarea.tsx": () => (
    <Textarea placeholder="Add notes..." />
  ),
  "src/primitives/typography/typography-h1.tsx": () => (
    <TypographyH1 className="text-left">Metrics Heading</TypographyH1>
  ),
  "src/primitives/typography/typography-h2.tsx": () => (
    <TypographyH2>Section Heading</TypographyH2>
  ),
  "src/primitives/typography/typography-h3.tsx": () => (
    <TypographyH3>Panel Heading</TypographyH3>
  ),
  "src/primitives/typography/typography-p.tsx": () => (
    <TypographyP>
      Typography primitives now render dynamic content through children.
    </TypographyP>
  ),
  "src/primitives/typography/typography-small.tsx": () => (
    <TypographySmall>Small supporting copy</TypographySmall>
  ),
};

export function getVisualPreview(sourcePath?: string): VisualPreview {
  if (!sourcePath) return PrimitivePreview;
  if (exactPreviews[sourcePath]) return exactPreviews[sourcePath];
  if (sourcePath.includes("/metrics-charts/")) return ChartPreview;
  if (
    sourcePath.includes("/metrics-tables/") ||
    sourcePath.includes("/tables/")
  )
    return TablePreview;
  if (
    sourcePath.includes("/metrics-core/") ||
    sourcePath.includes("/_shared-ui/")
  )
    return MetricsCardPreview;
  if (
    sourcePath.includes("/metrics-sections/") ||
    sourcePath.includes("/sections/")
  )
    return SectionPreview;
  if (
    sourcePath.includes("/data-grid/") ||
    sourcePath.includes("/data-library/")
  )
    return DataPreview;
  return PrimitivePreview;
}
