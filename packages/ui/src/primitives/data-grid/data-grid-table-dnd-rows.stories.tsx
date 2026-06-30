import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataGridTableDndRows } from "./data-grid-table-dnd-rows";
import { DataGridProvider } from "./data-grid";
import React from "react";

const meta = {
  title: "Primitives/Data Grid/Data Grid Table Dnd Rows",
  component: DataGridTableDndRows,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => {
      const mockTable = {
        getHeaderGroups: () => [],
        getRowModel: () => ({ rows: [] }),
        getState: () => ({
          columnOrder: [],
          columnVisibility: {},
        }),
      } as any;
      return (
        <DataGridProvider table={mockTable} recordCount={0}>
          <Story />
        </DataGridProvider>
      );
    },
  ],
} satisfies Meta<typeof DataGridTableDndRows>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
