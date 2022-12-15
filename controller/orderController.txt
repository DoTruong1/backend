
const asyncHandler = require('express-async-handler')
const database = require('../configs/database')
const sequelize = require('../model/Sequelize').sequelize
const Order = require('../model/orderModel')
const OrderDetail = require('../model/orderDetailsModel');
const Payment = require('../model/paymentModel');
const User = require('../model/userModel')
const { where } = require('sequelize');
const Product = require('../model/productModel');




const insertDetails = 'INSERT INTO admin.order_details (order_id, product_id, modified_at, quantity, created_at) VALUES(?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP);'


const getOrderInfo = asyncHandler(async (req, res) => {

    const orderID = req.body["orderId"];
    const order = await Order.findByPk(orderID);
    const results = await Order.findAll({include: Product, where: {id: orderID}})
   return res.json(results);
})

const getOrderByUserId = async(req, res) => {
    const data = req.body;
    const id = req.params.id;
    let results;
    try {
        results = await Order.findAll({
            where: {
                user_id: id
            }
        })
    } catch(err) {
        res.status(500).json({
            "success": 0,
            "message": "find all order by user id fail"
        });
    }
    return res.status(200).json({
        "success": 1,
        "data": results
    });
}

const orderProducts = async(req, res) => {
    const data = req.body;
    const products = data.products;
    const infoUser = data.information;
    const total = data.total;
    let order;
    try {
        order = await Order.create({
            user_id: infoUser.id,
            total: total,
            order_address: infoUser.address,
            order_phone: infoUser.phone
        })
    } catch(err) {
        return res.status(500).json({
            "success": 0,
            "message": err
        });
    }

    try {
        for(let i = 0; i < products.length; ++i) {
            await OrderDetail.create({
                order_id: order.id,
                product_id: products[i].id,
                quantityOrdered: products[i].quantity,
                priceEach: products[i].price
            })
        }
    } catch(err) {
        return res.status(500).json({
            "success": 0,
            "message": "create order_detail fail"
        });
    }

    try {
        for(let i = 0; i< products.length; ++i) {
            
            let product = await Product.findByPk(products[i].id);
            let quantity = products[i].quantity - product.quantity;
            await Product.update({quantity: quantity},{
                where: {
                    id: products[i].id
                }
            })

        }
    } catch(err) {
        return res.status(500).json({
            "success": 0,
            "message": "update products fail"
        })
    }

    return res.status(200).json({
        "success": 1,
        "message": "bought successfully"
    })
}


module.exports = {
    getOrderInfo,
    orderProducts,
    getOrderByUserId
}