import { MultiCalendar } from "./multi-calendar";
import { SingleCalendar } from "./single-calendar";

export const calendar = {
  name: "calendar",
  components: {
    Default: <SingleCalendar />,
    Multi: <MultiCalendar />,
  },
};
