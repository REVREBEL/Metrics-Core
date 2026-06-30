import type { Meta, StoryObj } from "@storybook/react-vite";
import AutoFormSwitch from "./switch";
import { Form } from "../form";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const meta = {
  title: "Primitives/Forms/Fields/Auto Form Switch",
  component: AutoFormSwitch,
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
} satisfies Meta<typeof AutoFormSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Enable Notifications",
    id: "notifications",
    fieldConfigItem: {},
    zodItem: z.boolean(),
    field: {
      value: false,
      onChange: () => {},
      onBlur: () => {},
      name: "notifications",
    } as any,
  },
};
