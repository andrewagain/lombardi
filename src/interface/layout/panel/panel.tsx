import { Box, BoxProps } from "@chakra-ui/react"
import { useCallback, useMemo, useRef, useState } from "react"

import { Size } from "@/util/geometry/rect"

import {
  getNextPanelSize,
  getOrientationStyleProperty,
  getPanelDividerGridArea,
  getPanelGridArea,
  loadPanelSize,
  PanelOrientation,
  savePanelSize,
} from "./panel-util"

const DIVIDER_VISIBLE_THICKNESS = 1 // in pixels
const DIVIDER_HIT_TARGET_PAD = 8

export interface PanelProps extends BoxProps {
  orientation: PanelOrientation
  panelKey: string
}

export default function Panel({
  panelKey,
  orientation,
  children,
  ...boxProps
}: PanelProps) {
  const [size, setSize] = useState(loadPanelSize(panelKey))
  const panelSizeStyle = useMemo(
    () => getOrientationStyleProperty(orientation, size),
    [orientation, size]
  )
  const panelRef = useRef<HTMLDivElement>(null)

  const horizontal = ["top", "bottom"].includes(orientation)

  const onMouseDown = useCallback(
    (event: React.MouseEvent) => {
      const startClick = { x: event.clientX, y: event.clientY }
      const targetElement = panelRef.current
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
        const size = getNextPanelSize(
          orientation,
          initialSize,
          startClick,
          event
        )
        setSize(size)
        if (store) {
          savePanelSize(panelKey, size)
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
    },
    [orientation, panelKey]
  )

  return (
    <>
      <Box
        style={panelSizeStyle}
        ref={panelRef}
        gridArea={getPanelGridArea(panelKey)}
        minHeight={0}
        minWidth={0}
        {...boxProps}
      >
        {children}
      </Box>

      <Box
        width={horizontal ? "100%" : `${DIVIDER_VISIBLE_THICKNESS}px`}
        height={horizontal ? `${DIVIDER_VISIBLE_THICKNESS}px` : "100%"}
        cursor={horizontal ? "row-resize" : "col-resize"}
        backgroundColor="interface.border"
        css={{
          transition: "background-color 200ms, border-color 200ms",
          ":hover": {
            backgroundColor: "var(--chakra-colors-highlight-main)",
          },
        }}
        gridArea={getPanelDividerGridArea(panelKey)}
        position="relative"
        data-orientation={orientation}
      >
        <Box
          onMouseDown={onMouseDown}
          position="absolute"
          left={horizontal ? "0" : `-${DIVIDER_HIT_TARGET_PAD}px`}
          width={
            horizontal
              ? "100%"
              : `${DIVIDER_HIT_TARGET_PAD * 2 + DIVIDER_VISIBLE_THICKNESS}px`
          }
          top={horizontal ? `-${DIVIDER_HIT_TARGET_PAD}px` : "0"}
          height={
            horizontal
              ? `${DIVIDER_HIT_TARGET_PAD * 2 + DIVIDER_VISIBLE_THICKNESS}px`
              : "100%"
          }
          zIndex={2}
        />
      </Box>
    </>
  )
}
