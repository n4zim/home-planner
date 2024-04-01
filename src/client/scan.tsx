import React from 'react'
import { Section } from './sections'

export function Scan(props: {
  goToSection: (section: Section) => void
}) {
  return <>
    <button onClick={() => props.goToSection(Section.Home)}>
      Back
    </button>
    <div style={{ flex: 1 }}>
      <h2>Scan products</h2>
    </div>
  </>
}
