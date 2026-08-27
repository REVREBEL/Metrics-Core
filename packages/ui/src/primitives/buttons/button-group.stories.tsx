import { Button } from "@buttons/button";
import { ButtonGroup } from "@buttons/button-group";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Primitives/Buttons/Button Group",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    orientation: "horizontal",
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
};
