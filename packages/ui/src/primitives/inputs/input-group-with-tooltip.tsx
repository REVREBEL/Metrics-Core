"use client";

import { Field, FieldDescription, FieldGroup, FieldLabel } from "@auto-form";
import { ButtonGroup, ButtonGroupText } from "@buttons/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@dropdowns/dropdown-menu";
import {
  IconAlertCircle,
  IconChevronDown,
  IconInfoCircle,
} from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui-core";
import * as React from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";

const COUNTRIES = ["US", "UK", "CA", "AU", "DE"];

export function InputGroupWithTooltip() {
  const [country, setCountry] = React.useState("US");

  return (
    <TooltipProvider>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="input-tooltip-29">
            Input Group with Tooltip
          </FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-tooltip-29" />
            <InputGroupAddon align="inline-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <IconInfoCircle />
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a tooltip.</p>
                </TooltipContent>
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <InputGroupAddon>
                  {country} <IconChevronDown />
                </InputGroupAddon>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {COUNTRIES.map((c) => (
                  <DropdownMenuItem key={c} onClick={() => setCountry(c)}>
                    {c}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <InputGroupInput id="input-tooltip-30" />
            <InputGroupAddon align="inline-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <IconInfoCircle />
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a tooltip.</p>
                </TooltipContent>
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="url">Button Group</FieldLabel>
          <ButtonGroup>
            <ButtonGroupText>https://</ButtonGroupText>
            <InputGroup>
              <InputGroupInput id="url" />
              <InputGroupAddon align="inline-end">
                <IconAlertCircle />
              </InputGroupAddon>
            </InputGroup>
            <ButtonGroupText>.com</ButtonGroupText>
          </ButtonGroup>
          <FieldDescription>
            This is a description of the input group.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </TooltipProvider>
  );
}
