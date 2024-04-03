import DB, { Collection } from "../db"

export async function recipesAll() {
  return DB<Recipe>(Collection.Recipes).retrieveAll({
    "$json_extract(data, '$.name')": "ASC",
  })
}
