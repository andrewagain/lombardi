import { ChakraProvider } from "@chakra-ui/react"

import theme from "./theme/theme.ts"

export default function ProviderStack() {
  return (
    <ChakraProvider theme={theme}>
      <JotaiProvider>{children}</JotaiProvider>
    </ChakraProvider>
  )
}
