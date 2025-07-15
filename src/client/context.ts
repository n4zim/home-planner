import React from "react"
import { Route } from "./routes"

export const Context = React.createContext<{
  current: { route: Route; id?: string }
  goTo: (route: Route, id?: string) => void
  goBack: (fallback?: Route) => void
}>({
  current: { route: Route.Home },
  goTo: () => {},
  goBack: () => {},
})
