import Database from 'better-sqlite3'
import { v4 as uuidv4 } from "uuid"

export enum Collection {
  Products = "products",
  Inventory = "inventory",
  Ingredients = "ingredients",
  Recipes = "recipes",
  Menus = "menus",
}

let db: any

export default function DB<I extends Item<any>>(collection: Collection) {
  if(!db) {
    db = new Database('./data.db')
    db.pragma('journal_mode = WAL')

    const tables = db
      .prepare(`SELECT name FROM sqlite_master WHERE type='table'`)
      .all()
      .map((table: { name: string }) => table.name)

    if(!tables.includes(Collection.Products)) {
      db.prepare(createTableQuery(Collection.Products)).run()
    }
    if(!tables.includes(Collection.Inventory)) {
      db.prepare(createTableQuery(Collection.Inventory)).run()
    }
    if(!tables.includes(Collection.Ingredients)) {
      db.prepare(createTableQuery(Collection.Ingredients)).run()
    }
    if(!tables.includes(Collection.Recipes)) {
      db.prepare(createTableQuery(Collection.Recipes)).run()
    }
    if(!tables.includes(Collection.Menus)) {
      db.prepare(createTableQuery(Collection.Menus)).run()
    }
  }

  return {
    create: (data: I["data"]) => {
      if(typeof data === "object") data = JSON.stringify(data) as any
      const id = uuidv4()
      db.prepare(`INSERT INTO ${collection} (data, id) VALUES (?, ?)`).run(data, id)
      return id
    },

    retrieveAll: (sort?: DBSort, limit?: number, page?: number): I[] => {
      const params = Params()
      const query = `SELECT * FROM ${collection}${appendQuery(params, sort, limit, page)}`
      //console.log("[QUERY]", query, params.get())
      return db.prepare(query).all(params.get()).map(convertToItem)
    },

    retrieveOne: (id: string) => {
      const result = db.prepare(`SELECT * FROM ${collection} WHERE id = ?`).get(id)
      if(typeof result !== "undefined") return convertToItem(result) as I
    },

    update: (id: string, data: I["data"]) => {
      db.prepare(`UPDATE ${collection} SET data = json_patch(data, ?) WHERE id = ?`).run(JSON.stringify(data), id)
    },

    replace: (id: string, data: I["data"]) => {
      db.prepare(`UPDATE ${collection} SET data = ? WHERE id = ?`).run(JSON.stringify(data), id)
    },

    delete: (id: string) => {
      db.prepare(`DELETE FROM ${collection} WHERE id = ?`).run(id)
    },

    find: (
      where: (addParam: (value: any) => string) => string,
      sort?: DBSort,
      limit?: number,
      page?: number,
    ): I[] => {
      const params = Params()
      const query = `SELECT * FROM ${collection} WHERE ${where(params.add)}${appendQuery(params, sort, limit, page)}`
      //console.log("[QUERY]", query, params.get())
      return db.prepare(query).all(params.get()).map(convertToItem)
    },

    count: (
      where?: (addParam: (value: any) => string) => string,
    ): number => {
      const params = Params()
      let query = `SELECT count(*) as count FROM ${collection}`
      if(typeof where !== "undefined") {
        query += ` WHERE ${where(params.add)}`
        //console.log("[QUERY]", query, params.get())
      }
      return db.prepare(query).get(params.get()).count
    }
  }
}

function createTableQuery(collection: string) {
  return `CREATE TABLE ${collection} (
    id UUID PRIMARY KEY,
    data JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`
}

function convertToItem(item: any) {
  item.data = JSON.parse(item.data)
  item.created_at = new Date(item.created_at)
  item.updated_at = new Date(item.updated_at)
  return item
}

type ParamsType = {
  add: (value: any) => string
  get: () => { [key: number]: any }
}

function Params(): ParamsType {
  let counter = 1
  const data: { [key: number]: any } = {}
  return {
    add: value => {
      const index = counter++
      data[index] = value
      return `:${index}`
    },
    get: () => data,
  }
}

function appendQuery(
  params: ParamsType,
  sort?: DBSort,
  limit?: number,
  page?: number,
): string {
  let output = ""
  if(typeof sort !== "undefined") {
    output += ` ORDER BY ${Object.keys(sort).map(key => {
      if(key.startsWith("$")) return `${key.slice(1)} ${sort[key]}`
      return `${params.add(key)} ${sort[key]}`
    }).join(", ")}`
  }
  if(typeof limit !== "undefined") {
    output += ` LIMIT ${params.add(limit)}`
  }
  if(typeof page !== "undefined") {
    output += ` OFFSET ${params.add(page)}`
  }
  return output
}
