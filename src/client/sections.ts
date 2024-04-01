
export enum Section {
  Home,
  Scan,
}

export function sectionToPath(section: Section) {
  switch(section) {
    case Section.Home: return "/"
    case Section.Scan: return "/scan"
  }
}


export function pathToSection(path: string): Section | null {
  switch(path) {
    case "/": return Section.Home
    case "/scan": return Section.Scan
    default: return null
  }
}
