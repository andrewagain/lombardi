import { Input } from "@chakra-ui/react"
import { useCallback } from "react"

import { GraphNode } from "@/_reference/graph/graph-types"
import { useRenameNode } from "@/_reference/graph/state/derived/modify-hooks"

export function NameInput({ node }: { node: GraphNode }) {
  const renameNode = useRenameNode()

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      renameNode(node.id, e.target.value)
    },
    [node.id, renameNode]
  )

  return <Input placeholder="Name" value={node.name} onChange={onChange} />
}
