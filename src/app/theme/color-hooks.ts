import { useColorModeValue, useToken } from "@chakra-ui/react"

export function useHighlightColor(): string {
  return useColorModeValue("blue.400", "blue.300")
}

export function useTextColor(): string {
  return useColorModeValue("gray.800", "gray.200")
}

export function useButtonColor(enabled: boolean): string {
  const h = useHighlightColor()
  const t = useTextColor()
  return enabled ? h : t
}

export function useSelectColor(): string {
  const [light, dark] = useToken("colors", ["blue.400", "blue.300"]).map(
    (x) => `${x}66`
  )
  return useColorModeValue(light, dark)
}

export function useFocusColor(): string {
  const [light, dark] = useToken("colors", ["blue.400", "blue.300"]).map(
    (x) => `${x}22`
  )
  return useColorModeValue(light, dark)
}
