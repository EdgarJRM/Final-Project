const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders');
const validation = require('../middleware/validate');

router.get('/', ordersController.getAllOrders);

router.get('/:id', ordersController.getSingleOrder);

router.post('/', validation.saveOrder, ordersController.createOrder);

router.put('/:id', validation.saveOrder, ordersController.updateOrder);

router.delete('/:id', ordersController.deleteOrder);

module.exports = router;