
export enum Section {
  Home,
  Menu,
  Inventory,
  Shopping,
  Recipes,
  Scan,
}

export function sectionToPath(section: Section) {
  switch(section) {
    case Section.Home: return "/"
    case Section.Menu: return "/menu"
    case Section.Inventory: return "/inventory"
    case Section.Shopping: return "/shopping"
    case Section.Recipes: return "/recipes"
    case Section.Scan: return "/scan"
  }
}


export function pathToSection(path: string): Section | null {
  switch(path) {
    case "/": return Section.Home
    case "/menu": return Section.Menu
    case "/inventory": return Section.Inventory
    case "/shopping": return Section.Shopping
    case "/recipes": return Section.Recipes
    case "/scan": return Section.Scan
    default: return null
  }
}
