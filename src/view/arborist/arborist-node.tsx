import { NodeApi, NodeRendererProps } from "react-arborist"
import { BsTree } from "react-icons/bs"
import { MdArrowDropDown, MdArrowRight } from "react-icons/md"

import { GraphNode } from "@/graph/graph-types.ts"

import styles from "./arborist.module.css"

export function ArboristNode({
  node,
  style,
  dragHandle,
}: NodeRendererProps<GraphNode>) {
  return (
    <div
      ref={dragHandle}
      style={style}
      className={styles.node}
      onClick={() => node.isInternal && node.toggle()}
    >
      <FolderArrow node={node} />
      <span>
        <BsTree />
      </span>
      <span>{node.isEditing ? <Input node={node} /> : node.data.name}</span>
    </div>
  )
}

function Input({ node }: { node: NodeApi<GraphNode> }) {
  return (
    <input
      autoFocus
      type="text"
      defaultValue={node.data.name}
      onFocus={(e) => e.currentTarget.select()}
      onBlur={() => node.reset()}
      onKeyDown={(e) => {
        if (e.key === "Escape") node.reset()
        if (e.key === "Enter") node.submit(e.currentTarget.value)
      }}
    />
  )
}

function FolderArrow({ node }: { node: NodeApi<GraphNode> }) {
  if (node.isLeaf) return <span></span>
  return <span>{node.isOpen ? <MdArrowDropDown /> : <MdArrowRight />}</span>
}
