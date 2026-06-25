import type { Meta, StoryObj } from "@storybook/react-vite";

import { Calendar } from "./calendar";

const meta: Meta<typeof Calendar> = {
  title: "Primitives/UI Core/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    selected: new Date(),
  },
};
