import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../buttons/button";
import { ImageEditDialog } from "./image-edit-dialog";

const meta = {
  title: "Primitives/Image Blocks/Image Edit Dialog",
  component: ImageEditDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ImageEditDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Button>Edit Image</Button>,
    src: "https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/widgets/image-7.png",
    onSave: () => {},
  },
};
