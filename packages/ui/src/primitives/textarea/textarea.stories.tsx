import type { Meta, StoryObj } from "@storybook/react-vite";

import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "Primitives/Textarea/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: "Type your message here.",
  },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: "Type your message here.",
    disabled: true,
  },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
};
