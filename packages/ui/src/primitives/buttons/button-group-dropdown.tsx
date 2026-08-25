"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@dropdowns/dropdown-menu";
import {
  IconAlertSquareRoundedFilled,
  IconBellXFilled,
  IconCopyFilled,
  IconSquareRoundedCheckFilled,
  IconSquareRoundedChevronDownFilled,
  IconSquareRoundedPlusFilled,
  IconSquareRoundedXFilled,
} from "@tabler/icons-react";
import { Button } from "@buttons/button";
import { ButtonGroup } from "@buttons/button-group";

export default function ButtonGroupDropdown() {
  return (
    <ButtonGroup>
      <Button variant="outline">Follow</Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="pl-2!">
            <IconSquareRoundedChevronDownFilled />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <IconBellXFilled />
              Mute Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconSquareRoundedCheckFilled />
              Mark as Read
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconAlertSquareRoundedFilled />
              Report Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconSquareRoundedXFilled />
              Block User
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconSquareRoundedPlusFilled />
              Share Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconCopyFilled />
              Copy Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">
              <IconSquareRoundedXFilled />
              Delete Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}
