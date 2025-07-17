import DB, { Collection } from "../db"

export async function choresGet(params: { id: string }) {
  return DB<Chore>(Collection.Chores).retrieveOne(params.id)
}