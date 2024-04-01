import React from 'react'

export function InventoryCount(props: {
  barcode: string
  value?: number
}) {
  const [initialValue, setInitialValue] = React.useState<number>(props.value || 0)
  const [value, setValue] = React.useState<number>(initialValue)
  return <>
    <div style={{
      flexDirection: 'row',
    }}>
      <button
        onClick={() => {
          if(value > 0) setValue(value - 1)
        }}
        style={{ padding: '10px 40px' }}
      >
        -
      </button>
      <span style={{ fontSize: "2em", margin: "0 10px" }}>
        {value}
      </span>
      <button
        onClick={() => setValue(value + 1)}
        style={{ padding: '10px 40px' }}
      >
        +
      </button>
    </div>

    {value !== initialValue && <button
      onClick={() => {
        setInitialValue(value)
        alert(`Inventory count for ${props.barcode} updated to ${value}`)
      }}
      style={{ marginTop: 10 }}
    >
      Update
    </button>}
  </>
}