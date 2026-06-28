import type { Meta, StoryObj } from "@storybook/react-vite";

import { ToastProvider, toastManager } from "./toast";
import { Button } from "../buttons/button";

const meta: Meta<typeof ToastProvider> = {
  title: "Primitives/UI Core/Toast",
  component: ToastProvider,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof ToastProvider>;

export const Default: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <Button
        variant="outline"
        onClick={() => {
          toastManager.show("Success", {
            description: "Your changes have been saved.",
            type: "success",
          });
        }}
      >
        Show Success Toast
      </Button>
    </ToastProvider>
  ),
};

export const Destructive: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <Button
        variant="destructive"
        onClick={() => {
          toastManager.show("Error", {
            description: "There was a problem with your request.",
            type: "error",
          });
        }}
      >
        Show Error Toast
      </Button>
    </ToastProvider>
  ),
};
