import { Box } from "@chakra-ui/react"

import GraphSelect from "../controls/graph-select"
import { SidePanel } from "../interface-state"
import { PanelToggle } from "./panel/button/panel-toggle"

export default function Header() {
  return (
    <Box
      display="grid"
      gridGap={2}
      alignItems="center"
      padding={2}
      gridTemplateColumns="repeat(6, max-content) 1fr repeat(4, max-content)"
      gridAutoFlow="column"
      as="header"
    >
      <PanelToggle side={SidePanel.Left} />
      <GraphSelect />
      <PanelToggle side={SidePanel.Right} />
    </Box>
  )
}
