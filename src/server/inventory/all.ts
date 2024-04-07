import DB, { Collection } from "../db"

export async function inventoryAll(): Promise<InventoryAllData[]> {
  const ingredients = DB<Ingredient>(Collection.Ingredients).retrieveAll({
    "$json_extract(data, '$.name')": "ASC",
    "$json_extract(data, '$.quantity')": "DESC",
  })

  const ingredientIndex: { [id: string]: InventoryAllData } = {}

  for(const ingredient of ingredients) {
    ingredientIndex[ingredient.id] = {
      name: ingredient.data.name,
      quantity: ingredient.data.inventory,
      ingredient: ingredient.id,
    }
  }

  const products = DB<Product>(Collection.Products).find(
    () => "json_extract(data, '$.quantity') > 0",
    {
      "$json_extract(data, '$.name')": "ASC",
      "$json_extract(data, '$.quantity')": "DESC",
    },
  )

  for(const product of products) {
    if(!product.data.ingredient || !ingredientIndex[product.data.ingredient]) continue
    if(typeof ingredientIndex[product.data.ingredient].products === "undefined") {
      ingredientIndex[product.data.ingredient].products = []
      delete ingredientIndex[product.data.ingredient].quantity
    }
    ingredientIndex[product.data.ingredient].products!.push({
      name: product.data.name,
      image: product.data.image,
      quantity: product.data.inventory,
    })
  }

  return Object.values(ingredientIndex)
}
