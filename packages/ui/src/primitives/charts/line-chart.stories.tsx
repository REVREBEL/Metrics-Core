import { LineChart } from "./line-chart";

const data = [
  { month: "Jan", revenue: 18600, target: 16400 },
  { month: "Feb", revenue: 21300, target: 18800 },
  { month: "Mar", revenue: 24700, target: 22000 },
  { month: "Apr", revenue: 23100, target: 23600 },
  { month: "May", revenue: 28400, target: 25200 },
  { month: "Jun", revenue: 31900, target: 28000 },
];

export default {
  title: "Primitives/Charts/Line Chart",
  component: LineChart,
  parameters: {
    layout: "padded",
  },
  args: {
    data,
    index: "month",
    categories: ["revenue", "target"],
    strokeColors: ["var(--chart-1)", "var(--chart-2)"],
    valueFormatter: (value: number) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(value),
  },
};

export const Default = {
  render: (args: React.ComponentProps<typeof LineChart>) => (
    <div className="w-[720px] max-w-full">
      <LineChart {...args} />
    </div>
  ),
};
