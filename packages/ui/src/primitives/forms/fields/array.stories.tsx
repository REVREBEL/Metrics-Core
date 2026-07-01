import type { Meta, StoryObj } from "@storybook/react-vite";
import AutoFormArray from "./array";
import { Form } from "../form";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const meta = {
  title: "Primitives/Forms/Fields/Auto Form Array",
  component: AutoFormArray,
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
} satisfies Meta<typeof AutoFormArray>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Items",
    id: "items",
    fieldConfigItem: {},
    zodItem: z.array(z.string()),
    field: {
      value: [],
      onChange: () => {},
      onBlur: () => {},
      name: "items",
    } as any,
  },
};
