import { PersistGraphEffect } from "@/graph/graph-persist.tsx"
import AtomView from "@/view/atom/atom-view.tsx"
import FlowView from "@/view/flow/flow-view.tsx"
import TreeView from "@/view/tree/tree-view.tsx"

import style from "./app.module.css"
import { PaneDivider } from "./control/pane-divider.tsx"
import Header from "./header.tsx"

export default function NuonsApp() {
  return (
    <main className={style.app}>
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
    </main>
  )
}
