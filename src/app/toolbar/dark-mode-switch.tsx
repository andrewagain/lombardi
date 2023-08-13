import { IconButton, useColorMode } from "@chakra-ui/react"
import { MdDarkMode, MdLightMode } from "react-icons/md"

export default function DarkModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode()
  const checked = colorMode === "dark"

  return (
    <IconButton
      aria-label="Toggle dark mode"
      icon={checked ? <MdDarkMode /> : <MdLightMode />}
      onClick={toggleColorMode}
      variant="ghost"
      colorScheme="gray"
      size="sm"
    />
  )
}
