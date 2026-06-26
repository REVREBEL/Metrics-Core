import type { Meta, StoryObj } from "@storybook/react-vite";

import ForgotPasswordPage from "./forgot-password_page";

const meta: Meta<typeof ForgotPasswordPage> = {
  title: "Components/Metrics Layouts/Settings/Forgot Password Page",
  component: ForgotPasswordPage,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof ForgotPasswordPage>;

export const Default: Story = {
  args: {},
};
