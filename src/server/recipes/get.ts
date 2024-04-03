import DB, { Collection } from "../db"

export async function recipesGet(props: { id: string }) {
  return DB<Recipe>(Collection.Recipes).retrieveOne(props.id)
}
