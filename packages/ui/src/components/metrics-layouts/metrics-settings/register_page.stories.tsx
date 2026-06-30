import type { Meta, StoryObj } from "@storybook/react-vite";

import RegisterPage from "./register_page";

const meta: Meta<typeof RegisterPage> = {
  title: "Components/Metrics Layouts/Settings/Register Page",
  component: RegisterPage,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof RegisterPage>;

export const Default: Story = {
  args: {},
};
