import { useAtomValue, useSetAtom } from "jotai"
import { useCallback } from "react"

import { toggleArrayInclusion } from "@/util/datastructure/array"

import { interfaceSidePanelsAtom } from "./interface-atoms"
import { SidePanel } from "./interface-types"

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
