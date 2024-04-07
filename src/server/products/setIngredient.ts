import DB, { Collection } from "../db"

export async function productsSetIngredient(params: {
  id: string
  ingredient: string
}) {
  DB<Product>(Collection.Products).update(params.id, {
    ingredient: params.ingredient,
  })
}
