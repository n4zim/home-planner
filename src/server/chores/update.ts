import DB, { Collection } from "../db"

export async function choresUpdate(params: { id: string; title?: string; description?: string }) {
  const updates: Partial<Chore["data"]> = {}
  
  if (params.title !== undefined) {
    updates.title = params.title
  }
  
  if (params.description !== undefined) {
    updates.description = params.description
  }
  
  DB<Chore>(Collection.Chores).update(params.id, updates)
}