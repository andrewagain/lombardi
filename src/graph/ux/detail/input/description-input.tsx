import { Textarea } from "@chakra-ui/react"
import { useCallback } from "react"

import { GraphNode } from "@/graph/graph-types"
import { useModifyNode } from "@/graph/state/derived/modify-hooks"

export function DescriptionInput({ node }: { node: GraphNode }) {
  const modifyNode = useModifyNode()

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      modifyNode(node.id, { description: e.target.value })
    },
    [node.id, modifyNode]
  )

  return (
    <Textarea
      value={node.description || ""}
      onChange={onChange}
      placeholder="Description"
      height={120}
    />
  )
}
