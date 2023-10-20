const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId; // get primary key

const getAllProducts = async (req, res) => {
    //#swagger.tags=['products]
  try {
    console.log("get all test")
    const result = await mongodb.getDb().db().collection("products").find();
    result.toArray().then((products) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(products);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleProduct = async (req, res) => {
    //#swagger.tags=['products]
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Must use valid Id" });
      }
      const productId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection("products")
        .find({ _id: productId });
      const products = await result.toArray();
  
      if (products.length === 0) {
        // product not found; send a 404 (Not Found) response
        res.status(404).json({ message: "Sorry the product you are loooking for can not be found" });
        return;
      }
  
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(products[0]);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

const createProduct = async (req, res) => {
    //#swagger.tags=['products]
  try {
    const product = {
    productName: req.body.productName,
    productCode: req.body.productCode,
    listPrice: req.body.listPrice,
    qytOnHand: req.body.qytOnHand,
    rating: req.body.rating,
    bin: req.body.bin,
    vendor: req.body.vendor 
    };
    const result = await mongodb
      .getDb()
      .db()
      .collection("products")
      .insertOne(product);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
    //#swagger.tags=['products]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Must use valid Id" });
    };
      // Log the incoming JSON data for debugging
     // console.log("Incoming JSON Data:", req.body);
      //console.log("test")
    const productId = new ObjectId(req.params.id);
    const updatedproduct = {
      productName: req.body.productName,
      productCode: req.body.productCode,
      listPrice: req.body.listPrice,
      qytOnHand: req.body.qytOnHand,
      rating: req.body.rating,
      bin: req.body.bin,
      vendor: req.body.vendor 
    };
    const result = await mongodb
      .getDb()
      .db()
      .collection("products")
      .replaceOne({ _id: productId }, updatedproduct);
    res.status(204).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  //#swagger.tags=['products]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Must use valid Id" });
    };
  const productId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("products")
      .deleteOne({ _id: productId });
    res.status(204).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
