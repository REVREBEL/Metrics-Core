import type { Meta, StoryObj } from "@storybook/react-vite";
import ButtonLink from "./button-link";

const meta = {
  title: "Primitives/Buttons/Button Link",
  component: ButtonLink,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
