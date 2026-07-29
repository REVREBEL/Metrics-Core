import type { Meta, StoryObj } from "@storybook/react-vite";
import LoginForm from "./login-form";

const meta: Meta<typeof LoginForm> = {
  title: "Primitives/Users/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
