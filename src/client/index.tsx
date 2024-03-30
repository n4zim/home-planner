import React from 'react'
import ReactDOM from 'react-dom/client'
import { Hello } from './hello'

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


const root = document.getElementById("root")
if(root) ReactDOM.createRoot(root).render(<Hello/>)
