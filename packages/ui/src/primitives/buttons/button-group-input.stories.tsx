import ButtonGroupInput from "@buttons/button-group-input";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Primitives/Buttons/Button Group Input",
  component: ButtonGroupInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonGroupInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
