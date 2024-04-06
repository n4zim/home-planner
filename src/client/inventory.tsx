import React from 'react'
import { Context } from './context'
import { Section } from './sections'

export function Inventory() {
  const global = React.useContext(Context)
  const [data, setData] = React.useState<Recipe[]>([])
  return <>
    <h2>📦 Inventory 📦</h2>

    <div style={{ flexDirection: "row" }}>
      <button
        onClick={() => global.goBack()}
      >
        Back
      </button>

      <button
        style={{ marginLeft: 10 }}
        onClick={() => {}}
      >
        Add a new ingredient
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
