import type { Meta, StoryObj } from "@storybook/react-vite";
import VerifyEmail from "./verify-email";

const meta: Meta<typeof VerifyEmail> = {
  title: "Primitives/Users/VerifyEmail",
  component: VerifyEmail,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof VerifyEmail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
