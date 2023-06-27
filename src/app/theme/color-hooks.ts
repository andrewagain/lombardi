import { useColorModeValue } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

export const highlightColor = mode("blue.400", "blue.500")

export function useHighlightColor(): string {
  return useColorModeValue("blue.400", "blue.500")
}

export function useTextColor(): string {
  return useColorModeValue("gray.800", "gray.200")
}

export function useButtonColor(enabled: boolean): string {
  const h = useHighlightColor()
  const t = useTextColor()
  return enabled ? h : t
}
