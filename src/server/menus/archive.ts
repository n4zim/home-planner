import DB, { Collection } from "../db"

export async function menusArchive(params: { id: string }) {
  DB<Menu>(Collection.Menus).update(params.id, { archived: Date.now() })
}
