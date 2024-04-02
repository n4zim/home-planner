import React from 'react'
import { Section } from './sections'
import { recipesAll } from '../server/recipes/all'
import { recipesAdd } from '../server/recipes/add'
import { recipesUpdate } from '../server/recipes/update'

export function Recipes(props: {
  goToSection: (section: Section) => void
}) {
  const [data, setData] = React.useState<Recipe[]>([])
  React.useEffect(() => {
    recipesAll().then(setData)
  }, [])
  return <>
    <div style={{ flexDirection: "row" }}>
      <button
        onClick={() => props.goToSection(Section.Home)}
      >
        Back
      </button>
      <button
        style={{ marginLeft: 10 }}
        onClick={async () => {
          const name = prompt("Menu name")
          if(name) {
            const id = await recipesAdd({ name })
            setData([
              ...data,
              { id, data: { name, ingredients: [], products: [] } },
            ].sort((a, b) => a.data.name.localeCompare(b.data.name)))
          }
        }}
      >
        New Menu
      </button>
    </div>

    <div style={{ width: "100%", alignItems: "stretch" }}>
      {data.map((recipe, index) => <div
        key={recipe.id}
        style={{ border: "1px solid black", flexGrow: 1, margin: 10 }}
      >
        <div style={{ flexDirection: "row" }}>
          <span
            style={{ marginRight: 5, cursor: "pointer" }}
            onClick={() => {
              const name = prompt("New menu name", recipe.data.name)
              if(name) {
                recipesUpdate({ id: recipe.id, name })
                setData(data.map(item => item.id === recipe.id ? {
                  ...item,
                  data: { ...item.data, name },
                } : item).sort((a, b) => a.data.name.localeCompare(b.data.name)))
              }
            }}
          >
            ✏️
          </span>

          {recipe.data.name}
        </div>
      </div>)}
    </div>
  </>
}
