import { Box } from "@chakra-ui/react"
import { CursorProps } from "react-arborist"

export default function ArboristCursor({ top, left }: CursorProps) {
  return (
    <Box
      css={{
        position: "absolute",
        width: "100%",
        height: 0,
        borderTop: "2px dotted white",
      }}
      style={{ top, left }}
    ></Box>
  )
}
