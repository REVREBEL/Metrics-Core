import type { Meta, StoryObj } from "@storybook/react-vite";

import { SkeletonCard } from "./skeleton-card";

const meta: Meta<typeof SkeletonCard> = {
  title: "Primitives/Skeleton/SkeletonCard",
  component: SkeletonCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof SkeletonCard>;

export const Default: Story = {};
