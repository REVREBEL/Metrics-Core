import { IconCircleArrowUp as CircleFadingArrowUpIcon } from "@tabler/icons-react";
import { Button } from "./button";

export default function ButtonIcon() {
  return (
    <Button variant="outline" size="icon">
      <CircleFadingArrowUpIcon />
    </Button>
  );
}
