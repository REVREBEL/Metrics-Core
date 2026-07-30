import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import { TableHead } from "@tables/table";
import type * as React from "react";
import { cn } from "@/lib/utils";

interface SortableTableHeadProps
  extends React.ComponentProps<typeof TableHead> {
  isSorted?: boolean;
  isSortedDesc?: boolean;
  onSort?: () => void;
}

export function SortableTableHead({
  children,
  className,
  isSorted,
  isSortedDesc,
  onSort,
  ...props
}: SortableTableHeadProps) {
  return (
    <TableHead
      className={cn(
        "group cursor-pointer select-none whitespace-nowrap",
        className,
      )}
      onClick={onSort}
      {...props}
    >
      <div className="flex items-center gap-1">
        {children}
        <div className="flex h-4 w-4 items-center justify-center opacity-0 group-hover:opacity-100">
          {isSorted ? (
            isSortedDesc ? (
              <IconArrowDown className="h-3 w-3" />
            ) : (
              <IconArrowUp className="h-3 w-3" />
            )
          ) : (
            <IconArrowUp className="h-3 w-3 text-muted-foreground/50" />
          )}
        </div>
      </div>
    </TableHead>
  );
}
