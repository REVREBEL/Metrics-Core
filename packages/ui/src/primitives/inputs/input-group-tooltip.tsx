import { IconHelpCircle, IconInfoCircle } from "@tabler/icons-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui-core/tooltip";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group";

export default function InputGroupTooltip() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Enter password" type="password" />
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger
              render={
                <InputGroupButton
                  variant="ghost"
                  aria-label="Info"
                  size="icon-xs"
                />
              }
            >
              <IconInfoCircle />
            </TooltipTrigger>
            <TooltipContent>
              <p>Password must be at least 8 characters</p>
            </TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Your email address" />
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger
              render={
                <InputGroupButton
                  variant="ghost"
                  aria-label="Help"
                  size="icon-xs"
                />
              }
            >
              <IconHelpCircle />
            </TooltipTrigger>
            <TooltipContent>
              <p>We&apos;ll use this to send you notifications</p>
            </TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Enter API key" />
        <Tooltip>
          <TooltipTrigger render={<InputGroupAddon />}>
            <InputGroupButton variant="ghost" aria-label="Help" size="icon-xs">
              <IconHelpCircle />
            </InputGroupButton>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Click for help with API keys</p>
          </TooltipContent>
        </Tooltip>
      </InputGroup>
    </div>
  );
}
