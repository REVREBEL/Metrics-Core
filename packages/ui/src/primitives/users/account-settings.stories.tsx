import type { Meta, StoryObj } from "@storybook/react-vite";
import UserGeneral from "./account-settings";

const meta: Meta<typeof UserGeneral> = {
  title: "Primitives/Users/UserGeneral",
  component: UserGeneral,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof UserGeneral>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
