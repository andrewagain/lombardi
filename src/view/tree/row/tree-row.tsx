import { Box } from "@chakra-ui/react"
import { useAtomValue } from "jotai"
import { NodeRendererProps } from "react-arborist"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import { mediaDarkMode } from "@/app/theme/theme"
import { GraphNode } from "@/graph/graph-types.ts"
import { useToggleNodeVisibility } from "@/graph/state/derived/modify-hooks"
import { graphNodeHiddenIndirectlySetAtom } from "@/graph/state/derived/visibility-atoms"

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

  return (
    <Box
      css={{
        display: "flex",
        alignItems: "center",
        margin: 0,
        height: "100%",
        lineHeight: "20px",
        whiteSpace: "nowrap",
        cursor: "pointer",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        overflow: "hidden",
        "[data-actions]": {
          display: "none",
        },

        "&:hover": {
          backgroundColor: "#eee",
          [mediaDarkMode]: {
            backgroundColor: "#333",
          },
          "[data-actions]": {
            display: "flex",
          },
        },
        '&[data-focused="true"]': {
          backgroundColor: "#ddd",
          [mediaDarkMode]: {
            backgroundColor: "#444",
          },
        },
        "&[aria-selected]": {
          backgroundColor: "#ccc",
          [mediaDarkMode]: {
            backgroundColor: "#555",
          },
        },
      }}
    >
      <Box
        style={style}
        ref={dragHandle}
        css={{
          flex: "1 1 auto",
          display: "flex",
          overflow: "hidden",
          opacity: indirectlyHidden ? 0.5 : 1,
        }}
        onClick={() => node.isInternal && node.toggle()}
      >
        <FolderArrow node={node} />
        <Box
          minWidth={1}
          css={{
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {node.isEditing ? <TreeInput node={node} /> : node.data.name}
        </Box>
      </Box>
      <Box
        css={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "row-reverse",
          paddingRight: 10,
        }}
        data-actions
      >
        <button onClick={toggleVisibility}>
          {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      </Box>
    </Box>
  )
}
