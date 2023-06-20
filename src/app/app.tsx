import FlowView from "@/view/flow/flow-view.tsx"

import ArboristView from "../view/arborist/arborist-view.tsx"
import JsonView from "../view/json/json-view.tsx"
import style from "./app.module.css"

export default function NuonsApp() {
  return (
    <main className={style.app}>
      <header>Header</header>
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
          border: "2px solid blue",
        }}
      >
        <JsonView />
      </div>
      <div
        style={{
          gridArea: "c",
          border: "2px solid purple",
        }}
      >
        <FlowView />
      </div>
    </main>
  )
}
