const fs = require("fs"), path = require("path")

require("http").createServer(async (req, res) => {
  console.log(new Date(), req.method, req.url)
  try {
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
      const handlers = require("./build/server").default
      if(handlers[name]) {
        try {
          let body = ""
          for await(const chunk of req) body += chunk
          console.log(new Date(), "Handler call", name, body)
          const response = await handlers[name](JSON.parse(body))
          res.writeHead(200, { "Content-Type": "application/json" })
          res.end(JSON.stringify(response))
        } catch(error) {
          console.error(new Date(), error)
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
      const isRoot = !req.url || req.url === "/"
      let file = __dirname + "/public" + (
        isRoot
          ? "/index.html"
          : path.normalize(req.url)
      )
      if(!isRoot && (!fs.existsSync(file) || !fs.statSync(file).isFile())) {
        file = __dirname + "/public/index.html"
      }
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
  } catch(error) {
    console.error(new Date(), error)
  }
  res.writeHead(404)
  res.end()
}).listen(3000, () => {
  console.log(new Date(), "Server running on http://localhost:3000")
})
