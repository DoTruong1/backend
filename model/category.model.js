const {DataTypes} = require('sequelize');
const sequelize = require('./Sequelize').sequelize;
const Product = require('./product.model');

const Category = sequelize.define('product_category',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING
    },
},{
    freezeTableName: true
});

Category.hasMany(Product, {
    foreignKey: 'categoryId'
})


module.exports = Category;