import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataGrid, DataGridContainer } from "./data-grid";

const meta = {
  title: "Primitives/Data Grid/Data Grid",
  component: DataGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof DataGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockTable = {
  getHeaderGroups: () => [],
  getRowModel: () => ({ rows: [] }),
  getState: () => ({
    columnOrder: [],
    columnVisibility: {},
  }),
} as any;

export const Default: Story = {
  args: {
    table: mockTable,
    recordCount: 0,
    children: <div>Data Grid Content</div>,
  },
  render: (args) => (
    <DataGridContainer>
      <DataGrid {...args} />
    </DataGridContainer>
  ),
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
  render: Default.render,
};
