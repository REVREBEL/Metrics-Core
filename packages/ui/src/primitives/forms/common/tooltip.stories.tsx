import type { Meta, StoryObj } from "@storybook/react-vite";
import AutoFormTooltip from "./tooltip";

const meta = {
  title: "Primitives/Forms/Common/Auto Form Tooltip",
  component: AutoFormTooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof AutoFormTooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fieldConfigItem: {
      description: "This is a helpful description for the field.",
    },
  },
};
