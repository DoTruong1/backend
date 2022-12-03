

const asyncHandler = require('express-async-handler')
const Order = require('../model/order.model')
const OrderDetail = require('../model/orderDetails.model');
const Payment = require('../model/payment.model');
const User = require('../model/user.model')
const { where, DataTypes } = require('sequelize');
const Product = require('../model/product.model');
const sequelize = require('../model/Sequelize').sequelize


const getOrderDetails = asyncHandler(async (req, res, next) => {

    // const orderID = req.body["orderId"];
    const orderId = req.params.id
    // const order = await Order.findByPk(orderID);
    const data = await Order.findOne({
        include: {
            model: Product,
        },
        where: {
            id: orderId
        }
    })
    return res.status(200).json(data)
    

})

const getAllOrder = asyncHandler(async (req, res, next) => {
    // const userId = req.body["userId"]
    // const id = req.params.id;
    const test= JSON.parse(req.query)
    console.log(test)
    const results = await Order.findAndCountAll({
        // where: JSON.parse(req.query.filter),
        // // include:  {
        // //     model: Product
        // // },
        // order: [
        //     JSON.parse(req.query.sort),
        // ],
        // offset: Object.values(test)[0],
        // limit: Object.values(test)[1],
        // distinct: true
    })
    return res.status(200)
        .set('Access-Control-Expose-Headers', 'Content-Range')
        .set("Content-Range",`orders ${Object.values(test)[0]}-${Object.values(test)[1]}/${results.count}`)
        .json(results.rows)

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
                    create_at: DataTypes.NOW,
                    update_at: DataTypes.NOW
                }, {transaction: t1}
            )
            console.log("false")
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
    const deleteOrder = asyncHandler(async (req, res, next) => {
        await Order.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json("XOA THANH CONG")
    })

const editOrder = asyncHandler(async (req, res, next) => {
    // await Order.destroy({
    //     where: {
    //         id: req.params.id
    //     }
    // })
    return res.status(200).json("XOA THANH CONG")
})
const getAll = asyncHandler(async (req, res, next) => {
    const ress = await Order.findAndCountAll({
        include: {
            model: Product
        },
        distinct: true
    })
    console.log(ress)
    return res.status(200).json(ress)
})

module.exports = {
    getOrderDetails,
    createOrder,
    getAllOrder,
    deleteOrder,
    editOrder,
    getAll
}