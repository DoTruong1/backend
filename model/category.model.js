const {DataTypes} = require('sequelize');
const sequelize = require('./Sequelize').sequelize;
const Product = require('./product.model')
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
    image: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    parentId: {
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true
});

Category.hasMany(Category,{
    foreignKey: 'parentId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});



module.exports = Category;