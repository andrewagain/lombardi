import { PersistGraphEffect } from "@/graph/graph-persist.tsx"
import AtomView from "@/view/atom/atom-view.tsx"
import FlowView from "@/view/flow/flow-view.tsx"
import TreeView from "@/view/tree/tree-view.tsx"

import style from "./app.module.css"
import Header from "./header.tsx"

export default function NuonsApp() {
  return (
    <main className={style.app}>
      <PersistGraphEffect />

      <Header />
      <div
        style={{
          gridArea: "a",
          border: "2px solid green",
        }}
      >
        <TreeView />
      </div>
      <div
        style={{
          gridArea: "b",
          border: "2px solid purple",
        }}
      >
        <FlowView />
      </div>

      <div
        style={{
          gridArea: "c",
          border: "2px solid cyan",
        }}
      >
        <AtomView />
      </div>
    </main>
  )
}
