import { Box, Text, useColorModeValue } from "@chakra-ui/react"
import { useAtomValue } from "jotai"
import React, { useMemo, useRef, useState } from "react"
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter"
import agate from "react-syntax-highlighter/dist/esm/styles/hljs/agate"

import { CategorizedAtom } from "../atom-util"
import { AtomValueToolbar } from "./atom-value-toolbar"
import { formatAtomValue } from "./format-atom-util"

export function AtomCell({
  categorizedAtom,
  onRemove,
}: {
  categorizedAtom: CategorizedAtom
  onRemove: (key: string) => void
}) {
  const valueElementRef = useRef<HTMLDivElement | null>(null)
  const value = useAtomValue(categorizedAtom.atom)
  const [expanded, setExpanded] = useState(false)
  const [highlighted, setHighlighted] = useState(false)

  const formattedValue = useMemo(
    () => formatAtomValue(value, undefined, expanded),
    [value, expanded]
  )
  const valueText = useColorModeValue("gray.800", "gray.300")
  const valueBackground = useColorModeValue("gray.200", "gray.900")

  return (
    <React.Fragment>
      <AtomValueToolbar
        onRemove={onRemove}
        categorizedAtom={categorizedAtom}
        expanded={expanded}
        setExpanded={setExpanded}
        highlighted={highlighted}
        setHighlighted={setHighlighted}
      />

      <Box
        ref={valueElementRef}
        whiteSpace={expanded ? "normal" : "nowrap"}
        paddingTop={2}
        paddingBottom={4}
      >
        {highlighted ? (
          <SyntaxHighlighter language="json" style={agate}>
            {formattedValue}
          </SyntaxHighlighter>
        ) : (
          <Text color={valueText} backgroundColor={valueBackground} padding={1}>
            {formattedValue}
          </Text>
        )}
      </Box>
    </React.Fragment>
  )
}
