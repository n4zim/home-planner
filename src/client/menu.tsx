import React from 'react'
import { Section } from './sections'

export function Menu(props: {
  goToSection: (section: Section) => void
}) {
  return <>
    <button
      onClick={() => props.goToSection(Section.Home)}
    >
      Back
    </button>
  </>
}
