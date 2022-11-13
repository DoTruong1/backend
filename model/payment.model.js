const { Model, DataTypes} = require('sequelize')
const sequelize = require('./Sequelize').sequelize;

const Payment = sequelize.define('payment',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, autoIncrement: true, unique: true
        },
        payment_type: {
            type: DataTypes.BOOLEAN
        }
    },
    {
        tableName: 'payment_details',
        timestamps: true, 
    }
)

module.exports = Payment