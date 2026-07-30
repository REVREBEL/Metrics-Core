"use client";

import { Button } from "@buttons/button";
import {
  IconCreditCardFilled,
  IconSettingsFilled,
  IconUserFilled,
  IconWritingSignFilled,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export function DropdownMenuIcons() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <IconUserFilled />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconCreditCardFilled />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconSettingsFilled />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <IconWritingSignFilled />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
