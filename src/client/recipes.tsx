import React from 'react'
import { Section } from './sections'
import { recipesAll } from '../server/recipes/all'
import { recipesAdd } from '../server/recipes/add'
import { recipesUpdate } from '../server/recipes/update'
import { Context } from './context'

export function Recipes() {
  const global = React.useContext(Context)
  const [data, setData] = React.useState<Recipe[]>([])
  React.useEffect(() => {
    recipesAll().then(setData)
  }, [])
  return <>
    <h2>🍲 Recipes 🍲</h2>

    <div style={{ flexDirection: "row" }}>
      <button
        onClick={() => global.goBack()}
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
      {data.map(recipe => <div
        key={recipe.id}
        style={{ border: "1px solid black", flexGrow: 1, margin: 10, cursor: "pointer" }}
        onClick={() => global.goTo(Section.Recipe, recipe.id)}
      >
        {recipe.data.name}
      </div>)}
    </div>
  </>
}
