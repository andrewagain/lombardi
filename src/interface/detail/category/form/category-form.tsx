import { Box, Text } from "@chakra-ui/react"
import { useAtomValue } from "jotai"
import React from "react"

import { GraphNodeId, NodeCategoryId } from "@/graph/graph-types"
import { nodeCategoryMap } from "@/graph/schema/node-category-util"
import { graphNodeFamily } from "@/graph/state/derived/node-atoms"

import CategoryInput from "../category-input"

export default function CategoryForm({
  nodeId,
  categoryId,
}: {
  nodeId: GraphNodeId
  categoryId: NodeCategoryId
}) {
  const node = useAtomValue(graphNodeFamily(nodeId))
  const category = nodeCategoryMap.get(categoryId)
  if (!category) {
    return null
  }

  return (
    <Box
      borderColor="interface.border"
      borderWidth="1px"
      width="100%"
      overflow="hidden"
    >
      <h2>{category.name}</h2>
      <Box
        display="grid"
        gridTemplateColumns={"auto 1fr"}
        gridRowGap={2}
        gridColumnGap={2}
      >
        {category.properties.map((property) => (
          <React.Fragment key={property.name}>
            <Text>{property.name}</Text>
            <CategoryInput
              nodeId={nodeId}
              category={category}
              property={property}
            />
          </React.Fragment>
        ))}
      </Box>
    </Box>
  )
}
