import { GraphNodeId, NodeCategory } from "@/graph/graph-types"

import CategoryInput from "./category-input"

export default function CategoryForm({
  nodeId,
  category,
}: {
  nodeId: GraphNodeId
  category: NodeCategory
}) {
  return (
    <div>
      <h2>{category.name}</h2>
      {category.properties.map((property) => (
        <CategoryInput
          nodeId={nodeId}
          category={category}
          property={property}
        />
      ))}
    </div>
  )
}
