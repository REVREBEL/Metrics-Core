import { Field } from "@forms/fields/field";
import { Button } from "@buttons/button";
import { Input } from "./input";

export function InputInline() {
  return (
    <Field orientation="horizontal">
      <Input type="search" placeholder="Search..." />
      <Button>Search</Button>
    </Field>
  );
}
