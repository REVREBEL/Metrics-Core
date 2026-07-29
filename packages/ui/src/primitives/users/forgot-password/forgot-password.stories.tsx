import type { Meta, StoryObj } from "@storybook/react-vite";
import ForgotPassword from "./forgot-password";

const meta: Meta<typeof ForgotPassword> = {
  title: "Primitives/Users/ForgotPassword",
  component: ForgotPassword,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ForgotPassword>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
