import { Button } from "@buttons";
import { Input } from "@inputs";
import { Label } from "@ui";

export const form = {
  name: "form",
  components: {
    Default: (
      <form className="w-[350px] space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    ),
  },
};
