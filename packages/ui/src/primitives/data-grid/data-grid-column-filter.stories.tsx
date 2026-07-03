import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataGridColumnFilter } from "./data-grid-column-filter";
import { DataGridProvider } from "./data-grid";
import React from "react";

const meta = {
  title: "Primitives/Data Grid/Data Grid Column Filter",
  component: DataGridColumnFilter,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => {
      const mockTable = {
        getState: () => ({}),
      } as any;
      return (
        <DataGridProvider table={mockTable} recordCount={0}>
          <Story />
        </DataGridProvider>
      );
    },
  ],
} satisfies Meta<typeof DataGridColumnFilter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Status",
    column: {
      id: "status",
      getFilterValue: () => ["active"],
      setFilterValue: () => {},
      getFacetedUniqueValues: () => new Map([["active", 12], ["inactive", 4], ["pending", 3]]),
    } as any,
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Pending", value: "pending" },
    ],
  },
};

