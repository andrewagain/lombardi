import { NodeCategory } from "@/graph/graph-types"

export default function CategoryForm(category: NodeCategory) {
  return (
    <div>
      <h2>{category.name}</h2>
      {category.properties.map((property) => (
        <div>
          <label>{property.name}</label>
          <input type="text" />
        </div>
      ))}
    </div>
  )
}
