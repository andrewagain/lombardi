import { Box, IconButton } from "@chakra-ui/react"
import { PiTreeStructureDuotone } from "react-icons/pi"

import { SidePanel } from "../../interface-state"
import GraphSelect from "./graph-select"
import { PanelToggle } from "./panel-toggle"

export default function Toolbar() {
  return (
    <Box
      display="grid"
      gridGap={2}
      alignItems="center"
      padding={2}
      gridTemplateColumns="repeat(2, max-content) 1fr repeat(2, max-content)"
      gridAutoFlow="column"
      as="header"
    >
      <PiTreeStructureDuotone style={{ marginLeft: 10, marginRight: 10 }} />
      <PanelToggle side={SidePanel.Left} />
      <Box />
      <GraphSelect />
      <PanelToggle side={SidePanel.Right} />
    </Box>
  )
}
