import { IconSearch } from "@tabler/icons-react";
import { Kbd } from "@ui-core";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";

export function InputGroupKbd() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <IconSearch className="text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Kbd>⌘K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  );
}
