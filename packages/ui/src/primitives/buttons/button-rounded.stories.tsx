import type { Meta, StoryObj } from "@storybook/react-vite";
import ButtonRounded from "@buttons/button-rounded";

const meta = {
  title: "Primitives/Buttons/Button Rounded",
  component: ButtonRounded,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonRounded>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
