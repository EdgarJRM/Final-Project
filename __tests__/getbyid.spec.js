const server = require("../server")
const supertest = require("supertest")
const { expect } = require("@jest/globals")
const request = supertest(server)
const { MongoClient } = require("mongodb")
const dotenv = require("dotenv")
dotenv.config()

describe("Test Handlers", () => {
    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        db = await connection.db()
    })
    afterAll(async () => {
        await connection.close()
    })


    test("responds to /customers/id", async () => {
        const res = await request.get("/customers/651e37d09f9b4d87da21c057")
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
        //try {
        expect(res.statusCode).toBe(200)
        /*} catch (error) {
            console.log(res.statusCode)
            console.log(res.text)
            console.error(error)
        }*/
    })

    test("responds to /orders/id", async () => {
        const res = await request.get("/orders/651e366c9f9b4d87da21c055")
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.statusCode).toBe(200)
    })

    test("responds to /products/id", async () => {
        const res = await request.get("/products/651e35779f9b4d87da21c053")
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.statusCode).toBe(200)
    })

    test("responds to /vendors/id", async () => {
        const res = await request.get("/vendors/651e35249f9b4d87da21c052")
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.statusCode).toBe(200)
    })
})