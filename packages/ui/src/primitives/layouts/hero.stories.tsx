import type { Meta, StoryObj } from "@storybook/react-vite";

import { Hero } from "./hero";

const meta: Meta<typeof Hero> = {
  title: "Primitives/Layouts/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {
    title: "The next generation of building blocks",
    description:
      "Beautifully designed, expertly crafted components that follow the best practices of accessibility and performance.",
    buttonText: "Get Started",
    buttonLink: "#",
    backgroundImage: "https://images.unsplash.com/photo-1588345921523-c2dcd57f7d60?w=800&dpr=2&q=80",
  },
};
