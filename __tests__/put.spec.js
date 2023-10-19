const server = require("../server")
const supertest = require("supertest")
const { expect } = require("@jest/globals")
const request = supertest(server)
const dotenv = require("dotenv")
dotenv.config()

describe("Test Handlers", () => {

    test("responds to put /customers", async () => {
        const res = await request.put("/customers/651e37d09f9b4d87da21c057").send({
            firstName: "first name",
            lastName: "last name",
            email: "email@email.com",
            phoneNumber: "1234567890"
            /*shippingStreet: "street",
            shippingCity: "city",
            shippingState: "state",
            shippingputalCode: "putal code",
            birthday: "birthday",*/
        })
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
        //try {
        expect(res.statusCode).toBe(401) // code 401 since user is not logged in
        /*} catch (error) {
            console.log(res.statusCode)
            console.log(res.text)
            console.error(error)
        }*/
    })

    test("responds to put /orders", async () => {
        const res = await request.put("/orders/651e366c9f9b4d87da21c055").send({
            number: 0,
            date: "2001-01-01T07:00:00.000Z",
            total: 0  
            /*productCode: "code",
            listUnitPrice: 0,
            unitDiscountAmount: 0,
            netUnitPrice: 0,
            customerId: "123456789",
            qty: "0",
            orderTotal: "200"*/
        })
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.statusCode).toBe(401)
    })

    test("responds to put /products", async () => {
        const res = await request.put("/products/651e35779f9b4d87da21c053").send({
            name: "name",
            department: "department",
            retailPrice: 0,
            cost: 0,
            vendorName: "vendor",
            color: "color",
            qtyInStock: 0
            /*productName: "name",
            productCode: "code",
            listPrice: 53.95,
            qtyOnHand: 55,
            rating: 10,
            bin: "bin",
            vendor: "vendor"*/
        })
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.statusCode).toBe(401)
    })

    test("responds to put /vendors", async () => {
        const res = await request.put("/vendors/651e35249f9b4d87da21c052").send({
            name: "name",
            email: "email@email.com",
            phoneNumber: 0
            /*companyName: "company",
            hqState: "hq",
            phone: "1234567890",
            email: "email@email.com",
            contractStartDate: "2001-01-01T07:00:00.000Z",
            contractEndDate: "2023-01-01T07:00:00.000Z",
            mainContact: "contact"*/
        })
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.statusCode).toBe(401)
    })
})