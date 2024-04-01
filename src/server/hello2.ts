import DB, { Collection } from "./db"

export async function hello(params: { name: string }) {
  console.log(DB(Collection.Products).create({ name: "test" }))
  console.log(DB(Collection.Products).retrieveAll())
  return {
    test: `Hello, ${params.name}!`,
  }
}
