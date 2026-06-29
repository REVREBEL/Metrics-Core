import type { Meta, StoryObj } from "@storybook/react-vite";
import SocialUrl from "./social-url";

const meta: Meta<typeof SocialUrl> = {
  title: "Primitives/Users/SocialUrl",
  component: SocialUrl,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof SocialUrl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
