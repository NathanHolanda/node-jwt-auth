import dotenv from "dotenv"
import express from "express"
import routes from "./routes"

dotenv.config()
const port = +(process.env.SERVER_PORT || 3000)

const app = express()

app.use(express.json())

app.use(routes)

app.listen(port)