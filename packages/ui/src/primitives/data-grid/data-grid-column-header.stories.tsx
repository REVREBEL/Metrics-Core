import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataGridColumnHeader } from "./data-grid-column-header";
import { DataGridProvider } from "./data-grid";
import React from "react";

const meta = {
  title: "Primitives/Data Grid/Data Grid Column Header",
  component: DataGridColumnHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => {
      const mockTable = {
        getState: () => ({
          columnOrder: ["test-column"],
          columnVisibility: {},
        }),
        getAllColumns: () => [],
        setColumnOrder: () => {},
      } as any;

      return (
        <DataGridProvider table={mockTable} recordCount={10}>
          <Story />
        </DataGridProvider>
      );
    },
  ],
} satisfies Meta<typeof DataGridColumnHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Column Title",
    column: {
      id: "test-column",
      getIsSorted: () => false,
      getIsPinned: () => false,
      getCanSort: () => true,
      getCanPin: () => true,
      getCanResize: () => true,
      toggleSorting: () => {},
      clearSorting: () => {},
      pin: () => {},
    } as any,
  },
};

export const SortedAsc: Story = {
  args: {
    ...Default.args,
    column: {
      ...Default.args.column,
      getIsSorted: () => "asc",
    } as any,
  },
};

export const SortedDesc: Story = {
  args: {
    ...Default.args,
    column: {
      ...Default.args.column,
      getIsSorted: () => "desc",
    } as any,
  },
};

export const Pinned: Story = {
  args: {
    ...Default.args,
    column: {
      ...Default.args.column,
      getIsPinned: () => "left",
    } as any,
  },
};
