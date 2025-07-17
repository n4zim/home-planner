import DB, { Collection } from "../db"

export async function choresAll(params?: { showArchived?: boolean }) {
  const db = DB<Chore>(Collection.Chores)
  
  if (params?.showArchived === false) {
    // Only show non-completed chores
    return db.find(
      (addParam) => `json_extract(data, '$.done') = ${addParam(0)}`,
      {
        "$json_extract(data, '$.title')": "ASC",
      }
    )
  } else if (params?.showArchived === true) {
    // Only show completed chores
    return db.find(
      (addParam) => `json_extract(data, '$.done') = ${addParam(1)}`,
      {
        "$json_extract(data, '$.title')": "ASC",
      }
    )
  }
  
  // Show all chores by default
  return db.retrieveAll({
    "$json_extract(data, '$.title')": "ASC",
  })
}