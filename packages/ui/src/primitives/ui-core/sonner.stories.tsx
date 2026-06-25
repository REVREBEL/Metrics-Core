import type { Meta, StoryObj } from "@storybook/react-vite";

import { Toaster } from "./sonner";
import { Button } from "../buttons/button";
import { toast } from "sonner";

const meta: Meta<typeof Toaster> = {
  title: "Primitives/UI Core/Sonner",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: (args) => (
    <div>
      <Toaster {...args} />
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button>
    </div>
  ),
};
