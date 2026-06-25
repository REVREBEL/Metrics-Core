import type { Meta, StoryObj } from "@storybook/react-vite";

import { Switch } from "./switch";
import { Label } from "./label";

const meta: Meta<typeof Switch> = {
  title: "Primitives/UI Core/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" {...args} />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode-checked" {...args} />
      <Label htmlFor="airplane-mode-checked">Airplane Mode</Label>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode-disabled" {...args} />
      <Label htmlFor="airplane-mode-disabled">Airplane Mode</Label>
    </div>
  ),
};
