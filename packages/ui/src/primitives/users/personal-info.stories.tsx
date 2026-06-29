import type { Meta, StoryObj } from "@storybook/react-vite";
import PersonalInfo from "./personal-info";

const meta: Meta<typeof PersonalInfo> = {
  title: "Primitives/Users/PersonalInfo",
  component: PersonalInfo,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof PersonalInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
