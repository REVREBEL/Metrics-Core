import type { Meta, StoryObj } from "@storybook/react-vite";
import FieldGroupExample from "./field-group";
import { Form } from "../form";
import React from "react";
import { useForm } from "react-hook-form";

const meta = {
  title: "Primitives/Forms/Fields/Field Group",
  component: FieldGroupExample,
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
} satisfies Meta<typeof FieldGroupExample>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
