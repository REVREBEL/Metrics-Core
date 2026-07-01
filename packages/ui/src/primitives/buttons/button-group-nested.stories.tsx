import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonGroupNested } from "./button-group-nested";

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
