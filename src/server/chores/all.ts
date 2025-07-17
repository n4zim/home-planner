import DB, { Collection } from "../db"

export async function choresAll(): Promise<ChoresAllData> {
  return DB<Chore>(Collection.Chores).retrieveAll({
    "$json_extract(data, '$.order')": "DESC",
  })
}
