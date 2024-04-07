import DB, { Collection } from "../db"

export async function recipesAdd(params: { name: string }): Promise<string> {
  return DB<Recipe>(Collection.Recipes).create({
    name: params.name,
    ingredients: [],
  })
}
