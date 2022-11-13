const { Sequelize, DataTypes} = require('sequelize')
const sequelize = require('./Sequelize').sequelize;
const Order = require('./order.model');

const OrderDetail = sequelize.define('order_details',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    quantityOrdered: {
        type: DataTypes.INTEGER
    },
    priceEach: {
        type: DataTypes.DECIMAL(10,2)
    }
},{
    tableName: 'order_details',
    timestamps: false,
    createAt: false,
    updateAt: false
})


module.exports = OrderDetail;