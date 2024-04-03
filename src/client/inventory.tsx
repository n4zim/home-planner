import React from 'react'
import { Context } from './context'

export function Inventory() {
  const global = React.useContext(Context)
  return <>
    <h2>📦 Inventory 📦</h2>

    <button
      onClick={() => global.goBack()}
    >
      Back
    </button>
  </>
}
