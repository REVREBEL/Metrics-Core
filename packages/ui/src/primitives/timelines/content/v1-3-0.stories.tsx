import type { Meta, StoryObj } from "@storybook/react-vite";
import V1_3_0_Content from "./v1-3-0";

const meta: Meta<typeof V1_3_0_Content> = {
  title: "Primitives/Timelines/Content/V1_3_0_Content",
  component: V1_3_0_Content,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof V1_3_0_Content>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
