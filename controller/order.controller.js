
const asyncHandler = require('express-async-handler')
const Order = require('../model/order.model')
const OrderDetail = require('../model/orderDetails.model');
const Payment = require('../model/payment.model');
const User = require('../model/user.model')
const { where } = require('sequelize');
const Product = require('../model/product.model');


const getOrderDetails = asyncHandler(async (req, res, next) => {

    const orderID = req.body["orderId"];
    // const order = await Order.findByPk(orderID);
    const data = await Order.findAll({include: Product, where: {id: orderID}})
    return res.json(data)
    

})

const createOrder = asyncHandler(async (req, res,next) => {
    const [req_user_id, req_total, req_orderDetails] = [req.body['user_id'], req.body['total'], req.body['orderDetails']];

        await sequelize.transaction(async(t1) => {
            //tạo order
            const order = await Order.create(
                {
                    user_id: req_user_id,
                    payment_id: 2,
                    total: req_total,
                    status: true,
                }, {transaction: t1}
            )

            const data = req_orderDetails.map(item => (
                {   orderId: order.id, 
                    productId: item.product_id, 
                    quantityOrdered: item.quantity,
                    priceEach: item.priceEach
                })
            )

            await OrderDetail.bulkCreate(data, {transaction: t1})
            
        })
        .then(() => {
            return res.status(200).json({
                message: "Đặt hàng thành công",
                stastus:  200
            });
        })
        .catch((err) => {
            const newErr = new Error('giao dịch không thành công')
            newErr.dev = err
            next(newErr, req, res, next)}
        )

})
module.exports = {
    getOrderDetails,
    createOrder
}