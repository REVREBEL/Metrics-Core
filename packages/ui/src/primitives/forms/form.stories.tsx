import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormItem } from "./form";
import { Form } from "../form";
import React from "react";
import { useForm } from "react-hook-form";

const meta = {
  title: "Primitives/Forms/Form Item",
  component: FormItem,
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
} satisfies Meta<typeof FormItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div>Form Item Content</div>,
  },
};
