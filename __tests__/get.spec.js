const server = require("../server")
const supertest = require("supertest")
const { expect } = require("@jest/globals")
const request = supertest(server)
const { MongoClient } = require("mongodb")
const dotenv = require("dotenv")
dotenv.config()
process.env.NODE_ENV = "test"

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


    test("responds to /customers", async () => {
        const res = await request.get("/customers")
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
        //try {
        expect(res.statusCode).toBe(200)
        /*} catch (error) {
            console.log(res.statusCode)
            console.log(res.text)
            console.error(error)
        }*/
    })

    test("responds to /orders", async () => {
        const res = await request.get("/orders")
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.statusCode).toBe(200)
    })

    test("responds to /products", async () => {
        const res = await request.get("/products")
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.statusCode).toBe(200)
    })

    test("responds to /vendors", async () => {
        const res = await request.get("/vendors")
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.statusCode).toBe(200)
    })
})