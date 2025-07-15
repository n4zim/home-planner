import React from 'react'
import { Context } from '../context'

export function Chores() {
  const global = React.useContext(Context)
  return <>
    <h2>🧹 Chores 🧹</h2>

    <button
      onClick={() => global.goBack()}
    >
      Back
    </button>
  </>
}
