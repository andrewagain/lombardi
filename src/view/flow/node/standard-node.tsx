import { Handle, NodeProps, Position } from "reactflow"

import { GraphNode } from "@/graph/graph-types"

export default function StandardNode({ data, selected }: NodeProps<GraphNode>) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">{data.name}</label>
        {selected ? "Selected" : "Not selected"}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  )
}
