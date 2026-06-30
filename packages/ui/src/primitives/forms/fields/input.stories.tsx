import type { Meta, StoryObj } from "@storybook/react-vite";
import AutoFormInput from "./input";
import { Form } from "../form";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const meta = {
  title: "Primitives/Forms/Fields/Auto Form Input",
  component: AutoFormInput,
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
} satisfies Meta<typeof AutoFormInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Username",
    id: "username",
    fieldConfigItem: {},
    zodItem: z.string(),
    field: {
      value: "",
      onChange: () => {},
      onBlur: () => {},
      name: "username",
    } as any,
  },
};
