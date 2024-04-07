
declare interface Item<Data> {
  id: string
  data: Data
  created_at?: Date
  updated_at?: Date
}

declare type Product = Item<{
  ingredient?: string
  name: string
  image?: string
  barcode: string
  quantity?: { amount: number, unit: "g" | "l" | "piece" }
  stores?: string[]
  conservation?: string
  nutriscore?: string
  ecoscore?: string
  inventory: number
}>

declare type Inventory = Item<{
  end: number
  quantity: number
} & ({
  ingredient: string
} | {
  product: string
})>

declare type Ingredient = Item<{
  name: string
  inventory: number
}>

declare type Recipe = Item<{
  name: string
  ingredients: string[]
}>

declare type Menu = Item<{
  recipes: string[]
  order: number
  archived?: number
}>
