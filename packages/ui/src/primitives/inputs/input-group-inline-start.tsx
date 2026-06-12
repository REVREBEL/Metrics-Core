import { Field, FieldDescription, FieldLabel } from "@auto-form/fields/field";
import { IconSearch } from "@tabler/icons-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";

export function InputGroupInlineStart() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="inline-start-input">Input</FieldLabel>
      <InputGroup>
        <InputGroupInput id="inline-start-input" placeholder="Search..." />
        <InputGroupAddon align="inline-start">
          <IconSearch className="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>Icon positioned at the start.</FieldDescription>
    </Field>
  );
}
