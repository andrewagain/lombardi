import { ChakraProvider } from "@chakra-ui/react"
import { Provider as JotaiProvider } from "jotai"

import theme from "./theme/theme.ts"

export default function ProviderStack({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ChakraProvider theme={theme}>
      <JotaiProvider>{children}</JotaiProvider>
    </ChakraProvider>
  )
}
