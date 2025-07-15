import React from 'react'
import { Route } from '../routes'
import { recipesAll } from '../../server/recipes/all'
import { recipesAdd } from '../../server/recipes/add'
import { recipesUpdate } from '../../server/recipes/update'
import { Context } from '../context'
import { recipesGet } from '../../server/recipes/get'

export function RecipeContent() {
  const global = React.useContext(Context)

  const [item, setItem] = React.useState<Recipe | undefined>()

  React.useEffect(() => {
    if(!global.current.id) return
    recipesGet({ id: global.current.id }).then(setItem)
  }, [])

  if(!item) return null

  return <>
    <h2>🍲 Recipe 🍲</h2>

    <div style={{ flexDirection: "row" }}>
      <button
        onClick={() => global.goBack(Route.Recipes)}
      >
        Back
      </button>
    </div>

    <div style={{ width: "100%", alignItems: "stretch" }}>
      <div
        style={{ border: "1px solid black", flexGrow: 1, margin: 10 }}
      >
        <div style={{ flexDirection: "row" }}>
          {item.data.name}

          <span
            style={{ marginLeft: 5, cursor: "pointer" }}
            onClick={() => {
              const name = prompt("New menu name", item.data.name)
              if(name) {
                recipesUpdate({ id: item.id, name })
                setItem({ ...item, data: { ...item.data, name } })
              }
            }}
          >
            ✏️
          </span>
        </div>
      </div>
    </div>
  </>
}
