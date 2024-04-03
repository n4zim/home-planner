import React from 'react'
import Select from 'react-select'
import { menusAdd } from '../server/menus/add'
import { menusAll } from '../server/menus/all'
import { menusUpdate } from '../server/menus/update'
import { Context } from './context'
import { Section } from './sections'

export function Menus() {
  const global = React.useContext(Context)
  const [data, setData] = React.useState<MenusAllData>({
    menus: [],
    recipes: {},
  })
  React.useEffect(() => {
    menusAll().then(setData)
  }, [])
  return <>
    <h2>🍽️ Menus 🍽️</h2>

    <div style={{ flexDirection: "row" }}>
      <button
        onClick={() => global.goBack()}
      >
        Back
      </button>
      <button
        style={{ marginLeft: 10 }}
        onClick={async () => {
          const { id, order } = await menusAdd()
          setData({
            ...data,
            menus: [
              ...data.menus,
              { id, data: { order, recipes: [] } },
            ].sort((a, b) => b.data.order - a.data.order),
          })
        }}
      >
        New Menu
      </button>
    </div>

    <div style={{ width: "100%", alignItems: "stretch" }}>
      {data.menus.map((menu, index) => <div
        key={menu.id + menu.data.order}
        style={{ border: "1px solid black", flexGrow: 1, margin: 10 }}
      >
        <div style={{ flexDirection: "row" }}>
          {index > 0 && <span
            style={{ marginLeft: 10, cursor: "pointer" }}
            onClick={() => {
              const previousOrder = data.menus.length - 1 - index, order = previousOrder + 1
              menusUpdate({ id: menu.id, order })
              const previous = data.menus[index - 1].id
              menusUpdate({ id: previous, order: previousOrder })
              setData({
                ...data,
                menus: data.menus.map(item => {
                  const output = { ...item }
                  if(item.id === menu.id) {
                    output.data.order = order
                  } else if(item.id === previous) {
                    output.data.order = previousOrder
                  }
                  return output
                }).sort((a, b) => b.data.order - a.data.order),
              })
            }}
          >
            ⬆️
          </span>}

          {index < data.menus.length - 1 && <span
            style={{ marginLeft: 10, cursor: "pointer" }}
            onClick={() => {
              const nextOrder = data.menus.length - 1 - index, order = nextOrder - 1
              menusUpdate({ id: menu.id, order })
              const next = data.menus[index + 1].id
              menusUpdate({ id: next, order: nextOrder })
              setData({
                ...data,
                menus: data.menus.map(item => {
                  const output = { ...item }
                  if(item.id === menu.id) {
                    output.data.order = order
                  } else if(item.id === next) {
                    output.data.order = nextOrder
                  }
                  return output
                }).sort((a, b) => b.data.order - a.data.order),
              })
            }}
          >
            ⬇️
          </span>}
        </div>

        <Select isMulti className='select'
          styles={{
            control: styles => ({ ...styles, width: "100%", margin: 20 }),
          }}
          value={menu.data.recipes.map(recipe => ({ value: recipe, label: data.recipes[recipe] }))}
          options={Object.keys(data.recipes).map(recipe => ({ value: recipe, label: data.recipes[recipe] }))}
          onChange={async selected => {
            const recipes = selected.map(option => option.value)
            menusUpdate({ id: menu.id, recipes })
            setData({
              ...data,
              menus: data.menus.map(item => item.id === menu.id ? {
                ...item,
                data: { ...item.data, recipes },
              } : item),
            })
          }}
        />

        {menu.data.recipes.length !== 0 && <p>
          Links: {menu.data.recipes.map((recipe, index) => <span
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => global.goTo(Section.Recipe, recipe)}
          >
            {data.recipes[recipe]}
            {index < menu.data.recipes.length - 1 && ", "}
          </span>)}
        </p>}
      </div>)}
    </div>
  </>
}
