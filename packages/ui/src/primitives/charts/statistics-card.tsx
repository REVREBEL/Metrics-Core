import { Card, CardContent, CardHeader } from "@ui-core/card";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

// Statistics card data type
type StatisticsCardProps = {
  icon: ReactNode;
  value: string;
  title: string;
  changePercentage: string;
  className?: string;
};

const StatisticsCard = ({
  icon,
  value,
  title,
  changePercentage,
  className,
}: StatisticsCardProps) => {
  return (
    <Card className={cn("gap-4", className)}>
      <CardHeader className="flex items-center">
        <div className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-md">
          {icon}
        </div>
        <span className="text-2xl">{value}</span>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <span className="font-display font-bold uppercase tracking-widest text-[10px] text-dark-blue">
          {title}
        </span>
        <p className="space-x-2">
          <span className="text-sm">{changePercentage}</span>
          <span className="text-muted-foreground text-sm">than last week</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
