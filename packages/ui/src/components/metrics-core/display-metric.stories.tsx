import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";

import { DisplayMetric } from "./display-metric";

const meta = {
  title: "UI/Display Metric",
  component: DisplayMetric,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A font-inheriting metric primitive for positive, negative, number, and currency values. Sign lanes remain balanced so the formatted value stays visually centered.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={
          {
            "--metric-color": "#047C97",
            "--metric-variance-color": "#E05047",
          } as CSSProperties
        }
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: { type: "number" },
      description: "Numeric value rendered by the component.",
    },
    format: {
      control: "inline-radio",
      options: ["number", "currency"],
    },
    currency: {
      control: "text",
      if: { arg: "format", eq: "currency" },
    },
    locale: {
      control: "text",
    },
    decimals: {
      control: { type: "number", min: 0, max: 6, step: 1 },
    },
    showPositiveSign: {
      control: "boolean",
    },
    redIfNegative: {
      control: "boolean",
    },
    inherit: {
      control: "boolean",
    },
    color: {
      control: "color",
      if: { arg: "inherit", eq: false },
    },
    varianceColor: {
      control: "color",
    },
    emptyValue: {
      control: "text",
    },
    className: {
      control: false,
      table: { disable: true },
    },
    valueClassName: {
      control: false,
      table: { disable: true },
    },
    signClassName: {
      control: false,
      table: { disable: true },
    },
    style: {
      control: false,
      table: { disable: true },
    },
  },
  args: {
    value: 16,
    format: "number",
    currency: "USD",
    locale: "en-US",
    showPositiveSign: true,
    redIfNegative: true,
    inherit: true,
    emptyValue: "—",
  },
} satisfies Meta<typeof DisplayMetric>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div className="font-medium text-[#047C97]" style={{ fontSize: "42px" }}>
      <DisplayMetric {...args} />
    </div>
  ),
};

export const PositiveNumber: Story = {
  args: {
    value: 16,
  },
  render: (args) => (
    <div className="font-medium text-[#047C97]" style={{ fontSize: "42px" }}>
      <DisplayMetric {...args} />
    </div>
  ),
};

export const NegativeNumber: Story = {
  args: {
    value: -16,
  },
  render: (args) => (
    <div className="font-medium" style={{ fontSize: "42px" }}>
      <DisplayMetric {...args} />
    </div>
  ),
};

export const PositiveCurrency: Story = {
  args: {
    value: 16,
    format: "currency",
    decimals: 2,
  },
  render: (args) => (
    <div className="font-medium text-[#047C97]" style={{ fontSize: "42px" }}>
      <DisplayMetric {...args} />
    </div>
  ),
};

export const NegativeCurrency: Story = {
  args: {
    value: -16,
    format: "currency",
    decimals: 2,
  },
  render: (args) => (
    <div className="font-medium" style={{ fontSize: "42px" }}>
      <DisplayMetric {...args} />
    </div>
  ),
};

export const CurrencyWithoutCents: Story = {
  args: {
    value: -16,
    format: "currency",
    decimals: 0,
  },
  render: (args) => (
    <div className="font-medium" style={{ fontSize: "42px" }}>
      <DisplayMetric {...args} />
    </div>
  ),
};

export const ZeroAndEmptyValues: Story = {
  render: () => (
    <MetricRow label="Fallback states">
      <MetricFrame>
        <DisplayMetric value={0} />
      </MetricFrame>

      <MetricFrame>
        <DisplayMetric value={null} emptyValue="—" />
      </MetricFrame>

      <MetricFrame>
        <DisplayMetric value={Number.NaN} emptyValue="N/A" />
      </MetricFrame>
    </MetricRow>
  ),
};

export const InheritsParentTypography: Story = {
  render: () => (
    <div className="grid gap-6">
      <MetricRow label="14px / regular">
        <MetricFrame className="text-sm font-normal text-[#047C97]">
          <DisplayMetric value={16234} format="currency" decimals={0} />
        </MetricFrame>
      </MetricRow>

      <MetricRow label="28px / semibold">
        <MetricFrame className="text-[28px] font-semibold text-[#047C97]">
          <DisplayMetric value={16234} format="currency" decimals={0} />
        </MetricFrame>
      </MetricRow>

      <MetricRow label="48px / bold">
        <MetricFrame className="text-5xl font-bold text-[#047C97]">
          <DisplayMetric value={16234} format="currency" decimals={0} />
        </MetricFrame>
      </MetricRow>
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div
      className="grid gap-6"
      style={
        {
          "--metric-color": "#8E456A",
          "--metric-variance-color": "#F37D59",
        } as CSSProperties
      }
    >
      <MetricRow label="Custom tokens">
        <MetricFrame className="text-[42px] font-semibold">
          <DisplayMetric
            value={16}
            inherit={false}
            color="var(--metric-color)"
          />
        </MetricFrame>

        <MetricFrame className="text-[42px] font-semibold">
          <DisplayMetric
            value={-16}
            inherit={false}
            color="var(--metric-color)"
            varianceColor="var(--metric-variance-color)"
          />
        </MetricFrame>
      </MetricRow>
    </div>
  ),
};

export const FixedWidthContainer: Story = {
  render: () => (
    <div className="w-[420px] rounded-xl border bg-background p-8">
      <div className="text-center text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Revenue variance
      </div>

      <div className="mt-8 flex min-h-28 items-center justify-center">
        <div className="text-[42px] font-semibold">
          <DisplayMetric
            value={-16234}
            format="currency"
            decimals={0}
            className="w-[10ch]"
          />
        </div>
      </div>

      <div className="mt-6 text-center text-xs uppercase tracking-wide text-muted-foreground">
        Fixed width after rendering
      </div>
    </div>
  ),
};

export const DesignReference: Story = {
  parameters: {
    layout: "padded",
    controls: { disable: true },
  },
  render: () => (
    <div className="w-full max-w-5xl space-y-12 p-4">
      <section>
        <h2 className="text-2xl font-bold uppercase tracking-wide text-[#163666]">
          Display Metric Component
        </h2>

        <div className="mt-8 grid grid-cols-[120px_1fr_1fr] items-center gap-x-12 gap-y-7">
          <div />

          <ColumnHeading>Positive</ColumnHeading>
          <ColumnHeading>Negative</ColumnHeading>

          <RowHeading>Number</RowHeading>
          <MetricExample>
            <DisplayMetric value={16} />
          </MetricExample>
          <MetricExample>
            <DisplayMetric value={-16} />
          </MetricExample>

          <RowHeading>Currency</RowHeading>
          <MetricExample>
            <DisplayMetric value={16} format="currency" decimals={2} />
          </MetricExample>
          <MetricExample>
            <DisplayMetric value={-16} format="currency" decimals={2} />
          </MetricExample>

          <RowHeading>Currency</RowHeading>
          <MetricExample>
            <DisplayMetric value={16} format="currency" decimals={0} />
          </MetricExample>
          <MetricExample>
            <DisplayMetric value={-16} format="currency" decimals={0} />
          </MetricExample>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <ParentExample title="Parent Container Example 1">
          <div className="flex min-h-56 items-center justify-center rounded-lg border">
            <MetricExample>
              <DisplayMetric value={16} format="currency" decimals={0} />
            </MetricExample>
          </div>
        </ParentExample>

        <ParentExample title="Parent Container Example 2">
          <div className="flex min-h-56 items-center justify-center rounded-lg border">
            <MetricExample>
              <DisplayMetric
                value={16}
                format="currency"
                decimals={0}
                className="w-[8ch]"
              />
            </MetricExample>
          </div>
        </ParentExample>
      </section>
    </div>
  ),
};

function MetricRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[140px_repeat(3,minmax(120px,1fr))] items-center gap-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}

function MetricFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-16 items-center justify-center rounded-md border px-4 ${className}`}
    >
      {children}
    </div>
  );
}

function MetricExample({ children }: { children: ReactNode }) {
  return (
    <div className="text-[42px] font-medium text-[#047C97]">{children}</div>
  );
}

function ColumnHeading({ children }: { children: ReactNode }) {
  return (
    <div className="text-sm font-medium uppercase tracking-wide">
      {children}
    </div>
  );
}

function RowHeading({ children }: { children: ReactNode }) {
  return <div className="text-sm">{children}</div>;
}

function ParentExample({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 text-center text-lg font-medium">{title}</h3>
      {children}
    </div>
  );
}
