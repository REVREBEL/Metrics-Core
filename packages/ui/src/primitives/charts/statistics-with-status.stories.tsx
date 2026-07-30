import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconActivity } from "@tabler/icons-react";
import StatisticsCardWithStatus from "./statistics-with-status";

const meta = {
  title: "Primitives/Charts/Statistics Card With Status",
  component: StatisticsCardWithStatus,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    status: {
      control: "select",
      options: ["within", "observe", "exceed", "unknown"],
    },
  },
} satisfies Meta<typeof StatisticsCardWithStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Project Progress",
    value: "85%",
    status: "within",
    range: "75% - 100%",
    icon: <IconActivity />,
  },
};

export const OnTrack: Story = {
  args: {
    title: "Server Uptime",
    value: "99.9%",
    status: "within",
    range: ">= 99.5%",
  },
};

export const Stable: Story = {
  args: {
    title: "Memory Usage",
    value: "4.2 GB",
    status: "observe",
    range: "4GB - 6GB",
  },
};

export const AtRisk: Story = {
  args: {
    title: "Error Rate",
    value: "2.4%",
    status: "exceed",
    range: "< 1.0%",
  },
};

export const UnderReview: Story = {
  args: {
    title: "New Registrations",
    value: "142",
    status: "unknown",
    range: "Evaluating",
  },
};
