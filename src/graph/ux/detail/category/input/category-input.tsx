import { Box, Checkbox, Input } from "@chakra-ui/react"

import { GraphNodeId, NodeCategory, NodeProperty } from "@/graph/graph-types"

export default function CategoryInput({
  nodeId,
  category,
  property,
}: {
  nodeId: GraphNodeId
  category: NodeCategory
  property: NodeProperty
}) {
  switch (property.type) {
    case "string":
      return <Input type="text" />
    case "number":
      return <Input type="number" />
    case "boolean":
      return <Checkbox />
    case "datetime":
      return <input type="datetime-local" />
    case "url":
      // TODO: add validation, and support multiple URLs. anytime we have 1 URL we may have multiple for mirrors or backup sources
      return <input type="url" />
    default:
      return <Box>{property.type} is unsupported</Box>
  }
}
