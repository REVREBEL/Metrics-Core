import type { Meta, StoryObj } from "@storybook/react-vite";

import { TypographySmall } from "./TypographySmall";

const meta: Meta<typeof TypographySmall> = {
  title: "Primitives/Typography/TypographySmall",
  component: TypographySmall,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof TypographySmall>;

export const Default: Story = {
  args: {
    children: "Email address",
  },
};
