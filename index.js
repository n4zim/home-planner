const fs = require("fs"), path = require("path")

module.exports = function() {
  const handlers = require("./build/server").default

  const server = require("http").createServer(async (req, res) => {
    if(req.url?.startsWith("/_api_/")) {
      if(req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
        res.setHeader("Access-Control-Allow-Headers", "Content-Type")
        res.writeHead(200)
        res.end()
        return
      }
      if(req.method !== "POST") {
        res.writeHead(405)
        res.end()
        return
      }
      const name = req.url.split("/").pop()
      if(handlers[name]) {
        try {
          let body = ""
          for await(const chunk of req) body += chunk
          console.log("Request", name, body)
          const response = await handlers[name](JSON.parse(body))
          res.writeHead(200, { "Content-Type": "application/json" })
          res.end(JSON.stringify(response))
        } catch(error) {
          console.error(error)
          res.writeHead(500)
          res.end()
        }
        return
      }
    } else if(req.method === "GET") {
      if(req.url === "/_bundle.js") {
        res.writeHead(200, { "Content-Type": "application/javascript" })
        fs.createReadStream("./build/client.js").pipe(res)
        return
      }
      const file = __dirname + "/public" + (
        (!req.url || req.url === "/")
          ? "/index.html"
          : path.normalize(req.url)
      )
      if(fs.existsSync(file) && fs.statSync(file).isFile()) {
        const type = {
          "html": "text/html",
          "css": "text/css",
          "js": "application/javascript",
          "json": "application/json",
          "png": "image/png",
          "jpg": "image/jpeg",
          "jpeg": "image/jpeg",
          "gif": "image/gif",
          "svg": "image/svg+xml",
          "ico": "image/x-icon",
          "webp": "image/webp",
          "woff": "font/woff",
          "woff2": "font/woff2",
          "ttf": "font/ttf",
          "otf": "font/otf",
          "eot": "font/eot"
        }[file.split(".").pop()] || "text/plain"
        res.writeHead(200, { "Content-Type": type })
        fs.createReadStream(file).pipe(res)
        return
      }
    }
    res.writeHead(404)
    res.end()
  })

  return {
    start: () => new Promise(resolve => {
      server.listen(3000, () => {
        console.log("Server running on http://localhost:3000")
        resolve()
      })
    }),
    stop: () => new Promise(resolve => {
      server.close(() => {
        console.log("Server stopped")
        resolve()
      })
    })
  }
}
