import { Select } from "chakra-react-select"
import { useAtomValue } from "jotai"

import { GraphNodeId, NodeCategory } from "@/graph/graph-types"
import { nodeCategories } from "@/graph/schema/node-categories"
import { graphNodeFamily } from "@/graph/state/derived/node-atoms"

function getOptionLabel(n: NodeCategory) {
  return n.name
}

function getOptionValue(n: NodeCategory) {
  return n.name
}

export default function CategorySelect({ nodeId }: { nodeId: GraphNodeId }) {
  const node = useAtomValue(graphNodeFamily(nodeId))

  return (
    <Select
      closeMenuOnSelect={false}
      isMulti
      value={node?.categories || []}
      options={nodeCategories}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
    />
  )
}
