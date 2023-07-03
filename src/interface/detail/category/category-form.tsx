import { Box, Text, VStack } from "@chakra-ui/react"
import { useAtomValue } from "jotai"
import { useMemo } from "react"
import React from "react"

import { GraphNodeId } from "@/graph/graph-types"
import { getNodeCategoryChain } from "@/graph/schema/node-category-util"
import { graphNodeFamily } from "@/graph/state/derived/node-atoms"

import CategoryInput from "./category-input"

export default function CategoryForm({ nodeId }: { nodeId: GraphNodeId }) {
  const node = useAtomValue(graphNodeFamily(nodeId))
  const chain = useMemo(
    () => getNodeCategoryChain(node?.categories || []),
    [node?.categories]
  )

  return (
    <VStack alignItems="stretch">
      {chain.map((category) => (
        <Box
          key={category.id}
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
      ))}
    </VStack>
  )
}
