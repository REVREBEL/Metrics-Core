import type { Meta, StoryObj } from "@storybook/react-vite";
import ButtonGroupPopover from "./button-group-popover";

const meta = {
  title: "Primitives/Buttons/Button Group Popover",
  component: ButtonGroupPopover,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonGroupPopover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
