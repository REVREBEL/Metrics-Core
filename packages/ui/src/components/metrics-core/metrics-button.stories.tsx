import { IconArrowRight } from "@tabler/icons-react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { MetricsButton } from "./metrics-button";

const colorOptions = [
  "dark-blue",
  "dark-green",
  "green",
  "light-green",
  "light-blue",
  "yellow",
  "orange",
  "red",
  "purple",
  "smoke",
] as const;

const meta: Meta<typeof MetricsButton> = {
  title: "MetricsButton/Button",
  component: MetricsButton,
  parameters: {
    layout: "centered",
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
    color: {
      control: "select",
      options: colorOptions,
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg"],
    },
    asChild: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof MetricsButton>;

export const Default: Story = {
  args: {
    children: "Continue",
    variant: "default",
    color: "dark-blue",
    size: "default",
    asChild: false,
  },
};

export const IconButton: Story = {
  args: {
    children: undefined,
    variant: "default",
    color: "dark-blue",
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
    <MetricsButton {...args}>
      <IconArrowRight aria-hidden="true" />
    </MetricsButton>
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
      <MetricsButton>Default</MetricsButton>

      <MetricsButton variant="secondary">
        Secondary
      </MetricsButton>

      <MetricsButton variant="outline">
        Outline
      </MetricsButton>

      <MetricsButton variant="ghost">
        Ghost
      </MetricsButton>

      <MetricsButton variant="destructive">
        Destructive
      </MetricsButton>

      <MetricsButton variant="link">
        Link
      </MetricsButton>
    </div>
  ),
};

export const Colors: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="flex max-w-3xl flex-wrap items-center gap-3">
      {colorOptions.map((color) => (
        <MetricsButton key={color} color={color}>
          {color}
        </MetricsButton>
      ))}
    </div>
  ),
};

export const OutlineColors: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <div className="flex max-w-3xl flex-wrap items-center gap-3">
      {colorOptions.map((color) => (
        <MetricsButton
          key={color}
          variant="outline"
          color={color}
        >
          {color}
        </MetricsButton>
      ))}
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
      <MetricsButton size="xs">
        Extra Small
      </MetricsButton>

      <MetricsButton size="sm">
        Small
      </MetricsButton>

      <MetricsButton size="default">
        Default
      </MetricsButton>

      <MetricsButton size="lg">
        Large
      </MetricsButton>
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
      <MetricsButton
        size="icon-xs"
        aria-label="Continue"
      >
        <IconArrowRight aria-hidden="true" />
      </MetricsButton>

      <MetricsButton
        size="icon-sm"
        aria-label="Continue"
      >
        <IconArrowRight aria-hidden="true" />
      </MetricsButton>

      <MetricsButton
        size="icon"
        aria-label="Continue"
      >
        <IconArrowRight aria-hidden="true" />
      </MetricsButton>

      <MetricsButton
        size="icon-lg"
        aria-label="Continue"
      >
        <IconArrowRight aria-hidden="true" />
      </MetricsButton>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: "Continue",
    variant: "default",
    color: "dark-blue",
    size: "default",
    disabled: true,
  },
};

