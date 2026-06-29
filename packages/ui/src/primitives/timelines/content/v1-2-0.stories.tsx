import type { Meta, StoryObj } from "@storybook/react-vite";
import V1_2_0_Content from "./v1-2-0";

const meta: Meta<typeof V1_2_0_Content> = {
  title: "Primitives/Timelines/Content/V1_2_0",
  component: V1_2_0_Content,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof V1_2_0_Content>;

export const Default: Story = {};
