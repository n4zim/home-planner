import React from 'react'
import { Section } from './sections'

export function Home(props: {
  goToSection: (section: Section) => void
}) {
  return <>
    <button
      onClick={() => props.goToSection(Section.Menu)}
      style={{ marginBottom: 25, fontSize: "2em", marginTop: 25 }}
    >
      🍽️ Menu
    </button>

    <button
      onClick={() => props.goToSection(Section.Inventory)}
      style={{ marginBottom: 25, fontSize: "2em" }}
    >
      📦 Inventory
    </button>

    <button
      onClick={() => props.goToSection(Section.Shopping)}
      style={{ marginBottom: 25, fontSize: "2em" }}
    >
      🛍️ Shopping
    </button>

    <button
      onClick={() => props.goToSection(Section.Recipes)}
      style={{ marginBottom: 25, fontSize: "2em" }}
    >
      🍲 Recipes
    </button>

    <button
      onClick={() => props.goToSection(Section.Scan)}
      style={{ fontSize: "2em" }}
    >
      🔎 Scan
    </button>
  </>
}
