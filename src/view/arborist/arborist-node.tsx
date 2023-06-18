import { NodeRendererProps } from "react-arborist"

import { GraphNode } from "@/graph/graph-types.ts"

export function ArboristNode({
  node,
  style,
  dragHandle,
}: NodeRendererProps<GraphNode>) {
  return (
    <div
      style={style}
      ref={dragHandle}
      className="text-green-500"
      data-focused={node.isFocused}
    >
      {node.isLeaf ? "🍁" : "📁"}
      {node.data.name}
    </div>
  )
}
