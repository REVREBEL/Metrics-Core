
import * as React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CartesianGrid, Line, LineChart as RechartsLineChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

const meta: Meta = {
  title: "Primitives/Charts/Chart",
  component: ChartContainer,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof ChartContainer>;

export const Default: Story = {
    args: {
        config: chartConfig,
        className: "w-[720px] max-w-full h-[400px]",
    },
    render: (args) => (
        <ChartContainer {...args}>
        <RechartsLineChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            />
            <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
            dataKey="desktop"
            type="monotone"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
            />
            <Line
            dataKey="mobile"
            type="monotone"
            stroke="var(--color-mobile)"
            strokeWidth={2}
            dot={false}
            />
        </RechartsLineChart>
        </ChartContainer>
    ),
};

export const Legend: Story = {
    args: {
        config: chartConfig,
        className: "w-[720px] max-w-full h-[400px]",
    },
    render: (args) => (
        <ChartContainer {...args}>
        <RechartsLineChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            />
            <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
            dataKey="desktop"
            type="monotone"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
            />
            <Line
            dataKey="mobile"
            type="monotone"
            stroke="var(--color-mobile)"
            strokeWidth={2}
            dot={false}
            />
        </RechartsLineChart>
        </ChartContainer>
    ),
};


export const Tooltip: Story = {
    args: {
        config: chartConfig,
        className: "w-[720px] max-w-full h-[400px]",
    },
    render: (args) => (
        <ChartContainer {...args}>
        <RechartsLineChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            />
            <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
            dataKey="desktop"
            type="monotone"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
            />
            <Line
            dataKey="mobile"
            type="monotone"
            stroke="var(--color-mobile)"
            strokeWidth={2}
            dot={false}
            />
        </RechartsLineChart>
        </ChartContainer>
    ),
};
