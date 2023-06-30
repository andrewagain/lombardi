import { Select } from "chakra-react-select"

export default function CategorySelect() {
  return (
    <Select
      options={[
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
      ]}
    />
  )
}
