import { Box } from "@chakra-ui/react"
import { useAtomValue } from "jotai"

import AtomView from "@/util/atom/atom-view"
import Panel from "@/util/component/panel/panel"

import { interfaceSidePanelsAtom } from "./state/interface-atoms"
import { SidePanel } from "./state/interface-types"
import Toolbar from "./toolbar/main-toolbar"

export default function AppLayout() {
  const panels = useAtomValue(interfaceSidePanelsAtom)

  return (
    <Box
      css={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gridTemplateRows: "auto 1fr",
        gridTemplateAreas: `
        "toolbar toolbar"
        "main    panel-debug"`,
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Toolbar gridArea="toolbar" />

      <Box gridArea="main" minWidth={1} minHeight={1}>
        Main Content
      </Box>

      {panels.includes(SidePanel.Debug) && (
        <Panel orientation="right" panelKey="debug">
          <AtomView />
        </Panel>
      )}
    </Box>
  )
}
