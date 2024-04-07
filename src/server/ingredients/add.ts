import DB, { Collection } from "../db"

export async function ingredientsAdd(params: { name: string }): Promise<string> {
  return DB<Ingredient>(Collection.Ingredients).create({
    name: params.name,
    inventory: 0,
  })
}
