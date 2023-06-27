import {
  IconButton,
  IconButtonProps,
  useColorModeValue,
} from "@chakra-ui/react"
import { IconType } from "react-icons"

import colors from "@/app/theme/colors"

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
  const highlight = useColorModeValue(colors.blue[300], colors.blue[100])
  return (
    <IconButton size="sm" {...props}>
      {on ? <OnIcon color={highlight} /> : <OffIcon />}
    </IconButton>
  )
}
