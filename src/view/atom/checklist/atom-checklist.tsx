import { Box, Heading, Input } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useMemo } from "react"

import colors from "@/app/theme/colors"

import { atomFilterTextAtom } from "../atom-atoms"
import {
  AtomSet,
  getCategorizedAtomKey,
  getSetCategorizedAtoms,
} from "../atom-util"
import AtomCheckbox from "./atom-checkbox"

export default function AtomChecklist({ atomSets }: { atomSets: AtomSet[] }) {
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
    <Box
      display="flex"
      flexDirection="column"
      flex="1 1 auto"
      alignItems="stretch"
      overflow="hidden"
    >
      <Box
        flex="0 1 auto"
        padding={2}
        borderBottom={`1px solid ${colors.gray[600]}`}
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

      <Box
        flex="0 1 auto"
        position="relative"
        overflowY="scroll"
        overflowX="hidden"
      >
        <Box minHeight={1}>
          {filteredSets.map((set) => (
            <Box key={set.name} padding={2}>
              <Heading size="sm" paddingTop={2}>
                {set.name}
              </Heading>
              <Box>
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
    </Box>
  )
}
