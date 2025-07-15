import React from 'react'
import { Context } from '../context'
import { Route } from '../routes'
import { inventoryAll } from '../../server/inventory/all'
import { ingredientsAdd } from '../../server/ingredients/add'

export function Inventory() {
  const global = React.useContext(Context)

  const [data, setData] = React.useState<InventoryAllData[] | undefined>()

  React.useEffect(() => {
    inventoryAll().then(setData)
  }, [])

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
        onClick={() => {
          const name = prompt("Enter the name of the ingredient")
          if(name) {
            ingredientsAdd({ name }).then(id => {
              setData([
                ...(data || []),
                { name, ingredient: id }
              ].sort((a, b) => a.name.localeCompare(b.name)))
            })
          }
        }}
      >
        Add a new ingredient
      </button>
    </div>

    {data && <div style={{ width: "100%", alignItems: "stretch" }}>
      {data.map(item => <div
        key={item.ingredient}
        style={{ border: "1px solid black", flexGrow: 1, margin: 10 }}
      >
        {item.name} ({item.quantity})
      </div>)}
    </div>}
  </>
}
