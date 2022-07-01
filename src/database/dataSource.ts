import { DataSource } from "typeorm"
import dotenv from "dotenv"

dotenv.config()

const environment = process.env.NODE_ENV

const defaultOptions = {
    username: String(process.env.PG_TEST_USER ?? "postgres"),
    password: String(process.env.PG_TEST_PASSWORD ?? "root"),
    host: String(process.env.PG_TEST_HOST ?? "localhost"),
    port: +(process.env.PG_TEST_PORT ?? 5432),
}

const options = environment === "test" ? {
    ...defaultOptions,
    database: String(process.env.PG_TEST_DATABASE ?? "node-jwt-auth-test")
} : {
    ...defaultOptions,
    database: String(process.env.PG_DATABASE ?? "node-jwt-auth")
}

const entities = environment === "production" ? [
    "dist/database/entities/**/*.js"
] : [
    "src/database/entities/**/*.ts"
]

const migrations = environment === "production" ? [
    "dist/database/migrations/**/*.js"
] : environment === "test" ? [
    "src/database/migrations/tests/**/*.ts"
] : [
    "src/database/migrations/**/*.ts"
]


const dataSource = new DataSource({
    ...options,
    type: "postgres",
    entities,
    migrations,
    migrationsTableName: "migrations"
})

if(environment !== "test")
    dataSource
        .initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
 

export default dataSource