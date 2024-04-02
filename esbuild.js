#!/usr/bin/env node

const SERVER_PATH = './build/server.js'

const esbuild = require('esbuild'), fs = require('fs'), chokidar = require("chokidar")

const mode = process.argv[2] || "start"

let isBuilding = false, mustRebuild = false

;(async () => {
  const client = await esbuild.context({
    entryPoints: ["./build/.src/client/index.tsx"],
    outfile: "./build/client.js",
    bundle: true,
    minify: mode !== "start",
    sourcemap: mode === "start",
  })

  const server = await esbuild.context({
    entryPoints: ["./build/.src/handlers.ts"],
    outfile: SERVER_PATH,
    platform: "node",
    bundle: true,
    minify: mode !== "start",
    sourcemap: mode === "start",
  })

  if(fs.existsSync('./build')) fs.rmSync('./build', { recursive: true })
  fs.mkdirSync('./build')

  await buildAll(client, server)

  if(mode === "start") {
    const clientReload = startClientReloadServer()

    require(".")

    chokidar.watch('.', {
      ignoreInitial: true,
      cwd: './src',
    }).on('all', async (event, path) => {
      if(isBuilding) {
        mustRebuild = true
        return
      }
      isBuilding = true
      const split = path.split('/')
      switch(split[0]) {
        case "client":
          await buildClient(client)
          console.log(new Date(), "Client rebuilt")
          clientReload()
          break
        case "server":
          await buildServer(server)
          delete require.cache[require.resolve(SERVER_PATH)]
          console.log(new Date(), "Server rebuilt")
          break
        default:
          await buildAll(client, server)
          console.log(new Date(), "Client and server rebuilt")
      }
      isBuilding = false
      if(mustRebuild) {
        mustRebuild = false
        chokidar.emit('all', 'rebuild')
      }
    })
  } else if(mode === "build") {
    await client.dispose()
    await server.dispose()
  } else {
    console.error(new Date(), "Unknown mode:", mode)
  }
})()

async function buildAll(client, server) {
  const handlers = copySourceDir('./src', [])

  removeDevCode()

  await client.rebuild()

  fs.rmSync('./build/.src/client', { recursive: true })
  fs.rmSync('./build/.src/server', { recursive: true })
  copySourceDir('./src/server')

  writeHandlers(handlers)
  removeDevCode()

  await server.rebuild()

  cleanSourceDir()

  copyServerDependencies()
}

async function buildServer(context) {
  const handlers = copySourceDir('./src', []) // TODO: optimize this
  cleanSourceDir()

  copySourceDir('./src/server')
  copySourceDir('./src/types')

  writeHandlers(handlers)
  removeDevCode()

  await context.rebuild()
  cleanSourceDir()

  copyServerDependencies()
}

async function buildClient(context) {
  copySourceDir('./src', [])
  removeDevCode()
  await context.rebuild()
  cleanSourceDir()
}

function writeHandlers(handlers) {
  fs.writeFileSync(
    './build/.src/handlers.ts',
    `export default {${
      handlers.map(key => {
        return `"${key}": require('./server/${key}').default`
      }).join(',')
    }}`
  )
}

function removeDevCode(path = './build/.src') {
  if(mode === "start") return
  for(const entry of fs.readdirSync(path)) {
    const entryPath = `${path}/${entry}`
    if(fs.statSync(entryPath).isDirectory()) {
      removeDevCode(entryPath)
    } else {
      const content = fs.readFileSync(entryPath, 'utf8')
      const newContent = content.replace(/\/\* DEV_ONLY_START \*\/[\s\S]*?\/\* DEV_ONLY_END \*\//g, '')
      if(content !== newContent) {
        //console.log(new Date(), "Removed dev code from", entryPath, content + "\n", newContent)
        fs.writeFileSync(entry, newContent)
      }
    }
  }
}

function copySourceDir(dir, handlers) {
  for(const entry of fs.readdirSync(dir)) {
    const entryPath = `${dir}/${entry}`
    if(fs.statSync(entryPath).isDirectory()) {
      copySourceDir(entryPath, handlers)
    } else {
      const destination = entryPath.replace('/src/', '/build/.src/')
      //console.log(`Copying ${entryPath} to ${destination}...`)
      const destinationDir = destination.split('/').slice(0, -1).join('/')
      if(!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true })
      }
      const isServer = entryPath.indexOf('/src/server/') !== -1
      if(Array.isArray(handlers) && isServer) {
        const file = fs.readFileSync(entryPath, 'utf8')
        const functionName = file.match(/export async function (\w+)/)
        if(functionName) {
          const functionPath = entryPath
            .split('/src/server/')[1]
            .replace('.ts', '')
          fs.writeFileSync(
            destination,
            `export async function ${functionName[1]}(params) {\n`
              + `  return CallFunction('${functionPath}', params)\n`
              + `}`
          )
          handlers.push(functionPath)
        }
      } else {
        if(isServer) {
          const file = fs.readFileSync(entryPath, 'utf8')
          fs.writeFileSync(
            destination,
            file.replace(/export async function (\w+)/g, 'export default async function'),
          )
        } else {
          fs.copyFileSync(entryPath, destination)
        }
      }
    }
  }
  return handlers
}

function cleanSourceDir() {
  fs.rmSync('./build/.src', { recursive: true })
}

function copyServerDependencies() {
  const sqlite3Node = './node_modules/better-sqlite3/build/Release/better_sqlite3.node'
  if(fs.existsSync(sqlite3Node)) {
    fs.copyFileSync(sqlite3Node, './build/better_sqlite3.node')
  }
}

function startClientReloadServer() {
  const server = new (require('ws').Server)({ port: 2000 })
  const clients = {}
  server.on('connection', ws => {
    const id = Math.random().toString(36).slice(2)
    clients[id] = () => {
      ws.send()
      delete clients[id]
    }
  })
  return () => {
    for(const send of Object.values(clients)) {
      send()
    }
  }
}
