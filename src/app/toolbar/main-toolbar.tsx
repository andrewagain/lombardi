import { HStack, Spacer, StackProps } from "@chakra-ui/react"

import { interfaceBorder } from "@/app/theme/style-util"

import { SidePanel } from "../state/interface-state"
import DarkModeSwitch from "./dark-mode-switch"
import LogoIcon from "./logo-icon"
import { PanelToggle } from "./panel-toggle"

export default function Toolbar(props: StackProps) {
  return (
    <HStack padding={2} as="header" borderBottom={interfaceBorder} {...props}>
      <LogoIcon />
      <Spacer />
      <DarkModeSwitch />
      <PanelToggle side={SidePanel.Debug} />
    </HStack>
  )
}
