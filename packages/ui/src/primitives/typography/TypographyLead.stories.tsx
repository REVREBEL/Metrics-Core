import type { Meta, StoryObj } from "@storybook/react-vite";

import { TypographyLead } from "./TypographyLead";

const meta: Meta<typeof TypographyLead> = {
  title: "Primitives/Typography/TypographyLead",
  component: TypographyLead,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof TypographyLead>;

export const Default: Story = {
  args: {
    children: "A faster way to build apps with beautiful components.",
  },
};
