import type { Meta, StoryObj } from "@storybook/react-vite";

import TabsUnderlineDemo from "./account-settings_page";

const meta: Meta<typeof TabsUnderlineDemo> = {
  title: "Components/Metrics Layouts/Settings/Account Settings Page",
  component: TabsUnderlineDemo,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof TabsUnderlineDemo>;

export const Default: Story = {
  args: {},
};
