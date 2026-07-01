import type { Meta, StoryObj } from "@storybook/react-vite";
import RegisterForm from "./register-form";

const meta: Meta<typeof RegisterForm> = {
  title: "Primitives/Users/RegisterForm",
  component: RegisterForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof RegisterForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
