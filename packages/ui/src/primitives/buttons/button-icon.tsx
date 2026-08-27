import { Button } from "@buttons/button";
import { IconCircleArrowUp as CircleFadingArrowUpIcon } from "@tabler/icons-react";

export default function ButtonIcon() {
  return (
    <Button variant="outline" size="icon">
      <CircleFadingArrowUpIcon />
    </Button>
  );
}
