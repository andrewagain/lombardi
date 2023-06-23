import { Box } from "@chakra-ui/react"
import { NodeRendererProps } from "react-arborist"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BsTree } from "react-icons/bs"

import { mediaDarkMode } from "@/app/theme/theme"
import { GraphNode } from "@/graph/graph-types.ts"
import { useToggleNodeVisibility } from "@/graph/state/graph-hooks"

import FolderArrow from "./folder-arrow"
import TreeInput from "./tree-input"

export function TreeRow({
  node,
  style,
  dragHandle,
}: NodeRendererProps<GraphNode>) {
  const [visible, toggleVisibility] = useToggleNodeVisibility(node.data.id)
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

        "&:hover": {
          backgroundColor: "#eee",
          [mediaDarkMode]: {
            backgroundColor: "#333",
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
        }}
        onClick={() => node.isInternal && node.toggle()}
      >
        <FolderArrow node={node} />
        <span>
          <BsTree />
        </span>
        <span>
          {node.isEditing ? <TreeInput node={node} /> : node.data.name}
        </span>
      </Box>
      <Box
        css={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "row-reverse",
          paddingRight: 10,
        }}
      >
        <button onClick={toggleVisibility}>
          {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      </Box>
    </Box>
  )
}
