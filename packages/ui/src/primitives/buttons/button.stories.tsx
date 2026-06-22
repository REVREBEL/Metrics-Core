import { Button } from "./button";

export default {
  title: "Primitives/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Continue",
  },
};

export const Default = {};

export const Variants = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};
