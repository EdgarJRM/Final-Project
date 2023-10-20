const server = require("../server")
const supertest = require("supertest")
const { expect } = require("@jest/globals")
const request = supertest(server)
const dotenv = require("dotenv")
dotenv.config()

describe("Test Handlers", () => {

    test("responds to delete /customers", async () => {
        const res = await request.delete("/customers/65239fa61bd62cc73c991f2b")
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
        //try {
        expect(res.statusCode).toBe(401) // code 401 since user is not logged in
        /*} catch (error) {
            console.log(res.statusCode)
            console.log(res.text)
            console.error(error)
        }*/
    })

    test("responds to delete /orders", async () => {
        const res = await request.delete("/orders/651e366c9f9b4d87da21c055")
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.statusCode).toBe(401)
    })

    test("responds to delete /products", async () => {
        const res = await request.delete("/products/651e35779f9b4d87da21c053")
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.statusCode).toBe(401)
    })

    test("responds to delete /vendors", async () => {
        const res = await request.delete("/vendors/651e33a89f9b4d87da21c051")
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.statusCode).toBe(401)
    })
})