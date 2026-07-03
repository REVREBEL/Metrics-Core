import type { Meta, StoryObj } from "@storybook/react-vite";
import V1_3_0_Content from "./v1-3-0";

const meta: Meta<typeof V1_3_0_Content> = {
  title: "Primitives/Timelines/Content/v1.3.0",
  component: V1_3_0_Content,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof V1_3_0_Content>;

export const Default: Story = {
  args: {
    title: "Component Sync & Library Management v1.3.0 (Beta)",
    description: "Manage, version, and update all shared components seamlessly across teams.",
  },
};
