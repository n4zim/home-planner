import React from 'react'
import { Route } from '../routes'
import { Context } from '../context'

export function Home() {
  const global = React.useContext(Context)
  return <>
    <button
      onClick={() => global.goTo(Route.Chores)}
      style={{ marginBottom: 25, fontSize: "2em", marginTop: 25 }}
    >
      🧹 Chores
    </button>

    <button
      onClick={() => global.goTo(Route.Menus)}
      style={{ marginBottom: 25, fontSize: "2em" }}
    >
      🍽️ Menus
    </button>

    <button
      onClick={() => global.goTo(Route.Inventory)}
      style={{ marginBottom: 25, fontSize: "2em" }}
    >
      📦 Inventory
    </button>

    <button
      onClick={() => global.goTo(Route.Shopping)}
      style={{ marginBottom: 25, fontSize: "2em" }}
    >
      🛍️ Shopping
    </button>

    <button
      onClick={() => global.goTo(Route.Recipes)}
      style={{ marginBottom: 25, fontSize: "2em" }}
    >
      🍲 Recipes
    </button>

    <button
      onClick={() => global.goTo(Route.Scan)}
      style={{ fontSize: "2em" }}
    >
      🔎 Scan
    </button>
  </>
}
