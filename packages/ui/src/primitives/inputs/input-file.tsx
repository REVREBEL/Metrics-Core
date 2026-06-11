import { Field, FieldDescription, FieldLabel } from "@auto-form/fields/field";
import { Input } from "./input";

export function InputFile() {
  return (
    <Field>
      <FieldLabel htmlFor="picture">Picture</FieldLabel>
      <Input id="picture" type="file" />
      <FieldDescription>Select a picture to upload.</FieldDescription>
    </Field>
  );
}
