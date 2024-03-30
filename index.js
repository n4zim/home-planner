const fs = require("fs")

const index = "<html>"
  + "<head>"
  + "<title>Server</title>"
  + "</head>"
  + "<body>"
  + "<div id='root'></div>"
  + "<script>" + readBuild("client") + "</script>"
  + "</body>"
  + "</html>"

require("http").createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" })
  res.end(index)
}).listen(3000, () => {
  console.log("Server running on http://localhost:3000")
})

function readBuild(name) {
  return fs.readFileSync(
    __dirname + "/build/" + name + ".js",
    "utf8",
  )
}
