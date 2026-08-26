import type { Meta, StoryObj } from "@storybook/react-vite";
import ButtonSpinner from "@buttons/button-spinner";

const meta = {
  title: "Primitives/Buttons/Button Spinner",
  component: ButtonSpinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonSpinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
