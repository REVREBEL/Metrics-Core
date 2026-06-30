import type { Meta, StoryObj } from "@storybook/react-vite";
import ButtonIcon from "./button-icon";

const meta = {
  title: "Primitives/Buttons/Button Icon",
  component: ButtonIcon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
