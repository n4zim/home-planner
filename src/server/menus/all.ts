import DB, { Collection } from "../db"

export async function menusAll() {
  return DB(Collection.Menus).retrieveAll({
    "$json_extract(data, '$.order')": "DESC",
  })
}
