import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AreaChartDemo,
  BarChartDemo,
  LineChartDemo,
  PieChartDemo,
} from "./chart-demos";

const meta = {
  title: "Primitives/Charts/Chart Demos",
  component: AreaChartDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof AreaChartDemo>;

export default meta;

export const Area: StoryObj<typeof meta> = {
  render: (args) => <AreaChartDemo {...args} />,
};

export const Bar: StoryObj<typeof BarChartDemo> = {
  render: (args) => <BarChartDemo {...args} />,
};

export const Line: StoryObj<typeof LineChartDemo> = {
  render: (args) => <LineChartDemo {...args} />,
};

export const Pie: StoryObj<typeof PieChartDemo> = {
  render: (args) => <PieChartDemo {...args} />,
};
