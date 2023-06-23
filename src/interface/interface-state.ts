import { atom, useSetAtom } from "jotai"
import { useCallback } from "react"

import { toggleArrayInclusion } from "@/util/datastructure/array"

export enum SidePanel {
  None,
  Left,
  Right,
}

export const interfaceSidePanelsAtom = atom([SidePanel.Left])

export function useToggleSidePanel(sidePanel: SidePanel) {
  const setSidePanels = useSetAtom(interfaceSidePanelsAtom)

  return useCallback(() => {
    setSidePanels((a) => toggleArrayInclusion(a, sidePanel))
  }, [setSidePanels, sidePanel])
}
