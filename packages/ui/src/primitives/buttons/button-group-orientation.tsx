import { Button } from "@buttons/button";
import { ButtonGroup } from "@buttons/button-group";
import {
  IconMinus as MinusIcon,
  IconPlus as PlusIcon,
} from "@tabler/icons-react";

export default function ButtonGroupOrientation() {
  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="Media controls"
      className="h-fit"
    >
      <Button variant="outline" size="icon">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  );
}
