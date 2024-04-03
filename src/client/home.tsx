import React from 'react'
import { Section } from './sections'
import { Context } from './context'

export function Home() {
  const global = React.useContext(Context)
  return <>
    <button
      onClick={() => global.goTo(Section.Menus)}
      style={{ marginBottom: 25, fontSize: "2em", marginTop: 25 }}
    >
      🍽️ Menus
    </button>

    <button
      onClick={() => global.goTo(Section.Inventory)}
      style={{ marginBottom: 25, fontSize: "2em" }}
    >
      📦 Inventory
    </button>

    <button
      onClick={() => global.goTo(Section.Shopping)}
      style={{ marginBottom: 25, fontSize: "2em" }}
    >
      🛍️ Shopping
    </button>

    <button
      onClick={() => global.goTo(Section.Recipes)}
      style={{ marginBottom: 25, fontSize: "2em" }}
    >
      🍲 Recipes
    </button>

    <button
      onClick={() => global.goTo(Section.Scan)}
      style={{ fontSize: "2em" }}
    >
      🔎 Scan
    </button>
  </>
}
