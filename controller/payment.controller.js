const Payment = require('../model/paymentModel')
const sequelize = require('../model/Sequelize').sequelize;
const asyncHandler = require('express-async-handler')


const addPayment = asyncHandler(async(req, res) => {
    await sequelize.create(Payment)
})