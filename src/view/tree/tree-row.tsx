import clsx from "clsx"
import { NodeApi, NodeRendererProps } from "react-arborist"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BsTree } from "react-icons/bs"
import { MdArrowDropDown, MdArrowRight } from "react-icons/md"

import { GraphNode } from "@/graph/graph-types.ts"
import { useToggleNodeVisibility } from "@/graph/state/graph-hooks"

import styles from "./tree.module.css"

export function TreeRow({
  node,
  style,
  dragHandle,
}: NodeRendererProps<GraphNode>) {
  const [visible, toggleVisibility] = useToggleNodeVisibility(node.data.id)
  return (
    <div
      ref={dragHandle}
      style={style}
      className={clsx(styles.node, node.state)}
      onClick={() => node.isInternal && node.toggle()}
    >
      <FolderArrow node={node} />
      <span>
        <BsTree />
      </span>
      <span>{node.isEditing ? <Input node={node} /> : node.data.name}</span>

      <span className={styles.nodeActions}>
        <button onClick={toggleVisibility}>
          {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      </span>
    </div>
  )
}

function Input({ node }: { node: NodeApi<GraphNode> }) {
  return (
    <input
      autoFocus
      type="text"
      defaultValue={node.data.name}
      onFocus={(e) => {
        e.currentTarget.select()
      }}
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
