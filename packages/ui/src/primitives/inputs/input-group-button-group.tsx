import { ButtonGroup, ButtonGroupText } from "@buttons/button-group";
import { IconLink } from "@tabler/icons-react";
import { Label } from "@ui-core";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";

export default function InputGroupButtonGroup() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <ButtonGroup>
        <ButtonGroupText asChild>
          <Label htmlFor="url">https://</Label>
        </ButtonGroupText>
        <InputGroup>
          <InputGroupInput id="url" />
          <InputGroupAddon align="inline-end">
            <IconLink />
          </InputGroupAddon>
        </InputGroup>
        <ButtonGroupText>.com</ButtonGroupText>
      </ButtonGroup>
    </div>
  );
}
