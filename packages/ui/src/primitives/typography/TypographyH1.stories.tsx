import type { Meta, StoryObj } from "@storybook/react-vite";

import { TypographyH1 } from "./TypographyH1";

const meta: Meta<typeof TypographyH1> = {
  title: "Primitives/Typography/TypographyH1",
  component: TypographyH1,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof TypographyH1>;

export const Default: Story = {
  args: {
    children: "Taxing Laughter: The Joke Tax Chronicles",
  },
};
