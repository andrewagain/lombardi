import ArboristView from "../view/arborist/arborist-view.tsx"
import JsonView from "../view/json/json-view.tsx"
import style from "./app.module.css"

export default function NuonsApp() {
  return (
    <main className={style.app}>
      <header>Header</header>
      <div className="border border-green-500">
        <ArboristView />
      </div>
      <div className="border border-orange-700">
        <JsonView />
      </div>
    </main>
  )
}
