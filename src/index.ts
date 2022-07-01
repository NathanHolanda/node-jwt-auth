import dotenv from "dotenv"
import app from "./app"
import "reflect-metadata"

dotenv.config()
const port = +(process.env.NODE_SERVER_PORT || 3000)

app.listen(port)