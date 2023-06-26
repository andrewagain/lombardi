import { IconButton, IconButtonProps } from "@chakra-ui/react"
import { IconType } from "react-icons"

export interface ToggleIconButtonProps extends IconButtonProps {
  on: boolean
  OnIcon: IconType
  OffIcon: IconType
}

export default function ToggleIconButton({
  on,
  OnIcon,
  OffIcon,
  ...props
}: ToggleIconButtonProps) {
  return <IconButton {...props}>{on ? <OnIcon /> : <OffIcon />}</IconButton>
}
