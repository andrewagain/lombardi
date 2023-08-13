import { Box } from "@chakra-ui/react"

import { interfaceBorder } from "@/app/theme/style-util"

export default function GraphFooter() {
  return (
    <Box as="footer" borderTop={interfaceBorder}>
      <Box padding={2}>Shortcuts</Box>
    </Box>
  )
}
