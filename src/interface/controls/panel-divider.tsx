import { Box, BoxProps, useTheme } from "@chakra-ui/react"
import { atom, useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { useCallback, useEffect, useRef } from "react"

import { Point } from "@/util/geometry/point"
import { Size } from "@/util/geometry/rect"

const DEFAULT_WIDTH = 200

const panelDividerWidthsAtom = atomWithStorage(
  "nuons.panels",
  [] as [string, number][]
)

const panelDividerWidthMapAtom = atom(
  (get) => new Map(get(panelDividerWidthsAtom)),
  (_, set, map: Map<string, number>) => {
    set(panelDividerWidthsAtom, Array.from(map.entries()))
  }
)

function usePanelDividerWidth(key: string) {
  const [w, setW] = useAtom(panelDividerWidthMapAtom)
  return [
    w.get(key) || DEFAULT_WIDTH,
    (width: number) => {
      setW(new Map(w.set(key, width)))
    },
  ] as [number, (width: number) => void]
}

type PanelDividerOrientation = "top" | "bottom" | "left" | "right"
type PanelDividerStyleProperty = "width" | "height"

function getOrientationPropertyName(
  orientation: PanelDividerOrientation
): PanelDividerStyleProperty {
  switch (orientation) {
    case "left":
    case "right":
      return "width"
    case "top":
    case "bottom":
      return "height"
  }
}

function getNextPanelSize(
  orientation: PanelDividerOrientation,
  initialSize: Size,
  startClick: Point,
  event: MouseEvent
): number {
  const drag: Point = {
    x: event.clientX - startClick.x,
    y: event.clientY - startClick.y,
  }

  switch (orientation) {
    case "left":
      return initialSize.width - drag.x
    case "top":
      return initialSize.height - drag.y
    case "right":
      return initialSize.width + drag.x
    case "bottom":
      return initialSize.height + drag.y
  }
}

interface PanelDividerProps extends BoxProps {
  gridArea: string
  orientation: PanelDividerOrientation
}

const VISIBLE_THICKNESS = 1 // in pixels
const HIT_TARGET_PAD = 8

const log = console.log

function getTargetElement(
  orientation: PanelDividerOrientation,
  dividerElement?: HTMLElement
) {
  if (!dividerElement) {
    return undefined
  }
  if (orientation === "right" || orientation === "bottom") {
    return dividerElement.previousElementSibling as HTMLElement
  }
  return dividerElement.nextElementSibling as HTMLElement
}

export function PanelDivider({
  gridArea,
  orientation,
  ...boxProps
}: PanelDividerProps) {
  const theme = useTheme()
  const dividerElementRef = useRef<HTMLDivElement>()
  const [storedWidth, setStoredWidth] = usePanelDividerWidth(gridArea)

  useEffect(() => {
    if (storedWidth) {
      const targetElement = getTargetElement(
        orientation,
        dividerElementRef.current
      )
      if (!targetElement) {
        return
      }
      const propertyName = getOrientationPropertyName(orientation)
      targetElement.style[propertyName] = `${storedWidth}px`
    }
  }, [orientation, storedWidth])

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
        const propertyName = getOrientationPropertyName(orientation)
        const size = getNextPanelSize(
          orientation,
          initialSize,
          startClick,
          event
        )
        targetElement.style[propertyName] = `${size}px`
        return size
      }
      const onMouseMove = (event: MouseEvent) => {
        updateSize(event)
      }

      const onMouseUp = (event: MouseEvent) => {
        const nextSize = updateSize(event)
        document.removeEventListener("mouseup", onMouseUp)
        document.removeEventListener("mousemove", onMouseMove)
        setStoredWidth(nextSize)
      }

      document.addEventListener("mouseup", onMouseUp)
      document.addEventListener("mousemove", onMouseMove)
    },
    [orientation, setStoredWidth]
  )

  const horizontal = ["top", "bottom"].includes(orientation)
  const hoverColor = theme.colors.blue[400]

  return (
    <Box
      width={horizontal ? "100%" : `${VISIBLE_THICKNESS}px`}
      height={horizontal ? `${VISIBLE_THICKNESS}px` : "100%"}
      cursor={horizontal ? "row-resize" : "col-resize"}
      backgroundColor="interface.border"
      css={{
        transition: "background-color 200ms, border-color 200ms",
        ":hover": {
          backgroundColor: hoverColor,
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
