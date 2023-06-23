import { Box } from "@chakra-ui/react"

import { PersistGraphEffect } from "@/graph/graph-persist.tsx"
import AtomView from "@/view/atom/atom-view.tsx"
import FlowView from "@/view/flow/flow-view.tsx"
import TreeView from "@/view/tree/tree-view.tsx"

import { PaneDivider } from "../controls/pane-divider"
import Header from "./header"

export default function Layout() {
  return (
    <Box
      css={{
        display: "grid",
        gridTemplateColumns: "auto auto 1fr auto auto",
        gridTemplateRows: "auto 1fr auto",
        gridTemplateAreas: `
        "h    h     h    h     h"
        "tree l-div flow r-div atom"
        "f    f     f    f     f"`,
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
      <Header />
      <div style={{ gridArea: "tree" }}>
        <TreeView />
      </div>
      <PaneDivider gridArea="l-div" orientation="left" />
      <div style={{ gridArea: "flow" }}>
        <FlowView />
      </div>
      <PaneDivider gridArea="r-div" orientation="right" />
      <div style={{ gridArea: "atom", width: 300 }}>
        <AtomView />
      </div>
      <footer>Footer</footer>
      <PersistGraphEffect />
    </Box>
  )
}
