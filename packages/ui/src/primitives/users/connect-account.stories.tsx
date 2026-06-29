import type { Meta, StoryObj } from "@storybook/react-vite";
import ConnectedAccount from "./connect-account";

const meta: Meta<typeof ConnectedAccount> = {
  title: "Primitives/Users/ConnectedAccount",
  component: ConnectedAccount,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ConnectedAccount>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
