import type { Meta, StoryObj } from "@storybook/react-vite";
import ButtonDestructive from "@buttons/button-destructive";

const meta = {
  title: "Primitives/Buttons/Button Destructive",
  component: ButtonDestructive,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonDestructive>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
