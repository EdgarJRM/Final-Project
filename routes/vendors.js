const express = require('express');
const router = express.Router();

const vendorsController = require('../controllers/vendors');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', vendorsController.getAllVendors);

router.get('/:id', vendorsController.getSingleVendor);

router.post('/', validation.saveVendor, isAuthenticated, vendorsController.createVendor);

router.put('/:id', validation.saveVendor, isAuthenticated, vendorsController.updateVendor);

router.delete('/:id', isAuthenticated, vendorsController.deleteVendor);

module.exports = router;