import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconItalic } from "@tabler/icons-react";

import { Toggle } from "./toggle";

const meta: Meta<typeof Toggle> = {
  title: "Primitives/UI Core/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    "aria-label": "Toggle italic",
  },
  render: (args) => (
    <Toggle {...args}>
      <IconItalic className="size-4" />
    </Toggle>
  ),
};

export const Outline: Story = {
  args: {
    variant: "outline",
    "aria-label": "Toggle italic",
  },
  render: (args) => (
    <Toggle {...args}>
      <IconItalic className="size-4" />
    </Toggle>
  ),
};
