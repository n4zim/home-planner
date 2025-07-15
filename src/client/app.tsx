import React from 'react'
import { Route, pathToRoute, routeToPath } from './routes'
import { Home } from './pages/home'
import { Menus } from './pages/menus'
import { Inventory } from './pages/inventory'
import { Shopping } from './pages/shopping'
import { Recipes } from './pages/recipes'
import { Scan } from './pages/scan'
import { Context } from './context'
import { RecipeContent } from './pages/recipe'
import { Chores } from './pages/chores'

export function App() {
  const [current, setCurrent] = React.useState(() => {
    let initial = pathToRoute(document.location.pathname)
    if(initial === null) {
      initial = { route: Route.Home }
      history.replaceState({}, "", "/")
    }
    return initial
  })

  React.useEffect(() => {
    window.onpopstate = () => {
      const route = pathToRoute(document.location.pathname)
      if(route !== null) setCurrent(route)
    }
  }, [])

  return <Context.Provider
    value={{
      current,
      goTo: (section, id) => {
        setCurrent({ route: section, id })
        history.pushState({}, "", routeToPath(section, id))
      },
      goBack: fallback => {
        if(history.state) {
          history.back()
        } else if(fallback) {
          setCurrent({ route: fallback })
          history.pushState({}, "", routeToPath(fallback))
        } else {
          setCurrent({ route: Route.Home })
          history.pushState({}, "", "/")
        }
      },
    }}
  >
    <h1>🏠 Home Planner 📋</h1>
    {current.route === Route.Home && <Home/>}
    {current.route === Route.Chores && <Chores/>}
    {current.route === Route.Menus && <Menus/>}
    {current.route === Route.Inventory && <Inventory/>}
    {current.route === Route.Shopping && <Shopping/>}
    {current.route === Route.Recipes && <Recipes/>}
    {current.route === Route.Recipe && <RecipeContent/>}
    {current.route === Route.Scan && <Scan/>}
  </Context.Provider>
}
