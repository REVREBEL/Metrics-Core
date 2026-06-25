import type { Meta, StoryObj } from "@storybook/react-vite";

import { Progress } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "Primitives/UI Core/Progress",
  component: Progress,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 33,
  },
  render: (args) => <Progress {...args} className="w-[60%]" />,
};

export const Full: Story = {
  args: {
    value: 100,
  },
  render: (args) => <Progress {...args} className="w-[60%]" />,
};

export const Empty: Story = {
  args: {
    value: 0,
  },
  render: (args) => <Progress {...args} className="w-[60%]" />,
};
