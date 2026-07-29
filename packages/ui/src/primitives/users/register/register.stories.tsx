import type { Meta, StoryObj } from "@storybook/react-vite";
import Register from "./register";

const meta: Meta<typeof Register> = {
  title: "Primitives/Users/Register",
  component: Register,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Register>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
