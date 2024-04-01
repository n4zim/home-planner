import React from 'react'
import { Section } from './sections'

export function Home(props: {
  goToSection: (section: Section) => void
}) {
  return <>
    <button
      onClick={() => props.goToSection(Section.Inventory)}
      style={{ marginBottom: 10 }}
    >
      Inventory
    </button>

    <button
      onClick={() => props.goToSection(Section.Shopping)}
      style={{ marginBottom: 10 }}
    >
      Shopping list
    </button>

    <button
      onClick={() => props.goToSection(Section.Recipes)}
      style={{ marginBottom: 10 }}
    >
      Recipes
    </button>

    <button
      onClick={() => props.goToSection(Section.Scan)}
    >
      Scan products
    </button>
  </>
}
