import { Textarea } from "@textarea";
import { Label } from "@ui";

export const textarea = {
  name: "textarea",
  components: {
    Default: <Textarea placeholder="Type your message here." />,
    "With Label": (
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message">Your message</Label>
        <Textarea placeholder="Type your message here." id="message" />
      </div>
    ),
    Disabled: <Textarea placeholder="Type your message here." disabled />,
  },
};
