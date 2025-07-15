
export enum Route {
  Home,
  Chores,
  Menus,
  Inventory,
  Shopping,
  Recipes,
  Recipe,
  Scan,
}

export function routeToPath(route: Route, id?: string) {
  switch(route) {
    case Route.Home: return "/"
    case Route.Chores: return "/chores"
    case Route.Menus: return "/menus"
    case Route.Inventory: return "/inventory"
    case Route.Shopping: return "/shopping"
    case Route.Recipes: return "/recipes"
    case Route.Recipe: return `/recipes/${id}`
    case Route.Scan: return "/scan"
  }
}


export function pathToRoute(path: string): { route: Route, id?: string } | null {
  switch(path) {
    case "/": return { route: Route.Home }
    case "/chores": return { route: Route.Chores }
    case "/menus": return { route: Route.Menus }
    case "/inventory": return { route: Route.Inventory }
    case "/shopping": return { route: Route.Shopping }
    case "/recipes": return { route: Route.Recipes }
    case "/scan": return { route: Route.Scan }
    default:
      if(path.startsWith("/recipes/")) {
        return { route: Route.Recipe, id: path.slice(9) }
      }
      return null
  }
}
