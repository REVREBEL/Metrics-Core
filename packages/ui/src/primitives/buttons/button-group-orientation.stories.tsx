import ButtonGroupOrientation from "@buttons/button-group-orientation";
import type { Meta, StoryObj } from "@storybook/react-vite";

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
