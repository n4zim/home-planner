import React from "react"
import { Section } from "./sections"

export const Context = React.createContext<{
  current: { section: Section; id?: string }
  goTo: (section: Section, id?: string) => void
  goBack: (fallback?: Section) => void
}>({
  current: { section: Section.Home },
  goTo: () => {},
  goBack: () => {},
})
