import type { Meta, StoryObj } from "@storybook/react-vite";

import { ScrollArea } from "./scroll-area";

const meta: Meta<typeof ScrollArea> = {
  title: "Primitives/UI Core/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: (args) => (
    <ScrollArea {...args} className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {Array.from({ length: 50 }).map((_, i, a) => (
          <div key={i}>
            <div className="text-sm">{`tag-${a.length - i}`}</div>
            {i < a.length - 1 && <div className="my-2 h-px bg-border" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
