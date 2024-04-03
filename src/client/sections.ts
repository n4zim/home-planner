
export enum Section {
  Home,
  Menus,
  Inventory,
  Shopping,
  Recipes,
  Recipe,
  Scan,
}

export function sectionToPath(section: Section, id?: string) {
  switch(section) {
    case Section.Home: return "/"
    case Section.Menus: return "/menus"
    case Section.Inventory: return "/inventory"
    case Section.Shopping: return "/shopping"
    case Section.Recipes: return "/recipes"
    case Section.Recipe: return `/recipes/${id}`
    case Section.Scan: return "/scan"
  }
}


export function pathToSection(path: string): { section: Section, id?: string } | null {
  switch(path) {
    case "/": return { section: Section.Home }
    case "/menus": return { section: Section.Menus }
    case "/inventory": return { section: Section.Inventory }
    case "/shopping": return { section: Section.Shopping }
    case "/recipes": return { section: Section.Recipes }
    case "/scan": return { section: Section.Scan }
    default:
      if(path.startsWith("/recipes/")) {
        return { section: Section.Recipe, id: path.slice(9) }
      }
      return null
  }
}
