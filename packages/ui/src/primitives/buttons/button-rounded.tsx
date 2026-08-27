import { Button } from "@buttons/button";
import { IconSquareRoundedChevronUpFilled } from "@tabler/icons-react";

export default function ButtonRounded() {
  return (
    <div className="flex gap-2">
      <Button className="rounded-full">Get Started</Button>
      <Button variant="outline" size="icon" className="rounded-full">
        <IconSquareRoundedChevronUpFilled />
      </Button>
    </div>
  );
}
