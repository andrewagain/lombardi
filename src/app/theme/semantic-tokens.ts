// All colors should be declared here for simply supporting dark mode

// https://chakra-ui.com/docs/styled-system/semantic-tokens
export default {
  colors: {
    background: {
      body: { default: "gray.0", _dark: "gray.1000" },
      paper: { default: "gray.100", _dark: "blue.900" },
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
  },
}
