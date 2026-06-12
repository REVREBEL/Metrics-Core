import { IconDots } from "@tabler/icons-react"

import { Button } from "@buttons/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@dropdowns/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

function ActionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <IconDots />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function TableActions() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Wireless Mouse</TableCell>
          <TableCell>$29.99</TableCell>
          <TableCell className="text-right">
            <ActionsMenu />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Mechanical Keyboard</TableCell>
          <TableCell>$129.99</TableCell>
          <TableCell className="text-right">
            <ActionsMenu />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">USB-C Hub</TableCell>
          <TableCell>$49.99</TableCell>
          <TableCell className="text-right">
            <ActionsMenu />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
