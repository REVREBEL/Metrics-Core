import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../form";
import AutoFormRadioGroup from "./radio-group";

const meta = {
  title: "Primitives/Forms/Fields/Auto Form Radio Group",
  component: AutoFormRadioGroup,
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
} satisfies Meta<typeof AutoFormRadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Gender",
    id: "gender",
    fieldConfigItem: {},
    zodItem: z.enum(["Male", "Female"]),
    field: {
      value: "",
      onChange: () => {},
      onBlur: () => {},
      name: "gender",
    } as any,
  },
};
