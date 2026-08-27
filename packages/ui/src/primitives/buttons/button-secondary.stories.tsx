import ButtonSecondary from "@buttons/button-secondary";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Primitives/Buttons/Button Secondary",
  component: ButtonSecondary,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonSecondary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
