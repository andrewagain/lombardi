import { Box, HStack, IconButton } from "@chakra-ui/react"
import { useAtomValue } from "jotai"
import { NodeRendererProps } from "react-arborist"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import {
  highlightColor,
  useHighlightColor,
  useSelectColor,
} from "@/app/theme/color-hooks"
import { GraphNode } from "@/graph/graph-types.ts"
import { useToggleNodeVisibility } from "@/graph/state/derived/modify-hooks"
import { graphNodeHiddenIndirectlySetAtom } from "@/graph/state/derived/visibility-atoms"

import { treeRowHeightPx } from "../tree-util"
import FolderArrow from "./folder-arrow"
import TreeInput from "./tree-input"

export function TreeRow({
  node,
  style,
  dragHandle,
}: NodeRendererProps<GraphNode>) {
  const [visible, toggleVisibility] = useToggleNodeVisibility(node.data.id)
  const indirectlyHiddenSet = useAtomValue(graphNodeHiddenIndirectlySetAtom)
  const indirectlyHidden = indirectlyHiddenSet.has(node.data.id)
  const selectColor = useSelectColor()

  const { isSelected, isEditing, isLeaf, isDragging } = node
  return (
    <Box
      position="relative"
      backgroundColor={isSelected ? selectColor : undefined}
      css={{
        "& [data-eye]": {
          opacity: visible ? 0 : 1,
        },
        "&:hover [data-eye]": {
          opacity: 1,
        },
      }}
      cursor="pointer"
      height={treeRowHeightPx}
    >
      <HStack
        style={style}
        ref={dragHandle}
        opacity={indirectlyHidden ? 0.5 : 1}
        onClick={() => !isLeaf && node.toggle()}
        whiteSpace="nowrap"
        height={treeRowHeightPx}
      >
        <FolderArrow node={node} />
        <Box
          minWidth={1}
          css={{
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {isEditing ? <TreeInput node={node} /> : node.data.name}
        </Box>
      </HStack>

      <HStack position="absolute" data-eye right={0} top={0} zIndex={1}>
        <IconButton
          onClick={toggleVisibility}
          aria-label="Visibility"
          size="sm"
          variant="ghost"
        >
          {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </IconButton>
      </HStack>
    </Box>
  )
}
