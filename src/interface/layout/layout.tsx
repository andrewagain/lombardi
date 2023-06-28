import { Box } from "@chakra-ui/react"
import { useAtomValue } from "jotai"

import { PersistGraphEffect } from "@/graph/state/effect/graph-persist"
import AtomView from "@/view/atom/atom-view"
import FlowView from "@/view/flow/flow-view.tsx"
import TreeView from "@/view/tree/tree-view"

import { interfaceSidePanelsAtom, SidePanel } from "../interface-state"
import NodeDetail from "./detail/node-detail"
import Footer from "./footer/footer"
import Panel from "./panel/panel.tsx"
import Toolbar from "./toolbar/main-toolbar"

export default function Layout() {
  const panels = useAtomValue(interfaceSidePanelsAtom)

  return (
    <Box
      css={{
        display: "grid",
        gridTemplateColumns: "auto auto 1fr auto auto",
        gridTemplateRows: "auto 1fr auto",
        gridTemplateAreas: `
        "h       h     h    h     h       h     h"
        "l-panel l-div main r-div r-panel d-div d-panel"
        "f       f     f    f     f       f     f"`,
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
        <Panel
          orientation="left"
          panelGridArea="l-panel"
          dividerGridArea="l-div"
        >
          <TreeView />
        </Panel>
      )}
      <div style={{ gridArea: "main" }}>
        <FlowView />
      </div>
      {panels.includes(SidePanel.Right) && (
        <Panel orientation="right" panelGridArea="r-panel">
          <NodeDetail />
        </Panel>
      )}
      {panels.includes(SidePanel.Debug) && (
        <Panel
          orientation="right"
          panelGridArea="r-panel"
          dividerGridArea="r-div"
        >
          <AtomView />
        </Panel>
      )}

      <Footer />
      <PersistGraphEffect />
    </Box>
  )
}
