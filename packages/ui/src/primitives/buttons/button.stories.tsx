import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconArrowRight } from "@tabler/icons-react";

import { Button } from "./button";

const meta = {
  title: "Primitives/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Continue",
    variant: "default",
    size: "default",
    asChild: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "outline",
        "ghost",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg"],
    },
    asChild: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const IconButton: Story = {
  args: {
    children: undefined,
    variant: "default",
    size: "icon",
    asChild: false,
    "aria-label": "Continue",
  },
  argTypes: {
    children: {
      control: false,
    },
    size: {
      control: "select",
      options: ["icon", "icon-xs", "icon-sm", "icon-lg"],
    },
  },
  render: (args) => (
    <Button {...args}>
      <IconArrowRight aria-hidden="true" />
    </Button>
  ),
};

export const Variants: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const IconSizes: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="icon-xs" aria-label="Continue">
        <IconArrowRight aria-hidden="true" />
      </Button>

      <Button size="icon-sm" aria-label="Continue">
        <IconArrowRight aria-hidden="true" />
      </Button>

      <Button size="icon" aria-label="Continue">
        <IconArrowRight aria-hidden="true" />
      </Button>

      <Button size="icon-lg" aria-label="Continue">
        <IconArrowRight aria-hidden="true" />
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: "Continue",
    disabled: true,
  },
};
