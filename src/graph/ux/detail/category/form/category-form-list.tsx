import { VStack } from "@chakra-ui/react"
import { useAtomValue } from "jotai"

import { GraphNodeId } from "@/graph/graph-types"
import { graphNodeFamily } from "@/graph/state/derived/node-atoms"

import CategoryForm from "./category-form"

export default function CategoryFormList({ nodeId }: { nodeId: GraphNodeId }) {
  const node = useAtomValue(graphNodeFamily(nodeId))

  return (
    <VStack alignItems="stretch">
      {node?.categoryIds?.map((categoryId) => (
        <CategoryForm
          key={categoryId}
          nodeId={nodeId}
          categoryId={categoryId}
        />
      ))}
    </VStack>
  )
}
