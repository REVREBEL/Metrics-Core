import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconChartBar } from "@tabler/icons-react";
import StatisticsCard from "./statistics-card";

const meta: Meta<typeof StatisticsCard> = {
  title: "Primitives/Charts/StatisticsCard",
  component: StatisticsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    icon: {
      control: { type: "none" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof StatisticsCard>;

export const Default: Story = {
  args: {
    icon: <IconChartBar className="size-5" />,
    title: "Total Revenue",
    value: "$45,231.89",
    changePercentage: "+20.1%",
  },
};

export const NegativeChange: Story = {
  args: {
    icon: <IconChartBar className="size-5" />,
    title: "Active Users",
    value: "2,350",
    changePercentage: "-4.5%",
  },
};
