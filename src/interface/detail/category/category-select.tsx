import { GroupBase, Select } from "chakra-react-select"
import { useAtomValue } from "jotai"
import { OptionsOrGroups } from "react-select"

import { GraphNodeId, NodeCategory } from "@/graph/graph-types"
import { nodeCategories } from "@/graph/schema/node-categories"
import { graphNodeFamily } from "@/graph/state/derived/node-atoms"

function getOptionLabel(n: NodeCategory) {
  return n.name
}

function getOptionValue(n: NodeCategory) {
  return n.name
}

// https://react-select.com/props#groupheading

type GroupType = GroupBase<NodeCategory>
function optionsToGroups(
  n: NodeCategory[]
): OptionsOrGroups<NodeCategory, GroupType> {
  return n.map((x) => ({
    ...x,
    options: optionsToGroups(x.subcategories),
    label: x.name,
  }))
}

const options = optionsToGroups(nodeCategories)

export default function CategorySelect({ nodeId }: { nodeId: GraphNodeId }) {
  const node = useAtomValue(graphNodeFamily(nodeId))

  return (
    <div>
      <Select
        closeMenuOnSelect={false}
        isMulti
        value={node?.categories || []}
        options={options}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
      />
    </div>
  )
}
