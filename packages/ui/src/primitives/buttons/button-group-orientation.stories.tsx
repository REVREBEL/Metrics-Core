import type { Meta, StoryObj } from "@storybook/react-vite";
import ButtonGroupOrientation from "./button-group-orientation";

const meta = {
  title: "Primitives/Buttons/Button Group Orientation",
  component: ButtonGroupOrientation,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonGroupOrientation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
