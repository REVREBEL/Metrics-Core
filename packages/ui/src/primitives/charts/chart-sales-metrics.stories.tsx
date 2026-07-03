import type { Meta, StoryObj } from "@storybook/react-vite";
import SalesMetricsCard from "./chart-sales-metrics";

const meta = {
  title: "Primitives/Charts/Sales Metrics Card",
  component: SalesMetricsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof SalesMetricsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    companyName: "Acme Corporation",
    companyEmail: "analytics@acme.com",
    salesPlanPercentage: 75,
    revenueGoal: "542.80",
    planCompleted: "82%",
  },
};
