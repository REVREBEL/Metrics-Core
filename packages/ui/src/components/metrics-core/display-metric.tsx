import type * as React from "react";

import { cn } from "@/lib/utils";

export type DisplayMetricFormat = "number" | "currency";

export interface DisplayMetricProps
  extends Omit<React.ComponentProps<"span">, "children" | "color" | "content"> {
  /**
   * Numeric value to display.
   * Null, undefined, NaN, and Infinity render `emptyValue`.
   */
  value: number | null | undefined;

  /**
   * Determines whether the value is formatted as a number or currency.
   */
  format?: DisplayMetricFormat;

  /**
   * ISO 4217 currency code.
   */
  currency?: string;

  /**
   * Formatting locale.
   */
  locale?: string;

  /**
   * Number of decimal places.
   *
   * Defaults:
   * - number: 0
   * - currency: 2
   */
  decimals?: number;

  /**
   * Show a plus sign for values greater than zero.
   */
  showPositiveSign?: boolean;

  /**
   * Use the variance color when the value is negative.
   */
  redIfNegative?: boolean;

  /**
   * Inherit the positive color from the parent container.
   *
   * When false, `color` is used.
   */
  inherit?: boolean;

  /**
   * Positive and neutral value color when `inherit` is false.
   */
  color?: string;

  /**
   * Negative value color when `redIfNegative` is true.
   */
  varianceColor?: string;

  /**
   * Content displayed when no valid numeric value is available.
   */
  emptyValue?: string;

  /**
   * Optional class applied only to the formatted center value.
   */
  valueClassName?: string;

  /**
   * Optional class applied to both sign lanes.
   */
  signClassName?: string;
}

export function DisplayMetric({
  value,
  format = "number",
  currency = "USD",
  locale = "en-US",
  decimals,
  showPositiveSign = true,
  redIfNegative = true,
  inherit = true,
  color = "var(--metric-color, currentColor)",
  varianceColor = "var(--metric-variance-color, #E05047)",
  emptyValue = "—",
  valueClassName,
  signClassName,
  className,
  style,
  "aria-label": ariaLabel,
  ...props
}: DisplayMetricProps) {
  const isValidValue = typeof value === "number" && Number.isFinite(value);

  const numericValue = isValidValue ? value : null;
  const isNegative = numericValue !== null && numericValue < 0;
  const isPositive = numericValue !== null && numericValue > 0;

  const fractionDigits = decimals ?? (format === "currency" ? 2 : 0);

  const formattedValue =
    numericValue === null
      ? emptyValue
      : new Intl.NumberFormat(locale, {
          style: format === "currency" ? "currency" : "decimal",
          currency: format === "currency" ? currency : undefined,
          currencyDisplay: "narrowSymbol",
          minimumFractionDigits: fractionDigits,
          maximumFractionDigits: fractionDigits,
        }).format(Math.abs(numericValue));

  const leftGlyph = isNegative
    ? "("
    : isPositive && showPositiveSign
      ? "+"
      : "";

  const rightGlyph = isNegative ? ")" : "";

  const resolvedColor =
    isNegative && redIfNegative ? varianceColor : inherit ? "inherit" : color;

  const resolvedAriaLabel =
    ariaLabel ??
    (numericValue === null
      ? emptyValue
      : `${isNegative ? "-" : isPositive && showPositiveSign ? "+" : ""}${formattedValue}`);

  return (
    <span
      data-slot="display-metric"
      data-negative={isNegative || undefined}
      data-positive={isPositive || undefined}
      className={cn(
        "inline-grid grid-cols-[0.62em_max-content_0.62em]",
        "items-center justify-center",
        "whitespace-nowrap bg-transparent align-middle",
        "leading-none [font-variant-numeric:tabular-nums]",
        className,
      )}
      style={{
        ...style,
        color: resolvedColor,
        fontFamily: "inherit",
        fontSize: "inherit",
        fontStyle: "inherit",
        fontWeight: "inherit",
        fontStretch: "inherit",
        letterSpacing: "inherit",
      }}
      {...props}
    >
      <span className="sr-only">{resolvedAriaLabel}</span>
      <span
        aria-hidden="true"
        className={cn(
          "select-none justify-self-center",
          "translate-x-[0.08em]",
          signClassName,
        )}
      >
        {leftGlyph}
      </span>

      <span
        aria-hidden="true"
        className={cn("justify-self-center text-center", valueClassName)}
      >
        {formattedValue}
      </span>

      <span
        aria-hidden="true"
        className={cn(
          "select-none justify-self-center",
          "-translate-x-[0.08em]",
          signClassName,
        )}
      >
        {rightGlyph}
      </span>
    </span>
  );
}
