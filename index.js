
const index = "<html>"
  + "<head>"
  + "<title>Server</title>"
  + "</head>"
  + "<body>"
  + "<div id='root'></div>"
  + "<script src='/_bundle.js'></script>"
  + "</body>"
  + "</html>"

const bundle = require("fs").readFileSync("./build/client.js", "utf8")
const handlers = require("./build/server").default

require("http").createServer(async (req, res) => {
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
      res.end(bundle)
    } else {
      res.writeHead(200, { "Content-Type": "text/html" })
      res.end(index)
    }
    return
  }
  res.writeHead(404)
  res.end()
}).listen(3000, () => {
  console.log("Server running on http://localhost:3000")
})
