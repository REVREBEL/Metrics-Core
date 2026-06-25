import type { Meta, StoryObj } from "@storybook/react-vite";

import { SelectDropdown } from "./select-dropdown";

const meta: Meta<typeof SelectDropdown> = {
  title: "Primitives/Dropdowns/SelectDropdown",
  component: SelectDropdown,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof SelectDropdown>;

export const Default: Story = {
  args: {
    placeholder: "Select a framework",
    items: [
      { label: "Next.js", value: "nextjs" },
      { label: "React", value: "react" },
      { label: "Vue", value: "vue" },
      { label: "Svelte", value: "svelte" },
    ],
  },
  render: (args) => <div className="w-48"><SelectDropdown {...args} /></div>,
};

export const Pending: Story = {
  args: {
    isPending: true,
    items: [],
  },
  render: (args) => <div className="w-48"><SelectDropdown {...args} /></div>,
};
