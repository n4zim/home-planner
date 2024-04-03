import DB, { Collection } from "../db"

export async function menusAll(): Promise<MenusAllData> {
  return {
    menus: DB(Collection.Menus).retrieveAll({
      "$json_extract(data, '$.order')": "DESC",
    }),
    recipes: DB<Recipe>(Collection.Recipes).retrieveAll({
      "$json_extract(data, '$.name')": "ASC",
    }).reduce<{ [id: string]: string }>((acc, recipe) => {
      acc[recipe.id] = recipe.data.name
      return acc
    }, {}),
  }
}
