import { Input } from "@inputs";
import { IconSearch as SearchIcon } from "@tabler/icons-react";
import { Button } from "./button";
import { ButtonGroup } from "./button-group";

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
