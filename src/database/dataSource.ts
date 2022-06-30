import { DataSource } from "typeorm"
import dotenv from "dotenv"

dotenv.config()

const username = String(process.env.PG_USER ?? "postgres")
const password = String(process.env.PG_PASSWORD ?? "root")
const host = String(process.env.PG_HOST ?? "localhost")
const port = +(process.env.PG_PORT ?? 5432)
const database = String(process.env.PG_DATABASE ?? "node-jwt-auth")

const entities = process.env.ENV_TYPE === "production" ? [
        "dist/database/entities/**/*.js"
    ] : [
        "src/database/entities/**/*.ts"
    ]

const migrations = process.env.ENV_TYPE === "production" ? [
        "dist/database/migrations/**/*.js"
    ] : [
        "src/database/migrations/**/*.ts"
    ]


const AppDataSource = new DataSource({
    type: "postgres",
    host,
    port,
    username,
    password,
    database,
    entities,
    migrations,
    migrationsTableName: "migrations"
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default AppDataSource