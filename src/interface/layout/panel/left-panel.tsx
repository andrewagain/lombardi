import { Box } from "@chakra-ui/react"

import TreeView from "@/view/tree/tree-view.tsx"

export default function LeftPanel() {
  return (
    <Box
      css={{
        gridArea: "l-panel",
      }}
    >
      <TreeView />
    </Box>
  )
}
