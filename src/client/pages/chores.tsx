import React from 'react'
import { Context } from '../context'
import { choresAll } from '../../server/chores/all'
import { choresAdd } from '../../server/chores/add'
import { choresUpdate } from '../../server/chores/update'

export function Chores() {
  const global = React.useContext(Context)

  const [archived, setArchived] = React.useState(false)

  const [data, setData] = React.useState<ChoresAllData>([])
  React.useEffect(() => {
    choresAll().then(setData)
  }, [])

  console.log(data)

  return <>
    <h2>🧹 Chores 🧹</h2>

    <div style={{ flexDirection: "row" }}>
      <button onClick={() => global.goBack()}>
        Back
      </button>

      <button
        style={{ marginLeft: 10 }}
        onClick={() => setArchived(!archived)}
      >
        {archived ? "Hide Archived" : "Show Archived"}
      </button>

      <button
        style={{ marginLeft: 10 }}
        onClick={async () => {
          const text = prompt("Chore description", "")
          if(!text) return
          const { id, order } = await choresAdd({ text })
          setData([ { id, data: { text, order } }, ...data ])
        }}
      >
        New Chore
      </button>
    </div>

    <div style={{ width: "100%", alignItems: "stretch" }}>
      {data.map((chore, index) => (
        <div
          key={chore.id}
          style={{ border: "1px solid black", flexGrow: 1, margin: 10 }}
        >
          <div style={{ flexDirection: "row" }}>
            <span
              style={{ marginLeft: 5, cursor: "pointer" }}
              onClick={() => {
                const text = prompt("New chore description", chore.data.text)
                if(text) {
                  choresUpdate({ id: chore.id, text })
                  setData(data.map(item => {
                    const output = { ...item }
                    if(item.id === chore.id) output.data.text = text
                    return output
                  }))
                }
              }}
            >
              ✏️
            </span>

            {index > 0 && <span
              style={{ marginLeft: 10, cursor: "pointer" }}
              onClick={() => {
                const previousOrder = data.length - 1 - index, order = previousOrder + 1
                choresUpdate({ id: chore.id, order })
                const previous = data[index - 1].id
                choresUpdate({ id: previous, order: previousOrder })
                setData(data.map(item => {
                  const output = { ...item }
                  if(item.id === chore.id) {
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
                choresUpdate({ id: chore.id, order })
                const next = data[index + 1].id
                choresUpdate({ id: next, order: nextOrder })
                setData(data.map(item => {
                  const output = { ...item }
                  if(item.id === chore.id) {
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

            <span
              style={{ marginLeft: 10, cursor: "pointer" }}
              onClick={() => {
                const now = new Date()
                choresUpdate({
                  id: chore.id,
                  completed: chore.data.completed ? null : now,
                }).then(() => {
                  setData(data.map(item => {
                    const output = { ...item }
                    if(item.id === chore.id) {
                      output.data.completed = output.data.completed ? undefined : now
                    }
                    return output
                  }))
                })
              }}
            >
              {chore.data.completed ? "🟩" : "☑️"}
            </span>
          </div>

          <div style={{ padding: 10 }}>
            <h3>{chore.data.text}</h3>
            {chore.data.assignment && <p>Assigned to: {chore.data.assignment}</p>}
            {chore.data.completed && <p>Completed on: {new Date(chore.data.completed).toLocaleDateString()}</p>}
          </div>
        </div>
      ))}
    </div>
  </>
}
