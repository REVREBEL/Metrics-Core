import { IconFidgetSpinnerFilled } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

function Spinner({
  className,
  ...props
}: React.ComponentProps<typeof IconFidgetSpinnerFilled>) {
  return (
    <IconFidgetSpinnerFilled
      aria-label="Loading"
      className={cn("animate-spin", className)}
      role="status"
      {...props}
    />
  );
}

export { Spinner };
