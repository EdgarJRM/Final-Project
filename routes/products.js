const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getSingleProduct);

router.post('/', validation.saveProduct, isAuthenticated, productsController.createProduct);

router.put('/:id', validation.saveProduct, isAuthenticated, productsController.updateProduct);

router.delete('/:id', isAuthenticated, productsController.deleteProduct);

module.exports = router;