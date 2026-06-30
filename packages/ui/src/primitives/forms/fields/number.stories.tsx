import type { Meta, StoryObj } from "@storybook/react-vite";
import AutoFormNumber from "./number";
import { Form } from "../form";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const meta = {
  title: "Primitives/Forms/Fields/Auto Form Number",
  component: AutoFormNumber,
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
} satisfies Meta<typeof AutoFormNumber>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Age",
    id: "age",
    fieldConfigItem: {},
    zodItem: z.number(),
    field: {
      value: 0,
      onChange: () => {},
      onBlur: () => {},
      name: "age",
    } as any,
  },
};
