import type { Meta, StoryObj } from "@storybook/react-vite";
import EmailPass from "./email-password";

const meta: Meta<typeof EmailPass> = {
  title: "Primitives/Users/EmailPass",
  component: EmailPass,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof EmailPass>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
