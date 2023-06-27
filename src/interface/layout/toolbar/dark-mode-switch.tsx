import { Switch, useColorMode } from "@chakra-ui/react"
import { MdDarkMode, MdLightMode } from "react-icons/md"

export default function DarkModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode()
  const checked = colorMode === "dark"

  return (
    <Switch checked={checked} onChange={toggleColorMode}>
      {checked ? <MdDarkMode /> : <MdLightMode />}
    </Switch>
  )
}
