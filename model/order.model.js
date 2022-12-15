const { Model, DataTypes } = require('sequelize')
const sequelize = require('./Sequelize').sequelize;
const moment = require("moment")
const User = require('./user.model');

const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    payment_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: false
    },
    status: {
        type: DataTypes.TEXT,
        defaultValue: "Chờ xét duyệt",
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at',
        get() {
            return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
        },
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'updated_at',
        get() {
            return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
        },
    }
},
    {
        tableName: 'orders',
    }
)



module.exports = Order
