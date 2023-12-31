import { Box } from "@chakra-ui/react"
import { useAtomValue } from "jotai"

import { PersistGraphEffect } from "@/_reference/graph/state/effect/graph-persist.tsx"
import FlowView from "@/_reference/graph/ux/view/flow/flow-view.tsx"
import TreeView from "@/_reference/graph/ux/view/tree/tree-view.tsx"
import { interfaceSidePanelsAtom } from "@/app/state/interface-atoms.tsx"
import { SidePanel } from "@/app/state/interface-types.ts"
import AtomView from "@/util/atom/atom-view.tsx"

import Toolbar from "../../../app/toolbar/main-toolbar.tsx"
import Panel from "../../../util/component/panel/panel.tsx"
import NodeDetail from "./detail/node-detail.tsx"
import Footer from "./graph-footer.tsx"

export default function GraphUx() {
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
      <Box gridArea="main" minWidth={1} minHeight={1}>
        <FlowView />
      </Box>
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
