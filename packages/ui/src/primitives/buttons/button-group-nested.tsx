import AudioLinesIcon from "@icons/AudioLinesStrokeRounded";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@inputs/input-group";
import { IconPlus } from "@tabler/icons-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui-core/tooltip";
import { Button } from "@buttons/button";
import { ButtonGroup } from "@buttons/button-group";

export function ButtonGroupNested() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <IconPlus />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput placeholder="Send a message..." />
          <Tooltip>
            <TooltipTrigger render={<InputGroupAddon align="inline-end" />}>
              <AudioLinesIcon />
            </TooltipTrigger>
            <TooltipContent>Voice Mode</TooltipContent>
          </Tooltip>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  );
}
