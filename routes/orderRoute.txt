const express = require('express');
const orderRouter = express.Router();
const {getOrderInfo, orderProducts, getOrderByUserId} = require('../controller/orderController')

// orderRouter.post('/add', orderController.addOrder)
    orderRouter.get('/details', getOrderInfo);
    orderRouter.get('/:id',getOrderByUserId);
    orderRouter.post('/', orderProducts);

module.exports = orderRouter