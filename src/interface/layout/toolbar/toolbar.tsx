import { Box } from "@chakra-ui/react"

import { SidePanel } from "../../interface-state"
import GraphSelect from "./graph-select"
import LogoIcon from "./LogoIcon"
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
      <LogoIcon />
      <PanelToggle side={SidePanel.Left} />
      <Box />
      <GraphSelect />
      <PanelToggle side={SidePanel.Right} />
    </Box>
  )
}
