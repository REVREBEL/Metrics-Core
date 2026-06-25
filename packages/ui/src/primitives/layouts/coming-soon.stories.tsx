import type { Meta, StoryObj } from "@storybook/react-vite";

import { ComingSoon } from "./coming-soon";

const meta: Meta<typeof ComingSoon> = {
  title: "Primitives/Layouts/ComingSoon",
  component: ComingSoon,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof ComingSoon>;

export const Default: Story = {};
