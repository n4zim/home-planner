#!/usr/bin/env node

const esbuild = require('esbuild'), fs = require('fs'), http = require(".")

const mode = process.argv[2] || "start"

;(async () => {
  const client = await esbuild.context({
    entryPoints: ["./build/.src/client/index.tsx"],
    minify: true,
    outfile: "./build/client.js",
    bundle: true,
  })

  const server = await esbuild.context({
    entryPoints: ["./build/.src/handlers.ts"],
    minify: true,
    outfile: "./build/server.js",
    platform: "node",
    bundle: true,
  })

  if(fs.existsSync('./build')) fs.rmSync('./build', { recursive: true })
  fs.mkdirSync('./build')

  await buildAll(client, server)

  if(mode === "start") {
    console.log("Initial build done, starting server...")
    const { start, stop } = http()
    await start()
    fs.watch('./src', { recursive: true }, async (event, file) => {
      // TODO: parallel builds
      switch(file.split('/')[0]) {
        case "client":
          await buildClient(client)
          break
        case "server":
          await stop()
          await buildServer(server)
          await start()
          break
        default:
          await stop()
          await buildAll(client, server)
          await start()
      }
    })
  } else if(mode === "build") {
    await client.dispose()
    await server.dispose()
  } else {
    console.error("Unknown mode:", mode)
  }
})()

async function buildAll(client, server) {
  const handlers = copySourceDir('./src', [])

  await client.rebuild()

  fs.rmSync('./build/.src/client', { recursive: true })
  fs.rmSync('./build/.src/server', { recursive: true })
  copySourceDir('./src/server')

  writeHandlers(handlers)

  await server.rebuild()

  cleanSourceDir()
}

async function buildServer(context) {
  const handlers = copySourceDir('./src', []) // TODO: optimize this
  cleanSourceDir()

  copySourceDir('./src/server')
  copySourceDir('./src/types')

  writeHandlers(handlers)

  await context.rebuild()
  cleanSourceDir()
}

async function buildClient(context) {
  copySourceDir('./src', [])
  await context.rebuild()
  cleanSourceDir()
}

function writeHandlers(handlers) {
  fs.writeFileSync(
    './build/.src/handlers.ts',
    `export default {${
      handlers.map(key => {
        return `${key}: require('./server/${key}').default`
      }).join(',')
    }}`
  )
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
