import type { Meta, StoryObj } from "@storybook/react-vite";
import { z } from "zod";
import { AutoForm } from "./form";

const meta = {
  title: "Primitives/Forms/Fields/Auto Form",
  component: AutoForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof AutoForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const schema = z.object({
  username: z.string(),
  password: z.string().min(8),
});

export const Default: Story = {
  args: {
    formSchema: schema,
  },
};
