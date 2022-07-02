import request from "supertest"
import app from "../../../app"
import dataSource from "../../../database/dataSource"

jest.setTimeout(10000)

describe("Test the create user path", () => {
    beforeAll(async () => {
        await dataSource.initialize()
        await dataSource.runMigrations()
    })

    afterAll(async () => {
        await dataSource.dropDatabase()
        await dataSource.destroy()
    })

    test("It should return status code 201 and body containing the created user UUID", async () => {
        const hash = Buffer.from("nathan:admin").toString("base64")

        const {body: {token}} = await request(app)
            .post("/token")
            .set("Authorization", `Basic ${hash}`)

        const res = await request(app)
            .post("/users")
            .set("Authorization", `Bearer ${token}`)
            .send({
                username: "johndoe",
                password: "123456"
            })

        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty("uuid")
        expect(res.body.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    })
})