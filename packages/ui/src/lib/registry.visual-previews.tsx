"use client";

import {
  IconArchive,
  IconChartBar,
  IconDatabase,
  IconChevronDown,
  IconDots,
  IconLayoutDashboard,
  IconLayoutGrid,
  IconPlus,
  IconSearch,
  IconStar,
  IconTable,
} from "@tabler/icons-react";
import type { ComponentType, ReactNode } from "react";

import { Button } from "@/primitives/buttons/button";
import { SaveButton } from "@/primitives/buttons/status-button";
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

export type RegistryButtonPreviewGroupId =
  | "core"
  | "icon"
  | "rounded"
  | "group"
  | "menu"
  | "toolbar";

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
      <div className="rounded-2xl border bg-card p-5">
        <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-3 rounded-xl border bg-background p-4">
            <div className="text-muted-foreground text-xs">Field states</div>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="preview-email">Your email address</Label>
                <Input id="preview-email" defaultValue={name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preview-error">Validation state</Label>
                <Input id="preview-error" aria-invalid defaultValue="Needs attention" />
              </div>
              <div className="rounded-md border border-dashed p-3 text-sm text-muted-foreground">
                Labels, field descriptions, and inline validation should read as one composed unit.
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-background p-5">
            <div className="mb-4">
              <div className="font-medium text-sm">Payment Method</div>
              <p className="mt-1 text-muted-foreground text-xs">
                All transactions are secure and encrypted.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="payment-name">Name on Card</Label>
                <Input id="payment-name" defaultValue="Evil Rabbit" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-number">Card Number</Label>
                <Input id="payment-number" defaultValue="1234 5678 9012 3456" />
                <p className="text-muted-foreground text-xs">Enter your 16-digit card number</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="payment-month">Month</Label>
                  <Input id="payment-month" defaultValue="MM" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-year">Year</Label>
                  <Input id="payment-year" defaultValue="YYYY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-cvv">CVV</Label>
                  <Input id="payment-cvv" defaultValue="123" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-comments">Comments</Label>
                <Textarea
                  id="payment-comments"
                  defaultValue="Add any additional comments"
                  className="min-h-24"
                />
              </div>
              <div className="flex items-center gap-2">
                <input id="same-shipping" defaultChecked type="checkbox" />
                <Label htmlFor="same-shipping">Same as shipping address</Label>
              </div>
              <div className="flex gap-2">
                <Button size="sm">Submit</Button>
                <Button size="sm" variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypographySpecimenPreview() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <TypographyP>
            We do not ship any typography styles by default. This preview shows how hierarchy, spacing, paragraphs, lists, blockquotes, and tables work together.
          </TypographyP>
        </div>
        <div className="rounded-xl border bg-background p-6">
          <div className="max-w-3xl space-y-6">
            <div className="space-y-3">
              <TypographyH1>Taxing Laughter: The Joke Tax Chronicles</TypographyH1>
              <TypographyP className="text-muted-foreground">
                Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne.
              </TypographyP>
            </div>
            <div className="space-y-3">
              <TypographyH2>The King's Plan</TypographyH2>
              <TypographyP>
                The king thought long and hard, and finally came up with a brilliant plan: he would tax the jokes in the kingdom.
              </TypographyP>
              <blockquote className="border-l-2 pl-6 italic text-sm">
                “After all,” he said, “everyone enjoys a good joke, so it's only fair that they should pay for the privilege.”
              </blockquote>
            </div>
            <div className="space-y-3">
              <TypographyH3>The Joke Tax</TypographyH3>
              <ul className="list-disc space-y-2 pl-6 text-sm">
                <li>1st level of puns: 5 gold coins</li>
                <li>2nd level of jokes: 10 gold coins</li>
                <li>3rd level of one-liners: 20 gold coins</li>
              </ul>
            </div>
            <div className="space-y-3">
              <TypographyH3>The People's Rebellion</TypographyH3>
              <div className="overflow-hidden rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40">
                    <tr className="[&>th]:border-b [&>th]:px-4 [&>th]:py-2 [&>th]:text-left [&>th]:font-medium">
                      <th>King's Treasury</th>
                      <th>People's happiness</th>
                    </tr>
                  </thead>
                  <tbody className="[&>tr:not(:last-child)]:border-b [&_td]:px-4 [&_td]:py-2">
                    <tr>
                      <td>Empty</td>
                      <td>Overflowing</td>
                    </tr>
                    <tr className="bg-muted/20">
                      <td>Modest</td>
                      <td>Satisfied</td>
                    </tr>
                    <tr>
                      <td>Full</td>
                      <td>Ecstatic</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
      <CardContent>
        <div className="overflow-hidden rounded-xl border bg-background">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr className="[&>th]:border-b [&>th]:px-4 [&>th]:py-2.5 [&>th]:text-left [&>th]:font-medium">
                <th>Invoice</th>
                <th>Status</th>
                <th>Method</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="[&>tr:not(:last-child)]:border-b [&_td]:px-4 [&_td]:py-2.5">
              {[
                ["INV001", "Paid", "Credit Card", "$250.00"],
                ["INV002", "Pending", "PayPal", "$150.00"],
                ["INV003", "Unpaid", "Bank Transfer", "$350.00"],
                ["INV004", "Paid", "Credit Card", "$450.00"],
                ["INV005", "Paid", "PayPal", "$550.00"],
              ].map(([invoice, status, method, amount]) => (
                <tr key={invoice}>
                  <td>{invoice}</td>
                  <td>{status}</td>
                  <td>{method}</td>
                  <td className="text-right font-medium">{amount}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-muted/20">
              <tr className="[&>td]:px-4 [&>td]:py-2.5">
                <td colSpan={3} className="font-medium">
                  Total
                </td>
                <td className="text-right font-semibold">$1,750.00</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="mt-3 text-center text-muted-foreground text-xs">
          A list of your recent invoices.
        </p>
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

function PreviewPane({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <div className="mb-3 text-muted-foreground text-xs">{title}</div>
      {children}
    </div>
  );
}

export function RegistryButtonFamilyPreview({
  previewId,
}: {
  previewId: RegistryButtonPreviewGroupId;
}) {
  switch (previewId) {
    case "core":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          <PreviewPane title="Variants">
            <div className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </PreviewPane>
          <PreviewPane title="Sizes and states">
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
              <Button className="min-w-28">Primary action</Button>
            </div>
          </PreviewPane>
        </div>
      );
    case "icon":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          <PreviewPane title="Icon-only actions">
            <div className="flex flex-wrap gap-2">
              <Button size="icon" variant="outline" aria-label="Search">
                <IconSearch className="size-4" />
              </Button>
              <Button size="icon" aria-label="Favorite">
                <IconStar className="size-4" />
              </Button>
              <Button size="icon" variant="secondary" aria-label="Add">
                <IconPlus className="size-4" />
              </Button>
            </div>
          </PreviewPane>
          <PreviewPane title="Inline icons and utility states">
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline">
                <IconPlus className="size-4" />
                New Branch
              </Button>
              <Button variant="outline">
                Compare
                <IconChevronDown className="size-4" />
              </Button>
              <Button variant="ghost" className="px-0">
                View details
              </Button>
            </div>
          </PreviewPane>
        </div>
      );
    case "rounded":
      return (
        <PreviewPane title="Rounded pills and circular controls">
          <div className="flex flex-wrap items-center gap-2">
            <Button className="rounded-full">Get Started</Button>
            <Button className="rounded-full" variant="secondary">
              Continue
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" aria-label="Open options">
              <IconChevronDown className="size-4" />
            </Button>
          </div>
        </PreviewPane>
      );
    case "group":
      return (
        <div className="grid gap-3 lg:grid-cols-2">
          <PreviewPane title="Horizontal, separator, split sizing">
            <div className="space-y-3">
              <div className="flex w-fit items-stretch">
                <Button variant="outline">Archive</Button>
                <Button variant="outline">Report</Button>
                <Button variant="outline">Snooze</Button>
              </div>
              <div className="flex w-fit items-stretch">
                <Button variant="secondary">Create</Button>
                <div className="w-px self-stretch bg-border" />
                <Button variant="secondary" size="icon" aria-label="Add">
                  <IconPlus className="size-4" />
                </Button>
              </div>
            </div>
          </PreviewPane>
          <PreviewPane title="Orientation and nesting">
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex w-fit flex-col items-stretch">
                <Button variant="outline" size="icon" aria-label="Increase">
                  <IconPlus className="size-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="More">
                  <IconDots className="size-4" />
                </Button>
              </div>
              <div className="flex w-fit items-stretch">
                <Button variant="outline">Publish</Button>
                <div className="ml-2 flex w-fit items-stretch">
                  <Button variant="outline" size="sm">
                    Draft
                  </Button>
                  <Button variant="outline" size="sm">
                    Live
                  </Button>
                </div>
              </div>
            </div>
          </PreviewPane>
        </div>
      );
    case "menu":
      return (
        <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
          <PreviewPane title="Dropdown and split triggers">
            <div className="space-y-4">
              <div className="flex w-fit items-stretch">
                <Button variant="outline">Follow</Button>
                <Button variant="outline" className="pl-2" aria-label="Open follow menu">
                  <IconChevronDown className="size-4" />
                </Button>
              </div>
              <div className="flex w-fit items-stretch">
                <Button variant="secondary">Button</Button>
                <div className="w-px self-stretch bg-border" />
                <Button size="icon" variant="secondary" aria-label="Add">
                  <IconPlus className="size-4" />
                </Button>
              </div>
            </div>
          </PreviewPane>
          <PreviewPane title="Attached menu surface">
            <div className="w-full max-w-56 rounded-xl border bg-card p-2 shadow-sm">
              {["Mute Conversation", "Mark as Read", "Report Conversation"].map((label) => (
                <div key={label} className="rounded-lg px-3 py-2 text-sm hover:bg-muted">
                  {label}
                </div>
              ))}
              <div className="my-1 border-t" />
              <div className="rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/5">
                Delete Conversation
              </div>
            </div>
          </PreviewPane>
        </div>
      );
    case "toolbar":
      return (
        <div className="grid gap-3">
          <PreviewPane title="Toolbar, status, and discovery actions">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 rounded-xl border bg-background p-1">
                <button
                  type="button"
                  aria-label="Archive"
                  className="inline-flex size-9 items-center justify-center rounded-lg border bg-background"
                >
                  <IconArchive className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Favorite"
                  className="inline-flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground"
                >
                  <IconStar className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="More options"
                  className="inline-flex size-9 items-center justify-center rounded-lg border bg-background"
                >
                  <IconDots className="size-4" />
                </button>
              </div>
              <SaveButton />
              <Button className="rounded-full" variant="outline">
                <IconSearch className="size-4" />
                Discover
              </Button>
            </div>
          </PreviewPane>
        </div>
      );
  }
}

const exactPreviews: Record<string, VisualPreview> = {
  "src/primitives/ui/label.tsx": () => (
    <div className="rounded-2xl border bg-card p-5">
      <div className="rounded-xl border bg-background p-8">
        <div className="flex min-h-40 items-center justify-center">
          <div className="flex items-center gap-2">
            <input id="accept-terms" type="checkbox" className="size-4" />
            <Label htmlFor="accept-terms">Accept terms and conditions</Label>
          </div>
        </div>
      </div>
    </div>
  ),
  "src/primitives/auto-form/common/label.tsx": () => (
    <div className="rounded-2xl border bg-card p-5">
      <div className="grid gap-4 rounded-xl border bg-background p-6 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-2">
          <div className="font-medium text-sm">Label In Field</div>
          <p className="text-muted-foreground text-xs">
            Field labels should read as part of the full form composition.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="auto-form-email">Your email address</Label>
            <Input id="auto-form-email" defaultValue="name@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="auto-form-card">Card Number</Label>
            <Input id="auto-form-card" defaultValue="1234 5678 9012 3456" />
          </div>
        </div>
      </div>
    </div>
  ),
  "src/primitives/typography/typography-p.tsx": () => (
    <div className="rounded-2xl border bg-card p-5">
      <div className="rounded-xl border bg-background p-8">
        <div className="flex min-h-40 items-center">
          <TypographyP className="max-w-xl">
            The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.
          </TypographyP>
        </div>
      </div>
    </div>
  ),
  "src/primitives/typography/typography-blockquote.tsx": () => (
    <div className="rounded-2xl border bg-card p-5">
      <div className="rounded-xl border bg-background p-8">
        <div className="flex min-h-40 items-center">
          <blockquote className="max-w-2xl border-l-2 pl-6 italic text-sm">
            “After all,” he said, “everyone enjoys a good joke, so it's only fair that they should pay for the privilege.”
          </blockquote>
        </div>
      </div>
    </div>
  ),
  "src/primitives/typography/typography-table.tsx": () => (
    <div className="rounded-2xl border bg-card p-5">
      <div className="rounded-xl border bg-background p-8">
        <div className="overflow-hidden rounded border">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr className="[&>th]:border-b [&>th]:px-4 [&>th]:py-2 [&>th]:text-left [&>th]:font-medium">
                <th>King's Treasury</th>
                <th>People's happiness</th>
              </tr>
            </thead>
            <tbody className="[&>tr:not(:last-child)]:border-b [&_td]:px-4 [&_td]:py-2">
              <tr>
                <td>Empty</td>
                <td>Overflowing</td>
              </tr>
              <tr className="bg-muted/20">
                <td>Modest</td>
                <td>Satisfied</td>
              </tr>
              <tr>
                <td>Full</td>
                <td>Ecstatic</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ),
  "src/primitives/tables/table.tsx": TablePreview,
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
