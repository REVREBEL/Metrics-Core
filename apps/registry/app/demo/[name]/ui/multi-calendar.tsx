"use client";

import * as React from "react";
import { type DateRange, DayPicker } from "react-day-picker";

export function MultiCalendar() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 5, 9),
    to: new Date(2025, 5, 26),
  });

  return (
    <DayPicker
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      className="rounded-lg border p-3 shadow-sm"
    />
  );
}
