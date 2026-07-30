import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../form";
import AutoFormObject from "./object";

const meta = {
  title: "Primitives/Forms/Fields/Auto Form Object",
  component: AutoFormObject,
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
} satisfies Meta<typeof AutoFormObject>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Address",
    id: "address",
    fieldConfigItem: {},
    zodItem: z.object({
      street: z.string(),
      city: z.string(),
    }),
    field: {
      value: {},
      onChange: () => {},
      onBlur: () => {},
      name: "address",
    } as any,
  },
};
