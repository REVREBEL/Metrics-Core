import type { Meta, StoryObj } from "@storybook/react-vite";

import { TypographyP } from "./TypographyP";

const meta: Meta<typeof TypographyP> = {
  title: "Primitives/Typography/TypographyP",
  component: TypographyP,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof TypographyP>;

export const Default: Story = {
  args: {
    children:
      "The King, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.",
  },
};
