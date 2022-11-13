const {DataTypes} = require('sequelize');
const sequelize = require('./Sequelize').sequelize;

const Admin = sequelize.define('admin', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    admin_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName: true
});

module.exports = Admin;