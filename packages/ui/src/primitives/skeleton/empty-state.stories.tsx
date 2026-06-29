import type { Meta, StoryObj } from "@storybook/react-vite";

import EmptyState from "./empty-state";

const meta: Meta<typeof EmptyState> = {
  title: "Primitives/Skeleton/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {};
