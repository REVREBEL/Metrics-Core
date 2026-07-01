import type { Meta, StoryObj } from "@storybook/react-vite";
import V1_1_0_Content from "./content/v1-1-0";
import V1_2_0_Content from "./content/v1-2-0";
import V1_3_0_Content from "./content/v1-3-0";
import ChangelogContent from "./timeline-component-05";

const meta: Meta<typeof ChangelogContent> = {
  title: "Primitives/Timelines/ChangelogContent",
  component: ChangelogContent,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof ChangelogContent>;

export const Default: Story = {
  args: {
    releases: [
      {
        version: "v1.3.0",
        date: "May 24, 2025",
        content: <V1_3_0_Content />,
      },
      {
        version: "v1.2.0",
        date: "May 18, 2025",
        content: <V1_2_0_Content />,
      },
      {
        version: "v1.1.0",
        date: "May 12, 2025",
        content: <V1_1_0_Content />,
      },
    ],
  },
};
