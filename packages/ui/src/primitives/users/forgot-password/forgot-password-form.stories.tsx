import type { Meta, StoryObj } from "@storybook/react-vite";
import ForgotPasswordForm from "./forgot-password-form";

const meta: Meta<typeof ForgotPasswordForm> = {
  title: "Primitives/Users/ForgotPasswordForm",
  component: ForgotPasswordForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ForgotPasswordForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
