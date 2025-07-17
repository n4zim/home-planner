import DB, { Collection } from "../db"

export async function choresUpdate(params: {
  id: string
  order?: number
  text?: string
  assignment?: string
  completed?: Date | null
}) {
  const chore = {} as Chore["data"]
  if(typeof params.order === "number") chore.order = params.order
  if(params.text) chore.text = params.text
  if(params.assignment) chore.assignment = params.assignment
  if(typeof params.completed !== "undefined") {
    chore.completed = params.completed === null ? null : params.completed
  }
  DB<Chore>(Collection.Chores).update(params.id, chore)
}
