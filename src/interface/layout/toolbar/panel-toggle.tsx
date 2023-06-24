import { IconButton } from "@chakra-ui/react"
import { VscLayoutSidebarLeft, VscLayoutSidebarRight } from "react-icons/vsc"

import { SidePanel, useToggleSidePanel } from "@/interface/interface-state"

export function PanelToggle({ side }: { side: SidePanel }) {
  const toggle = useToggleSidePanel(side)

  return (
    <IconButton
      aria-label="Toggle State Pane"
      onClick={toggle}
      title="Toggle State Pane"
    >
      {side === SidePanel.Left ? (
        <VscLayoutSidebarLeft />
      ) : (
        <VscLayoutSidebarRight />
      )}
    </IconButton>
  )
}
