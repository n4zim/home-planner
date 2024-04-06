import DB, { Collection } from "../db"

export async function inventorySet(params: {
  quantity: number
} & ({
  product: string
} | {
  ingredient: string
})) {
  const inventory = DB<Inventory>(Collection.Inventory)
  if("product" in params) {
    const products = DB<Product>(Collection.Products)
    const existing = products.retrieveOne(params.product)
    if(!existing) return
    inventory.create({
      product: params.product,
      quantity: existing.data.inventory,
      end: Date.now(),
    })
    DB<Product>(Collection.Products).update(params.product, {
      inventory: params.quantity,
    })
  } else if("ingredient" in params) {
    const ingredients = DB<Ingredient>(Collection.Ingredients)
    const existing = ingredients.retrieveOne(params.ingredient)
    if(!existing) return
    inventory.create({
      ingredient: params.ingredient,
      quantity: existing.data.inventory,
      end: Date.now(),
    })
    ingredients.update(params.ingredient, {
      inventory: params.quantity,
    })
  }
}
