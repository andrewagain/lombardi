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
  }
}
