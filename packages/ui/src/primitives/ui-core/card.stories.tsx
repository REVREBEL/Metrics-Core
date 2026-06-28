import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

function MetricCard() {
  return (
    <Card className="w-[360px] gap-4">
      <CardHeader>
        <CardDescription>Monthly recurring revenue</CardDescription>
        <CardTitle className="text-3xl tracking-tight">$128,420</CardTitle>
        <CardAction>
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
            +12.4%
          </span>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div
          className="flex items-end gap-1"
          aria-label="Six month revenue trend"
          role="img"
        >
          {[38, 46, 43, 58, 66, 78].map((height, index) => (
            <div
              className="flex-1 rounded-sm bg-primary/80"
              key={height}
              style={{ height }}
              title={`Month ${index + 1}: ${height}`}
            />
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          $14,120 above the previous month
        </p>
      </CardContent>
    </Card>
  );
}

export default {
  title: "Components/Metric Card",
  component: MetricCard,
  parameters: {
    layout: "centered",
  },
};

export const Default = {};
