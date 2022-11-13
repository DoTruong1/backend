const {Model, DataTypes} = require('sequelize')
const sequelize = require('./Sequelize').sequelize;

// DATA BÊN FRONT GỬI SẼ NHƯ THẾ NÀY VÀ **** HÃY GỬI DƯỚI FORMAT JSON ****


const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    payment_id : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10,0),
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
        field: 'updated_at'
    },
    tableName: 'orders',
    timestamps: false
})




module.exports = Order
