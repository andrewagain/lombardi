import express from "express"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { createServer as createViteServer } from "vite"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express()

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  })

  app.use(express.json())

  app.get("/api/load", (_, res) => {
    const data = fs.readFileSync(
      path.join(__dirname, "data/data.json"),
      "utf-8"
    )
    res.send(data)
  })

  app.post("/api/save", (req, res) => {
    fs.writeFileSync(
      path.join(__dirname, "data/data.json"),
      JSON.stringify(req.body.data, null, 2)
    )
    res.send("ok")
  })

  app.use(vite.middlewares)

  app.listen(5173)
}

createServer()
