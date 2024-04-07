import React from 'react'
import { Scanner } from './scanner'
import { Counter } from './counter'
import { Context } from './context'
import { productsScan } from '../server/products/scan'
import { inventorySet } from '../server/inventory/set'
import Select from 'react-select'
import { productsSetIngredient } from '../server/products/setIngredient'
import { ingredientsAdd } from '../server/ingredients/add'

export function Scan() {
  const global = React.useContext(Context)
  const [data, setData] = React.useState<ScanData | undefined>()
  return <>
    <h2>🔎 Scan 🔎</h2>

    <div style={{ flexDirection: 'row' }}>
      <button
        onClick={() => global.goBack()}
      >
        Back
      </button>

      {data && <button
        onClick={() => setData(undefined)}
        style={{ marginLeft: 10 }}
      >
        Scan another product
      </button>}

      {data && <button
        style={{ marginLeft: 10 }}
        onClick={() => {
          const name = prompt("Enter the name of the ingredient")
          if(name) {
            ingredientsAdd({ name }).then(id => {
              setData({
                ...data,
                ingredients: {
                  ...data.ingredients,
                  [id]: { id, data: { name, inventory: 0 } }
                }
              })
            })
          }
        }}
      >
        Add a new ingredient
      </button>}
    </div>

    {(data && <div style={{
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 20,
    }}>
      <h2>{data.product.data.name}</h2>

      {data.product.data.image && <img src={data.product.data.image} alt={data.product.data.name}/>}

      <h3>Ingredient</h3>

      <Select className='select'
        styles={{
          control: styles => ({ ...styles, width: "100%", margin: 20 }),
        }}
        options={Object.values(data.ingredients).map(ingredient => ({ value: ingredient.id, label: ingredient.data.name }))}
        value={{ value: data.product.data.ingredient, label: data.ingredients[data.product.data.ingredient!].data.name }}
        onChange={ingredient => {
          if(!ingredient?.value) return
          productsSetIngredient({ id: data.product.id, ingredient: ingredient.value })
          setData({
            ...data,
            product: {
              ...data.product,
              data: { ...data.product.data, ingredient: ingredient.value }
            }
          })
        }}
      />

      {(!!data.product.data.ingredient && <>
        <h3>Inventory</h3>

        <Counter
          value={data.product.data.inventory}
          onValueChange={quantity => inventorySet({ product: data.product.id, quantity })}
        />
      </>)}

      <h3>Data</h3>

      {data.product.data.quantity && <p>
        Quantity: {data.product.data.quantity.amount} {data.product.data.quantity.unit}
      </p>}
      {data.product.data.nutriscore && <p>
        Nutriscore: {data.product.data.nutriscore}
      </p>}
      {data.product.data.ecoscore && <p>
        Ecoscore: {data.product.data.ecoscore}
      </p>}
      {data.product.data.conservation && <p>
        Conservation: {data.product.data.conservation}
      </p>}
      {(data.product.data.stores && data.product.data.stores.length !== 0) && <p>
        Stores: {data.product.data.stores.join(", ")}
      </p>}
    </div>) || (
      <div style={{ marginTop: 20 }}>
        <Scanner
          onScan={barcode => productsScan({ barcode }).then(setData)}
        />
      </div>
    )}
  </>
}
