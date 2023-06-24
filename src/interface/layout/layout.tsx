import { Box } from "@chakra-ui/react"
import { useAtomValue } from "jotai"

import { PersistGraphEffect } from "@/graph/graph-persist.tsx"
import FlowView from "@/view/flow/flow-view.tsx"

import { PanelDivider } from "../controls/panel-divider"
import { interfaceSidePanelsAtom, SidePanel } from "../interface-state"
import LeftPanel from "./panel/left-panel"
import RightPanel from "./panel/right-panel"
import Toolbar from "./toolbar/toolbar"

export default function Layout() {
  const panels = useAtomValue(interfaceSidePanelsAtom)

  return (
    <Box
      css={{
        display: "grid",
        gridTemplateColumns: "auto auto 1fr auto auto",
        gridTemplateRows: "auto 1fr auto",
        gridTemplateAreas: `
        "h       h     h    h     h"
        "l-panel l-div main r-div r-panel"
        "f       f     f    f     f"`,
        height: "100vh",
        width: "100%",
        overflow: "hidden",

        "> header": {
          gridArea: "h",
        },
        "> footer": {
          gridArea: "f",
        },
      }}
    >
      <Toolbar />
      {panels.includes(SidePanel.Left) && (
        <>
          <LeftPanel />
          <PanelDivider gridArea="l-div" orientation="right" />
        </>
      )}
      <div style={{ gridArea: "main" }}>
        <FlowView />
      </div>
      {panels.includes(SidePanel.Right) && (
        <>
          <PanelDivider gridArea="r-div" orientation="left" />
          <RightPanel />
        </>
      )}

      <footer>Footer</footer>
      <PersistGraphEffect />
    </Box>
  )
}