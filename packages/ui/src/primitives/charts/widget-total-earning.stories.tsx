import type { Meta, StoryObj } from "@storybook/react-vite";
import TotalEarningCard from "./widget-total-earning";

const meta = {
  title: "Primitives/Charts/Total Earning Card",
  component: TotalEarningCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof TotalEarningCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Total Earning",
    earning: 15480,
    trend: "up",
    percentage: 12,
    comparisonText: "vs last month",
    earningData: [
      {
        img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'><rect width='24' height='24' rx='4' fill='%236366F1'/><path d='M12 4.5C14 6 18.5 9 18.5 12C18.5 15 14 18 12 19.5C10 18 5.5 15 5.5 12C5.5 9 10 6 12 4.5Z' stroke='%23FFF' stroke-width='1.5'/><circle cx='12' cy='12' r='2' fill='%23FFF'/></svg>",
        platform: "Web Application",
        technologies: "React, Next.js",
        earnings: "$12,450",
        progressPercentage: 80,
      },
      {
        img: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'><rect width='24' height='24' rx='4' fill='%2310B981'/><path d='M7 3H17C18.1 3 19 3.9 19 5V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V5C5 3.9 5.9 3 7 3Z' stroke='%23FFF' stroke-width='1.5' stroke-linejoin='round'/><circle cx='12' cy='18' r='1' fill='%23FFF'/></svg>",
        platform: "Mobile App",
        technologies: "React Native",
        earnings: "$3,030",
        progressPercentage: 45,
      },
    ],
  },
};

export const TrendingDown: Story = {
  args: {
    ...Default.args,
    trend: "down",
    percentage: 5,
  },
};
