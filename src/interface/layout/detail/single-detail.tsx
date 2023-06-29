import { Box, Input } from "@chakra-ui/react"
import { useAtomValue } from "jotai"
import { useCallback } from "react"

import { GraphNode } from "@/graph/graph-types"
import { useRenameNode } from "@/graph/state/derived/modify-hooks"
import { graphNodeFirstSelectedAtom } from "@/graph/state/derived/selection-atoms"

function SingleDetailInternal({ node }: { node: GraphNode }) {
  const renameNode = useRenameNode()
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      renameNode(node.id, e.target.value)
    },
    [node.id, renameNode]
  )

  return (
    <Box padding={2}>
      <Input placeholder="Name" value={node.name} onChange={onChange} />
    </Box>
  )
}

export default function SingleDetail() {
  const node = useAtomValue(graphNodeFirstSelectedAtom)
  if (!node) {
    return <Box>🤪 Node Undefined 🤷‍♀️</Box>
  }
  return <SingleDetailInternal node={node} />
}
