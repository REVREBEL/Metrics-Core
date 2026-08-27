import { Button } from "@buttons/button";
import { ButtonGroup } from "@buttons/button-group";
import { Input } from "@inputs/input";
import { IconSearch as SearchIcon } from "@tabler/icons-react";

export default function ButtonGroupInput() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button variant="outline" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  );
}
