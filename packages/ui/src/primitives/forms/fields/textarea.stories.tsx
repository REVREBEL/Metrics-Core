import type { Meta, StoryObj } from "@storybook/react-vite";
import AutoFormTextarea from "./textarea";
import { Form } from "../form";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const meta = {
  title: "Primitives/Forms/Fields/Auto Form Textarea",
  component: AutoFormTextarea,
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
} satisfies Meta<typeof AutoFormTextarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Bio",
    id: "bio",
    fieldConfigItem: {},
    zodItem: z.string(),
    field: {
      value: "",
      onChange: () => {},
      onBlur: () => {},
      name: "bio",
    } as any,
  },
};
