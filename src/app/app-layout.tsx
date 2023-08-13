import { Box } from "@chakra-ui/react"
import { useAtomValue } from "jotai"

import Panel from "@/util/component/panel/panel"
import AtomView from "@/view/atom/atom-view"

import { interfaceSidePanelsAtom, SidePanel } from "./interface-state"
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
        "toolbar dpanel"
        "main    dpanel"`,
        height: "100vh",
        width: "100%",
        overflow: "hidden",

        "> header": {
          gridArea: "h",
        },
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
