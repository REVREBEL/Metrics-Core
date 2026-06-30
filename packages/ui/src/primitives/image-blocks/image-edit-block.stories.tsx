import type { Meta, StoryObj } from "@storybook/react-vite";
import { ImageEditBlock } from "./image-edit-block";

const meta = {
  title: "Primitives/Image Blocks/Image Edit Block",
  component: ImageEditBlock,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ImageEditBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/widgets/image-7.png",
    alt: "Sample Image",
    onEdit: () => {},
  },
};
