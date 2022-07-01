import request from "supertest"
import app from "../../../app"
import dataSource from "../../../database/dataSource"

jest.setTimeout(10000)

describe("Test the JWT refresh path", () => {
    beforeAll(async () => {
        await dataSource.initialize()
        await dataSource.runMigrations()
    })

    afterAll(async () => {
        await dataSource.dropDatabase()
        await dataSource.destroy()
    })

    test("It should return status code 200 and body containing a message", async () => {
        const hash = Buffer.from("nathan:admin").toString("base64")

        const {body: {token}} = await request(app)
            .post("/token")
            .set("Authorization", `Basic ${hash}`)

        const res = await request(app)
            .post("/token/validate")
            .set("Authorization", `Bearer ${token}`)

        expect(res.body).toHaveProperty("message", "O token JWT tem formato válido.")
        expect(res.statusCode).toBe(200)
    })
})