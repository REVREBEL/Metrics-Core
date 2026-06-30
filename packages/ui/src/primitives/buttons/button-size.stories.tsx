import type { Meta, StoryObj } from "@storybook/react-vite";
import ButtonSize from "./button-size";

const meta = {
  title: "Primitives/Buttons/Button Size",
  component: ButtonSize,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonSize>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
