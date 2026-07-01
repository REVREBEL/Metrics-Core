import type { Meta, StoryObj } from "@storybook/react-vite";
import AutoFormEnum from "./enum";
import { Form } from "../form";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const meta = {
  title: "Primitives/Forms/Fields/Auto Form Enum",
  component: AutoFormEnum,
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
} satisfies Meta<typeof AutoFormEnum>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Role",
    id: "role",
    fieldConfigItem: {},
    zodItem: z.enum(["Admin", "User"]),
    field: {
      value: "",
      onChange: () => {},
      onBlur: () => {},
      name: "role",
    } as any,
  },
};
