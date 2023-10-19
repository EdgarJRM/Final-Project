const { MongoClient } = require("mongodb")
const dotenv = require("dotenv")
dotenv.config()

describe("insert", () => {
    let connection
    let db

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

    it("should insert a new customer into the customer collection", async () => {
        const customers = db.collection("customers")

        const mockCustomer = {
            id: "some-customer-id",
            firstName: "first name",
            lastName: "last name",
            email: "email",
            shippingStreet: "street",
            shippingCity: "city",
            shippingState: "state",
            shippingPostalCode: "postal code",
            birthday: "birthday",
        }

        await customers.insertOne(mockCustomer)

        const insertedCustomer = await customers.findOne({ id: "some-customer-id" })

        expect(insertedCustomer).toEqual(mockCustomer)
    }),

    it("should delete a customer from the customers collection", async () => {
        const customers = db.collection("customers")
        await customers.deleteMany({ id: "some-customer-id" })
        const deletedCustomer = await customers.findOne({ id: "some-customer-id" })
        expect(deletedCustomer).toEqual(null)
    })
})