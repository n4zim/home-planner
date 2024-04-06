
declare type MenusAllData = {
  menus: Menu[]
  recipes: { [key: string]: string }
}

declare type InventoryAllData = ({
  name: string
} & ({
  ingredient: string
  quantity: number
} | {
  products: {
    name: string
    image?: string
    quantity: number
  }[]
}))[]
