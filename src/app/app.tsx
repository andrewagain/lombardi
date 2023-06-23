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
      <div className={style.views}>
        <div>
          <TreeView />
        </div>
        <div>
          <FlowView />
        </div>
        <div>
          <AtomView />
        </div>
      </div>
      <footer>Footer</footer>

      <PersistGraphEffect />
    </main>
  )
}
