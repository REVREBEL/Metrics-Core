import type { Meta, StoryObj } from "@storybook/react-vite";
import DangerZone from "./danger-zone";

const meta: Meta<typeof DangerZone> = {
  title: "Primitives/Users/DangerZone",
  component: DangerZone,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof DangerZone>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
