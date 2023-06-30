import { Select } from "chakra-react-select"
import { useAtomValue } from "jotai"

import { GraphNode, GraphNodeId, NodeCategory } from "@/graph/graph-types"
import { nodeCategories } from "@/graph/schema/node-categories"
import { graphNodeFamily } from "@/graph/state/derived/node-atoms"

function getOptionLabel(n: NodeCategory) {
  return n.name
}

function getOptionValue(n: NodeCategory) {
  return n.name
}

// https://react-select.com/props#groupheading
interface GroupType extends Omit<NodeCategory, "subcategories"> {
  options: (GroupType | NodeCategory)[]
}

function optionsToGroups(n: NodeCategory[]): GroupType[] {
  return n.map((x) => ({ ...x, options: optionsToGroups(x.subcategories) }))
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
