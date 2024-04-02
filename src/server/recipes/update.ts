import DB, { Collection } from "../db"

export async function recipesUpdate(params: {
  id: string
  name?: string
  ingredients?: string[]
  products?: string[]
}) {
  if(!params.name && !params.ingredients && !params.products) return
  let recipe: any = {}
  if(params.name) recipe.name = params.name
  if(params.ingredients) recipe.ingredients = params.ingredients
  if(params.products) recipe.products = params.products
  DB(Collection.Recipes).update(params.id, recipe)
}
