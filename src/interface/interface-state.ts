import { useAtomValue, useSetAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { useCallback } from "react"

import { toggleArrayInclusion } from "@/util/datastructure/array"

export enum SidePanel {
  None,
  Left,
  Right,
  Debug,
}

export const interfaceSidePanelsAtom = atomWithStorage("nuons.sidepanels", [
  SidePanel.Left,
])

export function useToggleSidePanel(sidePanel: SidePanel) {
  const setSidePanels = useSetAtom(interfaceSidePanelsAtom)

  return useCallback(() => {
    setSidePanels((a) => toggleArrayInclusion(a, sidePanel))
  }, [setSidePanels, sidePanel])
}

export function useSidePanelEnabled(sidePanel: SidePanel) {
  {
    const sidePanels = useAtomValue(interfaceSidePanelsAtom)
    return sidePanels.includes(sidePanel)
  }
}
