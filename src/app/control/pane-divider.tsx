import { Box, BoxProps, useTheme } from "@chakra-ui/react"
import { useCallback, useRef } from "react"

import { Point } from "@/util/geometry/point"
import { Size } from "@/util/geometry/rect"

type PaneDividerOrientation = "top" | "bottom" | "left" | "right"

interface PaneDividerProps extends BoxProps {
  gridArea: string
  orientation: PaneDividerOrientation
}

const VISIBLE_THICKNESS = 1 // in pixels
const HIT_TARGET_PAD = 8

const log = console.log

function getTargetElement(
  orientation: PaneDividerOrientation,
  dividerElement: HTMLElement
) {
  if (orientation === "right" || orientation === "bottom") {
    return dividerElement.previousElementSibling as HTMLElement
  }
  return dividerElement.nextElementSibling as HTMLElement
}

export function PaneDivider({
  gridArea,
  orientation,
  ...boxProps
}: PaneDividerProps) {
  const theme = useTheme()
  const dividerElementRef = useRef<HTMLDivElement | null>(null)

  const onMouseDown = useCallback(
    (event: React.MouseEvent) => {
      const dividerElement = dividerElementRef.current
      if (!dividerElement) {
        log("Missing divider element")
        return
      }
      const targetElement = getTargetElement(orientation, dividerElement)
      if (!targetElement) {
        log(`Missing target element`)
        return
      }

      const startClick = { x: event.clientX, y: event.clientY }
      const startTargetBox = targetElement.getBoundingClientRect()
      const initialSize: Size = {
        height: startTargetBox.bottom - startTargetBox.top,
        width: startTargetBox.right - startTargetBox.left,
      }

      const updateSize = (event: MouseEvent) => {
        const drag: Point = {
          x: event.clientX - startClick.x,
          y: event.clientY - startClick.y,
        }

        switch (orientation) {
          case "left":
            targetElement.style.width = `${initialSize.width - drag.x}px`
            break
          case "top":
            targetElement.style.height = `${initialSize.height - drag.y}px`
            break
          case "right":
            targetElement.style.width = `${initialSize.width + drag.x}px`
            break
          case "bottom":
            targetElement.style.height = `${initialSize.height + drag.y}px`
            break
        }
      }
      const onMouseMove = (event: MouseEvent) => {
        updateSize(event)
      }

      const onMouseUp = (event: MouseEvent) => {
        updateSize(event)
        document.removeEventListener("mouseup", onMouseUp)
        document.removeEventListener("mousemove", onMouseMove)
      }

      document.addEventListener("mouseup", onMouseUp)
      document.addEventListener("mousemove", onMouseMove)
    },
    [orientation]
  )

  const horizontal = ["top", "bottom"].includes(orientation)
  const hoverColor = theme.colors.blue[400]

  return (
    <Box
      width={horizontal ? "100%" : `${VISIBLE_THICKNESS}px`}
      height={horizontal ? `${VISIBLE_THICKNESS}px` : "100%"}
      cursor={horizontal ? "row-resize" : "col-resize"}
      css={{
        backgroundColor: theme.colors.gray[600],
        transition: "background-color 200ms, border-color 200ms",
        ":hover": {
          backgroundColor: hoverColor,
          borderRight: `2px solid ${hoverColor}`,
        },
      }}
      ref={dividerElementRef}
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
