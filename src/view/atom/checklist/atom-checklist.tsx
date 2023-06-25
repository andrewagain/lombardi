import { Box, Heading, Input } from "@chakra-ui/react"
import { useMemo, useState } from "react"

import {
  AtomSet,
  getCategorizedAtomKey,
  getSetCategorizedAtoms,
} from "../atom-util"
import AtomCheckbox from "./atom-checkbox"

export default function AtomChecklist({ atomSets }: { atomSets: AtomSet[] }) {
  const [filterText, setFilterText] = useState("")

  const filteredSets: AtomSet[] = useMemo(() => {
    if (!filterText) {
      return atomSets
    }
    const lowerFilterText = filterText.toLowerCase()
    return atomSets
      .map((set) => ({
        ...set,
        atoms: set.atoms.filter(
          (atom) =>
            atom.debugLabel?.toLowerCase().includes(lowerFilterText) ||
            set.name.toLowerCase().includes(lowerFilterText)
        ),
      }))
      .filter((set) => set.atoms.length > 0)
  }, [atomSets, filterText])

  return (
    <Box padding={2}>
      <Box
        css={{
          flex: "0 0 auto",
        }}
      >
        <Input
          onChange={(e) => {
            setFilterText(e.target.value)
          }}
          placeholder="Filter property keys"
          type="search"
          value={filterText}
        />
      </Box>

      <Box padding={2}>
        {filteredSets.map((set) => (
          <Box key={set.name}>
            <Heading size="sm" paddingTop={2}>
              {set.name}
            </Heading>
            <Box minWidth={1} textOverflow="ellipsis" overflow="hidden">
              {getSetCategorizedAtoms(set).map((ca) => (
                <AtomCheckbox
                  categorizedAtom={ca}
                  key={getCategorizedAtomKey(ca)}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
