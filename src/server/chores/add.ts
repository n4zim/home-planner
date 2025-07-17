import DB, { Collection } from "../db"

export async function choresAdd(params: { text: string }): Promise<{
  id: string
  order: number
}> {
  const chores = DB<Chore>(Collection.Chores)
  const order = chores.count()
  const id = chores.create({ text: params.text, order })
  return { id, order }
}
