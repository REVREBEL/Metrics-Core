import type { Meta, StoryObj } from "@storybook/react-vite";
import SalesMetricsCard from "./chart-sales-metrics";

const meta: Meta<typeof SalesMetricsCard> = {
  title: "Primitives/Charts/SalesMetricsCard",
  component: SalesMetricsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof SalesMetricsCard>;

export const Default: Story = {
  args: {},
};
