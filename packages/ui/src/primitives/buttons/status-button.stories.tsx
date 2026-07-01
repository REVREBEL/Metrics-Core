import type { Meta, StoryObj } from "@storybook/react-vite";
import { SaveButton } from "./status-button";

const meta = {
  title: "Primitives/Buttons/Status Button",
  component: SaveButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SaveButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
