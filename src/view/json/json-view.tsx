import { Box } from "@chakra-ui/react"
import { useAtomValue } from "jotai"

import { graphCoreDataAtom } from "@/graph/state/graph-atoms.ts"
import {
  graphNodesWithoutIncomingEdgesAtom,
  graphTreeRootNodesAtom,
} from "@/graph/state/tree-atoms.ts"

export default function JsonView() {
  const root = useAtomValue(graphCoreDataAtom)
  const rootNodes = useAtomValue(graphNodesWithoutIncomingEdgesAtom)
  const tree = useAtomValue(graphTreeRootNodesAtom)

  return (
    <Box css={{ width: "100%", height: "100%" }}>
      <div style={{ border: "2px solid green" }}>
        {JSON.stringify([...root.edgePriorityMap.entries()])}
      </div>
      <div>{JSON.stringify([...root.nodeMap.values()])}</div>
      <div>{JSON.stringify([...root.edgeMap.values()])}</div>
      <div>{JSON.stringify(rootNodes)}</div>
      <div>{JSON.stringify(tree)}</div>
    </Box>
  )
}
