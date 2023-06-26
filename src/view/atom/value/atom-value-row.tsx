import { Box, Text } from "@chakra-ui/react"
import { useAtomValue } from "jotai"
import React, { useMemo, useRef, useState } from "react"
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter"
import agate from "react-syntax-highlighter/dist/esm/styles/hljs/agate"

import colors from "@/app/theme/colors"

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
          <Text
            color={colors.gray[300]}
            backgroundColor={colors.gray[900]}
            padding={1}
          >
            {formattedValue}
          </Text>
        )}
      </Box>
    </React.Fragment>
  )
}
