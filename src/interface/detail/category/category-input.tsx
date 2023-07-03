import { Box } from "@chakra-ui/react"

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
      return <input type="text" />
    case "number":
      return <input type="number" />
    case "boolean":
      return <input type="checkbox" />
    case "datetime":
      return <input type="datetime-local" />
    case "url":
      // TODO: add validation, and support multiple URLs. anytime we have 1 URL we may have multiple for mirrors or backup sources
      return <input type="url" />
    default:
      return <Box>{property.type} is unsupported</Box>
  }
}
