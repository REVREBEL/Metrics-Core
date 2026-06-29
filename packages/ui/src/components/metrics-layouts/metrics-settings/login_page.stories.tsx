import type { Meta, StoryObj } from "@storybook/react-vite";

import LoginPage from "./login_page";

const meta: Meta<typeof LoginPage> = {
  title: "Components/Metrics Layouts/Settings/Login Page",
  component: LoginPage,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {
  args: {},
};
