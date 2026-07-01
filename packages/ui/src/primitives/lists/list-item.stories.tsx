import type { Meta, StoryObj } from "@storybook/react-vite";
import FilterInteraction from "./list-item";

const meta: Meta<typeof FilterInteraction> = {
  title: "Primitives/Lists/FilterInteraction",
  component: FilterInteraction,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof FilterInteraction>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
