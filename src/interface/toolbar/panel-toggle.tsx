import { IconButton } from "@chakra-ui/react"
import { VscDebugBreakpointData } from "react-icons/vsc"

import {
  SidePanel,
  useSidePanelEnabled,
  useToggleSidePanel,
} from "@/interface/interface-state"

// NOTE: Other panels may be created and added here.
function getIcon(p: SidePanel): JSX.Element | null {
  switch (p) {
    case SidePanel.Debug:
      return <VscDebugBreakpointData />
  }
  return null
}

export function PanelToggle({ side }: { side: SidePanel }) {
  const toggle = useToggleSidePanel(side)
  const enabled = useSidePanelEnabled(side)
  return (
    <IconButton
      aria-label="Toggle State Pane"
      onClick={toggle}
      title="Toggle State Pane"
      color={enabled ? "highlight.main" : undefined}
    >
      {getIcon(side)}
    </IconButton>
  )
}
