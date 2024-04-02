import DB, { Collection } from "../db"

export async function menusAdd(params: { name: string }): Promise<{
  id: string
  order: number
}> {
  const menus = DB(Collection.Menus)
  const order = menus.count()
  const id = menus.create({ name: params.name, recipes: [], order })
  return { id, order }
}
