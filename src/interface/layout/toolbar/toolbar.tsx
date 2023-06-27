import { HStack, Spacer } from "@chakra-ui/react"

import { interfaceBorder } from "@/app/theme/style-util"

import { SidePanel } from "../../interface-state"
import DarkModeSwitch from "./dark-mode-switch"
import GraphSelect from "./graph-select"
import LogoIcon from "./logo-icon"
import { PanelToggle } from "./panel-toggle"

export default function Toolbar() {
  return (
    <HStack padding={2} as="header" border={interfaceBorder}>
      <LogoIcon />
      <PanelToggle side={SidePanel.Left} />
      <Spacer />
      <GraphSelect />
      <DarkModeSwitch />
      <PanelToggle side={SidePanel.Right} />
      <PanelToggle side={SidePanel.Debug} />
    </HStack>
  )
}
