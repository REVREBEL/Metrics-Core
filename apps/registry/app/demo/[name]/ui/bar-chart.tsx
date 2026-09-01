"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui";
import type * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/primitives/charts/chart";

const DemoChartLegendContent =
  ChartLegendContent as unknown as React.ComponentType<Record<string, unknown>>;
const DemoChartTooltipContent =
  ChartTooltipContent as unknown as React.ComponentType<
    Record<string, unknown>
  >;

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  visitors: {
    label: "Total Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function BarChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              content={(props: Record<string, unknown>) => (
                <DemoChartTooltipContent {...props} />
              )}
            />
            <ChartLegend content={DemoChartLegendContent as never} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
