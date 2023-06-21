import { PersistGraphEffect } from "@/graph/graph-persist.tsx"
import FlowView from "@/view/flow/flow-view.tsx"

import ArboristView from "../view/arborist/arborist-view.tsx"
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
        <ArboristView />
      </div>
      <div
        style={{
          gridArea: "b",
          border: "2px solid purple",
        }}
      >
        <FlowView />
      </div>
    </main>
  )
}
