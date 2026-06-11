import * as React from "react"
import { Kbd, KbdGroup } from "../ui-core/kbd"
import { getShortcutKey } from "../utils"

interface ShortcutKeyProps {
  keys?: string[]
}

export function ShortcutKey({ keys }: ShortcutKeyProps) {
  if (!keys || keys.length === 0) return null

  return (
    <KbdGroup>
      {keys.map((key, index) => {
        const { symbol } = getShortcutKey(key)
        return <Kbd key={index}>{symbol}</Kbd>
      })}
    </KbdGroup>
  )
}
