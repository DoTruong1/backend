const {Sequelize ,DataTypes } = require('sequelize');

const sequelize = require('./Sequelize').sequelize;
const category = require('./categoryModel')

const Product = sequelize.define('product', 
    {
        productId: {
            type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true
        },
        name:{
            type: DataTypes.STRING(255),
            unique: true
        } ,
        description:{ type: DataTypes.STRING(255), defaultValue: 'khong co mo ta'},
        categoryId:{ type: DataTypes.INTEGER, defaultValue: 0},
        quantityInStock:{ type: DataTypes.INTEGER, defaultValue: 0},
        price: {
            type: DataTypes.DECIMAL(15,4),
            defaultValue: 0000000,

        },
        discountId: {type: DataTypes.INTEGER, defaultValue: 0},
        image: {type: DataTypes.STRING, defaultValue: 'khong co link anh'}
    },
    {   
        
        tableName: 'products',
        timestamps: true,
    }
)
    // for(i = 1; i <= 5; i++) {
    //     Product.create({
    //         name: 'SA-IV-' + i,
    //         categoryId: 34,
    //         quantityInStock: i*3+14,

    //         price: 11000 + i * 4000,
    //     })
    // }
category.hasOne(Product, {
    foreignKey : 'categoryId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

module.exports = Product;