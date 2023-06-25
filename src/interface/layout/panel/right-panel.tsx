import { Box } from "@chakra-ui/react"

import AtomView from "@/view/atom/atom-view"

export default function RightPanel() {
  return (
    <Box
      gridArea="r-panel"
      minHeight={1}
      css={{
        width: "200px",
      }}
    >
      <AtomView />
    </Box>
  )
}
