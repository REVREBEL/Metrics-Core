import { Button as PrimitiveButton } from "@buttons/button";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const metricsButtonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2",
    "whitespace-nowrap rounded-md",
    "font-brand text-sm font-medium uppercase tracking-[0.125em]",
    "transition-all",
    "mix-blend-normal",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",
    "outline-none",
    "focus-visible:border-ring",
    "focus-visible:ring-[3px]",
    "focus-visible:ring-ring/50",
    "aria-invalid:border-destructive",
    "aria-invalid:ring-destructive/20",
    "dark:aria-invalid:ring-destructive/40",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "border-solid",
          "border-[length:var(--border-button)]",
          "[border-color:var(--button-color)]",
          "[background-color:var(--button-color)]",
          "[color:var(--button-color-inverse)]",
          "shadow-xs",

          "hover:[border-color:var(--button-color)]",
          "hover:[background-color:var(--button-color-inverse)]",
          "hover:[color:var(--button-color)]",
          "hover:[outline-style:solid]",
          "hover:[outline-width:3px]",
          "hover:[outline-offset:-4px]",
          "hover:[outline-color:var(--button-color-fade)]",

          "active:[outline-style:solid]",
          "active:[outline-width:2px]",
          "active:[outline-offset:-3px]",
          "active:[outline-color:color-mix(in_srgb,var(--button-color-fade)_80%,transparent)]",
          "active:[background-color:color-mix(in_srgb,var(--button-color)_80%,transparent)]",
        ].join(" "),

        outline: [
          "border-solid",
          "border-[length:var(--border-button)]",
          "[border-color:var(--button-color)]",
          "bg-transparent",
          "[color:var(--button-color)]",
          "shadow-xs",

          "hover:[border-color:var(--button-color)]",
          "hover:[background-color:var(--button-color)]",
          "hover:[color:var(--button-color-inverse)]",
          "hover:[outline-style:solid]",
          "hover:[outline-width:3px]",
          "hover:[outline-offset:-4px]",
          "hover:[outline-color:var(--button-color-fade)]",

          "active:[outline-style:solid]",
          "active:[outline-width:2px]",
          "active:[outline-offset:-3px]",
          "active:[outline-color:color-mix(in_srgb,var(--button-color-fade)_80%,transparent)]",
          "active:[background-color:color-mix(in_srgb,var(--button-color)_80%,transparent)]",
        ].join(" "),

        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",

        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",

        ghost: [
          "bg-transparent",
          "[color:var(--button-color)]",
          "hover:[background-color:var(--button-color-fade)]",
          "hover:[color:var(--button-color)]",
        ].join(" "),

        link: [
          "bg-transparent",
          "[color:var(--button-color)]",
          "underline-offset-4",
          "hover:underline",
        ].join(" "),
      },

      color: {
        "dark-blue": [
          "[--button-color:var(--color-dark-blue)]",
          "[--button-color-fade:var(--color-dark-blue-fade)]",
          "[--button-color-inverse:var(--color-dark-blue-inverse)]",
          "[--button-color-inverse-fade:var(--color-dark-blue-inverse-fade)]",
        ].join(" "),

        "dark-green": [
          "[--button-color:var(--color-dark-green)]",
          "[--button-color-fade:var(--color-dark-green-fade)]",
          "[--button-color-inverse:var(--color-dark-green-inverse)]",
          "[--button-color-inverse-fade:var(--color-dark-green-inverse-fade)]",
        ].join(" "),

        green: [
          "[--button-color:var(--color-green)]",
          "[--button-color-fade:var(--color-green-fade)]",
          "[--button-color-inverse:var(--color-green-inverse)]",
          "[--button-color-inverse-fade:var(--color-green-inverse-fade)]",
        ].join(" "),

        "light-green": [
          "[--button-color:var(--color-light-green)]",
          "[--button-color-fade:var(--color-light-green-fade)]",
          "[--button-color-inverse:var(--color-light-green-inverse)]",
          "[--button-color-inverse-fade:var(--color-light-green-inverse-fade)]",
        ].join(" "),

        "light-blue": [
          "[--button-color:var(--color-light-blue)]",
          "[--button-color-fade:var(--color-light-blue-fade)]",
          "[--button-color-inverse:var(--color-light-blue-inverse)]",
          "[--button-color-inverse-fade:var(--color-light-blue-inverse-fade)]",
        ].join(" "),

        yellow: [
          "[--button-color:var(--color-yellow)]",
          "[--button-color-fade:var(--color-yellow-fade)]",
          "[--button-color-inverse:var(--color-yellow-inverse)]",
          "[--button-color-inverse-fade:var(--color-yellow-inverse-fade)]",
        ].join(" "),

        orange: [
          "[--button-color:var(--color-orange)]",
          "[--button-color-fade:var(--color-orange-fade)]",
          "[--button-color-inverse:var(--color-orange-inverse)]",
          "[--button-color-inverse-fade:var(--color-orange-inverse-fade)]",
        ].join(" "),

        red: [
          "[--button-color:var(--color-red)]",
          "[--button-color-fade:var(--color-red-fade)]",
          "[--button-color-inverse:var(--color-red-inverse)]",
          "[--button-color-inverse-fade:var(--color-red-inverse-fade)]",
        ].join(" "),

        purple: [
          "[--button-color:var(--color-purple)]",
          "[--button-color-fade:var(--color-purple-fade)]",
          "[--button-color-inverse:var(--color-purple-inverse)]",
          "[--button-color-inverse-fade:var(--color-purple-inverse-fade)]",
        ].join(" "),

        smoke: [
          "[--button-color:var(--color-smoke)]",
          "[--button-color-fade:var(--color-smoke-fade)]",
          "[--button-color-inverse:var(--color-smoke-inverse)]",
          "[--button-color-inverse-fade:var(--color-smoke-inverse-fade)]",
        ].join(" "),
      },

      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-7 gap-1 px-2 text-xs has-[>svg]:px-1.5",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-7",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },

    defaultVariants: {
      variant: "default",
      color: "dark-blue",
      size: "default",
    },
  },
);

type MetricsButtonProps = Omit<
  React.ComponentProps<typeof PrimitiveButton>,
  "variant" | "size"
> &
  VariantProps<typeof metricsButtonVariants>;

function MetricsButton({
  className,
  variant,
  color,
  size,
  ...props
}: MetricsButtonProps) {
  return (
    <PrimitiveButton
      {...props}
      variant="ghost"
      size={size}
      data-slot="metrics-button"
      data-variant={variant}
      data-color={color}
      data-size={size}
      className={cn(
        metricsButtonVariants({
          variant,
          color,
          size,
        }),
        className,
      )}
    />
  );
}

export {
  MetricsButton,
  metricsButtonVariants,
  type MetricsButtonProps,
};