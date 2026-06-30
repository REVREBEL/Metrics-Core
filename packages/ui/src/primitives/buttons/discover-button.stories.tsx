import type { Meta, StoryObj } from "@storybook/react-vite";
import DiscoverButton from "./discover-button";

const meta = {
  title: "Primitives/Buttons/Discover Button",
  component: DiscoverButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DiscoverButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
