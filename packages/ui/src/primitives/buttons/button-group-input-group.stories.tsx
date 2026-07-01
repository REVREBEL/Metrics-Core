import type { Meta, StoryObj } from "@storybook/react-vite";
import ButtonGroupInputGroup from "./button-group-input-group";

const meta = {
  title: "Primitives/Buttons/Button Group Input Group",
  component: ButtonGroupInputGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonGroupInputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
