const { Sequelize, DataTypes} = require('sequelize')
const sequelize = require('./Sequelize').sequelize;
const Order = require('./order.model');
const Product = require('./product.model');

const OrderDetail = sequelize.define('order_details',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
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

// Product.hasMany(OrderDetail,
//     {
//         foreignKey: 'product_id', 
//     }
// );

// Product.hasMany(OrderDetail,
//     {
//         foreignKey: 'product_id',  // You need to define the foreign key
//     }
// );

// Order.hasMany(OrderDetail, {
//     foreignKey: 'order_id'
// });


module.exports = OrderDetail;