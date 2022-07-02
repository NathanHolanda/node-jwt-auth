import request from "supertest"
import app from "../../../app"
import dataSource from "../../../database/dataSource"

jest.setTimeout(10000)

describe("Test the get all users path", () => {
    beforeAll(async () => {
        await dataSource.initialize()
        await dataSource.runMigrations()
    })

    afterAll(async () => {
        await dataSource.dropDatabase()
        await dataSource.destroy()
    })

    test("It should return status code 200 and body containing all users", async () => {
        const hash = Buffer.from("nathan:admin").toString("base64")

        const {body: {token}} = await request(app)
            .post("/token")
            .set("Authorization", `Basic ${hash}`)

        const res = await request(app)
            .get("/users")
            .set("Authorization", `Bearer ${token}`)

        const [user] = res.body

        expect(res.statusCode).toBe(200)

        expect(res.body).toHaveLength(3)

        expect(user).toHaveProperty("uuid")
        expect(user.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
        expect(user).toHaveProperty("username")
    })
})