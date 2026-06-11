import { useState, useEffect } from "react"

export function useContainerSize(element: HTMLElement | null) {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!element) return

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return
      const entry = entries[0]
      if (entry) {
        const { width, height } = entry.contentRect
        setSize({ width, height })
      }
    })

    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [element])

  return size
}
