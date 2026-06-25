import type { Meta, StoryObj } from "@storybook/react-vite";

import { Slider } from "./slider";

const meta: Meta<typeof Slider> = {
  title: "Primitives/UI Core/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
  render: (args) => <Slider {...args} className="w-80" />,
};

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
    step: 1,
  },
  render: (args) => <Slider {...args} className="w-80" />,
};
