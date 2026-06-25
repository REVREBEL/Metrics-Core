import type { Meta, StoryObj } from "@storybook/react-vite";

import { BrandHeader } from "./brand-header";

const meta: Meta<typeof BrandHeader> = {
  title: "Primitives/Layouts/BrandHeader",
  component: BrandHeader,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof BrandHeader>;

export const Default: Story = {};
