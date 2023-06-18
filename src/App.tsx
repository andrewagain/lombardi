import ArboristView from "@/view/arborist/arborist-view.js"
import JsonView from "@/view/json/json-view.js"

export default function App() {
  return (
    <main className="w-full grid grid-cols-2 gap-0">
      <div className="border border-green-500">
        <ArboristView />
      </div>
      <div className="border border-orange-700">
        <JsonView />
      </div>
    </main>
  )
}
