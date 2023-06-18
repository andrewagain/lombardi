import { useAtomValue } from "jotai"
import { Tree } from "react-arborist"

import { GraphNode } from "@/graph/graph-types.ts"
import {
  useAddEdge,
  useAddNode,
  useDeleteNodes,
  useRenameNode,
} from "@/graph/state/graph-hooks.ts"
import { graphTreeRootNodesAtom } from "@/graph/state/tree-atoms.ts"

import styles from "./arborist.module.css"
import ArboristCursor from "./arborist-cursor.tsx"
import { ArboristNode } from "./arborist-node.tsx"

// https://github.com/brimdata/react-arborist
export default function ArboristView() {
  const treeData = useAtomValue(graphTreeRootNodesAtom)
  const addNode = useAddNode()
  const addEdge = useAddEdge()
  const deleteNodes = useDeleteNodes()
  const renameNode = useRenameNode()

  const onCreate = ({
    parentId,
    index,
    type,
  }: {
    parentId: string | null
    index: number
    type: string
  }) => {
    console.log("onCreate", parentId, index, type)
    const id = `node-${Date.now()}`
    addNode({ id, name: "" })
    if (parentId) {
      addEdge({ id: `edge-${Date.now()}`, source: parentId, target: id })
    }
    return null
  }

  const onRename = ({ id, name }: { id: string; name: string }) => {
    console.log("onRename", id, name)
    renameNode(id, name)
  }

  const onMove = ({
    dragIds,
    parentId,
    index,
  }: {
    dragIds: string[]
    parentId: string | null
    index: number
  }) => {
    // TODO: we need to store position information before we can implement this
    console.log("onMove", dragIds, parentId, index)
  }

  const onDelete = ({ ids }: { ids: string[] }) => {
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
      renderCursor={ArboristCursor}
      className={styles.arborist}
    >
      {ArboristNode}
    </Tree>
  )
}
