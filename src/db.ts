import { Pool, Client } from 'pg'
import dotenv from "dotenv"

dotenv.config()

const config = {
  user: process.env.PG_USER ?? "",
  password: process.env.PG_PASSWORD ?? "",
  host: process.env.PG_HOST ?? "localhost",
  port: +(process.env.PG_PORT ?? 5432),
  database: process.env.PG_DATABASE ?? ""
}
console.log(config)

const pool = new Pool(config)

export default pool