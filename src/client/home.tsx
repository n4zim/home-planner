import React from 'react'
import { Section } from './sections'

export function Home(props: {
  goToSection: (section: Section) => void
}) {
  return <>
    <button onClick={() => props.goToSection(Section.Scan)}>
      Scan products
    </button>
  </>
}
