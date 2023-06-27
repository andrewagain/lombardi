import { Box, HStack, IconButton } from "@chakra-ui/react"
import { useAtomValue } from "jotai"
import { NodeRendererProps } from "react-arborist"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { MdArrowDropDown, MdArrowRight } from "react-icons/md"

import { GraphNode } from "@/graph/graph-types.ts"
import { useToggleNodeVisibility } from "@/graph/state/derived/modify-hooks"
import { graphNodeHiddenIndirectlySetAtom } from "@/graph/state/derived/visibility-atoms"

import { treeRowHeight, treeRowHeightPx } from "../tree-util"
import TreeInput from "./tree-input.tsx"

export function TreeRow({
  node,
  style,
  dragHandle,
}: NodeRendererProps<GraphNode>) {
  const [visible, toggleVisibility] = useToggleNodeVisibility(node.data.id)
  const indirectlyHiddenSet = useAtomValue(graphNodeHiddenIndirectlySetAtom)
  const indirectlyHidden = indirectlyHiddenSet.has(node.data.id)

  const { isSelected, isEditing, isLeaf } = node
  return (
    <Box
      position="relative"
      backgroundColor={isSelected ? "state.select" : undefined}
      _hover={{ color: "state.focus" }}
      fontWeight={isSelected ? "bold" : undefined}
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
      borderEndRadius={`${treeRowHeight / 2}px`}
    >
      <HStack
        style={style}
        ref={dragHandle}
        opacity={indirectlyHidden ? 0.5 : 1}
        whiteSpace="nowrap"
        height={treeRowHeightPx}
      >
        <IconButton
          size="sm"
          aria-label="Expand"
          variant="ghost"
          onClick={() => !isLeaf && node.toggle()}
          visibility={isLeaf ? "hidden" : undefined}
        >
          {node.isOpen ? <MdArrowDropDown /> : <MdArrowRight />}
        </IconButton>
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

      <HStack
        position="absolute"
        data-eye
        right={2}
        top={0}
        zIndex={1}
        bottom={0}
      >
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
