import { Button } from "@buttons";
import { Input } from "@inputs";
import { Label } from "@ui";

export const input = {
  name: "input",
  components: {
    Default: <Input placeholder="Default" />,
    Email: <Input type="email" placeholder="Email" />,
    WithLabel: (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Label</Label>
        <Input type="email" id="email" placeholder="With label" />
      </div>
    ),
    WithButton: (
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="email" placeholder="With button" />
        <Button type="submit">Button</Button>
      </div>
    ),

    File: (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">File</Label>
        <Input id="picture" type="file" />
      </div>
    ),
  },
};
