import { Label } from "@ui";
import { Switch } from "@ui";

export const switchComponent = {
  name: "switch",
  components: {
    Default: (
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    ),
  },
};
