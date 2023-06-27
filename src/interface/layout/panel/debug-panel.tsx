import { Box } from "@chakra-ui/react"

import AtomView from "@/view/atom/atom-view"

export default function DebugPanel() {
  return (
    <Box
      gridArea="d-panel"
      minHeight={1}
      css={{
        width: "200px",
      }}
    >
      <AtomView />
    </Box>
  )
}
