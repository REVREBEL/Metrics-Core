"use client";

import { Input } from "@inputs/input";
import { IconChevronRight } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@ui-core";
import * as React from "react";
import { Button } from "./button";
import { ButtonGroup } from "./button-group";

const CURRENCIES = [
  { label: "US Dollar", value: "$" },
  { label: "Euro", value: "€" },
  { label: "British Pound", value: "£" },
];

export default function ButtonGroupSelect() {
  const [currency, setCurrency] = React.useState("$");

  return (
    <ButtonGroup>
      <ButtonGroup>
        <Select
          value={currency}
          onValueChange={(value: string) => setCurrency(value)}
        >
          <SelectTrigger className="font-mono">{currency}</SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              {CURRENCIES.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.value}{" "}
                  <span className="text-muted-foreground">{item.label}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input placeholder="10.00" pattern="[0-9]*" />
      </ButtonGroup>
      <ButtonGroup>
        <Button aria-label="Send" size="icon" variant="outline">
          <IconChevronRight />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}
