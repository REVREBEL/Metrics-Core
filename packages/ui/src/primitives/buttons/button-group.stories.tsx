import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonGroup } from "./button-group";
import { Button } from "./button";
import React from "react";

const meta = {
  title: "Primitives/Buttons/Button Group",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    orientation: "horizontal",
    children: [
      <Button key="1" variant="outline">Left</Button>,
      <Button key="2" variant="outline">Middle</Button>,
      <Button key="3" variant="outline">Right</Button>,
    ],
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
};
