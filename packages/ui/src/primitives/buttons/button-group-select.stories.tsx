import ButtonGroupSelect from "@buttons/button-group-select";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Primitives/Buttons/Button Group Select",
  component: ButtonGroupSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonGroupSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
