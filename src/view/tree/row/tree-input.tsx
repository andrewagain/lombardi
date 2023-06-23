import { NodeApi } from "react-arborist"

import { GraphNode } from "@/graph/graph-types"

export default function TreeInput({ node }: { node: NodeApi<GraphNode> }) {
  return (
    <input
      autoFocus
      type="text"
      defaultValue={node.data.name}
      onFocus={(e) => {
        e.currentTarget.select()
      }}
      onBlur={() => node.reset()}
      onKeyDown={(e) => {
        if (e.key === "Escape") node.reset()
        if (e.key === "Enter") node.submit(e.currentTarget.value)
      }}
    />
  )
}
