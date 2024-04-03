import React from 'react'
import { Section } from './sections'
import { OpenFoodFactData, getOpenFoodFactData } from './data'
import { Scanner } from './scanner'
import { Counter } from './counter'
import { Context } from './context'

export function Scan() {
  const global = React.useContext(Context)
  const [data, setData] = React.useState<OpenFoodFactData | undefined>()
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
    </div>

    {(data && <div style={{
      paddingLeft: 20,
      paddingRight: 20,
    }}>
      <h2>{data.name}</h2>

      {data.image && <img src={data.image} alt={data.name}/>}

      <h3>Inventory</h3>

      <Counter
        onValueChange={quantity => {
          alert(`Quantity updated to ${quantity} for ${data.barcode}`)
        }}
      />

      <h3>Data</h3>

      {data.quantity && <p>Quantity: {data.quantity}</p>}
      {data.nutriscore && <p>Nutriscore: {data.nutriscore}</p>}
      {data.ecoscore && <p>Ecoscore: {data.ecoscore}</p>}
      {data.conservation && <p>Conservation: {data.conservation}</p>}
      {data.stores.length !== 0 && <p>Stores: {data.stores.join(", ")}</p>}
    </div>) || (
      <div style={{ marginTop: 20 }}>
        <Scanner
          onScan={barcode => getOpenFoodFactData(barcode).then(setData)}
        />
      </div>
    )}
  </>
}
