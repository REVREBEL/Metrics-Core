import type { Meta, StoryObj } from "@storybook/react-vite";
import TotalEarningCard from "./widget-total-earning";

const meta: Meta<typeof TotalEarningCard> = {
  title: "Primitives/Charts/TotalEarningCard",
  component: TotalEarningCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof TotalEarningCard>;

export const Default: Story = {
  args: {
    title: "Total Earnings",
    earning: 24580,
    trend: "up",
    percentage: 12.5,
    comparisonText: "compared to last month",
    earningData: [
      {
        img: "https://cdn.shadcnstudio.com/ss-assets/icons/react.png",
        platform: "React Store",
        technologies: "React, Tailwind",
        earnings: "$12,450",
        progressPercentage: 80,
      },
      {
        img: "https://cdn.shadcnstudio.com/ss-assets/icons/vue.png",
        platform: "Vue Shop",
        technologies: "Vue, Pinia",
        earnings: "$8,120",
        progressPercentage: 65,
      },
      {
        img: "https://cdn.shadcnstudio.com/ss-assets/icons/angular.png",
        platform: "Angular Marketplace",
        technologies: "Angular, RxJS",
        earnings: "$4,010",
        progressPercentage: 45,
      },
    ],
  },
};

export const DownTrend: Story = {
  args: {
    ...Default.args,
    trend: "down",
    percentage: 3.2,
  },
};
