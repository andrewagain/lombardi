import { atom, useAtom } from "jotai"

import { Point } from "@/util/geometry/point"
import { Size } from "@/util/geometry/rect"

export type PanelOrientation = "top" | "bottom" | "left" | "right"
export type PanelStyleProperty = "width" | "height"

export const PANEL_DEFAULT_SIZE = 200

const panelSizeListAtom = atom([] as [string, number][])

const panelSizeMapAtom = atom(
  (get) => new Map(get(panelSizeListAtom)),
  (_, set, map: Map<string, number>) => {
    set(panelSizeListAtom, Array.from(map.entries()))
  }
)

function getLocalStorageKey(panelKey: string): string {
  return `nuons.panel.${panelKey}`
}

export function loadPanelSize(panelKey: string): number {
  const stored = localStorage.getItem(getLocalStorageKey(panelKey))
  if (stored) {
    return parseInt(stored) || PANEL_DEFAULT_SIZE
  }
  return PANEL_DEFAULT_SIZE
}

export function savePanelSize(panelKey: string, size: number) {
  localStorage.setItem(getLocalStorageKey(panelKey), size.toString())
}

export function getPanelGridArea(panelKey: string) {
  return `panel-${panelKey}`
}

export function getPanelDividerGridArea(panelKey: string) {
  return `div-${panelKey}`
}

export function useStoredPanelSize(key: string) {
  const [w, setW] = useAtom(panelSizeMapAtom)
  return [
    w.get(key) || PANEL_DEFAULT_SIZE,
    (size: number) => {
      setW(new Map(w.set(key, size)))
    },
  ] as [number, (size: number) => void]
}

export function getNextPanelSize(
  orientation: PanelOrientation,
  initialSize: Size,
  startClick: Point,
  event: MouseEvent
): number {
  const drag: Point = {
    x: event.clientX - startClick.x,
    y: event.clientY - startClick.y,
  }

  switch (orientation) {
    case "right":
      return initialSize.width - drag.x
    case "bottom":
      return initialSize.height - drag.y
    case "left":
      return initialSize.width + drag.x
    case "top":
      return initialSize.height + drag.y
  }
}

export function getOrientationPropertyName(
  orientation: PanelOrientation
): PanelStyleProperty {
  switch (orientation) {
    case "left":
    case "right":
      return "width"
    case "top":
    case "bottom":
      return "height"
  }
}

export function getOrientationStyleProperty(
  orientation: PanelOrientation,
  size: number
): React.CSSProperties {
  const property = getOrientationPropertyName(orientation)
  return { [property]: `${size}px` }
}
