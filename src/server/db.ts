import Database from 'better-sqlite3'
import * as products from './collections/products'

let db: any

export default function DB(query: string, params?: { [key: string]: string }) {
  connect()
  const prepare = db.prepare(query)
  if(!params) return prepare.run()
  return prepare.run(params)
}

function connect() {
  if(!db) {
    db = new Database('./data.db')
    db.pragma('journal_mode = WAL')

    const tables = db
      .prepare(`SELECT name FROM sqlite_master WHERE type='table'`)
      .all()
      .map((table: { name: string }) => table.name)

    if(!tables.includes(products._TableNameProducts)) {
      db.prepare(products._TableCreateProducts).run()
    }
  }
}
