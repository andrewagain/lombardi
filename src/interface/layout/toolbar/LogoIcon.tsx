import { Box } from "@chakra-ui/react"
import { IconContext } from "react-icons"
import { PiTreeStructureDuotone } from "react-icons/pi"

export default function LogoIcon() {
  return (
    <Box style={{ padding: 10 }}>
      <IconContext.Provider value={{ color: "#5492F7" }}>
        <PiTreeStructureDuotone />
      </IconContext.Provider>
    </Box>
  )
}
