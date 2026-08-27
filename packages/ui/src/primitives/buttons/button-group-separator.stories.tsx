import ButtonGroupSeparatorDemo from "@buttons/button-group-separator";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Primitives/Buttons/Button Group Separator",
  component: ButtonGroupSeparatorDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonGroupSeparatorDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
