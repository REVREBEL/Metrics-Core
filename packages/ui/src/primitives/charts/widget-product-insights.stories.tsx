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
  args: {},
};
