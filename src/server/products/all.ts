import DB, { Collection } from "../db"

export async function productsSet(params: {
  name: string
  barcode: string
  image: string
  quantity: number
}): Promise<InventoryAllData> {
  const ingredients = DB<Ingredient>(Collection.Ingredients).retrieveAll({
    "$json_extract(data, '$.name')": "ASC",
  })
  const products = DB<Product>(Collection.Products).retrieveAll({
    "$json_extract(data, '$.name')": "ASC",
  })
  return []
}
