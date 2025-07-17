import DB, { Collection } from "../db"

export async function choresMarkDone(params: { id: string; done: boolean }) {
  DB<Chore>(Collection.Chores).update(params.id, {
    done: params.done
  })
}