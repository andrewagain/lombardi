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

const options = [
  {
    label: "Group 1",
    options: [
      { label: "Group 1, option 1", value: "value_1" },
      { label: "Group 1, option 2", value: "value_2" },
    ],
  },
  { label: "A root option", value: "value_3" },
  { label: "Another root option", value: "value_4" },
]
export default function CategorySelect({ nodeId }: { nodeId: GraphNodeId }) {
  const node = useAtomValue(graphNodeFamily(nodeId))

  return (
    <div>
      <Select options={options} />

      <Select
        closeMenuOnSelect={false}
        isMulti
        value={node?.categories || []}
        options={nodeCategories}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
      />
    </div>
  )
}
