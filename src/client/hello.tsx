import React from 'react'
import { hello } from '../server/hello2'

export function Hello() {
  return <h1
    onClick={async () => {
      //const { test } = await CallFunction<"hello">({ name: "Nazim" })
      const { test } = await hello({ name: "Nazim" })
      alert("Server says: " + test)
    }}
  >
    Hello World!
  </h1>
}
