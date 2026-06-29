import type { Meta, StoryObj } from "@storybook/react-vite";
import ProductInsightsCard from "./widget-product-insights";

const meta: Meta<typeof ProductInsightsCard> = {
  title: "Primitives/Charts/ProductInsightsCard",
  component: ProductInsightsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof ProductInsightsCard>;

export const Default: Story = {
  args: {},
};
