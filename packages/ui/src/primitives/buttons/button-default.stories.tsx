import ButtonDefault from "@buttons/button-default";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Primitives/Buttons/Button Default",
  component: ButtonDefault,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonDefault>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
