import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconChartBar } from "@tabler/icons-react";
import StatisticsCard from "./statistics-card";

const meta = {
  title: "Primitives/Charts/Statistics Card",
  component: StatisticsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof StatisticsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Total Revenue",
    value: "$45,231.89",
    changePercentage: "+20.1%",
    icon: <IconChartBar size={16} />,
  },
};

export const NegativeChange: Story = {
  args: {
    title: "Active Users",
    value: "2,350",
    changePercentage: "-4.5%",
    icon: <IconChartBar size={16} />,
  },
};
