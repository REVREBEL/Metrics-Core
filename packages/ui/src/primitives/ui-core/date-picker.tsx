"use client";

import { Button } from "@buttons/button";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@popovers/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "./calendar";
import { forwardRef } from "react";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric",
});

export const DatePicker = forwardRef<
	HTMLDivElement,
	{
		date?: Date;
		setDate: (date?: Date) => void;
	}
>(function DatePickerCmp({ date, setDate }, ref) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						"w-full justify-start text-left font-normal",
						!date && "text-muted-foreground",
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? dateFormatter.format(date) : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" ref={ref}>
				<Calendar mode="single" selected={date} onSelect={setDate} />
			</PopoverContent>
		</Popover>
	);
});
