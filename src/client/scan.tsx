import React from 'react'
import { Scanner } from './scanner'
import { Counter } from './counter'
import { Context } from './context'
import { productsRetrieve } from '../server/products/retrieve'
import { inventorySet } from '../server/inventory/set'

export function Scan() {
  const global = React.useContext(Context)
  const [product, setProduct] = React.useState<Product | undefined>()
  return <>
    <h2>🔎 Scan 🔎</h2>

    <div style={{ flexDirection: 'row' }}>
      <button
        onClick={() => global.goBack()}
      >
        Back
      </button>

      {product && <button
        onClick={() => setProduct(undefined)}
        style={{ marginLeft: 10 }}
      >
        Scan another product
      </button>}
    </div>

    {(product && <div style={{
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 20,
    }}>
      <h2>{product.data.name}</h2>

      {product.data.image && <img src={product.data.image} alt={product.data.name}/>}

      <h3>Inventory</h3>

      <Counter
        value={product.data.inventory}
        onValueChange={quantity => inventorySet({ product: product.id, quantity })}
      />

      <h3>Data</h3>

      {product.data.quantity && <p>Quantity: {product.data.quantity.amount} {product.data.quantity.unit}</p>}
      {product.data.nutriscore && <p>Nutriscore: {product.data.nutriscore}</p>}
      {product.data.ecoscore && <p>Ecoscore: {product.data.ecoscore}</p>}
      {product.data.conservation && <p>Conservation: {product.data.conservation}</p>}
      {(product.data.stores && product.data.stores.length !== 0) && <p>Stores: {product.data.stores.join(", ")}</p>}
    </div>) || (
      <div style={{ marginTop: 20 }}>
        <Scanner
          onScan={barcode => productsRetrieve({ barcode }).then(setProduct)}
        />
      </div>
    )}
  </>
}
