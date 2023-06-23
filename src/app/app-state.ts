import { atom } from "jotai"

export enum SidePanel {
  None,
  Tree,
  Atom,
  Json,
}

export const visibleSidePanelsAtom = atom([SidePanel.Tree])
