import { NodeApi } from "react-arborist"
import { MdArrowDropDown, MdArrowRight } from "react-icons/md"

import { GraphNode } from "@/graph/graph-types"

export default function FolderArrow({ node }: { node: NodeApi<GraphNode> }) {
  if (node.isLeaf) return <span></span>
  return <span>{node.isOpen ? <MdArrowDropDown /> : <MdArrowRight />}</span>
}
