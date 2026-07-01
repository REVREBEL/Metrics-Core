import type { Meta, StoryObj } from "@storybook/react-vite";
import AutoFormLabel from "./label";
import { Form } from "../form";
import React from "react";
import { useForm } from "react-hook-form";

const meta = {
  title: "Primitives/Forms/Common/Auto Form Label",
  component: AutoFormLabel,
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
} satisfies Meta<typeof AutoFormLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Username",
    isRequired: false,
  },
};

export const Required: Story = {
  args: {
    label: "Email",
    isRequired: true,
  },
};
