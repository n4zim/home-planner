
interface Item<Data> {
  id: string
  data: Data
  created_at?: Date
  updated_at?: Date
}

declare type Product = Item<{
  barcode: string
  quantity: { amount: number, unit: "g" | "l" | "piece" }
  ingredient?: string
}>

declare type Inventory = Item<{
  product: string
  quantity: number
}>

declare type Ingredient = Item<{
  name: string
}>

declare type Recipe = Item<{
  name: string
  ingredients: string[]
  products: string[]
}>

declare type Menu = Item<{
  recipes: string[]
  order: number
}>
