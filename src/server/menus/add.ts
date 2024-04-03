import DB, { Collection } from "../db"

export async function menusAdd(): Promise<{
  id: string
  order: number
}> {
  const menus = DB<Menu>(Collection.Menus)
  const order = menus.count()
  const id = menus.create({ recipes: [], order })
  return { id, order }
}
