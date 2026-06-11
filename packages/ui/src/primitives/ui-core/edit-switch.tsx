"use client"

import { Label } from "./label"
import { Switch } from "./switch"

interface EditSwitchProps {
  defaultEditing: boolean
  onCheckedChange: (checked: boolean) => void
}

export function EditSwitch({ defaultEditing, onCheckedChange }: EditSwitchProps) {
  return (
    <div className="flex items-center space-x-2 pb-4">
      <Switch
        id="edit-mode"
        defaultChecked={defaultEditing}
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor="edit-mode">Edit Layout</Label>
    </div>
  )
}