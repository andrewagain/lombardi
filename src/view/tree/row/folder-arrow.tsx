import { Box } from "@chakra-ui/react"
import { NodeApi } from "react-arborist"
import { MdArrowDropDown, MdArrowRight } from "react-icons/md"

import { GraphNode } from "@/graph/graph-types"

export default function FolderArrow({ node }: { node: NodeApi<GraphNode> }) {
  return (
    <Box opacity={node.isLeaf ? 0 : 1} background="background.balls">
      {node.isOpen ? <MdArrowDropDown /> : <MdArrowRight />}
    </Box>
  )
}
