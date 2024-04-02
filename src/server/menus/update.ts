import DB, { Collection } from "../db"

export async function menusUpdate(params: {
  id: string
  order?: number
  recipes?: string[]
}) {
  if(typeof params.order !== "number" && !params.recipes) return
  let menu: any = {}
  if(typeof params.order === "number") menu.order = params.order
  if(params.recipes) menu.recipes = params.recipes
  DB(Collection.Menus).update(params.id, menu)
}
