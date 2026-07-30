import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataGridProvider } from "./data-grid";
import { DataGridColumnVisibility } from "./data-grid-column-visibility";

const meta = {
  title: "Primitives/Data Grid/Data Grid Column Visibility",
  component: DataGridColumnVisibility,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => {
      const mockTable = {
        getAllColumns: () => [
          {
            id: "col1",
            getCanHide: () => true,
            getIsVisible: () => true,
            toggleVisibility: () => {},
            columnDef: { meta: { headerTitle: "Column 1" } },
          },
          {
            id: "col2",
            getCanHide: () => true,
            getIsVisible: () => false,
            toggleVisibility: () => {},
            columnDef: { meta: { headerTitle: "Column 2" } },
          },
        ],
      } as any;
      return (
        <DataGridProvider table={mockTable} recordCount={0}>
          <Story />
        </DataGridProvider>
      );
    },
  ],
} satisfies Meta<typeof DataGridColumnVisibility>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
