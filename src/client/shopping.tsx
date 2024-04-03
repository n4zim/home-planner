import React from 'react'
import { Context } from './context'

export function Shopping() {
  const global = React.useContext(Context)
  return <>
    <h2>🛍️ Shopping 🛍️</h2>

    <button
      onClick={() => global.goBack()}
    >
      Back
    </button>

    <h2></h2>
  </>
}
