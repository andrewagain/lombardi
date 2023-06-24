import { Box } from "@chakra-ui/react"

import colors from "@/app/theme/colors"

export default function Footer() {
  return (
    <Box as="footer" borderTop={`1px solid ${colors.gray[600]}`}>
      <Box padding={2}>Shortcuts</Box>
    </Box>
  )
}
