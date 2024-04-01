import React from 'react'
import { Section, pathToSection, sectionToPath } from './sections'
import { Home } from './home'
import { Menu } from './menu'
import { Inventory } from './inventory'
import { Shopping } from './shopping'
import { Recipes } from './recipes'
import { Scan } from './scan'

export function App() {
  let current = pathToSection(document.location.pathname)
  if(current === null) {
    current = Section.Home
    history.replaceState({}, "", "/")
  }

  const [section, setSection] = React.useState(current)

  function goToSection(section: Section) {
    setSection(section)
    history.replaceState({}, "", sectionToPath(section))
  }

  return <>
    <h1>🏠 Home Planner 📋</h1>
    {section === Section.Home && <Home goToSection={goToSection}/>}
    {section === Section.Menu && <Menu goToSection={goToSection}/>}
    {section === Section.Inventory && <Inventory goToSection={goToSection}/>}
    {section === Section.Shopping && <Shopping goToSection={goToSection}/>}
    {section === Section.Recipes && <Recipes goToSection={goToSection}/>}
    {section === Section.Scan && <Scan goToSection={goToSection}/>}
  </>
}
