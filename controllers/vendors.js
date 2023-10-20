const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId; // get primary key

const getAllVendors = async (req, res) => {
    //#swagger.tags=['vendors]
  try {
    console.log("get all test")
    const result = await mongodb.getDb().db().collection("vendors").find();
    result.toArray().then((vendors) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(vendors);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleVendor = async (req, res) => {
    //#swagger.tags=['vendors]
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Must use valid Id" });
      }
      const vendorId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection("vendors")
        .find({ _id: vendorId });
      const vendors = await result.toArray();
  
      if (vendors.length === 0) {
        // vendor not found; send a 404 (Not Found) response
        res.status(404).json({ message: "Sorry the vendor you are loooking for can not be found" });
        return;
      }
  
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(vendors[0]);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

const createVendor = async (req, res) => {
    //#swagger.tags=['vendors]
  try {
    const vendor = {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber 
    };
    const result = await mongodb
      .getDb()
      .db()
      .collection("vendors")
      .insertOne(vendor);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateVendor = async (req, res) => {
    //#swagger.tags=['vendors]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Must use valid Id" });
    };
      // Log the incoming JSON data for debugging
     // console.log("Incoming JSON Data:", req.body);
      //console.log("test")
    const vendorId = new ObjectId(req.params.id);
    const updatedvendor = {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber 
    };
    const result = await mongodb
      .getDb()
      .db()
      .collection("vendors")
      .replaceOne({ _id: vendorId }, updatedvendor);
    res.status(204).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteVendor = async (req, res) => {
  //#swagger.tags=['vendors]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Must use valid Id" });
    };
  const vendorId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("vendors")
      .deleteOne({ _id: vendorId });
    res.status(204).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllVendors,
  getSingleVendor,
  createVendor,
  updateVendor,
  deleteVendor,
};
