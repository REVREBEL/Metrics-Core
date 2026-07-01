import type { Meta, StoryObj } from "@storybook/react-vite";
import ButtonOutline from "./button-outline";

const meta = {
  title: "Primitives/Buttons/Button Outline",
  component: ButtonOutline,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonOutline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
