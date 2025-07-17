import DB, { Collection } from "../db"

export async function choresAdd(params: { title: string; description?: string }): Promise<string> {
  return DB<Chore>(Collection.Chores).create({
    title: params.title,
    description: params.description || "",
    done: false,
  })
}