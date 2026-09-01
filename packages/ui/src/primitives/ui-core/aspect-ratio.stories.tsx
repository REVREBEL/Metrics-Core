import type { Meta, StoryObj } from "@storybook/react-vite";
import Image from "next/image";

import { AspectRatio } from "./aspect-ratio";

const meta: Meta<typeof AspectRatio> = {
  title: "Primitives/UI Core/AspectRatio",
  component: AspectRatio,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="w-[450px]">
      <AspectRatio {...args} className="bg-muted">
        <Image
          src="https://images.unsplash.com/photo-1588345921523-c2dcd57f7d60?w=800&dpr=2&q=80"
          alt="A landscape by Drew Beamer"
          fill
          className="rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  ),
};
