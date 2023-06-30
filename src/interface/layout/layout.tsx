import { Box } from "@chakra-ui/react"
import { useAtomValue } from "jotai"

import { PersistGraphEffect } from "@/graph/state/effect/graph-persist"
import AtomView from "@/view/atom/atom-view"
import FlowView from "@/view/flow/flow-view.tsx"
import TreeView from "@/view/tree/tree-view"

import NodeDetail from "../detail/node-detail.tsx"
import { interfaceSidePanelsAtom, SidePanel } from "../interface-state"
import Toolbar from "../toolbar/main-toolbar.tsx"
import Footer from "./footer/footer"
import Panel from "./panel/panel.tsx"

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
        "panel-l div-l main div-r panel-r div-d panel-d"
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
        <Panel orientation="left" panelKey="l">
          <TreeView />
        </Panel>
      )}
      <div style={{ gridArea: "main" }}>
        <FlowView />
      </div>
      {panels.includes(SidePanel.Right) && (
        <Panel orientation="right" panelKey="r">
          <NodeDetail />
        </Panel>
      )}
      {panels.includes(SidePanel.Debug) && (
        <Panel orientation="right" panelKey="d">
          <AtomView />
        </Panel>
      )}

      <Footer />
      <PersistGraphEffect />
    </Box>
  )
}
