const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId; // get primary key

const getAllOrders = async (req, res) => {
    //#swagger.tags=['orders]
  try {
    console.log("get all test")
    const result = await mongodb.getDb().db().collection("orders").find();
    result.toArray().then((orders) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(orders);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleOrder = async (req, res) => {
    //#swagger.tags=['orders]
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Must use valid Id" });
      }
      const orderId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection("orders")
        .find({ _id: orderId });
      const orders = await result.toArray();
  
      if (orders.length === 0) {
        // order not found; send a 404 (Not Found) response
        res.status(404).json({ message: "Sorry the order you are loooking for can not be found" });
        return;
      }
  
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(orders[0]);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

const createOrder = async (req, res) => {
    //#swagger.tags=['orders]
  try {
    const order = {
    productCode: req.body.productCode,
    listUnitPrice: req.body.listUnitPrice,
    unitDiscountAmount: req.body.unitDiscountAmount,
    netUnitPrice: req.body.netUnitPrice,  
    customerId: req.body.customerId,
    qty: req.body.qty,
    orderTotal: req.body.orderTotal   
    };
    const result = await mongodb
      .getDb()
      .db()
      .collection("orders")
      .insertOne(order);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateOrder = async (req, res) => {
    //#swagger.tags=['orders]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Must use valid Id" });
    };
      // Log the incoming JSON data for debugging
     // console.log("Incoming JSON Data:", req.body);
      //console.log("test")
    const orderId = new ObjectId(req.params.id);
    const updatedorder = {
      productCode: req.body.productCode,
      listUnitPrice: req.body.listUnitPrice,
      unitDiscountAmount: req.body.unitDiscountAmount,
      netUnitPrice: req.body.netUnitPrice,  
      customerId: req.body.customerId,
      qty: req.body.qty,
      orderTotal: req.body.orderTotal
    };
    const result = await mongodb
      .getDb()
      .db()
      .collection("orders")
      .replaceOne({ _id: orderId }, updatedorder);
    res.status(204).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteOrder = async (req, res) => {
  //#swagger.tags=['orders]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Must use valid Id" });
    };
  const orderId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("orders")
      .deleteOne({ _id: orderId });
    res.status(204).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
