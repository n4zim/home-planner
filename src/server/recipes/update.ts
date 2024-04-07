import DB, { Collection } from "../db"

export async function recipesUpdate(params: {
  id: string
  name?: string
  ingredients?: string[]
  products?: string[]
}) {
  if(!params.name && !params.ingredients && !params.products) return
  const recipe = {} as Recipe["data"]
  if(params.name) recipe.name = params.name
  if(params.ingredients) recipe.ingredients = params.ingredients
  DB<Recipe>(Collection.Recipes).update(params.id, recipe)
}
