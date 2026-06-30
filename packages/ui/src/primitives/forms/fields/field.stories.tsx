import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "./field";
import { Form } from "../form";
import React from "react";
import { useForm } from "react-hook-form";

const meta = {
  title: "Primitives/Forms/Fields/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => {
      const form = useForm();
      return (
        <Form {...form}>
          <Story />
        </Form>
      );
    },
  ],
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div>Field Content</div>,
  },
};
