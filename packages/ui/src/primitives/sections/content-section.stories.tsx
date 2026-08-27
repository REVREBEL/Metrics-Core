import type { Meta, StoryObj } from "@storybook/react";

import { ContentSection } from "./content-section";

const meta = {
  title: "Primitives/Sections/Content Section",
  component: ContentSection,
  parameters: {
    layout: "padded",
  },
  args: {
    title: "Content Section",
    desc: "This is a description for the content section.",
    children: <div>Hello world</div>,
  },
} satisfies Meta<typeof ContentSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
