import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataGridProvider } from "./data-grid";
import { DataGridPagination } from "./data-grid-pagination";

const meta = {
  title: "Primitives/Data Grid/Data Grid Pagination",
  component: DataGridPagination,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => {
      const mockTable = {
        getState: () => ({
          pagination: {
            pageIndex: 0,
            pageSize: 10,
          },
        }),
        setPageIndex: () => {},
        setPageSize: () => {},
        getPageCount: () => 5,
        getCanPreviousPage: () => false,
        getCanNextPage: () => true,
      } as any;
      return (
        <DataGridProvider table={mockTable} recordCount={50}>
          <Story />
        </DataGridProvider>
      );
    },
  ],
} satisfies Meta<typeof DataGridPagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
