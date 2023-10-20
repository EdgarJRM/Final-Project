const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId; // get primary key

const getAllCustomers = async (req, res) => {
    //#swagger.tags=['customers]
  try {
    console.log("get all test")
    const result = await mongodb.getDb().db().collection("customers").find();

    result.toArray().then((customers) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(customers);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleCustomer = async (req, res) => {
    //#swagger.tags=['customers]
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Must use valid Id" });
      }
      const customerId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection("customers")
        .find({ _id: customerId });
      const customers = await result.toArray();
  
      if (customers.length === 0) {
        // customer not found; send a 404 (Not Found) response
        res.status(404).json({ message: "Sorry the customer you are loooking for can not be found" });
        return;
      }
  
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(customers[0]);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

const createCustomer = async (req, res) => {
    //#swagger.tags=['customers]
  try {
    const customer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      shippingStreet: req.body.shippingStreet,
      shippingCity: req.body.shippingCity,
      shippingState: req.body.shippingState,
      shippingPostalCode: req.body.shippingPostalCode,
      birthday: req.body.birthday     
    };
    const result = await mongodb
      .getDb()
      .db()
      .collection("customers")
      .insertOne(customer);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCustomer = async (req, res) => {
    //#swagger.tags=['customers]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Must use valid Id" });
    };
      // Log the incoming JSON data for debugging
     // console.log("Incoming JSON Data:", req.body);
      //console.log("test")
    const customerId = new ObjectId(req.params.id);
    const updatedcustomer = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    shippingStreet: req.body.shippingStreet,
    shippingCity: req.body.shippingCity,
    shippingState: req.body.shippingState,
    shippingPostalCode: req.body.shippingPostalCode,
    birthday: req.body.birthday
    };
    const result = await mongodb
      .getDb()
      .db()
      .collection("customers")
      .replaceOne({ _id: customerId }, updatedcustomer);
    res.status(204).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCustomer = async (req, res) => {
  //#swagger.tags=['customers]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Must use valid Id" });
    };
  const customerId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("customers")
      .deleteOne({ _id: customerId });
    res.status(204).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllCustomers,
  getSingleCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
