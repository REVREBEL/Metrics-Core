import ButtonGroupSize from "@buttons/button-group-size";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Primitives/Buttons/Button Group Size",
  component: ButtonGroupSize,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonGroupSize>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
