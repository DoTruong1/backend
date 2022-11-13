const { DataTypes } = require('sequelize');

const sequelize = require('./Sequelize').sequelize;

const UserDetails = sequelize.define('UserDetails',
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
        address: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'Một chín không không, hai ba địa chỉ nhà'

        }
    },
    {
        tableName: 'user',
        timestamps: true,
    }
)


module.exports = UserDetails