import { extendTheme, ThemeConfig } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

import colors from "./colors"

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors,
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode("#fff", "#121212")(props),

        // workaround for an issue: pressing tab causes the window to get both horizontal and vertical
        // scrollbars, until the mouse is moved, at which point the scrollbars disappear. I found it very jarring.
        overflow: "hidden",
      },
    }),
  },
})

export const mediaDarkMode = "@media (prefers-color-scheme: dark)"

export default theme
