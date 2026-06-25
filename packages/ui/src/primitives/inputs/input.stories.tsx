import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Primitives/Inputs/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Email",
  },
  render: (args) => <Input {...args} className="w-80" />,
};

export const Disabled: Story = {
  args: {
    type: "text",
    placeholder: "Email",
    disabled: true,
  },
  render: (args) => <Input {...args} className="w-80" />,
};

export const File: Story = {
  args: {
    type: "file",
  },
  render: (args) => <Input {...args} className="w-80" />,
};
