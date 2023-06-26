import { Box } from "@chakra-ui/react"
import { useAtom, useAtomValue } from "jotai"
import { useAtomCallback } from "jotai/utils"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  CreateHandler,
  DeleteHandler,
  MoveHandler,
  NodeApi,
  RenameHandler,
  Tree,
  TreeApi,
} from "react-arborist"

import { GraphNode } from "@/graph/graph-types.ts"
import {
  useAddEdge,
  useAddNode,
  useDeleteNodes,
  useMoveNodes,
  useRenameNode,
} from "@/graph/state/derived/modify-hooks.ts"
import { graphTreeRootNodesAtom } from "@/graph/state/derived/tree-atoms.ts"
import { graphNodeSelectedIdsAtom } from "@/graph/state/graph-core-atoms.ts"
import ElementBoundsEffect from "@/util/component/bounds-effect.tsx"
import { arrayUnsortedIsEqual } from "@/util/datastructure/array.ts"

import { TreeRow } from "./row/tree-row.tsx"
import TreeCursor from "./tree-cursor.tsx"

// https://github.com/brimdata/react-arborist
export default function TreeView() {
  const treeRef = useRef<TreeApi<GraphNode>>()

  const treeData = useAtomValue(graphTreeRootNodesAtom)
  const [selectedIds] = useAtom(graphNodeSelectedIdsAtom)

  const [boundsElement, setBoundsElement] = useState<HTMLDivElement | null>()
  const [bounds, setBounds] = useState<DOMRect | undefined>()

  const addNode = useAddNode()
  const addEdge = useAddEdge()
  const deleteNodes = useDeleteNodes()
  const renameNode = useRenameNode()
  const moveNodes = useMoveNodes()

  const onCreate: CreateHandler<GraphNode> = useCallback(
    ({ parentId, index, type }) => {
      console.log("onCreate", parentId, index, type)
      const id = `node-${Date.now()}`
      const node: GraphNode = { id, name: "" }
      addNode(node)
      if (parentId) {
        addEdge({ id: `edge-${Date.now()}`, source: parentId, target: id })
      }
      return node
    },
    [addEdge, addNode]
  )

  const onRename: RenameHandler<GraphNode> = useCallback(
    ({ id, name }) => {
      console.log("onRename", id, name)
      renameNode(id, name)
    },
    [renameNode]
  )

  const onMove: MoveHandler<GraphNode> = useCallback(
    ({ dragIds, parentId, index }) => {
      console.log("onMove", dragIds, parentId, index)
      moveNodes({ nodeIds: dragIds, parentId, insertIndex: index })
    },
    [moveNodes]
  )

  const onDelete: DeleteHandler<GraphNode> = useCallback(
    ({ ids }) => {
      console.log("onDelete", ids)
      deleteNodes(ids)
    },
    [deleteNodes]
  )

  const onSelect: (nodes: NodeApi<GraphNode>[]) => void = useAtomCallback(
    useCallback((get, set, nodes) => {
      const next = nodes.map((node) => node.data.id)
      const prev = get(graphNodeSelectedIdsAtom)
      if (!arrayUnsortedIsEqual(prev, next)) {
        console.log("set selected ids", next)
        set(graphNodeSelectedIdsAtom, next)
      }
    }, [])
  )

  useEffect(() => {
    const tree = treeRef.current
    if (!tree) return
    if (arrayUnsortedIsEqual([...tree.selectedIds.values()], selectedIds)) {
      return
    }
    console.log("reset selection to:", selectedIds)
    tree.deselectAll()
    selectedIds.forEach((id) => {
      tree.selectMulti(id)
    })
  }, [selectedIds])

  return (
    <Box
      ref={setBoundsElement}
      css={{
        height: "100%",
        width: "100%",
      }}
    >
      <Tree<GraphNode>
        data={treeData}
        onCreate={onCreate}
        onRename={onRename}
        onMove={onMove}
        onDelete={onDelete}
        onSelect={onSelect}
        renderCursor={TreeCursor}
        width={bounds?.width}
        height={bounds?.height}
        ref={treeRef}
      >
        {TreeRow}
      </Tree>
      <ElementBoundsEffect element={boundsElement} onBoundsChange={setBounds} />
    </Box>
  )
}
