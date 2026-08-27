"use client";

import { IconStar } from "@tabler/icons-react";
import type * as React from "react";
import { useId, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  defaultValue?: number;
  max?: number;
  size?: number;
  precision?: number;
  readOnly?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
  onValueChange?: (value: number) => void;
}

export function Rating({
  value,
  defaultValue = 0,
  max = 5,
  size = 20,
  precision = 1,
  readOnly = false,
  disabled = false,
  className,
  onValueChange,
  onKeyDown,
  onMouseLeave,
  "aria-label": ariaLabel = "Rating",
  ...props
}: RatingProps) {
  const id = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const currentValue = value ?? uncontrolledValue;
  const displayValue = hoverValue ?? currentValue;
  const _step = Math.max(precision, 0.1);
  const isInteractive = !readOnly && !disabled;

  const values = useMemo(
    () => Array.from({ length: max }, (_, index) => index + 1),
    [max],
  );

  function commitValue(nextValue: number) {
    const normalized = Math.max(0, Math.min(max, nextValue));

    if (value === undefined) {
      setUncontrolledValue(normalized);
    }

    onValueChange?.(normalized);
  }

  function handleMouseLeave(event: React.MouseEvent<HTMLFieldSetElement>) {
    setHoverValue(null);
    onMouseLeave?.(event);
  }

  return (
    <fieldset
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      className={cn("flex items-center gap-0.5", className)}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {values.map((ratingValue, index) => {
        const fillAmount = Math.max(0, Math.min(1, displayValue - index));
        const checked = currentValue === ratingValue;
        const starId = `${id}-${ratingValue}`;

        return (
          <div
            key={starId}
            className={cn(
              "relative inline-flex shrink-0 rounded-sm text-muted-foreground outline-none transition-colors",
              isInteractive &&
                "cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              (disabled || readOnly) && "cursor-default",
            )}
          >
            <input
              type="radio"
              id={starId}
              name={`${id}-rating`}
              value={ratingValue}
              checked={checked}
              disabled={disabled || readOnly}
              onChange={() => commitValue(ratingValue)}
              className="sr-only"
            />
            <label
              htmlFor={starId}
              aria-label={`${ratingValue} of ${max}`}
              className="cursor-pointer"
              onMouseEnter={() => isInteractive && setHoverValue(ratingValue)}
            >
              <IconStar
                size={size}
                className="fill-muted text-muted-foreground"
              />
              <span
                className="pointer-events-none absolute inset-0 overflow-hidden text-primary"
                style={{ width: `${fillAmount * 100}%` }}
              >
                <IconStar size={size} className="fill-current" />
              </span>
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}
