import React from 'react'
import { Section, pathToSection, sectionToPath } from './sections'
import { Home } from './home'
import { Menus } from './menus'
import { Inventory } from './inventory'
import { Shopping } from './shopping'
import { Recipes } from './recipes'
import { Scan } from './scan'
import { Context } from './context'
import { RecipeContent } from './recipe'

export function App() {
  const [current, setCurrent] = React.useState(() => {
    let initial = pathToSection(document.location.pathname)
    if(initial === null) {
      initial = { section: Section.Home }
      history.replaceState({}, "", "/")
    }
    return initial
  })

  React.useEffect(() => {
    window.onpopstate = () => {
      const section = pathToSection(document.location.pathname)
      if(section !== null) setCurrent(section)
    }
  }, [])

  return <Context.Provider
    value={{
      current,
      goTo: (section, id) => {
        setCurrent({ section, id })
        history.pushState({}, "", sectionToPath(section, id))
      },
      goBack: fallback => {
        if(history.state) {
          history.back()
        } else if(fallback) {
          setCurrent({ section: fallback })
          history.pushState({}, "", sectionToPath(fallback))
        } else {
          setCurrent({ section: Section.Home })
          history.pushState({}, "", "/")
        }
      },
    }}
  >
    <h1>🏠 Home Planner 📋</h1>
    {current.section === Section.Home && <Home/>}
    {current.section === Section.Menus && <Menus/>}
    {current.section === Section.Inventory && <Inventory/>}
    {current.section === Section.Shopping && <Shopping/>}
    {current.section === Section.Recipes && <Recipes/>}
    {current.section === Section.Recipe && <RecipeContent/>}
    {current.section === Section.Scan && <Scan/>}
  </Context.Provider>
}
