import type { Meta, StoryObj } from "@storybook/react-vite";

import { TypographyH2 } from "./TypographyH2";

const meta: Meta<typeof TypographyH2> = {
  title: "Primitives/Typography/TypographyH2",
  component: TypographyH2,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof TypographyH2>;

export const Default: Story = {
  args: {
    children: "The Joke Tax",
  },
};
