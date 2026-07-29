import { Field, FieldDescription, FieldLabel } from "@forms/fields/field";
import { IconEyeOff } from "@tabler/icons-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";

export function InputGroupInlineEnd() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="inline-end-input">Input</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="inline-end-input"
          type="password"
          placeholder="Enter password"
        />
        <InputGroupAddon align="inline-end">
          <IconEyeOff />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>Icon positioned at the end.</FieldDescription>
    </Field>
  );
}
