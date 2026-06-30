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
        img: "https://cdn.shadcnstudio.com/ss-assets/logo/logo-square.png",
        platform: "Web Application",
        technologies: "React, Next.js",
        earnings: "$12,450",
        progressPercentage: 80,
      },
      {
        img: "https://cdn.shadcnstudio.com/ss-assets/logo/logo-square.png",
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
