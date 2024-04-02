import DB, { Collection } from "../db"

export async function menusUpdate(params: {
  id: string
  name?: string
  order?: number
}) {
  if(!params.name && typeof params.order === "undefined") return
  let menu: any = {}
  if(params.name) menu.name = params.name
  if(typeof params.order !== "undefined") menu.order = params.order
  DB(Collection.Menus).update(params.id, menu)
}
