import request from "supertest"
import app from "../../../app"
import dataSource from "../../../database/dataSource"

jest.setTimeout(10000)

describe("Test the update user path", () => {
    beforeAll(async () => {
        await dataSource.initialize()
        await dataSource.runMigrations()
    })

    afterAll(async () => {
        await dataSource.dropDatabase()
        await dataSource.destroy()
    })

    test("It should return status 200", async () => {
        const hash = Buffer.from("nathan:admin").toString("base64")

        const {body: {token}} = await request(app)
            .post("/token")
            .set("Authorization", `Basic ${hash}`)

        const uuid = "17c4710f-10d3-40df-9a7f-601e76de1cd6"
        const res = await request(app)
            .put(`/users/${uuid}`)
            .send({
                username: "johndoe",
                password: "123456"
            })
            .set("Authorization", `Bearer ${token}`)

        expect(res.statusCode).toBe(200)
    })
})