const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', ordersController.getAllOrders);

router.get('/:id', ordersController.getSingleOrder);

router.post('/', validation.saveOrder, isAuthenticated, ordersController.createOrder);

router.put('/:id', validation.saveOrder, isAuthenticated, ordersController.updateOrder);

router.delete('/:id', isAuthenticated, ordersController.deleteOrder);

module.exports = router;