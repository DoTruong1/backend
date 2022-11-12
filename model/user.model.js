const { DataTypes } = require('sequelize');

const sequelize = require('./Sequelize').sequelize;
const Order = require('./order.model')
const Payment = require('./payment.model')

const User = sequelize.define('User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'user1'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'user1'

        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'user1'


        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'user1'

        }
    },
    {
        tableName: 'user',
        timestamps: true,
    }
)


module.exports = User