import type { Meta, StoryObj } from "@storybook/react-vite";
import ChangelogContent from "./timeline-component-05";

const meta: Meta<typeof ChangelogContent> = {
  title: "Primitives/Timelines/ChangelogContent",
  component: ChangelogContent,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ChangelogContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    releases: [
      {
        version: "v1.3.0",
        date: "Jan 12, 2024",
        content: (
          <div className="space-y-2 text-sm">
            <p>Major update with new features and bug fixes.</p>
            <ul className="list-disc pl-4">
              <li>Improved performance</li>
              <li>New dashboard layout</li>
            </ul>
          </div>
        ),
      },
      {
        version: "v1.2.0",
        date: "Dec 20, 2023",
        content: <p className="text-sm">Fixed various UI glitches and enhanced mobile responsiveness.</p>,
      },
    ],
  },
};
