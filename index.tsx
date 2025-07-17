import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'

;(window as any).CallFunction = async function(name: string, params: any) {
  const response = await fetch("/_api_/" + name, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
  return await response.json()
}



let root = document.getElementById("root")
if(!root) {
  root = document.createElement("div")
  root.id = "root"
  document.body.appendChild(root)
}

ReactDOM.createRoot(root).render(<App/>)
