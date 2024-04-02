import DB, { Collection } from "../db"

export async function menusAll(): Promise<MenusAllData> {
  return {
    menus: DB(Collection.Menus).retrieveAll({
      "$json_extract(data, '$.order')": "DESC",
    }),
    recipes: DB(Collection.Recipes).retrieveAll({
      "$json_extract(data, '$.name')": "ASC",
    }).reduce((acc: any, recipe: any) => {
      acc[recipe.id] = recipe.data.name
      return acc
    }, {}),
  }
}
