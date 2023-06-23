import { Box } from "@chakra-ui/react"

import { PersistGraphEffect } from "@/graph/graph-persist.tsx"
import FlowView from "@/view/flow/flow-view.tsx"

import { PanelDivider } from "../controls/panel-divider"
import Header from "./header"
import LeftPanel from "./panel/left-panel"
import RightPanel from "./panel/right-panel"

export default function Layout() {
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
      <Header />
      <LeftPanel />
      <PanelDivider gridArea="l-div" orientation="right" />
      <div style={{ gridArea: "main" }}>
        <FlowView />
      </div>
      <PanelDivider gridArea="r-div" orientation="left" />
      <RightPanel />
      <footer>Footer</footer>
      <PersistGraphEffect />
    </Box>
  )
}
