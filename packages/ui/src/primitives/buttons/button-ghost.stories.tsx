import ButtonGhost from "@buttons/button-ghost";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Primitives/Buttons/Button Ghost",
  component: ButtonGhost,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonGhost>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
