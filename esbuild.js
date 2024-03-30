#!/usr/bin/env node

const fs = require('fs'), esbuild = require('esbuild')

;(async () => {
  const mode = process.argv[2] || "start"

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

  const wrapped = copySource(true)

  await client.rebuild()
  await client.dispose()

  fs.rmSync('./build/.src/client', { recursive: true })
  fs.rmSync('./build/.src/server', { recursive: true })
  copySourceDir('./src/server')

  fs.writeFileSync(
    './build/.src/handlers.ts',
    `export default {${
      wrapped.map(key => {
        return `${key}: require('./server/${key}').default`
      }).join(',')
    }}`
  )

  await server.rebuild()
  await server.dispose()

  fs.rmSync('./build/.src', { recursive: true })
})()

function copySource(serverWrapper = false) {
  if(fs.existsSync('./build')) fs.rmSync('./build', { recursive: true })
  fs.mkdirSync('./build')
  return copySourceDir('./src', serverWrapper ? [] : undefined)
}

function copySourceDir(dir, serverWrapped) {
  for(const entry of fs.readdirSync(dir)) {
    const entryPath = `${dir}/${entry}`
    if(fs.statSync(entryPath).isDirectory()) {
      copySourceDir(entryPath, serverWrapped)
    } else {
      const destination = entryPath.replace('/src/', '/build/.src/')
      //console.log(`Copying ${entryPath} to ${destination}...`)
      const destinationDir = destination.split('/').slice(0, -1).join('/')
      if(!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true })
      }
      const isServer = entryPath.indexOf('/src/server/') !== -1
      if(Array.isArray(serverWrapped) && isServer) {
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
          serverWrapped.push(functionPath)
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
  return serverWrapped
}
