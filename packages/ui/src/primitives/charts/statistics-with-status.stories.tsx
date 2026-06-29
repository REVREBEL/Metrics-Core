import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconChartLine } from "@tabler/icons-react";
import StatisticsCard from "./statistics-with-status";

const meta: Meta<typeof StatisticsCard> = {
  title: "Primitives/Charts/StatisticsWithStatus",
  component: StatisticsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    status: {
      control: "select",
      options: ["within", "observe", "exceed", "unknown"],
    },
    icon: {
      control: { type: "none" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof StatisticsCard>;

export const OnTrack: Story = {
  args: {
    title: "Total Revenue",
    value: "$45,231.89",
    status: "within",
    range: "12% increase",
    icon: <IconChartLine />,
  },
};
