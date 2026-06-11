"use client";

import type * as React from "react";

import { cn } from "@/lib/utils";

type CalendarProps = Omit<React.ComponentProps<"div">, "onSelect"> & {
	selected?: Date;
	onSelect?: (date: Date | undefined) => void;
	disabled?: boolean | ((date: Date) => boolean);
	mode?: "single" | string;
	defaultMonth?: Date;
	initialFocus?: boolean;
	captionLayout?: string;
	showOutsideDays?: boolean;
	classNames?: Record<string, string>;
	components?: Record<string, React.ComponentType<unknown>>;
};

function toDateInputValue(date: Date | undefined) {
	if (!date) return "";

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

function fromDateInputValue(value: string) {
	if (!value) return undefined;

	const [year, month, day] = value.split("-").map(Number);

	if (!year || !month || !day) return undefined;

	return new Date(year, month - 1, day);
}

function Calendar({
	className,
	selected,
	onSelect,
	disabled,
	mode: _mode,
	defaultMonth: _defaultMonth,
	initialFocus: _initialFocus,
	captionLayout: _captionLayout,
	showOutsideDays: _showOutsideDays,
	classNames: _classNames,
	components: _components,
	...props
}: CalendarProps) {
	const isDisabled = typeof disabled === "boolean" ? disabled : false;

	return (
		<div
			className={cn(
				"w-fit rounded-md border bg-popover p-3 text-popover-foreground shadow-md",
				className,
			)}
			{...props}
		>
			<input
				type="date"
				value={toDateInputValue(selected)}
				disabled={isDisabled}
				onChange={(event) => {
					const nextDate = fromDateInputValue(event.target.value);

					if (
						nextDate &&
						typeof disabled === "function" &&
						disabled(nextDate)
					) {
						return;
					}

					onSelect?.(nextDate);
				}}
				className={cn(
					"h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs outline-none transition-colors",
					"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
					"disabled:cursor-not-allowed disabled:opacity-50",
				)}
			/>
		</div>
	);
}

export { Calendar };
