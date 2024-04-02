import DB, { Collection } from "../db"

export async function recipesAll() {
  return DB(Collection.Recipes).retrieveAll({
    "$json_extract(data, '$.name')": "ASC",
  })
}
