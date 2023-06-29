// All colors should be declared here for simply supporting dark mode

import colors from "./colors"

// https://chakra-ui.com/docs/styled-system/semantic-tokens
export default {
  colors: {
    interface: {
      body: { default: "gray.0", _dark: "gray.1000" },
      paper: { default: "gray.100", _dark: "blue.900" },
      border: { default: "gray.300", _dark: "gray.600" },
    },
    highlight: {
      main: { default: "blue.300", _dark: "blue.600" },
      secondary: { default: "cyan.200", _dark: "cyan.400" },
      trinary: { default: "purple.400", _dark: "purple.600" },
    },
    status: {
      error: { default: "red.400", _dark: "red.600" },
      warning: { default: "yellow.400", _dark: "yellow.600" },
      success: { default: "green.400", _dark: "green.600" },
    },
    state: {
      focus: {
        default: `${colors.cyan[300]}`,
        _dark: `${colors.cyan[200]}`,
      },
      select: {
        default: `${colors.blue[800]}22`,
        _dark: `${colors.blue[100]}22`,
      },
      focusSelect: {
        default: `${colors.cyan[300]}99`,
        _dark: `${colors.cyan[200]}cc`,
      },
    },
    button: {
      opaque: {
        background: {
          main: { default: "gray.200", _dark: "gray.500" },
          hover: { default: "blue.300", _dark: "blue.600" },
        },
      },
    },
    text: {
      subtle: { default: "gray.500", _dark: "gray.500" },
    },
  },
}
