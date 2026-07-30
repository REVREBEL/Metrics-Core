import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconBold } from "@tabler/icons-react";
import ToolbarButton from "./toolbar-button";

const meta = {
  title: "Primitives/Buttons/Toolbar Button",
  component: ToolbarButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ToolbarButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <IconBold />,
    tooltip: "Bold",
  },
};

export const Active: Story = {
  args: {
    children: <IconBold />,
    tooltip: "Bold",
    isActive: true,
  },
};
