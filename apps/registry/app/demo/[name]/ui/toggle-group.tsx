import { ToggleGroup, ToggleGroupItem } from "@ui";
import { Bold, Italic, Underline } from "lucide-react";

export const toggleGroup = {
  name: "toggle-group",
  components: {
    Default: (
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="strikethrough"
          aria-label="Toggle strikethrough"
        >
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    ),
  },
};
