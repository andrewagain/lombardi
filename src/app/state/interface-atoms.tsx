import { atomWithStorage } from "jotai/utils"

import { SidePanel } from "./interface-types"

export const interfaceSidePanelsAtom = atomWithStorage("nuons.sidepanels", [
  SidePanel.None,
])
