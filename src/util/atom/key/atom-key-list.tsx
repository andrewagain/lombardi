import { Box, Heading, Input } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useMemo } from "react"

import { interfaceBorder } from "@/app/theme/style-util"

import { atomFilterTextAtom } from "../atom-atoms"
import {
  AtomSet,
  getCategorizedAtomKey,
  getSetCategorizedAtoms,
} from "../atom-util"
import AtomKeyRow from "./atom-key-row"

export default function AtomKeyList({ atomSets }: { atomSets: AtomSet[] }) {
  const [filterText, setFilterText] = useAtom(atomFilterTextAtom)

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
    <Box minHeight={0} overflow="hidden">
      <Box padding={2} borderBottom={interfaceBorder}>
        <Input
          onChange={(e) => {
            setFilterText(e.target.value)
          }}
          placeholder="Filter property keys"
          type="search"
          value={filterText}
        />
      </Box>

      <Box minHeight={0} overflowY="scroll">
        {filteredSets.map((set) => (
          <Box key={set.name} padding={2}>
            <Heading size="sm" paddingTop={2}>
              {set.name}
            </Heading>
            <Box>
              {getSetCategorizedAtoms(set).map((ca) => (
                <AtomKeyRow
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
