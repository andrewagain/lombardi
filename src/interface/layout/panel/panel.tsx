import { Box, BoxProps, useTheme } from "@chakra-ui/react"
import { useCallback, useMemo, useState } from "react"

import { Size } from "@/util/geometry/rect"

import {
  getNextPanelSize,
  getOrientationStyleProperty,
  PanelOrientation,
  useStoredPanelSize,
} from "./panel-util"

interface PanelProps extends BoxProps {
  orientation: PanelOrientation
  panelKey: string
}

export default function Panel({
  panelKey,
  orientation,
  ...boxProps
}: PanelProps) {
  const [storedSize, setStoredSize] = useStoredPanelSize(panelKey)
  const [highFrequencySize, setHighFrequencySize] = useState(storedSize)
  const styleProperty = useMemo(
    () => getOrientationStyleProperty(orientation, highFrequencySize),
    [orientation, highFrequencySize]
  )

  const horizontal = ["top", "bottom"].includes(orientation)

  const onMouseDown = useCallback((event: React.MouseEvent) => {
    const startClick = { x: event.clientX, y: event.clientY }
    const targetElement = event.currentTarget
    if (!targetElement) {
      console.error("No target element")
      return
    }
    const startTargetBox = targetElement.getBoundingClientRect()
    const initialSize: Size = {
      height: startTargetBox.bottom - startTargetBox.top,
      width: startTargetBox.right - startTargetBox.left,
    }

    const updateSize = (event: MouseEvent, store: boolean) => {
      const size = getNextPanelSize(orientation, initialSize, startClick, event)
      setHighFrequencySize(size)
      if (store) {
        setStoredSize(size)
      }
    }
    const onMouseMove = (event: MouseEvent) => {
      updateSize(event, false)
    }

    const onMouseUp = (event: MouseEvent) => {
      document.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mousemove", onMouseMove)
      updateSize(event, true)
    }

    document.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mousemove", onMouseMove)
  }, [])

  return (
    <Box
      width={horizontal ? "100%" : `${VISIBLE_THICKNESS}px`}
      height={horizontal ? `${VISIBLE_THICKNESS}px` : "100%"}
      cursor={horizontal ? "row-resize" : "col-resize"}
      backgroundColor="interface.border"
      css={{
        transition: "background-color 200ms, border-color 200ms",
        ":hover": {
          backgroundColor: "var(--chakra-colors-highlight-main)",
        },
      }}
      gridArea={gridArea}
      position="relative"
      data-orientation={orientation}
      {...boxProps}
    >
      <Box
        onMouseDown={onMouseDown}
        position="absolute"
        left={horizontal ? "0" : `-${HIT_TARGET_PAD}px`}
        width={
          horizontal ? "100%" : `${HIT_TARGET_PAD * 2 + VISIBLE_THICKNESS}px`
        }
        top={horizontal ? `-${HIT_TARGET_PAD}px` : "0"}
        height={
          horizontal ? `${HIT_TARGET_PAD * 2 + VISIBLE_THICKNESS}px` : "100%"
        }
        zIndex={2}
      />
    </Box>
  )
}
