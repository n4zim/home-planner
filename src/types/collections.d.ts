
declare interface Product {
  barcode: string
  quantity: { amount: number, unit: "g" | "l" | "piece" }
  ingredient?: string
}

declare interface Inventory {
  product: string
  quantity: number
}

declare interface Ingredient {
  name: string
}

declare interface Recipe {
  name: string
  ingredients: string[]
}

declare interface Menu {
  name: string
  recipes: string[]
}
