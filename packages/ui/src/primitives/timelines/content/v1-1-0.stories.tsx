import type { Meta, StoryObj } from "@storybook/react-vite";
import V1_1_0_Content from "./v1-1-0";

const meta: Meta<typeof V1_1_0_Content> = {
  title: "Primitives/Timelines/Content/v1.1.0",
  component: V1_1_0_Content,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof V1_1_0_Content>;

export const Default: Story = {
  args: {
    title: "Global Theme Rebuild v1.1.0",
    description:
      "Hierarchical, semantic, and type-safe design token scaling system.",
  },
};
