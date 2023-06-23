import { Box } from "@chakra-ui/react"

import GraphSelect from "../controls/graph-select"

export default function Header() {
  return (
    <Box
      display="grid"
      gridGap={2}
      alignItems="center"
      padding={2}
      gridTemplateColumns="repeat(6, max-content) 1fr repeat(4, max-content)"
      gridAutoFlow="column"
      as="header"
    >
      <GraphSelect />
    </Box>
  )
}
