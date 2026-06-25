import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "./number-field";
import { Label } from "./label";

const meta: Meta<typeof NumberField> = {
  title: "Primitives/UI Core/NumberField",
  component: NumberField,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof NumberField>;

export const Default: Story = {
  render: (args) => (
    <NumberField {...args} defaultValue={10}>
      <Label>Quantity</Label>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  ),
};
