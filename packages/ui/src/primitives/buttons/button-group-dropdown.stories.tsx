import type { Meta, StoryObj } from "@storybook/react-vite";
import ButtonGroupDropdown from "@buttons/button-group-dropdown";

const meta = {
  title: "Primitives/Buttons/Button Group Dropdown",
  component: ButtonGroupDropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonGroupDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
