const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controller/order.controller')
const curd = require('express-crud-router').crud;


const auth = require("../auth/verifyToken");
const Order = require('../model/order.model');
const { where } = require('sequelize-date');
const { destroy } = require('express-crud-router/lib/delete');
// orderRouter.post('/add', orderController.addOrder)
orderRouter.get('/details/:id',auth.verifyController ,orderController.getOrderDetails)
orderRouter.get('/detailsTest',orderController.getOrderDetails)
// orderRouter.get('/user/all', orderController.getAllOrder)
orderRouter.post('/add/create', orderController.createOrder)
// orderRouter.get('/:page', orderController.getAllOrder)
orderRouter.delete("/:id", orderController.deleteOrder)
orderRouter.post("/:id", orderController.editOrder)
orderRouter.get("/:id", orderController.getOrderDetails)
orderRouter.get("/alltest/test", orderController.getAll)



module.exports = orderRouter