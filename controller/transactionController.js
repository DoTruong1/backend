//handle khi người dùng xác nhận order
const asyncHandler = require('express-async-handler');
const sequelize = require('../model/Sequelize').sequelize;
const Order = require('../model/orderModel');
const OrderDetail = require('../model/orderDetailsModel');
const Payment = require('../model/paymentModel');
const Product = require('../model/productModel');
const { or } = require('sequelize');


const startTransaction = asyncHandler(async (req, res) => {
    const [req_user_id, req_total, req_orderDetails] = [req.body['user_id'], req.body['total'], req.body['orderDetails']];

    const order = await Order.create(
        {
            user_id: 1,
            payment_id: 2,
            total: 3000,
            status: true,
        }
    )
    const products = [{ productId: 1 }, { productId: 5 }]
    for (i = 0; i < products.length; i++) {
        const product = await Product.findOne({
            where: {
                productId: products[i].productId,
            }
        })
        await order.addProduct(product, {
            through: {
                quantity: 2,
                priceEach: 1
            }
        }).then(() => {
            console.log("Sucess")
        })
    }
    const results = await Order.findAll({
        where: {
            user_id: 1,
        },
        include: Product
    })
    return res.json(results);
})

module.exports = {
    startTransaction
}