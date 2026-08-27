import { ButtonGroupNested } from "@buttons/button-group-nested";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Primitives/Buttons/Button Group Nested",
  component: ButtonGroupNested,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonGroupNested>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
