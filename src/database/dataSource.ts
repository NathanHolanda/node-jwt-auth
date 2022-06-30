import { DataSource } from "typeorm"
import dotenv from "dotenv"

dotenv.config()

const username = process.env.PG_USER
const password = process.env.PG_PASSWORD
const host = process.env.PG_HOST
const port = +(process.env.PG_PORT ?? 5432)
const database = process.env.PG_DATABASE


const AppDataSource = new DataSource({
    type: "postgres",
    host,
    port,
    username,
    password,
    database,
    entities: ["src/database/entities/**/*.ts"],
    migrations: ["src/database/migrations/**/*.ts"],
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