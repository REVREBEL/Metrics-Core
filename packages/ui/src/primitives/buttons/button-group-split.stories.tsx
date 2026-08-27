import ButtonGroupSplit from "@buttons/button-group-split";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Primitives/Buttons/Button Group Split",
  component: ButtonGroupSplit,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonGroupSplit>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
