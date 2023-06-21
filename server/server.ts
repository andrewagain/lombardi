import express from "express"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { createServer as createViteServer } from "vite"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function getDataPath(req: express.Request) {
  const graphId = req.body.graphId
  return path.join(__dirname, `data/${graphId}.json`)
}

async function createServer() {
  const app = express()

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  })

  app.use(express.json())

  app.post("/api/load", (req, res) => {
    const dataPath = getDataPath(req)
    if (!fs.existsSync(dataPath)) {
      res.status(404)
      res.send("")
      return
    }

    const data = fs.readFileSync(dataPath, "utf-8")
    res.send(data)
  })

  app.post("/api/save", (req, res) => {
    const dataPath = getDataPath(req)
    fs.writeFileSync(dataPath, JSON.stringify(req.body.data, null, 2))
    res.send("ok")
  })

  app.use(vite.middlewares)

  app.listen(5173)
}

createServer()
