import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputField } from "./input-field";

const meta: Meta<typeof InputField> = {
  title: "Primitives/Inputs/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <InputField />
    </div>
  ),
};
