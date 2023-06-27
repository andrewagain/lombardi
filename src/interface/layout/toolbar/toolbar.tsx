import { Box } from "@chakra-ui/react"

import colors from "@/app/theme/colors"

import { SidePanel } from "../../interface-state"
import DarkModeSwitch from "./dark-mode-switch"
import GraphSelect from "./graph-select"
import LogoIcon from "./logo-icon"
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
      borderBottom={`1px solid ${colors.gray[600]}`}
    >
      <LogoIcon />
      <PanelToggle side={SidePanel.Left} />
      <Box />
      <GraphSelect />
      <DarkModeSwitch />
      <PanelToggle side={SidePanel.Right} />
      <PanelToggle side={SidePanel.Debug} />
    </Box>
  )
}
