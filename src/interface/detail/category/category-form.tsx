import { GraphNodeId, NodeCategoryId } from "@/graph/graph-types"
import { nodeCategoryMap } from "@/graph/schema/node-categories"

import CategoryInput from "./category-input"

export default function CategoryForm({
  nodeId,
  categoryId,
}: {
  nodeId: GraphNodeId
  categoryId: NodeCategoryId
}) {
  const category = nodeCategoryMap.get(categoryId)

  if (!category) {
    return null
  }

  return (
    <div>
      <h2>{category.id}</h2>
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
