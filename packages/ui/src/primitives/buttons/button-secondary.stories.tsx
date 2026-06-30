import type { Meta, StoryObj } from "@storybook/react-vite";
import ButtonSecondary from "./button-secondary";

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
