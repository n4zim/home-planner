import DB, { Collection } from "../db"

export async function productsRetrieve(params: { barcode: string }): Promise<Product | undefined> {
  const products = DB<Product>(Collection.Products)

  const existing = products.find(addParam => `json_extract(data, '$.barcode') = ${addParam(params.barcode)}`)
  if(existing.length > 0) return existing[0]

  const response = await fetch('https://world.openfoodfacts.org/api/v0/product/' + params.barcode + '.json')
  const json = await response.json()

  if(json?.product) {
    const data: Product["data"] = {
      barcode: params.barcode,
      name: json.product.product_name_fr
        || json.product.product_name
        || json.product.product_name_en,
      image: json.product.image_url,
      stores: json.product.stores_tags,
      quantity: transformQuantity(json.product.quantity),
      conservation: json.product.conservation_conditions,
      nutriscore: filterScoreData(json.product.nutriscore_grade),
      ecoscore: filterScoreData(json.product.ecoscore_grade),
      inventory: 0,
    }
    return { id: products.create(data), data }
  }

  console.error(json)
}

function filterScoreData(input: string): string | undefined {
  if(input === "not-applicable" || input === "unknown") {
    return
  }
  return input.toUpperCase()
}

function transformQuantity(input: string): Product["data"]["quantity"] {
  const match = input.match(/(\d+)(g|l|kg|ml|cl|dl|gallon|pint|quart|cup|teaspoon|tablespoon|piece)/)
  if(match) {
    return { amount: parseFloat(match[1]), unit: match[2] as Product["data"]["quantity"]["unit"] }
  }
  return { amount: 0, unit: "piece" }
}
