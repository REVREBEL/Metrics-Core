import { Button } from "@buttons";
import { Popover, PopoverContent, PopoverTrigger } from "@popovers";
import { Calendar } from "@ui";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const date = new Date();

export const datePicker = {
  name: "date-picker",
  components: {
    Default: (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" initialFocus />
        </PopoverContent>
      </Popover>
    ),
  },
};
