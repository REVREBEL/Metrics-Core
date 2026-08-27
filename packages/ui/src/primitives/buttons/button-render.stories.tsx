import ButtonRender from "@buttons/button-render";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Primitives/Buttons/Button Render",
  component: ButtonRender,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonRender>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
