import request from "supertest"
import app from "../../../app"
import dataSource from "../../../database/dataSource"

jest.setTimeout(10000)

describe("Test the JWT generator path", () => {
    beforeAll(async () => {
        await dataSource.initialize()
        await dataSource.runMigrations()
    })

    afterAll(async () => {
        await dataSource.dropDatabase()
        await dataSource.destroy()
    })

    test("It should return status code 200 and body containing a token and refreshToken", async () => {
        const hash = Buffer.from("nathan:admin").toString("base64")

        const res = await request(app)
            .post("/token")
            .set("Authorization", `Basic ${hash}`)

        expect(res.body).toHaveProperty("token")
        expect(res.body).toHaveProperty("refreshToken")

        expect(res.body.token).toMatch(/(^[\w-]*\.[\w-]*\.[\w-]*$)/)
        expect(res.body.refreshToken).toMatch(/(^[\w-]*\.[\w-]*\.[\w-]*$)/)

        expect(res.statusCode).toBe(200)
    })
})
