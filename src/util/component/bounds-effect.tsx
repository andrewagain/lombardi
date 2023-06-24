import { useEffect } from "react"

// Call 'onBoundsChange' any time the bounds of the given element change
export default function ElementBoundsEffect({
  element,
  onBoundsChange,
}: {
  element?: HTMLElement | null
  onBoundsChange: (r: DOMRect) => void
}) {
  useEffect(() => {
    if (!element) {
      return
    }
    const resizeObserver = new ResizeObserver(() => {
      const bounds = element.getBoundingClientRect()
      // log("Calculate bounds", JSON.stringify(bounds))
      onBoundsChange(bounds)
    })
    resizeObserver.observe(element)
    return () => {
      resizeObserver.disconnect()
    }
  }, [element, onBoundsChange])

  return null
}
