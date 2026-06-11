import { Field, FieldLabel } from "@auto-form/fields/field";
import { Button } from "@buttons/button";
import { ButtonGroup } from "@buttons/button-group";
import { Input } from "./input";

export function InputButtonGroup() {
  return (
    <Field>
      <FieldLabel htmlFor="input-button-group">Search</FieldLabel>
      <ButtonGroup>
        <Input id="input-button-group" placeholder="Type to search..." />
        <Button variant="outline">Search</Button>
      </ButtonGroup>
    </Field>
  );
}
