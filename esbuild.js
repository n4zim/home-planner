const esbuild = require('esbuild')

const clientOptions = {
  entryPoints: ["./src/client/index.tsx"],
  minify: true,
  outfile: "./build/client.js",
  bundle: true,
}

const serverOptions = {
  entryPoints: ["./src/server/**/*.ts"],
  minify: true,
  outdir: "./build/server",
  platform: "node",
}

;(async () => {

  await esbuild.build({
    entryPoints: ["./src/client/index.tsx"],
    minify: true,
    outfile: "./build/client.js",
    bundle: true,
  })

  await esbuild.build(serverOptions)

  /*console.log('Building...')
  await esbuild.build(clientOptions)
  await esbuild.build(serverOptions)*/

  /*;(await esbuild.context(clientOptions)).watch({})
  ;(await esbuild.build(serverOptions))*/
  /*;(await esbuild.context(serverOptions)).serve({
    onRequest: async (args) => {
      console.log("onRequest", args)
    },
    fallback: "index.html",
  })*/
})()
