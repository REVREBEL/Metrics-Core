import type { Meta, StoryObj } from "@storybook/react-vite";
import ProductInsightsCard from "./widget-product-insights";

const meta = {
  title: "Primitives/Charts/Product Insights Card",
  component: ProductInsightsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ProductInsightsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Awesome Gadget Insight",
    publishedDate: "Published on 15 JUN 2026 - 10:30 AM",
    reachedCount: "45,230",
    ordersCount: "5,412",
    reachedData: [
      { month: "January", reached: 120 },
      { month: "February", reached: 220 },
      { month: "March", reached: 340 },
      { month: "April", reached: 410 },
      { month: "May", reached: 520 },
    ],
    ordersData: [
      { month: "January", orders: 15 },
      { month: "February", orders: 25 },
      { month: "March", orders: 42 },
      { month: "April", orders: 60 },
      { month: "May", orders: 98 },
    ],
  },
};
