import React from 'react'
import { Section, pathToSection, sectionToPath } from './sections'
import { Home } from './home'
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
    <h1>Home Planner</h1>
    {section === Section.Home && <Home goToSection={goToSection}/>}
    {section === Section.Scan && <Scan goToSection={goToSection}/>}
  </>
}
