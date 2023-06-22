import { useAtomValue } from "jotai"
import {
  CreateHandler,
  DeleteHandler,
  MoveHandler,
  RenameHandler,
  Tree,
} from "react-arborist"

import { GraphNode } from "@/graph/graph-types.ts"
import {
  useAddEdge,
  useAddNode,
  useDeleteNodes,
  useMoveNodes,
  useRenameNode,
} from "@/graph/state/graph-hooks.ts"
import { graphTreeRootNodesAtom } from "@/graph/state/tree-atoms.ts"

import styles from "./tree.module.css"
import TreeCursor from "./tree-cursor.tsx"
import { TreeRow } from "./tree-row.tsx"

// https://github.com/brimdata/react-arborist
export default function TreeView() {
  const treeData = useAtomValue(graphTreeRootNodesAtom)
  const addNode = useAddNode()
  const addEdge = useAddEdge()
  const deleteNodes = useDeleteNodes()
  const renameNode = useRenameNode()
  const moveNodes = useMoveNodes()

  const onCreate: CreateHandler<GraphNode> = ({ parentId, index, type }) => {
    console.log("onCreate", parentId, index, type)
    const id = `node-${Date.now()}`
    const node: GraphNode = { id, name: "" }
    addNode(node)
    if (parentId) {
      addEdge({ id: `edge-${Date.now()}`, source: parentId, target: id })
    }
    return node
  }

  const onRename: RenameHandler<GraphNode> = ({ id, name }) => {
    console.log("onRename", id, name)
    renameNode(id, name)
  }

  const onMove: MoveHandler<GraphNode> = ({ dragIds, parentId, index }) => {
    console.log("onMove", dragIds, parentId, index)
    moveNodes({ nodeIds: dragIds, parentId, insertIndex: index })
  }

  const onDelete: DeleteHandler<GraphNode> = ({ ids }) => {
    console.log("onDelete", ids)
    deleteNodes(ids)
  }

  return (
    <Tree<GraphNode>
      data={treeData}
      onCreate={onCreate}
      onRename={onRename}
      onMove={onMove}
      onDelete={onDelete}
      renderCursor={TreeCursor}
      className={styles.tree}
    >
      {TreeRow}
    </Tree>
  )
}
