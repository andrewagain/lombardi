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
  return (
    <IconButton size="sm" {...props}>
      {on ? <OnIcon color="highlight.main" /> : <OffIcon />}
    </IconButton>
  )
}
