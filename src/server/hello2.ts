import DB from "./db"
import { _TableNameProducts } from "./collections/products"

export async function hello(params: { name: string }) {
  console.log(DB(`SELECT * FROM ${_TableNameProducts}`))
  return {
    test: `Hello, ${params.name}!`,
  }
}
