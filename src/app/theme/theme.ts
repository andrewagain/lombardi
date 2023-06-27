import { extendTheme, ThemeConfig } from "@chakra-ui/react"

import colors from "./colors"
import semanticTokens from "./semantic-tokens"

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors,
  semanticTokens,
  styles: {
    global: () => ({
      body: {
        bg: "background.body",

        // workaround for an issue: pressing tab causes the window to get both horizontal and vertical
        // scrollbars, until the mouse is moved, at which point the scrollbars disappear. I found it very jarring.
        overflow: "hidden",
      },
    }),
  },
})

export default theme
