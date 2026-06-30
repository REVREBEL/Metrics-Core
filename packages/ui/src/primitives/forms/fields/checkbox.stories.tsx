import type { Meta, StoryObj } from "@storybook/react-vite";
import AutoFormCheckbox from "./checkbox";
import { Form } from "../form";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const meta = {
  title: "Primitives/Forms/Fields/Auto Form Checkbox",
  component: AutoFormCheckbox,
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
} satisfies Meta<typeof AutoFormCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Accept Terms",
    id: "terms",
    fieldConfigItem: {},
    zodItem: z.boolean(),
    field: {
      value: false,
      onChange: () => {},
      onBlur: () => {},
      name: "terms",
    } as any,
  },
};
