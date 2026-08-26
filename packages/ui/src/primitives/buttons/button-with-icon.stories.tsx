import type { Meta, StoryObj } from "@storybook/react-vite";
import ButtonWithIcon from "@buttons/button-with-icon";

const meta = {
  title: "Primitives/Buttons/Button With Icon",
  component: ButtonWithIcon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonWithIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
