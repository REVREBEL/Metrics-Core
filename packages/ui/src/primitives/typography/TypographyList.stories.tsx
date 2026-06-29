import type { Meta, StoryObj } from "@storybook/react-vite";
import { TypographyList } from "./TypographyList";

const meta: Meta<typeof TypographyList> = {
  title: "Primitives/Typography/TypographyList",
  component: TypographyList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TypographyList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <TypographyList {...args}>
      <li>1st level of speckling</li>
      <li>2nd level of speckling</li>
      <li>3rd level of speckling</li>
    </TypographyList>
  ),
};
