import React from 'react'
import { Section } from './sections'
import { menusAdd } from '../server/menus/add'
import { menusAll } from '../server/menus/all'
import { menusUpdate } from '../server/menus/update'

export function Menus(props: {
  goToSection: (section: Section) => void
}) {
  const [data, setData] = React.useState<Menu[]>([])
  React.useEffect(() => {
    menusAll().then(setData)
  }, [])
  return <>
    <div style={{ flexDirection: "row" }}>
      <button
        onClick={() => props.goToSection(Section.Home)}
      >
        Back
      </button>
      <button
        style={{ marginLeft: 10 }}
        onClick={async () => {
          const name = prompt("Menu name")
          if(name) {
            const { id, order } = await menusAdd({ name })
            setData([
              { id, data: { name, recipes: [], order } },
              ...data,
            ])
          }
        }}
      >
        New Menu
      </button>
    </div>

    <div style={{ width: "100%", alignItems: "stretch" }}>
      {data.map((menu, index) => <div
        key={menu.id + menu.data.order}
        style={{ border: "1px solid black", flexGrow: 1, margin: 10 }}
      >
        <div style={{ flexDirection: "row" }}>
          <span
            style={{ marginRight: 5, cursor: "pointer" }}
            onClick={() => {
              const name = prompt("New menu name", menu.data.name)
              if(name) {
                menusUpdate({ id: menu.id, name })
                setData(data.map(item => item.id === menu.id ? {
                  ...item,
                  data: { ...item.data, name },
                } : item))
              }
            }}
          >
            ✏️
          </span>

          {menu.data.name}

          {index > 0 && <span
            style={{ marginLeft: 10, cursor: "pointer" }}
            onClick={() => {
              const previousOrder = data.length - 1 - index, order = previousOrder + 1
              menusUpdate({ id: menu.id, order })
              const previous = data[index - 1].id
              menusUpdate({ id: previous, order: previousOrder })
              setData(data.map(item => {
                const output = { ...item }
                if(item.id === menu.id) {
                  output.data.order = order
                } else if(item.id === previous) {
                  output.data.order = previousOrder
                }
                return output
              }).sort((a, b) => b.data.order - a.data.order))
            }}
          >
            ⬆️
          </span>}

          {index < data.length - 1 && <span
            style={{ marginLeft: 10, cursor: "pointer" }}
            onClick={() => {
              const nextOrder = data.length - 1 - index, order = nextOrder - 1
              menusUpdate({ id: menu.id, order })
              const next = data[index + 1].id
              menusUpdate({ id: next, order: nextOrder })
              setData(data.map(item => {
                const output = { ...item }
                if(item.id === menu.id) {
                  output.data.order = order
                } else if(item.id === next) {
                  output.data.order = nextOrder
                }
                return output
              }).sort((a, b) => b.data.order - a.data.order))
            }}
          >
            ⬇️
          </span>}
        </div>
      </div>)}
    </div>
  </>
}
