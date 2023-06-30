import { Select } from "chakra-react-select"

import { GraphNodeId } from "@/graph/graph-types"

export default function CategorySelect({ nodeId }: { nodeId: GraphNodeId }) {
  return (
    <Select
      options={[
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
      ]}
    />
  )
}
