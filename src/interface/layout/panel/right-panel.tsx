import { Box } from "@chakra-ui/react"

import AtomView from "@/view/atom/atom-view"

export default function RightPanel() {
  return (
    <Box
      css={{
        gridArea: "r-panel",
        width: "200px",
      }}
    >
      <AtomView />
    </Box>
  )
}
