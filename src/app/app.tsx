import { PersistGraphEffect } from "@/graph/graph-persist.tsx"
import AtomView from "@/view/atom/atom-view.tsx"
import FlowView from "@/view/flow/flow-view.tsx"
import TreeView from "@/view/tree/tree-view.tsx"

import style from "./app.module.css"
import Header from "./header.tsx"

export default function NuonsApp() {
  return (
    <main className={style.app}>
      <Header />
      <TreeView />
      <div style={{ gridArea: "flow" }}>
        <FlowView />
      </div>
      <div style={{ gridArea: "atom" }}>
        <AtomView />
      </div>
      <footer>Footer</footer>
      <PersistGraphEffect />
    </main>
  )
}
