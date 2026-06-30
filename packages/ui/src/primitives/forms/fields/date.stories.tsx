import type { Meta, StoryObj } from "@storybook/react-vite";
import AutoFormDate from "./date";
import { Form } from "../form";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const meta = {
  title: "Primitives/Forms/Fields/Auto Form Date",
  component: AutoFormDate,
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
} satisfies Meta<typeof AutoFormDate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Date of Birth",
    id: "dob",
    fieldConfigItem: {},
    zodItem: z.date(),
    field: {
      value: undefined,
      onChange: () => {},
      onBlur: () => {},
      name: "dob",
    } as any,
  },
};
