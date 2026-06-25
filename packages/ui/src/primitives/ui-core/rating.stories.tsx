import type { Meta, StoryObj } from "@storybook/react-vite";

import { Rating } from "./rating";

const meta: Meta<typeof Rating> = {
  title: "Primitives/UI Core/Rating",
  component: Rating,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: {
    defaultValue: 3,
  },
};

export const ReadOnly: Story = {
  args: {
    value: 4.5,
    readOnly: true,
    precision: 0.5,
  },
};
