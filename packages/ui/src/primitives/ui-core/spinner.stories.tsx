import type { Meta, StoryObj } from "@storybook/react-vite";

import { Spinner } from "./spinner";

const meta: Meta<typeof Spinner> = {
  title: "Primitives/UI Core/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    className: "size-8",
  },
};
