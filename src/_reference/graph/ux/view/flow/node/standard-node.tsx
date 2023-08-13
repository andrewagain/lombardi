import { Box, Text } from "@chakra-ui/react"
import { Handle, NodeProps, Position } from "reactflow"

import { GraphNode } from "@/_reference/graph/graph-types"

export default function StandardNode({ data, selected }: NodeProps<GraphNode>) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Box border={`2px solid ${selected ? "blue" : "white"}`}>
        <Text>{data.name}</Text>
      </Box>
      <Handle type="source" position={Position.Bottom} />
    </>
  )
}
