import React from 'react'
import ReactDOM from 'react-dom/client'

function Hello() {
  return <h1
    onClick={async () => {
      const { test } = await CallFunction<"hello">({ name: "Nazim" })
      alert("Server says: " + test)
    }}
  >
    Hello World!
  </h1>
}

const root = document.getElementById("root")
if(root) ReactDOM.createRoot(root).render(<Hello/>)
