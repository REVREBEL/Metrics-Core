import type { Meta, StoryObj } from "@storybook/react-vite";
import Login from "./login-page";

const meta: Meta<typeof Login> = {
  title: "Primitives/Users/LoginPage",
  component: Login,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Login>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
